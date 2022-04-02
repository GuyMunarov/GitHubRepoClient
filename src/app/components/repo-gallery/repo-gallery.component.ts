import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApiRepoCollection, IRepoCollection } from 'src/app/Shared/models/IRepo';

@Component({
  selector: 'app-repo-gallery',
  templateUrl: './repo-gallery.component.html',
  styleUrls: ['./repo-gallery.component.css']
})
export class RepoGalleryComponent implements OnInit {
  @Input() collection: IRepoCollection;
  @Output() pageChanged = new EventEmitter()
  
  onPageChanged(event){    
    this.pageChanged.emit(event);
  }
  constructor() { }

  ngOnInit(): void {
  }

}