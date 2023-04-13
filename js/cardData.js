"use strict";

export const cardClasses = {};

for(let i = 1; i <= 10; i++) {
  const cardClassName = `Card${i.toString().padStart(2, '0')}`;
  cardClasses[cardClassName] = cardClassName;
}

// console.log(cardClasses);

export class Card01 {
  constructor() {
    this.name = 第01のカード;
  }
}
export class Card02 {
  constructor() {
    this.name = 第02のカード;
  }
}
export class Card03 {
  constructor() {
    this.name = 第03のカード;
  }
}
export class Card04 {
  constructor() {
    this.name = 第04のカード;
  }
}
export class Card05 {
  constructor() {
    this.name = 第05のカード;
  }
}
export class Card06 {
  constructor() {
    this.name = 第06のカード;
  }
}
export class Card07 {
  constructor() {
    this.name = 第07のカード;
  }
}
export class Card08 {
  constructor() {
    this.name = 第08のカード;
  }
}
export class Card09 {
  constructor() {
    this.name = 第09のカード;
  }
}
export class Card010 {
  constructor() {
    this.name = 第10のカード;
  }
}

