import { Product } from './product.model';
import { SimpleDataSource } from './datasource.model';

export class Model {
  private dataSource: SimpleDataSource;
  private products: Product[];
  private locator = (p: Product, id: number) => p.id == id;

  constructor() {
    this.dataSource = new SimpleDataSource();
    this.products = new Array<Product>();
    this.dataSource.getData().forEach((p) => this.products.push(p));
  }
  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find((p) => this.locator(p, id));
  }

  private generateID(): number {
    let candidate = 10;
    while (this.getProduct(candidate) != null) {
      candidate++;
    }
    return candidate;
  }

  swapProduct() {
    let p = this.products.shift();
    this.products.push(new Product(p.id, p.name, p.category, p.price));
  }

}
