/**
 * p. 183
 * jQuery のデザインパターン
 *
 * みんな見たことのあるコードがでてくると思うので
 * 「あぁ、この書き方にはこんな名前がついていたんだなぁ」という気持ちで聞いてください。
 *
 * 内容は「jQuery に学ぶデザインパターンの秘訣」みたいなもんです。
 * もしくは「ここまで学んできた内容は jQuery ではどうなってんだよ」みたいなもんです。
 *
 */

/**
 *  1. 「コンポジットパターン」
 *
 *  まずはこんなコードから
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
 *  上の方の id を指定しているほうは
 *  1個の要素に addClass メソッドを適用している。
 *
 *  下の方の html 要素やクラスを指定しているほうも
 *  複数の要素に対して addClass メソッドを使えている。
 *
 *  これって当たり前のようで冷静に考えると
 *  結構すごいよねという話
 *
 *  そのすごい方法を「コンポジットパターン」と呼ぶ
 *
 *  なぜこのすごい方法が実現できているかというと、
 *  どちらも jQuery オブジェクトを返しているから。
 *
 */
console.log('item クラス');
console.dir(document.getElementsByClassName('item'));
console.dir($('.item'));


/**
 *  addClass の実際のコードはこちら
 *  https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/src/attributes.js#L27
 *
 *  こいつは単一でも複数でも適用出来るように jQuery の for ループを使って
 *  コレクションを繰り返し処理（イテレート）する実装になっています。
 *
 *  ※ jQuery.each(), iQuery.fn.each()
 *
 *  もう一回言うとこの方法を「コンポジットパターン」と呼ぶ
 *  もう一回言うとこの方法を「コンポジットパターン」と呼ぶ
 *
 */

/**
 *  2. 「アダプタパターン」
 *
 *  この勉強会でごちゃごちゃした言葉の説明で理解できたためしがないので
 *  まずは次のコードからご覧ください
 *
 *  （あっ、っていうかやばいこのやり方めっちゃ面倒くさいことが判明した）
 *
 */


