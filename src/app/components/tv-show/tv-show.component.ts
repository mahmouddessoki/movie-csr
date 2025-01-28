import { Component } from '@angular/core';
import { MtpCardComponent } from "../shared/mtp-card/mtp-card.component";
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { PaginationComponent } from "../shared/pagination/pagination.component";

@Component({
  selector: 'app-tv-show',
  imports: [MtpCardComponent, PaginationComponent],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.scss'
})
export class TvShowComponent {

  tvShows: Movie[] = []
  subscription: any;
  loading: boolean = true;
  errorMsg: string = ''
  currentPage: number = 1;
  totalPages!: number;
  constructor(private movieService: MovieService) { }

  getTvShows() {
    return this.movieService.getTrending('tv', 'week' , this.currentPage).subscribe({
      next: (data) => {
        this.tvShows = data.results
        this.totalPages = data.total_pages
        this.loading = false
      },
      error: (error) => {
        this.errorMsg = error
        this.loading = false

      }
    })
  }
  searchTvShows(e: Event): void {
    const target = e.target as HTMLInputElement
    const query = target.value.trim().toLowerCase()
    if (query.length >= 2) {
      this.loading = true
      this.movieService.searchMedia('tv', query).subscribe({
        next: (data) => {
          this.tvShows = data.results
          this.loading = false
        },
        error: (err) => {
          this.errorMsg = err
          this.loading = false

        }
      })
    } else {
      this.subscription = this.getTvShows()
    }
    // this.movieService.searchMedia('movie',)
  }
  getPage(num: number) {
    this.currentPage = num
    this.subscription = this.getTvShows()
  }
  ngOnInit(): void {
    this.subscription = this.getTvShows()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }



}
