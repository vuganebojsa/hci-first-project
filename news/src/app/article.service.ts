import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, Articles,  Sources } from './models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  api_key:string = "apiKey=88e547128e4b4e07b5f32f7946b4b666";
  base_url: string = "https://newsapi.org/v2/";
  
  base_url_everything: string = "https://newsapi.org/v2/everything?";

  private selectedArticle$ = new BehaviorSubject<Article>(null);
  selectedArticleValue$ = this.selectedArticle$.asObservable();

  setSelectedArticle(article: Article){
    this.selectedArticle$.next(article);
  }

  private selectedCountry$ = new BehaviorSubject<string>(null);
  selectedCountryValue$ = this.selectedArticle$.asObservable();

  setSelectedCountry(country: string){
    this.selectedCountry$.next(country);
  }

  private selectedSource$ = new BehaviorSubject<string>(null);
  selectedSourceValue$ = this.selectedSource$.asObservable();

  setSelectedSource(source: string){
    this.selectedSource$.next(source);
  }

  private selectedCategory$ = new BehaviorSubject<string>(null);
  selectedCategoryValue$ = this.selectedCategory$.asObservable();

  setSelectedCategory(category: string){
    this.selectedCategory$.next(category);
  }

  private selectedTitle$ = new BehaviorSubject<string>(null);
  selectedTitleValue$ = this.selectedTitle$.asObservable();

  setSelectedTitle(title: string){
    this.selectedTitle$.next(title);
  }

  private selectedStartTime$ = new BehaviorSubject<string>(null);
  selectedStartTimeValue$ = this.selectedTitle$.asObservable();

  setSelectedStartTime(selectedStartTime: string){
    this.selectedStartTime$.next(selectedStartTime);
  }

  private selectedEndTime$ = new BehaviorSubject<string>(null);
  selectedEndTimeValue$ = this.selectedEndTime$.asObservable();

  setSelectedEndTime(selectedEndTime: string){
    this.selectedEndTime$.next(selectedEndTime);
  }


  private noNews$ = new BehaviorSubject<boolean>(false);
  noNewsValue$ = this.noNews$.asObservable();

  setNoNews(noNews: boolean){
    this.noNews$.next(noNews);
  }


  constructor(private http: HttpClient) { }

  getTopArticles(page:number, pageSize:number): Observable<Articles>{
    return this.http.get<Articles>(this.base_url + "top-headlines?country=us&page=" + page.toString() + "&pageSize=" + pageSize.toString() + "&" + this.api_key);
  }
  getAllSources(): Observable<Sources>{
    return this.http.get<Sources>(this.base_url + 'top-headlines/sources?' + this.api_key);
  }

  getArticleByKeyword(keyword:string): Observable<Article>{
    return this.http.get<Article>(this.base_url + 'q=' + keyword + '&' + this.api_key);
  }

  getArticlesByParameters(...params: string[]): Observable<Articles>{
    // domains:bbc, 
    // source cant go with category or country
    let paramsValue = '';
    return this.http.get<Articles>(this.base_url_everything + paramsValue + '&' + this.api_key);
  }


}
