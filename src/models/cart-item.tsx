class CartItem {
  productId: string;
  quantity: number;
  productPrice: number;
  productTitle: string;
  sum: number;

  constructor(
    productId: string,
    quantity: number,
    productPrice: number,
    productTitle: string,
    sum: number
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
