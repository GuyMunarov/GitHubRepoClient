import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  
  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName: [null,[Validators.required]],
      email: [null, 
        [Validators.required, 
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(res=>{
      console.log(res); 
    },err=>{
      console.log(err.error);
      this.errors = err.error.errors;
    })
  }




  ngOnInit(): void {
    this.createRegisterForm();

  }

}
