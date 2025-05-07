import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { House } from '../../models/house.model';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TranslatePipe } from '../../pips/translate.pipe';
import { I18nService } from '../../services/i18n.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [NotFoundComponent, LoaderComponent,TranslatePipe,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  activeRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  i18nService = inject(I18nService);
  router = inject(Router);
  houseId: number | null = null;
  houseDetails: House | null = null;
  isLoading = true;

  ngOnInit() {
    this.getHouseIdFromRoute();
    this.fetchHouseDetails(this.houseId);
  }

  getHouseIdFromRoute(): void {
    this.houseId = Number(this.activeRoute.snapshot.paramMap.get('id'));
  }

  fetchHouseDetails(houseId: number | null): void {
    if (houseId !== null) {
      this.housingService.getHouseDetails(houseId).subscribe({
        next: (house: House) => {
          this.houseDetails = house;
          this.isLoading = false;
        },
        error: () => {
          this.houseDetails = null;
          this.isLoading = false;
        },
      });
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  get currentLang(): 'en' | 'ar' {
    return this.i18nService.currentLang;
  }
}
