import { Component, HostListener, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,InputTextModule, FloatLabel,TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchForm!: FormGroup;
  housingService = inject(HousingService);
  fb = inject(FormBuilder);

  ngOnInit() {
    this.inilizeForm();
    this.onInputChange();
  }

  inilizeForm() {
    this.searchForm = this.fb.group({
      city: ['', Validators.minLength(3)],
    });
  }

  onInputChange() {
    this.searchForm.get('city')?.valueChanges.subscribe((value) => {
      if (this.searchForm.valid || value.length >= 3) {
        this.housingService.searchByCity(value).subscribe();
      } else {
        this.housingService.loadHouseList().subscribe();
      }
    });
  }
}
