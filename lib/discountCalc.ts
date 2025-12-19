export function discountCalc(price: number, discount: number): {newPrice:number, discountPercentage:number} {
    // calc discount by discount percentage
    const NEW_PRICE = +(price - discount).toFixed(2)
    // discount percentage
    const DISCOUNT_PERCENTAGE = (discount / price * 100).toFixed(0) as unknown as number;
    // if discount is not exist return price without discount else return new price with discount
    return {newPrice:NEW_PRICE, discountPercentage:DISCOUNT_PERCENTAGE}
}