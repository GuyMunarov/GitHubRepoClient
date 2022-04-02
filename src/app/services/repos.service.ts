import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApiRepo, IItem, IRepoCollection } from '../Shared/models/IRepo';

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  baseUrl: string = environment.apiUrl;
  bookmarkedRepo: IItem;
  bookmarkedRepos: IApiRepo[];
  constructor(private httpClient: HttpClient) { }

  public getRepos(searchInput: string, page: number, pageSize: number){
    return this.httpClient.get<IRepoCollection>(`https://api.github.com/search/repositories?q=${searchInput}&per_page=${pageSize}&page=${page}`);
  }

  public bookmarkRepo(){ 
    return this.httpClient.post(this.baseUrl+"repos",this.bookmarkedRepo);
  }

  

  public getBookmarks(){
    return this.httpClient.get(this.baseUrl+"repos");
  }
  public getBookmarksWithPaging(pageSize: number, pageIndex: number){
    return this.httpClient.get(this.baseUrl+`repos/withPaging/size/${pageSize}/index/${pageIndex}`);
  }

  public unBookmark(id: number){
    return this.httpClient.delete(this.baseUrl+`repos/${id}`);
  }


  public sendEmailFromRepo(email: string){
    const repoToSend = {name: this.bookmarkedRepo.name, avatarUrl: this.bookmarkedRepo.owner.avatar_url, description: this.bookmarkedRepo.description};
    console.log(repoToSend);
    
    this.httpClient.post(this.baseUrl+"repos/sendEmail/"+email,repoToSend).subscribe(res =>{           
    })
  }

  public exportToExcel(){
    this.httpClient.get(this.baseUrl+"repos/exportToExcel", {responseType: 'blob'}).subscribe(res => {
      this.downloadFile(res);
    });
  }
    downloadFile(data: any) {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
    }
}
