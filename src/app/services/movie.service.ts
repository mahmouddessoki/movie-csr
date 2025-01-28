import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY } from '../components/home/api.config';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) { }

  getTrending(media: string, window_time: string , page : number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/${media}/${window_time}?api_key=${API_KEY}&page=${page}`)
  }

  searchMedia(media: string, query: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&query=${query}`)
  }

  getMediaDetails(media: string, id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}`)
  }


}
