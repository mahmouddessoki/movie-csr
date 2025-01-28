import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { IMG_URL } from '../home/api.config';

@Component({
  selector: 'app-mt-details',
  imports: [],
  templateUrl: './mt-details.component.html',
  styleUrl: './mt-details.component.scss'
})
export class MtDetailsComponent {
  id!: string;
  mediaType!: string;
  mediaDetail:any;
  subscription : any;
  IMG_URL: string = IMG_URL
  constructor(private route: ActivatedRoute , private movieService : MovieService) {
  }

  getMediaDetails(){
   this.subscription= this.movieService.getMediaDetails(this.mediaType , +this.id).subscribe({
      next: (data) => {
        this.mediaDetail = data;
      }
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.mediaType = this.route.snapshot.params['media']
    this.getMediaDetails()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
