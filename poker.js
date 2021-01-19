const pokerFuncs = [
  (royalFlush = (hand) =>
    doesHandHaveRoyalInARow(hand) && doesHandHaveSameSuits(hand)
      ? pokerHands.royalFlush
      : null),
  (straightFlush = (hand) =>
    doesHandHaveCardsInARow(hand) && doesHandHaveSameSuits(hand)
      ? pokerHands.straightFlush
      : null),
  (fourOfAKind = (hand) =>
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([4])
      ? pokerHands.fourOfAKind
      : null),
  (fullHouse = (hand) =>
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([2, 3]) ||
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([3, 2])
      ? pokerHands.fullHouse
      : null),
  (flush = (hand) => (doesHandHaveSameSuits(hand) ? pokerHands.flush : null)),
  (straight = (hand) =>
    doesHandHaveCardsInARow(hand) ? pokerHands.straigth : null),
  (threeOfAKind = (hand) =>
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([3])
      ? pokerHands.threeOfAKind
      : null),
  (twoPairs = (hand) =>
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([2, 2])
      ? pokerHands.twoPairs
      : null),
  (pair = (hand) =>
    getValueOfArray(repeatingCards(hand)) === getValueOfArray([2])
      ? pokerHands.pair
      : null),
  (highCard = (hand) => pokerHands.highCard),
];

const pokerHands = {
  highCard: 0,
  pair: 1,
  twoPairs: 2,
  threeOfAKind: 3,
  straigth: 4,
  flush: 5,
  fullHouse: 6,
  fourOfAKind: 7,
  straightFlush: 8,
  royalFlush: 9,
};

const pokerValues = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const queue = 'A23456789TJQKA';

function getValueOfArray(value) {
  return JSON.stringify(value);
}

getCardValues = (hand) => {
  return hand.split(' ').map((item) => item.charAt(0));
};

getCardCharacters = (hand) => {
  return hand.split(' ').map((item) => item.charAt(1));
};

function repeatingCards(hand) {
  let filteredHand = this.getCardValues(hand);
  let repeats = [];

  filteredHand.map((value) => {
    repeatingItems = filteredHand.filter((item) => item === value).length;

    filteredHand = filteredHand.filter((item) => item !== value);

    if (repeatingItems > 1) {
      repeats.push(repeatingItems);
    }
  });

  return repeats;
}

function doesHandHaveSameSuits(hand) {
  let filteredHand = this.getCardCharacters(hand);

  return filteredHand.filter((item) => item === filteredHand[0]).length === 5;
}

function doesHandHaveRoyalInARow(hand) {
  let cardsInARow = sortCards(hand);
  return (
    cardsInARow &&
    queue.includes(cardsInARow.join('')) &&
    cardsInARow[0] === 'T'
  );
}

function doesHandHaveCardsInARow(hand) {
  let cardsInARow = sortCards(hand);
  return cardsInARow && queue.includes(cardsInARow.join(''));
}

function sortCards(hand) {
  return getCardValues(hand).sort((a, b) => {
    if (pokerValues[a]) {
      a = pokerValues[a];
    }
    if (pokerValues[b]) {
      b = pokerValues[b];
    }

    return +a - +b;
  });
}

function compareHands(hand1, hand2) {
  let one = getRankOfHand(hand1);
  let two = getRankOfHand(hand2);

  if (one > two) return 1;
  if (two > one) return -1;
  return compareSimilarHands(hand1, hand2);
}

function getRankOfHand(hand) {
  for (let i = 0; i < pokerFuncs.length; i++) {
    let rank = pokerFuncs[i].call(this, hand);

    if (rank) {
      return rank;
    }
  }
}

function compareSimilarHands(hand1, hand2) {
  let filteredHand1 = convertCards(sortCards(hand1));
  let filteredHand2 = convertCards(sortCards(hand2));

  for (let i = 4; i >= 0; i--) {
    if (filteredHand1[i] > filteredHand2[i]) return 1;
    if (filteredHand2[i] > filteredHand1[i]) return -1;
  }

  return 0;
}

function convertCards(cards) {
  return cards.map((item) => (pokerValues[item] ? pokerValues[item] : item));
}

// export {compareHands, getRankOfHand, doesHandHaveSameSuits, doesHandHaveCardsInARow, repeatingCards, pokerHands}
module.exports = {
  compareHands,
  getRankOfHand,
  doesHandHaveSameSuits,
  doesHandHaveCardsInARow,
  repeatingCards,
  pokerHands,
};
