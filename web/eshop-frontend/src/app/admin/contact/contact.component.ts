import { Component, OnInit } from '@angular/core';
import { faTrashAlt , faGlasses } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  faGlasses=faGlasses;
  contacts:any = [];
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContact().subscribe((result)=>{
      this.contacts = result;
    })
  }

  
  delete(id:any, i:number)
  {
    this.contactService.deleteContact(id).subscribe((result)=>{
   
      this.contacts.splice(i,1)
      
    })
  }

}
