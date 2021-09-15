import { Component, OnInit } from '@angular/core';

import { CategService } from '../categ.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  generalInfoTiltes = []
  generalInfoChoice =['clients','products','categories'];
  generalInfoVal=""

  generalInfo =[];
  hour :number = 0;
  number:any = {}
  constructor(private productService:ProductService , private categService :CategService , private userService:UserService   ) { }

  ngOnInit(): void {
    let randomVal:number = Math.floor(Math.random() * 3)
    
     if(this.generalInfoChoice[randomVal]=="clients")
     {
       this.generalInfoVal = "clients"
       this.userService.getAllUsers().subscribe((result)=>{
         this.generalInfo = result
         this.generalInfoTiltes = ['Nom','Prenom','sexe','credit']
       })
     }
     else if(this.generalInfoChoice[randomVal]=="products")
     {
       this.generalInfoVal = "products"
      
       this.productService.getAllProd().subscribe((result)=>{
        this.generalInfo = result
        result.forEach((element:any) => {
          element.description = element.description.slice(0,7)+"..."
        });
        this.generalInfoTiltes = ['Nom','Categorie','Description','Prix']
       })
     }
     else{
      this.generalInfoVal = "categories"
       this.categService.getAllCateg().subscribe((result)=>{
         this.generalInfo = result
         this.generalInfoTiltes = ['Categorie']
       })
     }
    this.productService.getAllProd().subscribe((result)=>{
      this.number['prods'] = result.length;
    })
    this.categService.getAllCateg().subscribe((result)=>{
      this.number['categs'] = result.length;
    })
    this.userService.getAllUsers().subscribe((result)=>{
      this.number['users'] = result.length;
    })
    this.hour = new Date().getHours()
  }

}
