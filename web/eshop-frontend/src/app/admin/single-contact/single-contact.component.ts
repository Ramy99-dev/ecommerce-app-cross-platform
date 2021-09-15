import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss']
})
export class SingleContactComponent implements OnInit {

  contact: any;
  constructor(private activatedRoute: ActivatedRoute , private contactService:ContactService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((result) => {
      this.contactService.getContact(result.id).subscribe((result)=>{
        this.contact = result[0];
        
      })
    })

  }

}
