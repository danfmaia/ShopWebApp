import { IAuthState } from "./auth/auth-interfaces";
import { ICartState } from "./cart/cart-interfaces";
import { IProductState } from "./product/product-interfaces";

export default interface IAppState {
  auth: IAuthState;
  products: IProductState;
  cart: ICartState;
  // user: IUserState;
  // categories: ICategoryState;
  // events: IEventState;
}