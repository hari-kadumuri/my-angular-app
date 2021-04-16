import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatizationtoolComponent } from 'src/app/templatizationtool/templatizationtool.component';

const routes: Routes = [
  { path: "templatizationtool", component: TemplatizationtoolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
