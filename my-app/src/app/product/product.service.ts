import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  [x: string]: any;
  

  
  // ,private porductService: ProductService
  
  constructor(private http: HttpClient) { 
    
  }
  ngOnInit(): void{
  }
  

  getproducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/products/')
  }
 

  saveProduct(postData: any){
    return  this.http.post('http://localhost:3000/api/products/', postData);
  }

  editProduct(data: any, product: Product): Observable<any> {
    const url = `http://localhost:3000/api/products/${product.id}`;
    return this.http.put(url, data);
  }
  
  
  editUpdateProduct(productId: number): Observable<any> {
    const url = `http://localhost:3000/api/products/${productId}`;
    return this.http.get(url);
  }
  
  deleteProduct(product: Product): Observable<any> {
    const url = `http://localhost:3000/api/products/${product.id}`;
    return this.http.delete(url);
  }
   
  updateProduct(updatedProduct: Product): Observable<Product> {
    const url = `http://localhost:3000/api/products/${updatedProduct.id}`;
    return this.http.put<Product>(url, updatedProduct);
  }
  
  

}
