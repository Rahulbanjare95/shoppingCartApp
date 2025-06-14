import type { PricingRule } from '../models/items';

export class BuyAndGetFreeRule {
  private buyCount: number;
  private freeCount: number;

  constructor(rule: PricingRule) {
    if (rule.type !== 'buyAndGetFree') {
      throw new Error(`Unsupported rule type: ${rule.type}`);
    }

    this.buyCount = rule.buyCount;
    this.freeCount = rule.freeCount;
  }

  calculateEffectiveCount(itemCount: number): number {
    const groupSize = this.buyCount + this.freeCount;
    const fullGroups = Math.floor(itemCount / groupSize);
    const remainingItems = itemCount % groupSize;
    return fullGroups * this.buyCount + remainingItems;
  }
}
