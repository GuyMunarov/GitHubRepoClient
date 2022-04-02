import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter();
  constructor() { }

  changes = new Subject<void>();

  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per page:`;
  lastPageLabel = `Last page`;
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';



  onPageChanged(event: any){    
   this.pageChanged.emit(event);
  }
  ngOnInit(): void {
  }

}
