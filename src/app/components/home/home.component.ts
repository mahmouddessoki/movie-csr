import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrendTextComponent } from "./trend-text/trend-text.component";
import { TrendListItemComponent } from "./trend-item/trend-list-item.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { Tv } from '../../interfaces/tv';

@Component({
  selector: 'app-home',
  imports: [TrendTextComponent, TrendListItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  trendMovie: Movie[] = [];
  trendTv: Tv[] = [];
  movieSubscribe: any;
  tvSubscribe: any;
  loading: boolean = true;
  errorMsg: string = ''
  constructor(private movieService: MovieService) { }
  getTrendMedia(mediaType: string, query: string) {
    this.loading = true;
    return this.movieService.getTrending(mediaType, 'day' , 1).subscribe({
      next: (response) => {
        let res: any = [];
        this.loading = false;
        if (query !== '') {
          response.results.forEach((elem: any) => {
            if (mediaType === 'movie') {

              if (elem?.original_title.toLowerCase().includes(query)) {
                res.push(elem)
              }
            } else {
              if (elem?.original_name.toLowerCase().includes(query)) {
                res.push(elem)
              }
            }
          })
        } else {
          res = response.results
        }
        res = res.slice(0, 11)// get only 11 items
        if (mediaType === 'movie') { this.trendMovie = res }
        else { this.trendTv = res }
      },
      error: (error) => {
        this.errorMsg = error;
      }
    })
  }
  searchTrendMovie(e: Event): void {
    const target = e.target as HTMLInputElement
    const query = target.value.trim().toLowerCase()
    this.getTrendMedia('movie', query)
  }
  searchTrendTV(e: Event): void {
    const target = e.target as HTMLInputElement
    const query = target.value.trim().toLowerCase()
    console.log(query)
    this.getTrendMedia('tv', query)
  }


  ngOnInit(): void {
    this.movieSubscribe = this.getTrendMedia('movie', '')
    this.tvSubscribe = this.getTrendMedia('tv', '')
  }
  ngOnDestroy(): void {
    this.movieSubscribe.unsubscribe()
    this.tvSubscribe.unsubscribe()
  }


}
