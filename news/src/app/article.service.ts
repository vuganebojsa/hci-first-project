import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, Articles } from './models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  api_key:string = "apiKey=88e547128e4b4e07b5f32f7946b4b666";
  base_url: string = "https://newsapi.org/v2/";

  private selectedArticle$ = new BehaviorSubject<Article>(null);
  selectedArticleValue$ = this.selectedArticle$.asObservable();
  setSelectedArticle(article: Article){
    this.selectedArticle$.next(article);
  }
  
  constructor(private http: HttpClient) { }

  getTopArticles(): Observable<Articles>{
    return this.http.get<Articles>(this.base_url + 'top-headlines?country=us&' + this.api_key);
  }
}