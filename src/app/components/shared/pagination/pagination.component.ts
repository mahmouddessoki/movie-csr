import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  currentPage: number = 1;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter();
  @Input() totalPages!: number;

  getNextPage() {
    if (this.currentPage < this.totalPages) {

      this.currentPage += 1
      this.currentPageChange.emit(this.currentPage)
    }

  }
  getPrevPage() {
    if (this.currentPage > 1) {

      this.currentPage -= 1
      this.currentPageChange.emit(this.currentPage)


    }
  }

}
