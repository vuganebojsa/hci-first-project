import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  ngOnInit(): void {
    //Vrati sve opcije moguce
  }

  search(){

    this.hasSelected = true;
    console.log(this.chosenDateTime.value.start);
    console.log(this.chosenDateTime.value.end);
    console.log(this.keyword);
    
  }

}
