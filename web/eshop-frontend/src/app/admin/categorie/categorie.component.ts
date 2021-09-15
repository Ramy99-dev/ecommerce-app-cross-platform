import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@ngneat/dialog';
import { CategService } from '../categ.service';
import { EditCategComponent } from '../edit-categ/edit-categ.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  addForm: FormGroup;
  categories : any = [];
  constructor(public el: ElementRef  ,private formBuilder: FormBuilder , private categService:CategService ,  private dialog: DialogService) {
    this.addForm = this.formBuilder.group({

      name : new FormControl('',[Validators.required]),
  
    })
   }

  ngOnInit(): void {
    this.categService.getAllCateg().subscribe((result)=>{
      this.categories = result ;
    })
  }
  add()
  {
   this.categService.addCateg(this.addForm.value).subscribe((result)=>{
     this.ngOnInit()
   })
  }

  delete(id:any,i:number)
  {
    this.categService.deleteCateg(id).subscribe((result)=>{
     
      this.categories.splice(i,1)
    })
  }
  openEdit(categId:any)
  {
    const dialogRef = this.dialog.open(EditCategComponent);
    this.categService.changeMessage(categId);
    dialogRef.afterClosed$.subscribe(result => {
      this.ngOnInit()
    });
    dialogRef.backdropClick$.subscribe(() => {
      this.ngOnInit()
    });

  }
}
