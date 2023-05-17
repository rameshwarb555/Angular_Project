

import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
// import { UpdateProductComponent } from './update-product.component/update-product.component.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  page = 1;
  pageSize = 10;
  totalPages: number = 0;
  pages: number[] = [];
  dataSource: Product[] = [];
  displayAddModal = false;
  visible = false;
  displayUpdateModal: boolean = false;
  selectedProduct: any;
  updateProductFormGroup: FormGroup;
  productToUpdate: any;
  clickUpdate: any;
 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private messageService: MessageService
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
    this.getProductList();
    const productId = this.router.snapshot.paramMap.get('id');
    console.log(productId, 'getid');
  }

  getProductList() {
    console.log('getProductList() called');
    this.productService.getproducts().subscribe((response) => {
      console.log(response);
      this.products = response;
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.setPage(1); // set the first page of products when they are loaded
    });
  }

  getProduct(productId: any) {
    console.log('getProduct() called with productId:', productId);
    this.productService['getProduct'](productId).subscribe(
      (response: any) => {
        console.log(response);
        // Process the retrieved product data here
      },
      (error: any) => {
        console.error('Error occurred while retrieving the product:', error);
      }
    );
  }

  updateProductdata() {
    // Implement your update product data logic here
  }

  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed?: boolean) {
    this.displayAddModal = !isClosed;
  }

  saveProductToList(newData: any) {
    this.products.unshift(newData);
  }

  setPage(page: number) {
    // calculate start and end item indexes for the current page
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize - 1,
      this.products.length - 1
    );

    // create a new page of items based on the calculated indexes
    this.page = page;
    this.dataSource = this.products.slice(startIndex, endIndex + 1);
  }

  get displayedProducts(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  showSuccessMessage(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary: summary, detail: detail });
  }

  showErrorMessage(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  
  editProduct(product: Product): void {
    if (product && this.updateProductFormGroup.valid) {
      // Prepare the updated product data
      const updatedProductData: Product = {
        id: product.id,
        rating: product.rating,
        title: this.updateProductFormGroup.value.title || '',
        price: this.updateProductFormGroup.value.price || 0,
        description: this.updateProductFormGroup.value.description || '',
        category: this.updateProductFormGroup.value.category || '',
        image: this.updateProductFormGroup.value.image || '',
      };
  
      // Call the updateProduct method of the ProductService and subscribe to the response
      this.productService.updateProduct(updatedProductData).subscribe(
        () => {
          console.log('Product updated successfully');
          // Emit an event to notify the parent component of the update
          this.clickUpdate.emit(product.id);
        },
        (error) => {
          console.error('Error occurred while updating the product:', error);
        }
      );
    } else {
      console.error('Invalid form or product not found');
    }
  }
  


  deleteProduct(id: any) {
    console.log(id, 'deletedid==>');
    this.productService.deleteProduct(id).subscribe((res) => {
      console.log(res, 'deleteres==>');

      this.productService.getproducts().subscribe((res)=>{
        console.log(res,"res==>");
        // this['deleteData'] = res.Data
      })
    });
  }

  closeDeleteModal() {
    // Implement your close delete modal logic here
  }

  updateProduct(product: Product): void {
    // Check if the form is valid and a product is selected for update
    if (this.updateProductFormGroup.valid && product) {
      // Prepare the updated product data
      const updatedProductData: Product = {
        id: product.id,
        title: this.updateProductFormGroup.value.title || '',
        price: this.updateProductFormGroup.value.price || 0,
        description: this.updateProductFormGroup.value.description || '',
        category: this.updateProductFormGroup.value.category || '',
        image: this.updateProductFormGroup.value.image || '',
        rating:this.updateProductFormGroup.value.rating || '',
      };
  
      // Call the updateProduct method of the ProductService and subscribe to the response
      this.productService.updateProduct(updatedProductData).subscribe(
        () => {
          console.log('Product updated successfully');
          // Emit an event to notify the parent component of the update
          this.clickUpdate.emit(product.id);
        },
        (error) => {
          console.error('Error occurred while updating the product:', error);
        }
      );
    } else {
      console.error('Invalid form or product not found');
    }
  }
  

  showDialog(product: Product) {
    this.selectedProduct = product;
    this.displayUpdateModal = true;
  }

  hideDialog() {
    this.visible = false;
    this.selectedProduct = undefined;
    this.displayUpdateModal = false;
  }

  showUpdateModal() {
    this.displayUpdateModal = true;
  }

  closeUpdateModal() {
    this.displayUpdateModal = false;
  }

  hideUpdateModal(event: boolean) {
    this.selectedProduct = null;
    this.displayUpdateModal = false;
  }

  fetchUpdatedData(productId: any) {
    this.getProduct(productId);
    // const product: Product = { id: productId };
    this.productService.editUpdateProduct(productId).subscribe(
      (data) => {
        // Update the data in your update form with the fetched product data
        this.updateProductFormGroup.patchValue(data);

        // Perform any additional operations with the fetched data here
      },
      (error) => {
        console.error('Error occurred while fetching product data:', error);
      }
    );
  }
}


