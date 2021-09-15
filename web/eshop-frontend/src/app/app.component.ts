import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentComponent : string ;
  shownavbar : boolean;
  public spinkit = Spinkit; 
  title = 'eshop-frontend';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
  ) {
   
    let components = ['AdminrootComponent','LoginComponent','RegisterComponent','ProfileComponent']
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
          this.currentComponent =  val.snapshot.component['name'];
          console.log(this.currentComponent)
          if(components.includes(this.currentComponent) )
          {
              this.shownavbar = false;
          }
          else{
            this.shownavbar = true;
          }
      }
  });        
  }
}
