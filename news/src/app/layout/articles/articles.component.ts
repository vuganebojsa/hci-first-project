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
  page = 0;
  pageSize = 10;
  selectedShowNumber = 10;
  totalCount = 0;
  constructor(private articleService:ArticleService){
  }

  ngOnInit(): void {
    this.articleService.newArticlesValue$.subscribe((value) =>{
      if(value !== null) this.articles = value;
      else this.getTopArticles();
    });
    
  }
  getTopArticles():void{

    this.articleService.getTopArticles(this.page, this.pageSize).subscribe({
      next:(result) =>{
        console.log(result);
        this.articlesWithStatus = result;
        this.totalArticles = this.articlesWithStatus.totalResults;
        this.totalCount = this.totalArticles;
        this.articles = this.articlesWithStatus.articles;
        this.hasLoaded = true;
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getTopArticles();
  }



}
