import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  @Input() article: Article;

  constructor(private articleService: ArticleService, private router: Router){
    
  }
  openArticle(article: Article){
    this.articleService.setSelectedArticle(article);
    this.router.navigate(['/article/' + article.title]);
    
  }
}
