import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProductFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Proszę podać ${this.label}.`);
            break;
          case 'minlength':
            messages.push(
              `Wymagane jest mininum ${this.errors['minlength'].requiredLength} znaków`
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
export class ProductFormGroup extends FormGroup {
  constructor() {
    super({
      name: new ProductFormControl('Produkt', 'name', '', Validators.required),
      category: new ProductFormControl(
        'Kategoria',
        'category',
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z ]+$'),
          Validators.minLength(3),
          Validators.maxLength(10),
        ])
      ),
      price: new ProductFormControl(
        'Cena',
        'price',
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9.]+$'),
        ])
      ),
    });
  }
  get productControl(): ProductFormControl[] {
    return Object.keys(this.controls).map(
      (k) => this.controls[k] as ProductFormControl
    );
  }
  getValidationMessages(name: string): string[] {}

  getFormValidationMessages(): string[] {}
}
