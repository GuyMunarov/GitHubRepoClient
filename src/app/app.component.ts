import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReposService } from './services/repos.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 
  constructor( private accountService: AccountService, private reposService: ReposService) {
  }
    async ngOnInit(): Promise<void> {
      await this.loadUser();
    }

    async loadUser(){
      
      const token = sessionStorage.getItem('token');
      if(token){
        await this.accountService.loadCurrentUser(token).toPromise()
        console.log("sss");
        
      }
    }
}
