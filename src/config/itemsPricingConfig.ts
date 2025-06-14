import type { ItemPriceAndRule } from '../models/items';

export class PricingConfig {
  private static config: Record<string, ItemPriceAndRule> = {
    Apple: { price: 35 },
    Banana: { price: 20 },
    Melons: {
      price: 50,
      rule: { type: "buyAndGetFree", buyCount: 1, freeCount: 1 }
    },
    Lemon: {
      price: 15,
      rule: { type: "buyAndGetFree", buyCount: 2, freeCount: 1 }
    }
  };

  static getPricing(itemName: string): ItemPriceAndRule | undefined {
    return this.config[itemName];
  }

  static getAllPricing(): Record<string, ItemPriceAndRule> {
    return this.config;
  }
}
