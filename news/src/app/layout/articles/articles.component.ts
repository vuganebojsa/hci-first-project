import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/article.service';
import { Article, Articles } from 'src/app/models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  articles: Article[];
  totalArticles:number;
  articlesWithStatus: Articles;
  hasLoaded: boolean = false;

  constructor(private articleService:ArticleService, private router: Router){
  }
  ngOnInit(): void {
    this.articleService.getTopArticles().subscribe({
      next:(result) =>{
        console.log(result);
        this.articlesWithStatus = result;
        this.totalArticles = this.articlesWithStatus.totalResults;
        this.articles = this.articlesWithStatus.articles;
        this.hasLoaded = true;
      },
      error:(error) =>{
        console.log(error);
      }
    })
  }
  openArticle(article: Article){
    this.articleService.setSelectedArticle(article);
    this.router.navigate(['/article/' + article.title]);
    
  }

}
