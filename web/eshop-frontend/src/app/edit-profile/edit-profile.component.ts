import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user:any;
  editForm: FormGroup;
 
  constructor(public ref: DialogRef , private userService:  UserService , private formBuilder:FormBuilder) {
    this.editForm = this.formBuilder.group({

      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      place : new FormControl('',[Validators.required]),
      gender : new FormControl('',[Validators.required]),
      birthday :new FormControl('',[Validators.required]),
    })
   
  }
  

  ngOnInit(): void {
    this.userService.currentMessage.subscribe((result)=>{
      this.user = result;
    
    })
  }

  edit(){
    this.userService.editUser(this.editForm.value).subscribe((result)=>{
      
    })
  }

}
