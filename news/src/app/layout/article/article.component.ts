import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  @Input() article: Article;
  source: string = '';

  constructor(private articleService: ArticleService, private router: Router){
  }
  ngOnInit(): void {
    this.splitSource();
  }

  splitSource(): void{
    if(this.article.url === null || this.article.url === undefined) return;
    let url: string = this.article.url.toString();
    console.log(url);
    // const splitIndex: number = url.indexOf(".com") + 4; // find the index of ".com" and add 4 to include those characters
    // const domain: string = url.slice(0, splitIndex); // extract the domain including ".com"
    // const path: string = url.slice(splitIndex);

    const domain: string = new URL(url).hostname;
    this.source = domain;
  }
  openArticle(article: Article){
    this.articleService.setSelectedArticle(article);
    localStorage.setItem('article', JSON.stringify(article));
    this.router.navigate(['/article/' + article.title]);

  }
}
