import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'
import { AdminModule } from './admin/admin.module';
import { NgHttpLoaderModule } from 'ng-http-loader'; 
import { DialogModule } from '@ngneat/dialog';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';


import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductComponent } from './product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './user.service';
import { TokenInterceptor } from './token.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ProductComponent,
    SingleProductComponent,
    ContactComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    CartComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    FontAwesomeModule,
    NgxSliderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    AdminModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({position:['top', 'right']}),
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
  providers: [UserService,CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
     },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
