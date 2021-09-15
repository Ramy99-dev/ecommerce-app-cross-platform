import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  users : any = [];
  constructor(private userSerivce:UserService) { }

  ngOnInit(): void {
    this.userSerivce.getAllUsers().subscribe((result)=>{
      this.users = result;
    })
  }
  
  delete(id:string , i:number){
    
    this.userSerivce.deleteUser(id).subscribe((result)=>{
      this.users.splice(i,1)
    })
  }
}
