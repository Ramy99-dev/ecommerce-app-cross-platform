import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IModalDialogButton } from 'ngx-modal-dialog';
import { CategService } from '../categ.service';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.scss']
})
export class EditProdComponent implements OnInit {
   categories :any ;
   product :any;
   editForm : FormGroup;
  constructor(public ref: DialogRef,private formBuilder:FormBuilder,private categoryService : CategService , private productService:ProductService , private router:Router) {
    this.editForm = this.formBuilder.group({

      name : new FormControl('',[Validators.required]),
      category : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      price : new FormControl('',[Validators.required]),
      qte : new FormControl('',[Validators.required]),
    })
   }

  ngOnInit(): void {
    this.categoryService.getAllCateg().subscribe((result)=>{
      this.categories = result ;
    })
    this.productService.currentMessage.subscribe((result)=>{
      this.productService.getProdById(result).subscribe((result)=>{
        this.product = result;
      })
    })

  }
  edit()
  {
    this.editForm.value.id = this.product._id;
    this.productService.editProd(this.editForm.value).subscribe((result)=>{

    })
  }
}
