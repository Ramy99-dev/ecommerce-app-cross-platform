import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errMsg:string ="";
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder ,private userService :UserService ,private router:Router) {
    this.loginForm = this.formBuilder.group({

      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
  }

  login()
  {
    this.userService.login(this.loginForm.value).subscribe((result)=>{
      if(result.connected)
      {
        localStorage.setItem("jwt",result.token)
        this.router.navigate(['/acceuil'])
      }
      else{
        this.errMsg = result.msg ;
      }
     
    })
  }

}
