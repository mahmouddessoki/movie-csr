import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/movie';
import { IMG_URL } from '../../home/api.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mtp-card',
  imports: [RouterLink],
  templateUrl: './mtp-card.component.html',
  styleUrl: './mtp-card.component.scss'
})
export class MtpCardComponent {
  @Input() mtp!: any;
  @Input() mediaType!: string;
  IMG_URL: string = IMG_URL;

}
