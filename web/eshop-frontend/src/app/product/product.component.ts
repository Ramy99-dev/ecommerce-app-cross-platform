import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  search:boolean = false;
  priceInterval :any = {}
  sort:string="price";
  category_id:number=0;
  allProd:boolean=true;
  numberPage: number = 0;
  products: any = [];
  catgories: any = [];
  constructor(private productService: ProductService) { }
  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor:0,
    ceil:100,

  };
  ngOnInit(): void {
    this.getPriceInterval();
    
    this.productService.currentMessage.subscribe((result)=>{
      if(result != null)
      {
        this.products = result;
        this.search = true ; 
      } 
      else{
        this.getAllProduct()
      }
    })
    this.productService.getProd().subscribe((result) => {
      let set: any = new Set()
      result.forEach((element: any) => {
        set.add(JSON.stringify(element.category[0]))
      });
      set.forEach((element: any) => {
        this.catgories.push(JSON.parse(element))
      });
    })
  }

  changePage(i: number) {
    let lim: number = 0;
    window.innerWidth >= 1920 ? lim = 8 : lim = 6;
    if(this.allProd)
    {
      let opt = {
        
        page : i+1 ,
        lim : lim , 
        sort: this.sort ,
        max:this.maxValue,
        min:this.minValue-1
      }
      this.productService.getAllProd(opt).subscribe((result) => {
        this.products = result.page;
      })
    }
    else{
      let opt = {
        id: this.category_id ,
        page : i+1 ,
        lim : lim , 
        sort: this.sort,
        max:this.maxValue,
        min:this.minValue-1 
      }
      this.productService.getProdByCateg(opt).subscribe((result) => {
      
        this.products = result.page;
        this.numberPage = result.len;
      })
    }
    
  }

  getProductByCategory(id: number) {
    let lim: number = 0;
    this.category_id=id;
    this.allProd=false;
    window.innerWidth >= 1920 ? lim = 8 : lim = 6;
    let opt = {
      id: id ,
      page : 1 ,
      lim : lim , 
      sort: this.sort ,
      max:this.maxValue,
      min:this.minValue
    }
    
    this.productService.getProdByCateg(opt).subscribe((result) => {
      this.products = result.page;
      this.numberPage = result.len;
    })
  }


  getAllProduct() {
    let lim: number = 0;
    this.allProd=true;
    window.innerWidth >= 1920 ? lim = 8 : lim = 6;
    let opt = {
     
      page : 1 ,
      lim : lim , 
      sort: this.sort ,
      max: this.priceInterval.max,
      min: this.priceInterval.min
    }
    this.productService.getAllProd(opt).subscribe((result) => {
      this.products = result.page;
      this.numberPage = result.len;
    })
  }

  sortBy(e: any) {
    let value = e.target.value;
    value=="Nom" ? this.sort="name" : this.sort="price";
    if(this.allProd)
    {
      this.getAllProduct()
    }
    else{
      this.getProductByCategory(this.category_id)
    }
  }
  
  changePrice()
  {
    this.priceInterval.min =this.minValue
      this.priceInterval.max =this.maxValue
    if(this.allProd)
    {
      this.getAllProduct()
    }
    else{
      this.getProductByCategory(this.category_id)
    }
    
  }

  getPriceInterval()
  {
    this.productService.getPriceInterval().subscribe((result)=>{
       if(result.msg !="NOK")
       {
        this.priceInterval = result.price_interval;
        const newOptions: Options = Object.assign({}, this.options);
        newOptions.ceil = this.priceInterval.max;
        newOptions.floor = this.priceInterval.min;
        this.maxValue=this.priceInterval.max;
        this.options = newOptions;
      }
     
    })
  }
}

