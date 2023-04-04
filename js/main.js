"use strict"
{
  // const firstDeck = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3,];
  const firstDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let mainDeck = [...firstDeck];
  let trash = [];
  let hands = [];

  // デッキをシャッフルする
  function deckShuffle(deck) {
    console.log('シャッフル');
    for (let i = deck.length; i >= 2; i--) {

      let m = Math.floor(Math.random() * i);
      let n = deck[i - 1];
      let o = deck[m];

      deck[i - 1] = o;
      deck[m] = n;

      // console.log(`最後の数：${i - 1}`);
      // console.log(`ランダムな内側の数：${m}`);
      // console.log(`シャッフル後のデッキ内容[${mainDeck}]`);
    }
  }

  // デッキトップからカードをドローする
  function drawCards(n) {
    if (n < mainDeck.length) {
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, n)))
    } else {
      //ドロー数がデッキの残りより多い時は引ききってから墓地をデッキに戻してシャッフルする
      let x = n - mainDeck.length;
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, x)));
      mainDeck.splice(mainDeck.length, 0, ...trash);
      deckShuffle(mainDeck);
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, n - x)));
    }
  }

  // 手札を左からｎ枚捨てる
  function toTrash(n) {
    trash.splice(trash.length, 0, ...(trash.splice(0, trash.length - 1,...hands.splice(0,n))));
  }


  console.log(`デッキ内容[${mainDeck}]`);
  deckShuffle(mainDeck);
  console.log(`最終シャッフル後のデッキ内容[${mainDeck}]`);
  drawCards(3);
  console.log(`初手[${hands}]`);

}