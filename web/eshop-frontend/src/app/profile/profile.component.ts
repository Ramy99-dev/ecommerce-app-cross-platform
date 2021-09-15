import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { IModalDialogButton } from 'ngx-modal-dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  func:Function =this.addCredit;
  add:boolean=false ; 
  user:any ; 
  constructor(private userService:UserService , public el: ElementRef ,private router:Router , private dialog: DialogService ) { }

  ngOnInit(): void {
    
    this.userService.getUserById().subscribe((result)=>{
      result = JSON.parse(result)
      this.user = result.user; 
    },(err)=>{
     this.router.navigate(['/connecter'])
    })
  }

  addCredit()
  {
    this.func=this.showInput
    this.add = true;
  }
  showInput()
  {
    this.add = false;
    this.func=this.addCredit
    let amount = this.el.nativeElement.getElementsByTagName("input")[0].value;
    this.user.credit+=parseFloat(amount);
    this.userService.addMoney(this.user.credit).subscribe((result)=>{
    },(err)=>{
      this.router.navigate(['/connecter'])
     })
  }
  openEdit()
  {
    const dialogRef = this.dialog.open(EditProfileComponent);
    this.userService.changeMessage(this.user);
    dialogRef.afterClosed$.subscribe(result => {
      this.ngOnInit()
    });
    dialogRef.backdropClick$.subscribe(() => {
      this.ngOnInit()
    });
    
  }
}
