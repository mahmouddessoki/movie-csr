import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MtDetailsComponent } from './components/mt-details/mt-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'movies', loadComponent: () => import("./components/movie/movie.component").then(c => c.MovieComponent), title: "Movies" },
  { path: 'tvshow', loadComponent: () => import("./components/tv-show/tv-show.component").then(c => c.TvShowComponent), title: "TV Show" },
  { path: 'people', loadComponent: () => import("./components/people/people.component").then(c => c.PeopleComponent), title: "People" },
  { path: 'details/:media/:id', component: MtDetailsComponent, title: 'Details' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", component: NotfoundComponent }

];
