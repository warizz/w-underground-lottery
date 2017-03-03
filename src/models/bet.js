export default class Bet {
  constructor(id, username, number, price1, price2, price3, createdAt, period, paid) {
    this.id = id;
    this.username = username;
    this.number = number;
    this.price1 = price1;
    this.price2 = price2;
    this.price3 = price3;
    this.createdAt = createdAt;
    this.period = period;
    this.paid = paid;
  }
}
