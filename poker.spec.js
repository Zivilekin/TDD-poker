const { it, expect, describe } = require('@jest/globals');
const {compareHands, getRankOfHand, doesHandHaveSameSuits, doesHandHaveCardsInARow, repeatingCards, pokerHands} = require('./poker');
// import {compareHands, getRankOfHand, doesHandHaveSameSuits, doesHandHaveCardsInARow, repeatingCards, pokerHands} from './poker';


describe('helper functions', () => {
    describe('doesHandHaveSameSuits function', () => {
        it('should return true when all the cards have same suit', () => {
            expect(doesHandHaveSameSuits('2H 3H 5H 6H 7H')).toBe(true);
        });

        it('should return false when all the cards does not have same suit', () => {
            expect(doesHandHaveSameSuits('2H 3H 4H 6S 7H')).toBe(false);
        });
    });

    describe('doesHandHaveCardsInARow', () => {
        it('should return true when all the cards in the hand are in a row', () => {
            expect(doesHandHaveCardsInARow('2H 3H 4H 5H 6H')).toBe(true);
        });

        it('should return false when all the cards in the hand are not in a row', () => {
            expect(doesHandHaveCardsInARow('2H 7H 4H 5H 6H')).toBe(false);
        });
    });

    describe('repeatingCards', () => {
        it('should return [2] when a hand has a pair', () => {
            expect(repeatingCards('2S 5H 2H 3S 4C')).toEqual([2]);
        });
    
        it('should return [2, 2] when a hand has two pairs', () => {
            expect(repeatingCards('2S 5H 2H 3S 5C')).toEqual([2, 2]);
        });
    
        it('should return [2, 3] when a hand has a pair and three of a kind', () => {
            expect(repeatingCards('2S AH 2H AS AC')).toEqual([2,3] || [3,2]);
        });
    
        it('should return [3] when a hand has three of a kind', () => {
            expect(repeatingCards('2S 5H 2H 3S 2C')).toEqual([3]);
        });
    
        it('should return [4] when a hand has four of a kind', () => {
            expect(repeatingCards('JS JD JC JH AD')).toEqual([4]);
        });
    
        it('should return an empty array when a hand doesn not have repeating cards', () => {
            expect(repeatingCards('2H 3H 4H 5H 6H')).toEqual([]);
        });
    });
});

describe('function getRankOfHand', () => {
    it('should return pair when a hand has a pair', () => {
        expect(getRankOfHand('3D 4C 5H 6H 3S')).toBe(pokerHands.pair);
    });

    it('should return flush when a hand has 5 same cards', () => {
        expect(getRankOfHand('2H 3H 5H 6H 7H')).toBe(pokerHands.flush);
    });
});

describe('function compareHands', () => {
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('2H 3H 4H 5H 6H', 'AS AD AC AH JD')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('AS AH 2H AD AC', 'JS JD JC JH 3D')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('2S AH 2H AS AC', '2H 3H 5H 6H 7H')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('AS 3S 4S 8S 2S', '2H 3H 5H 6H 7H')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('2H 3H 5H 6H 7H', '2S 3H 4H 5S 6C')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('2S 3H 4H 5S 6C', 'AH AC 5H 6H AS')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('2S 2H 4H 5S 4C', 'AH AC 5H 6H 7S')).toBe(1);
    });
    it('should return 1 when first hand has a higher rank', () => {
        expect(compareHands('4S 5H 6H TS AC', '3S 5H 6H TS AC')).toBe(1);
    });

    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('2H 3H 4H 5H 6H', 'KS AS TS QS JS')).toBe(-1);
    });
    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('2S AH 2H AS AC', 'JS JD JC JH AD')).toBe(-1);
    });
    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('2S 2H 4H 5S 4C', 'AH AC 5H 6H AS')).toBe(-1);
    });
    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('6S AD 7H 4S AS', 'AH AC 5H 6H 7S')).toBe(-1);
    });
    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('2S AH 4H 5S KC', 'AH AC 5H 6H 7S')).toBe(-1);
    });
    it('should return -1 when second hand has a higher rank', () => {
        expect(compareHands('2S 3H 6H 7S 9C', '7H 3C TH 6H 9S')).toBe(-1);
    });

    it('should return 0 when both hands have the same rank', () => {
        expect(compareHands('2S 3H 4H 5S 6C', '3D 4C 5H 6H 2S')).toBe(0);
    });
    it('should return 0 when both hands have the same rank', () => {
        expect(compareHands('2S AH 4H 5S 6C', 'AD 4C 5H 6H 2C')).toBe(0);
    });
});
