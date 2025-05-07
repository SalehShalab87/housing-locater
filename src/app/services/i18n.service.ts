import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private langKey = 'lang';
  private lang$ = new BehaviorSubject<'en' | 'ar'>('en');
  private translations: { [key: string]: any } = {};

  constructor(private http: HttpClient) {
    const storedLang = localStorage.getItem(this.langKey) as 'en' | 'ar';
    this.setLanguage(storedLang || 'en');
  }

  get language$() {
    return this.lang$.asObservable();
  }

  setLanguage(lang: 'en' | 'ar') {
    localStorage.setItem(this.langKey, lang);
    this.lang$.next(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    this.http
      .get<{ [key: string]: string }>(`/assets/i18n/${lang}.json`)
      .subscribe((data) => (this.translations = data));
  }

  translate(key: string): string {
    const keys = key.split('.');

    // Use reduce to traverse the nested structure
    const translation = keys.reduce((obj, keyPart) => obj?.[keyPart], this.translations);

    return typeof translation === 'string' ? translation : key;
  }

  get currentLang(): 'en' | 'ar' {
    return this.lang$.value;
  }
}
