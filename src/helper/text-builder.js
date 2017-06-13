export default class TextBuilder {
  static buildTicketSummary(number, price1, price2, price3) {
    let result;
    // generate label for each prices
    let price1Label;
    let price2Label;
    const price3Label = ' ล่าง ';
    if (number.length === 3) {
      price1Label = ' เต็ง ';
      price2Label = ' โต๊ด ';
    } else {
      price1Label = ' บน ';
      price2Label = ' ล่าง ';
    }

    // generate label for each bet number
    result = `${number} =`;
    if (price1) {
      result += `${price1Label}${price1}`;
    }
    if (price2) {
      result += `${price2Label}${price2}`;
    }
    if (price3) {
      result += `${price3Label}${price3}`;
    }

    return result;
  }
}
