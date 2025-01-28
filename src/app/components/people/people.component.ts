import { Component } from '@angular/core';
import { MtpCardComponent } from "../shared/mtp-card/mtp-card.component";
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { Person } from '../../interfaces/person';
import { PaginationComponent } from "../shared/pagination/pagination.component";

@Component({
  selector: 'app-people',
  imports: [MtpCardComponent, PaginationComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  people: Person[] = []
  subscription: any;
  loading: boolean = true;
  errorMsg: string = ''
  currentPage: number = 1;
  totalPages!: number;
  constructor(private movieService: MovieService) { }

  getPersons() {
    return this.movieService.getTrending('person', 'week' , this.currentPage).subscribe({
      next: (data) => {
        this.people = data.results
        this.totalPages = data.total_pages
        this.loading = false
      },
      error: (error) => {
        this.errorMsg = error
        this.loading = false

      }
    })
  }
  searchPerson(e: Event): void {
    const target = e.target as HTMLInputElement
    const query = target.value.trim().toLowerCase()
    if (query.length >= 2) {
      this.loading = true
      this.movieService.searchMedia('person', query).subscribe({
        next: (data) => {
          this.people = data.results
          this.loading = false
        },
        error: (err) => {
          this.errorMsg = err
          this.loading = false

        }
      })
    } else {
      this.subscription = this.getPersons()
    }
    // this.movieService.searchMedia('movie',)
  }
  getPage(num: number) {
    this.currentPage = num
    this.subscription = this.getPersons()
  }
  ngOnInit(): void {
    this.subscription = this.getPersons()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
