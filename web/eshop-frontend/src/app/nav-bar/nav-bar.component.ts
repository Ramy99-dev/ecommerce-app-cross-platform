import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch, faSignInAlt , faUser , faSignOutAlt ,faShoppingBasket , faCircle , faBars } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 
  connected : boolean ;  
  categories:any =[];
  user : any ;
  faSearch =  faSearch;
  faBars = faBars
  faShoppingBasket = faShoppingBasket;
  faSignInAlt = faSignInAlt;
  faCircle = faCircle
  faSignOutAlt = faSignOutAlt;
  faUser =  faUser;
  searchForm : FormGroup;
  cartLength : number = 0;
  collapsed:boolean = false;
  @ViewChild('navItems') list:any; 

  constructor(private userService : UserService , private formBuilder: FormBuilder 
    , private categoryService:CategoryService , private prodService : ProductService,
    private cartService : CartService) { 
    this.searchForm = this.formBuilder.group({

      category : new FormControl('',[Validators.required]),
      word : new FormControl('',[Validators.required])
    })
  }

  ngOnInit() : void {
    this.cartService.currentMessage.subscribe((result)=>{
      if(result != null )
      {
        this.cartLength = parseInt(result);
      }
      else{
        this.cartLength =  0 ;
      }
     
    })
     this.cartService.getCartLength().subscribe((result)=>{
       this.cartLength = result.length;
     })
     this.prodService.getProd().subscribe((result)=>{
      let set: any = new Set()
      result.forEach((element: any) => {
        set.add(JSON.stringify(element.category[0]))
      });
      set.forEach((element: any) => {
        this.categories.push(JSON.parse(element))
      });
     })
      this.userService.getUserById().subscribe((result)=>{
        result = JSON.parse(result)
        if(result.connected)
        {
          this.user = result.user
          this.connected = result.connected
        }
        else{
          this.connected = result.connected;
        }
      }) 

    
    
  
  }
  
  logout()
  {
    localStorage.removeItem('jwt')
    this.connected=false;
    
   
  }

  search()
  {
    this.prodService.searchProd(this.searchForm.value).subscribe((result)=>{
      this.prodService.changeMessage(result);
      
    })
   
  }

  collapse()
  {
    let list = this.list.nativeElement ;
    if(this.collapsed)
    {
      list.setAttribute('style','display:none')
      this.collapsed = false;
    }
    else
    {
      list.setAttribute('style','display:block')
      this.collapsed = true;
    }
  }

}
