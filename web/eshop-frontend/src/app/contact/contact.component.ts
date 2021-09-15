import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  words:number=0;
  @ViewChild('content') content:any;
  constructor(private formBuilder: FormBuilder , private contactService:ContactService) {
    this.contactForm = this.formBuilder.group({

      email : new FormControl('',[Validators.required,Validators.email]),
      subject : new FormControl(),
      msg : new FormControl('',[Validators.required,Validators.maxLength(755)]),
    })
   }

  ngOnInit(): void {
  }

  add()
  {
    this.contactService.addContact(this.contactForm.value).subscribe((result)=>{
    })
  }
  
  incrWords()
  {
   this.words = this.content.nativeElement.value.length;
    
  }
}
