import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminrootComponent } from './adminroot/adminroot.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'' , component:AdminrootComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'users-management',
        component:UserComponent
      },
      {
        path:'products-management',
        component:ProductComponent
      },
      {
        path:'categories-management',
        component:CategorieComponent
      },
      {
        path:'contact-management',
        component:ContactComponent
      },
      {
        path:'single-contact-management/:id',
        component:SingleContactComponent
      }
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
