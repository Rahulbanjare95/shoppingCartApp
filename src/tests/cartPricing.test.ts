import { CartCalculator } from '../services/CartCalculator';
import type { ItemPriceAndRule, CartItems } from '../models/items';



const itemsPricingConfig: Record<string, ItemPriceAndRule> = {
    Apple: { price: 35 },
    Banana: { price: 20 },
    Melons: { price: 50, rule: { type: "buyAndGetFree", buyCount: 1, freeCount: 1 } },
    Lemon: { price: 15, rule: { type: "buyAndGetFree", buyCount: 2, freeCount: 1 } }
};




// now write test cases without using jest.mock

// Test cases for cart pricing calculations

describe('Cart Pricing Tests', () => {

    it('should calculate total for a simple cart without rules', () => {
        const cartItems: CartItems = ['Apple', 'Banana'];
        const expectedTotal = itemsPricingConfig['Apple'].price + itemsPricingConfig['Banana'].price;
        const calculator = new CartCalculator(cartItems);
        expect(calculator.calculateTotal()).toBe(expectedTotal);
    });

    it('should calculate total with buy and get free rule', () => {
        const cartItems: CartItems = ['Lemon', 'Lemon', 'Lemon']; // buy 2 get 1 free
        const expectedTotal = itemsPricingConfig['Lemon'].price * 2;
        const calculator = new CartCalculator(cartItems);
        expect(calculator.calculateTotal()).toBe(expectedTotal);
    });

    it('should return 0 for an empty cart', () => {
        const cartItems: CartItems = [];
        const calculator = new CartCalculator(cartItems);
        expect(calculator.calculateTotal()).toBe(0);
    });

    it('should throw error for invalid item in the cart', () => {
        const cartItems: CartItems = ['invalidItem'];
        expect(() => new CartCalculator(cartItems)).toThrow('Item invalidItem is not valid.');
    });

    it('should calculate total for a complex cart with multiple items and rules', () => {
        const cartItems: CartItems = [
            'Apple', 'Banana', 'Lemon', 'Lemon', 'Lemon', 'Melons', 'Melons'
        ]; // 3 lemons (pay for 2), 2 melons (pay for 1)
        const expectedTotal =
            itemsPricingConfig['Apple'].price +
            itemsPricingConfig['Banana'].price +
            itemsPricingConfig['Lemon'].price * 2 +
            itemsPricingConfig['Melons'].price * 1;
        const calculator = new CartCalculator(cartItems);
        expect(calculator.calculateTotal()).toBe(expectedTotal);
    });

});