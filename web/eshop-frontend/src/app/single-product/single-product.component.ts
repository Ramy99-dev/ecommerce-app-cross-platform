import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product: any = [];
  otherProduct: any = []
  faShoppingCart = faShoppingCart;
  minValue: number = 1;
  options: Options = {
    floor: 1,
    ceil: 100,
    step: 1,
    showTicks: true
  };
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private router: Router, private cartService: CartService , private notif: NotificationsService ) { }

  ngOnInit(): void {
    this.getProd()
  }

  getProd() {

    this.activatedRoute.params.subscribe((id) => {
      let idProd = id.id;
      this.productService.getProdById(idProd).subscribe((result) => {
        try {
          this.product = result;
          const newOptions: Options = Object.assign({}, this.options);
          newOptions.ceil = result.qte;
          this.options = newOptions;
          let set = new Set()


          this.productService.getProdByCategId(this.product.category).subscribe((result) => {
            while (set.size < 3) {
              let index = Math.floor(Math.random() * result.length)
              if (result[index] != null && result[index].name != this.product.name) {
                set.add(JSON.stringify(result[index]))

              }

              if (result.length - 1 === set.size) {
                break;
              }

            }
            this.otherProduct = []
            set.forEach((element: any) => {
              this.otherProduct.push(JSON.parse(element))
            });
          })
          set.clear()

        }
        catch (e) {
          this.router.navigate(['/produits'])
        }


      })

    },(err)=>{
      this.router.navigate(['/produits'])
    })


  }
  changeProd(id: string) {

    this.router.navigate(['produit/', id])


  }

  addCart() {

    let product = {
      id: this.product._id,
      product: this.product.name,
      img: this.product.product_img,
      qte: this.minValue,
      price: this.product.price * this.minValue
    }


    this.cartService.addCartUser(product).subscribe((result) => {
      if (result != null) {
        result = JSON.parse(result)

        if (result.message == 'OK') {
          
          this.cartService.getCartLength().subscribe((result) => {
            this.notif.success('Success', "Produit Ajouter au panier", {
              position: ["top", "left"],
              timeOut: 2000,
              animate: 'scale',
              showProgressBar: true
            })
            this.cartService.changeMessage((result.length))
          })
        }
        else{
          this.notif.error('', "Produit est déja dans le panier", {
            position: ["top", "left"],
            timeOut: 2000,
            animate: 'scale',
            showProgressBar: true
          })
        }
      }

    }, (err) => {
      this.router.navigate(['/connecter'])

    })
  }

}
