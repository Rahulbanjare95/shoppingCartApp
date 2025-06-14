import type { CartItems } from '../models/items';
import { PricingConfig } from '../config/itemsPricingConfig';

export class CartValidator {
  static validate(cartItems: CartItems): void {
    for (const item of cartItems) {
      if (typeof item !== 'string' || !item.trim() || item === 'undefined' || item === null) {
        throw new Error(`Invalid cart item: ${item}`);
      }
      if (!PricingConfig.getPricing(item)) {
        throw new Error(`Item ${item} is not valid.`);
      }
    }
  }
}
