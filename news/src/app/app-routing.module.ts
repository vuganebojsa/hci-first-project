import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './layout/article/article.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {path:'home', redirectTo: '', pathMatch:'full', component:HomeComponent},
  {path:'article/:title', component: ArticleComponent},
  {path:'**', redirectTo: '', pathMatch:'full', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
