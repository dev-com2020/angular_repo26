import { ApplicationRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './product.model';
import { Model } from './repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  model: Model = new Model();

  constructor(ref: ApplicationRef) {
    (<any>window).appRef = ref;
    (<any>window).model = this.model;
  }

  formSubmitted: boolean = false;

  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addProduct(this.newProduct);
      this.newProduct = new Product();
      form.reset();
      this.formSubmitted = false;
    }
  }

  getProductByPosition(position: number): Product {
    return this.model.getProducts()[position];
  }

  getClasses(position: number): string {
    let product = this.getProductByPosition(position);
    return 'p-2 ' + (product.price < 50 ? 'bg-info' : 'bg-warning');
  }

  getClassMap(key: number): Object {
    let product = this.model.getProduct(key);
    return {
      'text-center bg-danger': product.name == 'Kajak',
      'bg-info': product.price < 50,
    };
  }

  getStyles(key: number) {
    let product = this.model.getProduct(key);
    return {
      fontSize: '30px',
      'margin.px': 100,
      color: product.price > 50 ? 'red' : 'green',
    };
  }

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }
  getProducts(): Product[] {
    return this.model.getProducts();
  }

  getProductCount(): number {
    return this.getProducts().length;
  }

  getKey(index: number, product: Product) {
    return product.id;
  }

  getProductPrice(index: number): number {
    return Math.floor(this.getProduct(index).price);
  }

  getSelected(product: Product): boolean {
    return product.name == this.selectedProduct;
  }

  targetName: string = 'Kajak';
  selectedProduct: string;
  fontSizeWithUnits: string = '30px';
  fontSizeWithoutUnits: string = '30';
  newProduct: Product = new Product();

  get jsonProduct() {
    return JSON.stringify(this.newProduct);
  }

  addProduct(p: Product) {
    console.log('nowy produkt: ' + this.jsonProduct);
  }

  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Proszę podać ${thing}.`);
            break;
          case 'minlength':
            messages.push(
              `Wymagane jest mininum ${state.errors['minlength'].requiredLength} znaków`
            );
            break;
          case 'pattern':
            messages.push(`Wprowadzono niedowzolone znaki`);
            break;
        }
      }
    }
    return messages;
  }
}
