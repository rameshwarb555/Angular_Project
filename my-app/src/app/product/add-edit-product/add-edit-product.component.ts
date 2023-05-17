import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Product } from '../product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() productToUpdate: Product | undefined;
  productForm = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    description: [''],
    category: ['', Validators.required],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.productToUpdate) {
      this.productForm.patchValue(this.productToUpdate);
    }
  }

  closeModal(): void {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addProduct(): void {
    console.log(this.productForm.value);
    this.productService.saveProduct(this.productForm.value).subscribe(
      (response: any) => {
        this.clickAdd.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred while adding the product' });
        console.error('Error occurred while adding the product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.productForm.valid && this.productToUpdate) {
      const updatedProductData: Product = {
        id: this.productToUpdate.id,
        rating: this.productToUpdate.rating,
        title: this.productForm.value.title || '',
        price: this.productForm.value.price || 0,
        description: this.productForm.value.description || '',
        category: this.productForm.value.category || '',
        image: this.productForm.value.image || '',
      };

      this.productService.updateProduct(updatedProductData).subscribe(
        () => {
          console.log('Product updated successfully');
          this.clickUpdate.emit(); // Emit event to notify the parent component of the update
        },
        (error) => {
          console.error('Error occurred while updating the product:', error);
        }
      );
    } else {
      console.error('Invalid form or productToUpdate is undefined');
    }
  }
}
