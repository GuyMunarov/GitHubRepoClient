import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReposService } from 'src/app/services/repos.service';
import { IApiRepo, IApiRepoCollection, IRepoCollection} from '../../Shared/models/IRepo';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  repoForm: FormGroup;
  errors: string[];
  page: number = 1;
  pageSize: number = 8;
  collection: IRepoCollection;
  constructor(private fb: FormBuilder, private reposService: ReposService) { }

  
  createRepoForm(){
    this.repoForm = this.fb.group({
      searchInput: [null,[Validators.required]]
    })
  }
  onPageChanged(event: any){
    console.log("gi");
    
      if(event){
      this.page = event.pageIndex+1;
      this.pageSize = event.pageSize;
      }
      this.getRepos();   
  }

  onSubmit(){
    this.getRepos();   
  }

  getRepos(){
    this.reposService.getBookmarks().subscribe((res:IApiRepo[]) =>{      
      this.reposService.bookmarkedRepos = res;
      this.reposService.getRepos(this.repoForm.value.searchInput,this.page,this.pageSize).subscribe((res: IRepoCollection)=>{
                
        this.collection = res;
        console.log(this.collection);
        
        this.collection.items.map(item =>{                
         if(!this.reposService.bookmarkedRepos.find(x => x.id == item.id))
         {
           item.isBookmarked = true;
         }
        })
         
      }); 
   });
    
  }




  ngOnInit(): void {
    this.createRepoForm();

  }
}