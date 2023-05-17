import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { UpdateProductComponent } from './product/update-product.component/update-product.component.component';

const routes: Routes = [
  { path: '', redirectTo: '/get', pathMatch: 'full' }, // Redirects to 'ProductComponent'
  {path:'get',component: ProductComponent},
  {path:'add',component: AddEditProductComponent},
  {path:'update/:id',component: UpdateProductComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
      providers: []
})
export class AppRoutingModule { }


