import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SearchComponent } from './layout/search/search.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { ArticleDisplayComponent } from './layout/article-display/article-display.component';
import { HomeComponent } from './layout/home/home.component';
import { ArticlesComponent } from './layout/articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './layout/article/article.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ArticleDisplayComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        MatButtonModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
