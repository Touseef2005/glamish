export const calculateTotal = (cartItems) => {
    return Number(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
}

export const calculateShippingCost = (cartItems) => {
    if (cartItems.length === 0) return 0;
    return 0 + (cartItems.length - 1) * 0;
};
