js_design_patterns
==================

『[JavaScriptデザインパターン](http://www.amazon.co.jp/gp/product/487311618X/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=487311618X&linkCode=as2&tag=m0b55-22)』 5章 5.1 (p.183) 〜 6章 6.6 (p.214)


5章
---
5章の内容はみんな見たことのあるコードがでてくると思うので
「あぁ、この書き方にはこんな名前がついていたんだなぁ」という気持ちで聞いてください

内容は「jQuery に学ぶデザインパターンの秘訣」みたいなもんです。
もしくは「ここまで学んできた内容は jQuery ではどうなってんだよ」みたいなもんです。

5章のテキストは js のコードにしたので下記URLにあります。

* https://github.com/ymkjp/js_design_patterns/blob/master/app.js
* https://dl.dropboxusercontent.com/u/6998388/js_design_patterns/index.html



6章
---
6章の内容は言ってみれば 「jQuery Plugin の書き方講座」です。
僕は jQuery Plugin を書く予定も書きたいとも思わないのですが、
読んでいて「あぁ、 Chrome Extension に使えそう」と思いました。

ここで紹介されいる内容を活かして Chrome Extension を書くと結構良い感じに書けます。

なぜなら「js プラグインのお作法」として次のような共通点があるからです。

* グローバル変数を汚染しない
* window や document をローカル変数として扱う
 * 参照を高速化できる
 * 効率よくミニファイできる
* 複数のインスタンスが生成されることを防止するような機構を導入する
  

こういった工夫をすることで、疎結合で開発も素早く動作も素早い Chrome Extension を書けると思います。

もちろん、 Chrome Extension でなく仕事でも、一から何かを作るような機会があるならばこういった書き方は
めちゃくちゃ参考になると思いますし、既存のコードでも汎用的な処理を切り出せそうだなと
思えば jQuery Plugin にしてしまってもいいかもしれません。

このままでは終わるとあまりに jQuery Plugin を軽視しているので一点だけコードを紹介します。

```javascript
(function ($) {
  $.fn.myPluginName = function () {
    // ここにプラグインのロジックを書く
  };
})(jQuery);
```

はい、既存の jQuery Plugin のコードを読むとこういった書き方はよく見ますね。
これが分かるとコードリーディングや自分がプラグインを利用する側に回った時に（このケースは多そうですね）
困らずに済むと思います。
例えば ```jQuery.noConflict()``` がどこかで呼ばれていて、
「いろいろプラグインを入れていたら $ が使えなくなってしまった。jQuery は使えるんだけど」という場合に
おちいったときも、上記のような書き方をすれば救われますね。

では以上です。
詳しくはプラグインを書きたいと思った時にコード例を読んでしまうのが手っ取り早いと思います。



感想
---
デザパタってやたら格好良い名前が付けられていて初心者をビビらせてよくないですね。
とはいえ「ファサードっぽく」とか言えば通じるっていうのは便利ではあるので、使っちゃうでしょうね。

最後に、デザパタは訳せば怖くないのではないかという説を提唱をして終わりたいと思います。

* 単複混成方式（コンポジットパターン）
* 仕様差異吸収方式（アダプタパターン）
* 単純に使えるようにする（ファサード）
* 発行者・購読者型方式（オブザーバパターン）
* 繰り返し処理方式（イテレータパターン）
* 遅延初期化
* 中継方式（プロキシパターン）
* お手軽作成方式（ビルダーパターン）

個人的には「パターン」は「お作法」っていう訳語が適していると感じることもあります。



まとめ
---

ともかく今回は jQuery を例にすることで
「あー、あの使ったことのあるやつじゃん」って身近に感じることができたんじゃないかと思います。

今後は「えー、オブザーバパターンってなんですか＞＜」って聞かれても、
「ほら jQuery に .on とか .trigger とかあるじゃん？」とかっておもむろに説明を始めればいいのではないでしょうか。

