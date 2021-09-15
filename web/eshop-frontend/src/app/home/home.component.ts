import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;
  faSignInAlt = faSignInAlt;
  bestProd: any = []
  randomProd: any = []
  constructor(private prodService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.prodService.getBestProd().subscribe((result) => {
      this.bestProd = result;
    })
    this.prodService.getProd().subscribe((result) => {
      let set = new Set()
      while (set.size < 3) {
        let index = Math.floor(Math.random() * result.length)
        set.add(JSON.stringify(result[index]))
        if (result.length - 1 === set.size) {
          break;
        }
      }
      set.forEach((element: any) => {
        this.randomProd.push(JSON.parse(element))
      });
    
    })
  }

  goToProd(id: string) {
    this.router.navigate(['produit/', id])
  }

}
