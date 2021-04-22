export default class Product {
  id: string;
  userId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(
    id: string,
    userId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}
