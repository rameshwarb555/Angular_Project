// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ProductService } from '../product.service';
// import { MessageService } from 'primeng/api';
// import { Product } from '../product';



// @Component({
//   selector: 'app-update-product',
//   templateUrl: './update-product.component.component.html',
//   styleUrls: ['./update-product.component.component.css'],
// })

// export class UpdateProductComponentComponent {
//   @Input() displayUpdateModal: boolean = true;
//   @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
//   @Output() clickUpdate: EventEmitter<any> = new EventEmitter<any>();
//   @Input() productToUpdate: Product | undefined;// Input property to pass the product data for updating
//   visible: boolean = false;
//   selectedProduct!: Product;
// productForm: any;


//   updateProductFormGroup = this.fb.group({
//     title: ['', Validators.required],
//     price: [0, Validators.required],
//     description: [''],
//     category: ['', Validators.required],
//     image: ['', Validators.required],
//   });


  
//   constructor(
//     private fb: FormBuilder,
//     private productService: ProductService,
//     private messageService: MessageService
//   ) {}

//   ngOnInit(): void {
//     // Set initial values of the form if productToUpdate is provided
//     if (this.productToUpdate) {
//       this.updateProductFormGroup.patchValue(this.productToUpdate);
//     }
//   }

//   closeModal() {
//     this.updateProductFormGroup.reset();
//     this.clickClose.emit(true);
//   }

//  getPoduct(){
//   return this.updateProductFormGroup.value;
//   return this.productToUpdate?.id
//  }

//  updateProduct() {
//   if (this.updateProductFormGroup.valid) {
//     if (this.productToUpdate) {
//       const updatedProductData: Product = {
//         id: this.productToUpdate.id,
//         rating: this.productToUpdate.rating,
//         title: this.updateProductFormGroup.value.title || '',
//         price: this.updateProductFormGroup.value.price || 0,
//         description: this.updateProductFormGroup.value.description || '',
//         category: this.updateProductFormGroup.value.category || '',
//         image: this.updateProductFormGroup.value.image || '',
//       };

//       this.productService.updateProduct(updatedProductData).subscribe(
//         (response) => {
//           console.log('Product updated successfully:', response);
//           this.clickUpdate.emit(); // Emit event to notify the parent component of the update
//           this.closeUpdateModal(); // Close the update modal
//         },
//         (error) => {
//           console.error('Error occurred while updating the product:', error);
//         }
//       );
//     } else {
//       console.error('productToUpdate is undefined');
//     }
//   }
// }








//   closeUpdateModal(){
//     this.updateProductFormGroup.reset();
//     this.clickClose.emit(true);
//   }

  

// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../product.service';
// import { Product } from '../product';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-update-product',
//   templateUrl: './update-product.component.component.html',
//   styleUrls: ['./update-product.component.component.css'],
// })
// export class UpdateProductComponent implements OnInit {
//   updateProductFormGroup: FormGroup;
//   productToUpdate: Product | number | undefined ;
//   updateSuccess: boolean = false;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) {
//     this.updateProductFormGroup = this.fb.group({
//       title: ['', Validators.required],
//       price: [0, Validators.required],
//       description: [''],
//       category: ['', Validators.required],
//       image: ['', Validators.required],
//     });    
//   }

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     this.fetchProductData(productId);
//   }

//   fetchProductData(productId: any): void {
//     this.productService['getProduct'](productId).subscribe(
//       (response: any) => {
//         this.productToUpdate = response;
//         this.updateProductFormGroup.patchValue(this.productToUpdate);
//       },
//       (error: any) => {
//         console.error('Error occurred while retrieving the product:', error);
//       }
//     );
//   }

//   updateProduct(): void {
//     if (this.updateProductFormGroup.valid && this.productToUpdate) {
//       const updatedProductData: Product = {
//         id: this.productToUpdate.id,
//         rating: this.productToUpdate.rating,
//         title: this.updateProductFormGroup.value.title || '',
//         price: this.updateProductFormGroup.value.price || 0,
//         description: this.updateProductFormGroup.value.description || '',
//         category: this.updateProductFormGroup.value.category || '',
//         image: this.updateProductFormGroup.value.image || '',
//       };

//       this.productService.updateProduct(updatedProductData).subscribe(
//         () => {
//           console.log('Product updated successfully');
//           // Optionally, you can navigate to the product list or show a success message
//         },
//         (error) => {
//           console.error('Error occurred while updating the product:', error);
//           // Optionally, you can show an error message
//         }
//       );
//     } else {
//       console.error('Invalid form or productToUpdate is undefined');
//     }
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.component.html',
  styleUrls: ['./update-product.component.component.css'],
})
export class UpdateProductComponent implements OnInit {
  @Input() displayUpdateModal: boolean = false;
  updateProductFormGroup: FormGroup;
 @Input()productToUpdate: Product | undefined;
  updateSuccess: boolean = false;
  // Added property for dialog display

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.updateProductFormGroup = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductData(productId);
    }
  }

  fetchProductData(productId: any): void {
    this.productService['getProduct'](productId).subscribe(
      (response: any) => {
        this.productToUpdate = response;
        if (this.productToUpdate) {
          this.updateProductFormGroup.patchValue(this.productToUpdate);
        }
      },
      (error: any) => {
        console.error('Error occurred while retrieving the product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.updateProductFormGroup.valid && this.productToUpdate) {
      const updatedProductData: Product = {
        id: this.productToUpdate.id,
        rating: this.productToUpdate.rating,
        title: this.updateProductFormGroup.value.title || '',
        price: this.updateProductFormGroup.value.price || 0,
        description: this.updateProductFormGroup.value.description || '',
        category: this.updateProductFormGroup.value.category || '',
        image: this.updateProductFormGroup.value.image || '',
      };

      this.productService.updateProduct(updatedProductData).subscribe(
        () => {
          console.log('Product updated successfully');
          // Optionally, you can navigate to the product list or show a success message
        },
        (error) => {
          console.error('Error occurred while updating the product:', error);
          // Optionally, you can show an error message
        }
      );
    } else {
      console.error('Invalid form or productToUpdate is undefined');
    }
  }

  closeUpdateModal(): void {
    this.displayUpdateModal = false;
  }
}
