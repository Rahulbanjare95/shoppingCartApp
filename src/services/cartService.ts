import type { ItemPriceAndRule } from '../models/items';
import itemsPricingConfig from '../config/itemsPricingConfig';
import type { CartItems } from '../models/items';

function validateCartItems(cartItems: CartItems): void {
    // Check if all items in the cart are valid
    for (const item of cartItems) {
      
        if (!itemsPricingConfig[item]) {
            throw new Error(`Item ${item} is not valid.`);
        }
        if (typeof item !== 'string') {
            throw new Error(`Item ${item} is not a string.`);
        }
        if (item.trim() === '') {
        
            throw new Error(`Item ${item} is an empty string.`);
        }
        if(item === 'undefined' || item === null){
            throw new Error(`Item ${item} is undefined or null.`);
        }
    }

}

function calculateCartTotal(cartItems: CartItems): number {
    try {
        // Validate cart items before processing
        validateCartItems(cartItems);
        const itemCounts: Record<string, number> = {};
         // Count occurrences of each item in the cart
   
    for (const item of cartItems) {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    }

    let total = 0;

    for (const [item, count] of Object.entries(itemCounts)) {

        const itemConfig: ItemPriceAndRule = itemsPricingConfig[item];
        console.log(`Calculating total for item: ${item}, count: ${count}, config:`, itemConfig);
        if (!itemConfig) {
            throw new Error(`Item ${item} not found in pricing configuration`);
        }
        else{
            const { price, rule } = itemConfig;
            let itemCount = count;
            let effectiveCount;
            if (rule) {
                const { type, buyCount, freeCount } = rule;
                if (type === "buyAndGetFree") {
                    // Calculate effective count based on buy and get free rule
                    const sets = Math.floor(itemCount / (buyCount + freeCount));
                    effectiveCount = sets * buyCount  + (itemCount % (buyCount + freeCount));
                    console.log(`Effective count after applying rule: ${effectiveCount}`);
                    console.log(`Price for item ${item}: ${price}`);

                    total += effectiveCount * price;
                }
            }else {
                // If no rule, just multiply by the price
                total += count * price;
            }
          

        }
    }

    

    return total;
    }
    catch (error: any) {
       // throw new error it has catched
        throw new Error(`Error validating cart items: ${error.message}`);
    }

}

//test the function
const testCart: CartItems = ['Apple','Banana', 'Lemon','Lemon','Lemon', 'Lemon', 'Lemon','Lemon', 'Apple'];
//Apple:70, Banana : 20, Melons: 50, Lemon: 30  ; 170
const total = calculateCartTotal(testCart);
console.log(`Total for cart ${testCart.join(', ')}: ${total}`); // Expected output: 155

export {
    calculateCartTotal,
    validateCartItems
};
