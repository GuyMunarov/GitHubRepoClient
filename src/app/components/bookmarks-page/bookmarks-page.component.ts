import { Component, OnInit } from '@angular/core';
import { ReposService } from 'src/app/services/repos.service';
import { IApiRepo, IApiRepoCollection, IRepoCollection } from 'src/app/Shared/models/IRepo';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {

  collection: IApiRepoCollection;
  pageSize: number = 8;
  pageIndex: number = 1;

  constructor(private reposService: ReposService) { }

  onPageChanged(event: any){
    console.log("gi");
    
      if(event){
      this.pageIndex = event.pageIndex+1;
      this.pageSize = event.pageSize;
      }
      this.getBookmarksWithPaging();   
  }

  exportToExcel(){
    this.reposService.exportToExcel();
  }

  ngOnInit(): void {    
    this.getBookmarksWithPaging();
  }
    getBookmarksWithPaging(){
      this.reposService.getBookmarksWithPaging(this.pageSize,this.pageIndex).subscribe((res:IApiRepoCollection) =>{
        console.log(res);
       
        this.collection = res;
      })
    
  }

}
