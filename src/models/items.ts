export type PricingRule = {
  type: "buyAndGetFree";
  buyCount: number;
  freeCount: number;
}

export type ItemPriceAndRule = {
  price: number;
  rule?: PricingRule;
}

export type CartItems = string[];