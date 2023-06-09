"use strict";

import * as data from './cardData.js';

const yourHands = document.getElementById("yourHands");

const deckAmount = document.getElementById("deckAmount");
const handAmount = document.getElementById("handAmount");
const trashAmount = document.getElementById("trashAmount");
const turnCounter = document.getElementById("turnCounter");

const drawButton = document.getElementById("drawButton");
const trashButton = document.getElementById("trashButton");
const endButton = document.getElementById("turnEndButton");
const startButton = document.getElementById("turnStartButton");

let domHands = [...document.querySelectorAll(".card")];

let turnCount = 0;
let turnPlayer = 1;

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

//現在の手札に合わせてカードの内容を更新する
function updateHands() {
  // console.log(domHands);
  domHands.forEach((e, index) => {
    e.textContent = hands[index];
  });
}

//DOM要素のカードを生成して手札に加える
function createDomCard() {
  const newCard = document.createElement("li");
  newCard.classList.add("card");
  newCard.textContent = "name";
  yourHands.appendChild(newCard);
  domHands = [...document.querySelectorAll(".card")];
  updateHands();
}
//DOM要素のカードを手札から削除してDOM要素も消す
function deleteDomCard() {
  yourHands.lastElementChild.remove();
  updateHands();
}

// デッキトップからカードをドローする
function drawCards(n) {
  if (n <= mainDeck.length) {
    for (let i = 0; i < n; i++) {
      hands.splice(hands.length, 0, ...(mainDeck.splice(0,1)))
      createDomCard()
    }
  }
  else
    if (0 === mainDeck.length) {
      mainDeck.splice(mainDeck.length, 0, ...trash.splice(0, trash.length));
      deckShuffle(mainDeck);
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, n)));
    }
    else {
      //ドロー数がデッキの残りより多い時は引ききってから墓地をデッキに戻してシャッフルする
      let x = n - mainDeck.length;
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, x)));
      mainDeck.splice(mainDeck.length, 0, ...trash.splice(0, trash.length));
      deckShuffle(mainDeck);
      console.log(`x=${x}`);
      hands.splice(hands.length, 0, ...(mainDeck.splice(0, n - x)));
    }
  countAmount();
}

// 左からn番目の手札を捨てる
function toTrash(n) {
  if (hands.length > 0) {
    trash.splice(trash.length, 0, ...(trash.splice(0, trash.length - 1, ...hands.splice(n, 1))));
  }
  deleteDomCard();
  countAmount();
}

//いろんな数値の表示を現在のものに更新
function countAmount() {
  turnCounter.textContent = `TURN:${turnCount.toString().padStart(2, 0)}`;
  deckAmount.textContent = `DECK:${mainDeck.length.toString().padStart(2, 0)}`;
  handAmount.textContent = `HANDS:${hands.length.toString().padStart(2, 0)}`;
  trashAmount.textContent = `TRASH:${trash.length.toString().padStart(2, 0)}`;
  console.log(`デッキ内容[${mainDeck}]`);
  console.log(`手札[${hands}]`);
  console.log(`墓地[${trash}]`);
  console.log(`経過ターン[${turnCount}]`);
}

function turnEnd() {
  //エンド時に手札が5枚になるようにする処理
  if (hands.length > 5) {
    for (let n = hands.length - 5; n > 0; n--) {
      toTrash(1);
    }
  }
  turnPlayer = 1;
}
function turnStart() {
  turnPlayer = 0;
  turnCount++;
  drawCards(1);
}

drawButton.addEventListener('click', () => {
  drawCards(1);
});
trashButton.addEventListener('click', () => {
  toTrash(0);
});
endButton.addEventListener('click', () => {
  if (turnPlayer === 0) {
    turnEnd();
  }
});
startButton.addEventListener('click', () => {
  if (turnPlayer === 1) {
    turnStart();
  }
});

console.log(`デッキ内容[${mainDeck}]`);
deckShuffle(mainDeck);
console.log(`最終シャッフル後のデッキ内容[${mainDeck}]`);
drawCards(3);
console.log(`初手[${hands}]`);

countAmount();