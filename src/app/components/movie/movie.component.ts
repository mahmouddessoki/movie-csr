import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { MtpCardComponent } from "../shared/mtp-card/mtp-card.component";
import { PaginationComponent } from "../shared/pagination/pagination.component";

@Component({
  selector: 'app-movie',
  imports: [MtpCardComponent, PaginationComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit, OnDestroy {
  movies: Movie[] = []
  subscription: any;
  loading: boolean = true;
  errorMsg: string = ''
  currentPage : number = 1;
  totalPages!:number;
  constructor(private movieService: MovieService) { }

  getMovies() {
    return this.movieService.getTrending('movie', 'week' , this.currentPage).subscribe({
      next: (data) => {
        this.movies = data.results
        this.totalPages = data.total_pages
        this.loading = false
      },
      error: (error) => {
        this.errorMsg = error
        this.loading = false

      }

    })
  }
  getPage(num : number){
    this.currentPage = num
    this.subscription = this.getMovies()
  }
  ngOnInit(): void {
    this.subscription = this.getMovies()
  }

  searchMovie(e: Event): void {

    const target = e.target as HTMLInputElement
    const query = target.value.trim().toLowerCase()
    if (query.length >= 2) {
      this.loading = true
      this.movieService.searchMedia('movie', query).subscribe({
        next: (data) => {
          this.movies = data.results
          this.loading = false
        } ,
        error:(err)=>{
          this.errorMsg = err
          this.loading = false

        }
      })
    } else {
      this.subscription = this.getMovies()
    }
  }
  getNextPage(){
    if(this.currentPage < this.totalPages){

      this.currentPage += 1
      this.subscription = this.getMovies()
    }

  }
  getPrevPage(){
    if(this.currentPage > 1){

      this.currentPage -= 1
      this.subscription = this.getMovies()

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
