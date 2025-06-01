
import { calculateCartTotal, validateCartItems } from '../services/cartService';
import type { ItemPriceAndRule } from '../models/items';
import type { CartItems } from '../models/items';


const itemsPricingConfig: Record<string, ItemPriceAndRule> = {
    Apple: { price: 35 },
    Banana: { price: 20 },
    Melons: { price: 50, rule: { type: "buyAndGetFree", buyCount: 1, freeCount: 1 } },
    Lemon: { price: 15, rule: { type: "buyAndGetFree", buyCount: 2, freeCount: 1 } }
};




// now write test cases without using jest.mock

// Test cases for cart pricing calculations

describe('Cart Pricing Tests', () => {
    // Test case for a simple cart with no rules
    it('should calculate total for a simple cart without rules', () => {
        const cartItems: CartItems = ['Apple', 'Banana'];
        const expectedTotal = itemsPricingConfig['Apple'].price + itemsPricingConfig['Banana'].price;
        expect(calculateCartTotal(cartItems)).toBe(expectedTotal);
    });

    // Test case for a cart with buy and get free rule
    it('should calculate total with buy and get free rule', () => {
        const cartItems: CartItems = ['Lemon', 'Lemon', 'Lemon']; // 3 oranges, buy 2 get 1 free
        const expectedTotal = itemsPricingConfig['Lemon'].price * 2; // pay for 2, get 1 free
        expect(calculateCartTotal(cartItems)).toBe(expectedTotal);
    });

    // Test case for an empty cart
    it('should return 0 for an empty cart', () => {
        const cartItems: CartItems = [];
        expect(calculateCartTotal(cartItems)).toBe(0);
    });

    // Test case for a cart with invalid item
    it('should throw error for invalid item in the cart', () => {
        const cartItems: CartItems = ['invalidItem'];
        expect(() => calculateCartTotal(cartItems)).toThrow('Error validating cart items');
    });

    // Test case for a cart with multiple items and rules
    it('should calculate total for a complex cart with multiple items and rules', () => {
        const cartItems: CartItems = ['Apple', 'Banana', 'Lemon', 'Lemon', 'Lemon', 'Melons', 'Melons']; // 3 lemons, 2 melons
        const expectedTotal =
            itemsPricingConfig['Apple'].price +
            itemsPricingConfig['Banana'].price +
            (itemsPricingConfig['Lemon'].price * 2) + // pay for 2 lemons, get 1 free
            (itemsPricingConfig['Melons'].price * 1); // pay for 1 melon, get 1 free
        expect(calculateCartTotal(cartItems)).toBe(expectedTotal);
    });

});