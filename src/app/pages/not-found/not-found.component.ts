import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink,TranslatePipe,CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  @Input() isSearchMode: boolean = false;
}
