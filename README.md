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
あまり jQuery Plugin を書くことはなさそうですが、読んでいて「あぁ、 Chrome Extension に使えそう」と思いました。

なぜなら「js プラグインのお作法」として次のような共通点があるからです。

* グローバル変数を汚染しない
* window や document をローカル変数として扱う
 * 参照を高速化できる
 * 効率よくミニファイできる
* 複数のインスタンスが生成されることを防止するような機構を導入する
  

こういった工夫をすることで、疎結合で開発も素早く動作も素早い js plugin を書けると思います。

もちろん、仕事でも、一から何かを作るような機会があるならばこういった書き方は
めちゃくちゃ参考になると思いますし、既存のコードでも汎用的な処理を切り出せそうだなと
思えば js plugin にしてしまってもいいかもしれません。

一点だけ jQuery Plugin を作る際のお作法を見てみましょう。

```javascript
(function ($) {
  $.fn.myPluginName = function () {
    // ここにプラグインのロジックを書く
  };
})(jQuery);
```

これが分かるとコードリーディングや自分がプラグインを利用する側に回った時に（このケースは多そうですね）
困らずに済むと思います。
例えば ```jQuery.noConflict()``` がどこかで呼ばれていて、
「いろいろプラグインを入れていたら $ が使えなくなってしまった。jQuery は使えるんだけど」という場合に
おちいったときも、上記のような書き方をすれば `$` が使えますし、グローバル変数を汚染せずに機能を作りこんでいけます。

では以上です。
詳しくはプラグインを書きたいと思った時にコード例を読んでしまうのが手っ取り早いと思います。



まとめ
---

ともかく今回は jQuery を例にすることで
「あー、あの使ったことのあるやつじゃん」って身近に感じることができたんじゃないかと思います。

今後は「えー？ オブザーバパターンってなんですか＞＜」って聞かれても、
「ほら jQuery に .on とか .trigger とかあるじゃん？」とかっておもむろに説明を始めればいいのではないでしょうか。

最後に、デザパタは訳せば怖くないのではないかという説を提唱をして終わりたいと思います。

* 単複混成方式（コンポジットパターン）
* 仕様差異吸収方式（アダプタパターン）
* 単純に使えるようにする（ファサード）
* 発行者・購読者型方式（オブザーバパターン）
* 繰り返し処理方式（イテレータパターン）
* 遅延初期化
* 中継処理方式（プロキシパターン）
* お手軽作成方式（ビルダーパターン）



感想
---
デザパタってやたら格好良い名前が付けられていて初心者をビビらせてよくないですね。
とはいえ「ファサードっぽく」とか言えば通じるっていうのは便利ではあるので、使っちゃうでしょうね。
