import { CartValidator } from './CartValidator';
import { PricingConfig } from '../config/itemsPricingConfig';
import { BuyAndGetFreeRule } from './BuyAndGetFreeRule';
import type { CartItems, ItemPriceAndRule } from '../models/items';

export class CartCalculator {
  constructor(private cartItems: CartItems) {
    CartValidator.validate(cartItems);
  }

  private getItemCounts(): Record<string, number> {
    return this.cartItems.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  public calculateTotal(): number {
    const itemCounts = this.getItemCounts();
    let total = 0;

    for (const [item, count] of Object.entries(itemCounts)) {
      const config: ItemPriceAndRule | undefined = PricingConfig.getPricing(item);
      if (!config) throw new Error(`Missing pricing for ${item}`);

      const { price, rule } = config;
      let effectiveCount = count;

      if (rule?.type === 'buyAndGetFree') {
        const ruleEngine = new BuyAndGetFreeRule(rule);
        effectiveCount = ruleEngine.calculateEffectiveCount(count);
      }

      total += effectiveCount * price;
    }

    return total;
  }
}
