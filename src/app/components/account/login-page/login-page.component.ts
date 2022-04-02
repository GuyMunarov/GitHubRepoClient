import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  constructor(private accountService: AccountService, private activateRoute: ActivatedRoute, private router: Router) { }

  createLoginForm(){    

    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('',Validators.required)
    });
  }
  
  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(()=>{
      this.router.navigateByUrl('/');
    },err=>{      
    })
    
  }

  ngOnInit(): void {    
    if(this.accountService.isAuthenticated)
      this.router.navigateByUrl("/browse")

    this.createLoginForm();
  }

}
