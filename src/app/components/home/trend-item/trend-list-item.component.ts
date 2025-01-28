import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMG_URL } from '../api.config';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-trend-item',
  imports: [RouterLink],
  templateUrl: './trend-list-item.component.html',
  styleUrl: './trend-list-item.component.scss'
})
export class TrendListItemComponent implements OnInit {
  IMG_URL: any;
  @Input() item: any;
  constructor() { }

  getDetails(id : number){


  }
  ngOnInit(): void {
    this.IMG_URL = IMG_URL



  }


}
