import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListNotesComponent} from "./pages/notes/list-notes/list-notes.component";
import {CreateNotesComponent} from "./pages/notes/create-notes/create-notes.component";
import {ListArchivedNotesComponent} from "./pages/archived/list-archived-notes/list-archived-notes.component";
import {ListDeletedNotesComponent} from "./pages/bin/list-deleted-notes/list-deleted-notes.component";
import {ListCategoriesComponent} from "./pages/categories/list-categories/list-categories.component";

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'list', component: ListNotesComponent },
  { path: 'create-note', component: CreateNotesComponent },
  { path: 'archived', component: ListArchivedNotesComponent },
  { path: 'deleted', component: ListDeletedNotesComponent },
  { path: 'categories', component: ListCategoriesComponent },
];
  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
