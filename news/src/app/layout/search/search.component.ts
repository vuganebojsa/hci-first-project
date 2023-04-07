import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/article.service';
import { Article, Source, Sources } from 'src/app/models/article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  chosenDateTime = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  hasSelected: boolean = false
  source: string = '';
  category: string = '';
  country: string = '';
  title: string = '';
  keyword: string = '';
  startDate: string = '';
  endDate: string = '';
  sources: Source[];
  sourcesWithStatus: Sources;
  constructor(private articleService:ArticleService){
  }
  ngOnInit(): void {
    this.articleService.getAllSources().subscribe({
      next:(result) =>{
        this.sourcesWithStatus = result;
        this.sources = this.sourcesWithStatus.sources
        this.resetArticles();
      },
      error:(error) =>{
        console.log(error);
      }
    })
    //Vrati sve opcije moguce
  }
  resetArticles():void{
    this.articleService.setNewArticles(null);
    this.chosenDateTime.value.end = null;
    this.chosenDateTime.value.start = null;
  }
  search(){

    this.hasSelected = true;
    let values:  Array<string>;
    values = [];
    if(this.country === null) this.country = '';
    if(this.category === null) this.category = '';
    if(this.title === null) this.title = '';
    if(this.source === null) this.source = '';
    this.country = this.country.trim();
    this.category = this.category.trim();
    this.source = this.source.trim();
    this.title = this.title.trim();
    if(this.country !== '') values.push('country='+this.country);
    if(this.category !== '') values.push('category='+this.category);
    if(this.source !== '') values.push('sources='+this.source);
    if(this.title !== '') values.push('q='+this.title);
    if(this.country !== '' && this.source !== ''){
      alert('Mixing country and source is not possible. Try one without another.');
      return;
    }
    if(this.category !== '' && this.source !== ''){
      alert('Mixing category and source is not possible. Try one without another.');
      return;
    }
    
    const start = this.chosenDateTime.value.start;
    const end = this.chosenDateTime.value.end;
    if(start !== null)
      start.setHours(0, 0, 0 , 0);
    if(end !== null)
      end.setHours(23, 59, 59, 59);

    this.articleService.getArticlesByParameters(values, 0, 100).subscribe({

      next:(result) =>{
        if(result.totalResults !== 0) {
            let actualResults: Array<Article>;
            actualResults = [];
            if((start != null && end != null)){
              for(let article  of result.articles){
                const publishDate = new Date(article.publishedAt); 
                if(start <= publishDate  && publishDate <= end)
                {
                  actualResults.push(article);
                }
              }
              this.articleService.setNewArticles(actualResults);

              return;

        
            }else if(start === null && end !== null){
              for(let article  of result.articles){
                const publishDate = new Date(article.publishedAt); 
                if(publishDate <= end)
                {
                  actualResults.push(article);
                }
              }
              this.articleService.setNewArticles(actualResults);
              return;

        
            }else if(start !== null && end === null){
              for(let article  of result.articles){
                const publishDate = new Date(article.publishedAt); 
                if(start <= publishDate)
                {
                  actualResults.push(article);
                }
              }
              this.articleService.setNewArticles(actualResults);
              return;
            }

            this.articleService.setNewArticles(result.articles);

        }else{
          alert('No articles found by given criteria.');
        }
      },
      error:(error) =>{
        console.log(error);
      }
    })
    
    
  }


  getStartDateValue(){
    let start_year: string = this.chosenDateTime.value.start!.getFullYear().toString();
      let start_month: string = (this.chosenDateTime.value.start!.getMonth() + 1).toString();
      if (this.chosenDateTime.value.start!.getMonth() + 1 < 10) {
        start_month = "0" + start_month;
      }
      let start_date: string = this.chosenDateTime.value.start!.getDate().toString();
      if (this.chosenDateTime.value.start!.getDate() < 10) {
        start_date = "0" + start_date;
      }
      let start: string =
        start_year +
        "-" +
        start_month +
        "-" +
        start_date;
      return start;
      
  }

  getEndDateValue(){
    let end_year: string = this.chosenDateTime.value.end!.getFullYear().toString();
      let end_month: string = (this.chosenDateTime.value.end!.getMonth() + 1).toString();
      if (this.chosenDateTime.value.end!.getMonth() + 1 < 10) {
        end_month = "0" + end_month;
      }
      let end_date: string = this.chosenDateTime.value.end!.getDate().toString();
      if (this.chosenDateTime.value.end!.getDate() < 10) {
        end_date = "0" + end_date;
      }
      let end: string =
        end_year +
        "-" +
        end_month +
        "-" +
        end_date;
      return end;
  }

}
