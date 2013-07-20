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
 * 上の方の id を指定しているほうは
 * 1個の要素に addClass メソッドを適用している。
 *
 * 下の方の html 要素やクラスを指定しているほうも
 * 複数の要素に対して addClass メソッドを使えている。
 *
 * これって当たり前のようで冷静に考えると結構すごいよねという話。
 *
 * そのすごい方法を「コンポジットパターン」と呼ぶ
 *
 * なぜこのすごい方法が実現できているかというと、
 * どちらも jQuery オブジェクトを返しているから。
 *
 */

console.log('item クラス');
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
 * この勉強会でごちゃごちゃした言葉の説明で理解できたためしがないので
 * まずは次のコードからご覧ください
 *
 * （っていうかやばいこのやり方めっちゃ面倒くさいことが判明したｗ）
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
 * 特定のシステムと互換性のあるインターフェイスに変換してくれる方法を
 * 「アダプタパターン」といいます。
 *
 * で、本に載っているコード例は github の jQuery リポジトリから探しても
 * 見つからなかったので割愛します。
 *
 */

/**
 * 5-3. 「ファサードパターン」
 *
 * ファサードは jQuery ライブラリのあちこちで見られます。
 * DOM操作やアニメーションの実装、
 * さらにブラウザに依存しない Ajax を扱う実装を、
 * 僕たち開発者が簡単に利用できるようになります。
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
 * その理由は簡単で、何と言っても jQuery コアにある
 * jQuery.ajax() の実装が難しいからです。
 *
 * このファサードがあるおかげで、少なくともブラウザ間での
 * XHR (XMLHttpRequest) の違いが正規化されて、
 * 共通の HTTP アクション（get, post など）の実行や
 * Deferred の操作が簡単になるっていう話。
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
 * （マジで書くのだるくなってきたｗ）
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
 * ところで、最近の jQuery のバージョンには、コールバックを複数持たせる
 * コードを書くことが出来る新手法があるそうです。
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
 * ほい、コード見ましょう。
 *
 */
$.each(['john', 'dave', 'rick', 'julian'], function (index, value) {
    console.dir(index + ': ' + value);
});

$('li').each(function (index) {
    console.dir(index + ': ' + $(this).text());
});



/**
 *
 */

/**
 *
 */
