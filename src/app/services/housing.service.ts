import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { House } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  houseList: House[] = [];
  http = inject(HttpClient);
  private appUrl = 'http://localhost:3000/locations';
  isSearchMode: boolean = false;

  getAllHousingLocations(): Observable<House[]> {
    return this.http.get<House[]>(this.appUrl);
  }

  getHousingLocationById(id: number): Observable<House> {
    return this.http.get<House>(`${this.appUrl}/${id}`);
  }

  loadHouseList(): Observable<void> {
    return this.getAllHousingLocations().pipe(
      tap((houseArray: House[]) => {
        this.houseList = houseArray;
      }),
      map(() => void 0)
    );
  }

  getHouseDetails(houseId:number): Observable<House> {
    return this.getHousingLocationById(houseId)
  }

  searchByCity(city: string): Observable<House[]> {
    return this.getAllHousingLocations().pipe(
      map((houseCities) => houseCities.filter((House) =>
        House.city.toLowerCase().startsWith(city.toLowerCase())
      )),
      tap((filteredLocations) => {
        this.houseList = filteredLocations;
        this.isSearchMode = true;
      })
    );
  }
}
