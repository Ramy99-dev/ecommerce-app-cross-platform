import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NotificationsService } from 'angular2-notifications'


import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  cart: any = []
  total: number = 0;
  constructor(private cartService: CartService, private prodService: ProductService
    , private router: Router, private userService: UserService , private notif: NotificationsService ) {
     
     }

  ngOnInit(): void {
    this.cartService.getCartByUser().subscribe((result) => {
      if (result.result.length>0) {

        this.cart.products = result.result[0].products
        for (const c in this.cart.products) {
          this.total += this.cart.products[c].price
        }
        this.cart.id = result.result[0]._id

      }

    })

  }

  delete(id: string, index: number) {


    this.total -= this.cart.products[index].price;
    this.cart.products.splice(index, 1)
    this.cartService.getCartLength().subscribe((result) => {
      this.cartService.changeMessage((result.length) - 1 + "")
    })
    this.cartService.deleteCartItem(id, this.cart.id).subscribe((result) => {

    })
  }

  buy() {

    this.cartService.buy(this.total).subscribe((result) => {

      if (result.buy == 'OK') {
        this.userService.updateUserCredit(this.total).subscribe((result) => {

        })
        for (const c in this.cart.products) {
          this.prodService.updateProdSales(this.cart.products[c].id, this.cart.products[c].qte).subscribe((result) => {

            this.notif.success('Success', "Produit Acheter", {
              position: ["top", "left"],
              timeOut: 2000,
              animate: 'scale',
              showProgressBar: true
            })

          })
          this.prodService.getProdById(this.cart.products[c].id).subscribe((result) => {
            let newQte = result.qte - this.cart.products[c].qte;
            this.cartService.deleteCartItem(this.cart.products[c].id,this.cart.id).subscribe((result)=>{
            })
            this.cartService.changeMessage(0 + "")
            if (newQte == 0) {
              this.prodService.deleteProd(this.cart.products[c].id).subscribe((result) => {
                this.cartService.deleteCart().subscribe((result) => {
                  
                  this.router.navigate(['/produits'])
                  this.notif.success('Success', "Produit Acheter", {
                    position: ["top", "left"],
                    timeOut: 2000,
                    animate: 'scale',
                    showProgressBar: true
                  })
                })
              })
            }
            else {
              this.prodService.updateProdQte(this.cart.products[c].id, newQte).subscribe((result) => {
                this.router.navigate(['/produits'])

              })
            }



          })
        }



      }
      else{
        this.notif.error('', "Credit Insuffisant ", {
          position: ["top", "left"],
          timeOut: 2000,
          animate: 'scale',
          showProgressBar: true
        })
      }
    })
  }

}
