import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ProductComponent } from './product.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { UpdateProductComponent } from './update-product.component/update-product.component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,} from '@angular/router';
import { AddEditProductModule} from './add-edit-product/add-edit-product.module';





@NgModule({
  declarations: [
    ProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    AddEditProductModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    RouterModule,
    AddEditProductModule
   
  
  ],
  exports:[
    UpdateProductComponent
  ],
  providers:[MessageService]
})
export class ProductModule { }
export { MessageService };

