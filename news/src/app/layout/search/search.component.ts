import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/article.service';
import { Source, Sources } from 'src/app/models/article';

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
        console.log(result);
        this.sourcesWithStatus = result;
        this.sources = this.sourcesWithStatus.sources
        console.log(this.sources)
        
      },
      error:(error) =>{
        console.log(error);
      }
    })
    //Vrati sve opcije moguce
  }

  search(){

    this.hasSelected = true;
    console.log(this.getStartDateValue());
    console.log(this.getEndDateValue());
    console.log(this.keyword);
    
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
