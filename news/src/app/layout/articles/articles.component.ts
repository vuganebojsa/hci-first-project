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
  pageSize = 3;
  showLoadMore = true;
  selectedShowNumber = 3;
  totalCount = 0;
  showArticles: Array<Article>;
  constructor(private articleService:ArticleService){
  }

  ngOnInit(): void {
    this.page = 0;
    this.showArticles = [];
    this.articleService.newArticlesValue$.subscribe((value) =>{
      if(value !== null){ 
        this.page = 0;
        this.articles = value; 
        this.showArticles = [];
        this.showLoadMore = true;
        this.totalCount = value.length;
        if(this.totalCount < this.selectedShowNumber){
          for(let i=this.page * this.selectedShowNumber;i<this.totalCount;i++){
            this.showArticles.push(this.articles[i]);
          }
        }else{
          for(let i=this.page * this.selectedShowNumber;i<this.page * this.selectedShowNumber + this.selectedShowNumber;i++){
            this.showArticles.push(this.articles[i]);
          }
        }
       
      }
      else if(value === null) {
        this.getTopArticles();
      }
      
    });
    
  }
  getTopArticles():void{

    this.articleService.getTopArticles(0, 100).subscribe({
      next:(result) =>{
        this.page = 0;
        this.showArticles = [];
        this.showLoadMore = true;
        this.hasLoaded = false;
        this.articlesWithStatus = result;
        this.totalArticles = this.articlesWithStatus.totalResults;
        this.totalCount = this.totalArticles;
        this.articles = this.articlesWithStatus.articles;
        for(let i=this.page * this.selectedShowNumber;i<this.page * this.selectedShowNumber + this.selectedShowNumber;i++){
          if(this.showArticles.includes(this.articles[i]))
            continue;
          this.showArticles.push(this.articles[i]);
        }
        this.hasLoaded = true;
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }


  loadMore():void{
    this.page += 1;
    this.totalCount = this.articles.length;

    if(this.totalCount <= this.page * this.selectedShowNumber) {this.showLoadMore = false;return;}
    if(this.totalCount < this.selectedShowNumber * (this.page + 1)){
      for(let i=this.totalCount - (this.selectedShowNumber * (this.page + 1) - this.totalCount) + 1;i<this.totalCount;i++){
        this.showArticles.push(this.articles[i]);
      }
    }else{
      for(let i=this.page * this.selectedShowNumber;i<this.page * this.selectedShowNumber + this.selectedShowNumber;i++){
        this.showArticles.push(this.articles[i]);
      }
    }
    
  }
}
