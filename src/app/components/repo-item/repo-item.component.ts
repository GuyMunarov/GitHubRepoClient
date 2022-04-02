import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ReposService } from 'src/app/services/repos.service';
import { IApiRepo, IItem } from 'src/app/Shared/models/IRepo';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.css']
})
export class RepoItemComponent implements OnInit {
  @Input() repo: IItem;
  @Output() itemBookmarked = new EventEmitter();
  popupForm: FormGroup;
  bookmarkedRepo: IApiRepo = null;
  createPopupForm(){    
    this.popupForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]) });
  }
  constructor(public ngxSmartModalService: NgxSmartModalService, private reposService: ReposService) { }


  onSubmit(){
    this.reposService.sendEmailFromRepo(this.popupForm.value.email);
    this.ngxSmartModalService.close('EmailPopup');
    this.itemBookmarked.emit();
  }

  onClose(){
    this.ngxSmartModalService.close('EmailPopup');
    this.itemBookmarked.emit();
  }
  
  openPopupAndSetBookmark(repo:IItem){
    this.reposService.bookmarkedRepo = repo;
    this.ngxSmartModalService.getModal('EmailPopup').open();

  }
  async bookMark(){
   await this.reposService.bookmarkRepo().toPromise();
    this.itemBookmarked.emit();

  }

  async unbookmark(repo:IApiRepo){
    console.log(repo);
    await this.reposService.unBookmark(repo.id).toPromise();
    this.itemBookmarked.emit();

    // this.reposService.bookmarkedRepo = repo;
    // this.reposService.bookmarkRepo().subscribe(res => 
    //   console.log(res)
    //   );

  }

  ngOnInit(): void {
    this.createPopupForm();
  }

}
