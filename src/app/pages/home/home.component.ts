import { Component, inject } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SearchComponent } from '../../components/search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { TranslatePipe } from '../../pips/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoaderComponent, SearchComponent, NotFoundComponent,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingService = inject(HousingService);
  router = inject(Router);
  i18nService = inject(I18nService);
  isLoading = true;

  ngOnInit() {
    this.fetchHouseList();
  }

  fetchHouseList() {
    this.housingService.loadHouseList().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCardClick(houseId: number) {
    this.router.navigateByUrl(`/details/${houseId}`);
  }

  toggleLanguage(lang: 'en' | 'ar') {
    this.i18nService.setLanguage(lang);
  }
}
