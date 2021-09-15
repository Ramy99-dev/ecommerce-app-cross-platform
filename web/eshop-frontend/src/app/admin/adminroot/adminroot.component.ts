import { Component, OnInit, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-adminroot',
  templateUrl: './adminroot.component.html',
  styleUrls: ['./adminroot.component.scss']
})
export class AdminrootComponent implements OnInit {
  faBars = faBars;
  @ViewChild('sidebar') sideBar:any;
  @ViewChild('content') content:any;
  collapsed:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  collapse()
  {
    
    if(this.collapsed == false)
    {
      this.sideBar.nativeElement.setAttribute('style','display:block')
      this.content.nativeElement.setAttribute('style','flex-basis:80%')
      this.collapsed=true;
    }
    else{
      this.sideBar.nativeElement.setAttribute('style','display:none')
      this.content.nativeElement.setAttribute('style','flex-basis:100%')
      this.collapsed=false;
    }
  }

}
