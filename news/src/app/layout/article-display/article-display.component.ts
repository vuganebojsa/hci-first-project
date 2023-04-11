import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-display',
  templateUrl: './article-display.component.html',
  styleUrls: ['./article-display.component.css']
})
export class ArticleDisplayComponent implements OnInit{
  hasLoaded: boolean = false;
  article: Article;
  source: string = '';
  constructor(private articleService: ArticleService){

  }
  ngOnInit(): void {
    this.article = JSON.parse(localStorage.getItem('article')) as Article;
    this.hasLoaded = true;
    this.splitSource();
    this.splitContent();

  }
  splitContent(): void{
    if(this.article.content === null || this.article.content === undefined) return;
    const parts = this.article.content.split("[");
    const result = parts[0];
    this.article.content = result;
  
  }
  splitSource(): void{
    if(this.article.url === null || this.article.url === undefined) return;
    let url: string = this.article.url.toString();
    // const splitIndex: number = url.indexOf(".com") + 4; // find the index of ".com" and add 4 to include those characters
    // const domain: string = url.slice(0, splitIndex); // extract the domain including ".com"
    // const path: string = url.slice(splitIndex);
    const domain: string = new URL(url).origin;
    this.source = domain;
  }


}
