import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminrootComponent } from './adminroot/adminroot.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CategorieComponent } from './categorie/categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@ngneat/dialog';

import { CategService } from './categ.service';
import { ContactComponent } from './contact/contact.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { EditCategComponent } from './edit-categ/edit-categ.component';

@NgModule({
  declarations: [
    AdminrootComponent,
    HomeComponent,
    UserComponent,
    ProductComponent,
    CategorieComponent,
    ContactComponent,
    SingleContactComponent,
    EditProdComponent,
    EditCategComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DialogModule.forRoot({
      sizes: {
        sm: {
          width: 300, // 300px
          minHeight: 250 // 250px
        },
        md: {
          width: '30vw',
          height: '70vh'
        },
        lg: {
          width: '90vw',
          height: '90vh'
        },
        fullScreen: {
          width: '100vw',
          height: '100vh'
        },
        stretch: {
          minHeight: 500,
          maxHeight: '85%'
        }
      }
    })
  ],
  providers:[CategService]
})
export class AdminModule { }
