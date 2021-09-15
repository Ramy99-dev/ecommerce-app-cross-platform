import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategService } from '../categ.service';
import { ProductService } from '../product.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { EditProdComponent } from '../edit-prod/edit-prod.component';
import { DialogService } from '@ngneat/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  categories :any = [] ; 
  products :any = [] ; 
  addForm:FormGroup;
  image:any ;
  constructor( public el: ElementRef ,private categService:CategService, private productService:ProductService , private formBuilder: FormBuilder
    ,  private dialog: DialogService ) { 
    this.addForm = this.formBuilder.group({

      name : new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      qte: new FormControl('',[Validators.required]),
      product_img: new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
   
   this.categService.getAllCateg().subscribe((result)=>{
     this.categories = result;
   })
   this.productService.getAllProd().subscribe((result)=>{
    
    result.forEach((element:any) => {
      element.description = element.description.slice(0,7)+"..."
    });
    this.products = result;
    
  })

  }
  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
      
    }
  }
  add()
  {
    let fd = new FormData();
    if (this.image) {
      fd.append('image', this.image, this.image.name)

      this.productService.uploadImg(fd).subscribe((res) => {
      })
    }
    this.addForm.value.name = (this.addForm.value.name).trim()
    this.addForm.value.name = this.addForm.value.name.charAt(0).toUpperCase()+this.addForm.value.name.slice(1)
    this.productService.addProd(this.addForm.value).subscribe((result)=>{
      this.ngOnInit()
    })
  }

  delete(id:any, i:number)
  {
    this.productService.deleteProd(id).subscribe((result)=>{
      this.products.splice(i,1)
      
    })
  }

  openEdit(prodId:string)
  {
    const dialogRef = this.dialog.open(EditProdComponent,);
    this.productService.changeMessage(prodId);
    dialogRef.afterClosed$.subscribe(result => {
      this.ngOnInit()
    });
    dialogRef.backdropClick$.subscribe(() => {
      this.ngOnInit()
    });

  }

}
