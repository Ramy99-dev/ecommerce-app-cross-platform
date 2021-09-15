import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  {
    path:'acceuil' , component:HomeComponent
  },
  {
    path:'produits' , component:ProductComponent
  },
  {
    path:'produit/:id' , component:SingleProductComponent
  },
  {
    path:'contact' , component:ContactComponent
  },
  {
    path:'profile' , component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'connecter' , component:LoginComponent
  },
  {
    path:'inscription' , component:RegisterComponent
  },
  {
    path:"panier" , component:CartComponent
  },
  {
     path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
