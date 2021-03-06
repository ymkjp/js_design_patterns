/**
 * pp. 183 - 199
 * jQuery のデザインパターン
 *
 * みんな見たことのあるコードがでてくると思うので
 * 「あぁ、この書き方にはこんな名前がついていたんだなぁ」という気持ちで聞いてください。
 *
 * 内容は「jQuery に学ぶデザインパターンの秘訣」みたいなもんです。
 * もしくは「ここまで学んできた内容は jQuery ではどうなってんだよ」みたいなもんです。
 *
 */
/*jslint browser: true, regexp: true */
/*global jQuery, $ */

/**
 * 5-1. 「コンポジットパターン」
 *
 * まずはこんなコードから
 *
 */

// 単一の要素
$('#singleItem').addClass('active');
$('#container').addClass('active');

// 要素のコレクション
$('div').addClass('active');
$('.item').addClass('active');
$('input').addClass('active');

/**
 * 上の方の id を指定しているほうは1個の要素に addClass メソッドを適用している。
 *
 * 下の方の html 要素やクラスを指定しているほうも複数の要素に対して addClass メソッドを使えている。
 *
 * これって当たり前のようで冷静に考えると結構すごいよねという話。
 *
 * そのすごい方法を「コンポジットパターン」と呼ぶ
 *
 * なぜこのすごい方法が実現できているかというと、どちらも jQuery オブジェクトを返しているから。
 *
 */

console.log('コンポジットパターン');
console.dir(document.getElementsByClassName('item'));
console.dir($('.item'));
console.dir($('.item') instanceof jQuery.fn.init);
console.dir($('.item') instanceof $);

/**
 * addClass の実際のコードはこちら
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/attributes.js#L27
 *
 * こいつは単一でも複数でも適用出来るように jQuery の for ループを使って
 * コレクションを繰り返し処理（イテレート）する実装になっています。
 *
 * ※ jQuery.each(), iQuery.fn.each()
 *
 * もう一回言うとこの方法を「コンポジットパターン」と呼ぶ
 *
 */

/**
 * 5-2. 「アダプタパターン」
 *
 * この本で抽象的な言葉の説明で理解できたためしがないのでまずはコードを見ましょう。
 *
 */

// 透明度を設定
$('.container').css({ opacity: 0.5 });

// 透明度を取得
var currentOpacity = $('.container').css('opacity');

/**
 * この jQuery の css メソッドは便利ですよね。
 * いろんなブラウザの透明度の仕様の差異を吸収してくれる。
 * （IE6-8 は opacity じゃなくて filter だとか何とか）
 *
 * こういうあるオブジェクトやクラスのインターフェイスを、
 * 特定のシステムと互換性のあるインターフェイスに変換してくれる方法を「アダプタパターン」といいます。
 *
 * で、本に載っているコード例は github の jQuery リポジトリから探しても見つからなかったので割愛します。
 *
 */

/**
 * 5-3. 「ファサードパターン」
 *
 * ファサードは jQuery ライブラリのあちこちで見られます。
 * DOM 操作やアニメーションの実装、
 * さらにブラウザに依存しない Ajax を扱う実装を、僕たち開発者が簡単に利用できるようになります。
 *
 * コードをみましょう。
 *
 */

$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);


/**
 * これらは jQuery 内部で次のように翻訳されます。
 */

// $.get()
$.ajax({
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.post()
$.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.getJSON()
$.ajax({
    url: url,
    dataType: "json",
    data: data,
}).done(callback);

// $.getScript()
$.ajax({
    url: url,
    dataType: "script",
}).done(callback);

/**
 * おきづきになられただろうか。
 *
 * 上記のコードもまた、
 * 複雑な Ajax 処理を舞台裏に隠すファサードになっているのです。
 *
 * その理由は簡単で、何と言っても jQuery コアにある jQuery.ajax() の実装が難しいからです。
 *
 * このファサードがあるおかげで、少なくともブラウザ間での
 * XHR (XMLHttpRequest) の違いが正規化されて、
 * 共通の HTTP アクション（get, post など）の実行や Deferred の操作が簡単になるっていう話。
 *
 * そして本で引用されている jQuery.ajax() の話の実際のコードはこのあたり。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/speed/jquery-basis.js#L4932
 *
 * （IE7だとローカルファイルがリクエストできないとかなんとか書いてありますね）
 *
 */


/**
 * 5-4. オブザーバパターン
 *
 * 例によってコードから見てみましょう。
 *
 */

// subscribe(topicName, callback) に相当
$(document).on('topicName', function () {
    // 何らかの動作を行う
});

// publish(topicName) に相当
$(document).trigger('topicName');

// unscribe(topicName) に相当
$(document).off('topicName');


/**
 * はい、これもよく使いますね。
 * まんまオブザーバです。
 *
 * これを実現している jQuery のコードはこのあたりです。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/event.js#L24
 *
 * そして on, trigger, off の名前に不満だったベン・アルマンさんは
 * 次のようなラッパーを作っちゃったようです。
 *
 */

(function ($) {
    var o = $({});
    $.subscribe = function () {
        o.on.apply(o, arguments);
    };
    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };
    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
}(jQuery));

/**
 * やはり「命名大事」ということを思い知らされますね。
 *
 * ところで、最近の jQuery のバージョンには、コールバックを複数持たせるコードを書くことが出来る新手法があるそうです。
 * jQuery.Callbacks というやつですがこれも発行／講読システムです。
 *
 */

var topics = {};

jQuery.Topic = function (id) {
    var callbacks,
        topic = id && topics[id];
    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if (id) {
            topics[id] = topic;
        }
    }
    return topic;
};

/**
 * こんなふうにして使います。
 *
 */

console.log("オブザーバパターン");
fn1 = function (message) {
    console.log("I'm fn1");
    console.dir(message);
};
fn2 = function (message) {
    console.log("I'm fn2");
    console.dir(message);
};

// Subscribers
$.Topic('mailArrived').subscribe(fn1);
$.Topic('mailArrived').subscribe(fn2);
$.Topic('mailSent').subscribe(fn1);

// Publisher
$.Topic('mailArrived').publish('Hello world!');
$.Topic('mailSent').publish('woo! mail!');

// 'mailArrived' 通知が発行されると fn1 と fn2 に 'Hello world!' がプッシュされる
// 'mailSent' 通知が発行されると fn1 に 'woo! mail!' がプッシュされる


/**
 * 5-5. イテレータパターン
 *
 * ほい、例のコードを見てみましょう。
 *
 */
console.log('イテレータパターン');
$.each(['john', 'dave', 'rick', 'julian'], function (index, value) {
    console.dir(index + ': ' + value);
});

$('li').each(function (index) {
    console.dir(index + ': ' + $(this).text());
});

/**
 * 以下に示すのは jQuery.fn.each() のコードです。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/core.js#L216
 *
 * そして jQuery.each() です。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/core.js#L541
 *
 * call と apply の雨嵐で近寄りがたいです。
 * 他にも for ( ; i < length; i++ ) とか、奇妙な書き方がちらほら。
 * まあここは本題とは異なるので一旦飛ばして余裕があれば時間を取りましょう。
 *
 */


/**
 * 5-6. 遅延初期化
 *
 * 今度の例もよく見るというか、毎回見るよねくらいの勢いのやつです。
 *
 */

$(document).ready(function () {
    // ajax 要求は DOM が準備完了するまで実行されない。
    var jqxhr = $.ajax({
        url: 'http://example.com/api/',
        data: 'display=latest&order=ascending'
    })
    .done(function (data) {
        $('.status').html('content loaded');
        console.dir('Data output: ' + data);
    });
});

/**
 * jQuery ではこうやって書かれています。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/speed/jquery-basis.js#L406
 *
 */


/**
 * 5-7. プロキシパターン
 *
 * コードを見ましょう。
 *
 */

$('button').on('click', function () {
    // この関数内での this はクリックされた要素を参照する
    $(this).addClass('active');
});

$('button').on('click', function () {
    setTimeout(function () {
        // this は要素を参照していない！
        // window を参照している
        $(this).addClass('active');
    });
});

$('button').on('click', function () {
    setTimeout($.proxy(function () {
        // this は期待通りに要素を参照している
        $(this).addClass('active');
    }, this), 500);
    // this に DOM 要素を参照させたいことを最後の引数の this で$.proxy() に伝える
});

/**
 * このように jQuery.proxy() メソッドは js によくある this 問題を解決してくれます。
 * 重いオブジェクトをインスタンス化するタイミングを制御したり、
 * 特定のコンテキストで処理を変更したり、といったことが可能になります。
 *
 * jQuery.proxy() の実装は次のとおりです。
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/core.js#L693
 *
 */


/**
 * 5-8. ビルダーパターン
 *
 * 最後のパターンになりました。
 * まずはコードを見ましょう。
 *
 */

$('<div class="foo">bar</div>');
$('<p id="test">foo <em>bar</em></p>').appendTo('body');

var newParagraph = $('<p />').text('Hello world');
$('<input />')
.attr({'type': 'text', 'id': 'sample'})
.appendTo('#container');

/**
 * DOM を扱う際に、要素を動的に新規作成したいことがよくありますが、
 * 新規作成する要素に持たせる最終的なマークアップ、属性、プロパティによっては、
 * 作成の処理が複雑になってしまいます。
 *
 * オブジェクトに依存せずに複雑な DOM オブジェクトを組み立てる仕組みがあると、
 * 柔軟性が得られます。ビルダーパターンの役割がまさにそれです。
 *
 * ビルダーを利用することで、オブジェクトの方と内容を指定するだけで
 * オブジェクトの作成や取得の処理を隠蔽しつつ、複雑なオブジェクトを作成できます。
 *
 * jQuery のドル記号 ($) はまさにこれを実現しています。
 * 要素の完全なマークアップを渡すか、マークアップの一部とその内容を渡すか、
 * あるいは jQuery を使ってオブジェクトを作成するか、
 * さまざまな方法で jQuery （あるいは DOM）オブジェクトを動的に新規作成できます。
 *
 * jQuery コアの内部メソッド jQuery.prototype で
 * jQuery() セレクタに渡されたマークアップから jQuery オブジェクトを作成します。
 *
 * 要素への参照を戻り値のオブジェクトに追加しています。
 * .attr() などのメソッドが後から簡単に要素にアクセスできるようにするためです。
 *
 * https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/core.js#L102
 *
 */

