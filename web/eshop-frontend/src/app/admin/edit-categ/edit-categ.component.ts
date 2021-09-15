import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { CategService } from '../categ.service';

@Component({
  selector: 'app-edit-categ',
  templateUrl: './edit-categ.component.html',
  styleUrls: ['./edit-categ.component.scss']
})
export class EditCategComponent implements OnInit {
  category :any  ;
  editForm : FormGroup;
  constructor(public ref: DialogRef,private formBuilder:FormBuilder , private categService :CategService) {
    this.editForm = this.formBuilder.group({
      name : new FormControl('',[Validators.required]),
    })
   }

  ngOnInit(): void {
    this.categService.currentMessage.subscribe((result)=>{
      this.categService.getCateg(result).subscribe((result)=>{
            this.category =result;
      })
    })
  }
  
  edit()
  {
    this.editForm.value.id = this.category._id;
    this.categService.editCateg(this.editForm.value).subscribe((result)=>{
    })
  }

}
