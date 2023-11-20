import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ListNotesComponent} from "./pages/notes/list-notes/list-notes.component";
import {HeaderComponent} from "./shared/header/header/header.component";
import {FooterComponent} from "./shared/footer/footer/footer.component";
import { CreateNotesComponent } from './pages/notes/create-notes/create-notes.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import { EditNotesComponent } from './pages/notes/edit-notes/edit-notes.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DetailsNotesComponent } from './pages/notes/details-notes/details-notes.component';
import { ListArchivedNotesComponent } from './pages/archived/list-archived-notes/list-archived-notes.component';
import { ListDeletedNotesComponent } from './pages/bin/list-deleted-notes/list-deleted-notes.component';
import { ListCategoriesComponent } from './pages/categories/list-categories/list-categories.component';
import { CreateCategoryComponent } from './pages/categories/create-category/create-category.component';
import { DetailsCategoryComponent } from './pages/categories/details-category/details-category.component';
import {MatSelectModule} from "@angular/material/select";
import {MatChip, MatChipsModule} from "@angular/material/chips";
import { EditCategoryComponent } from './pages/categories/edit-category/edit-category.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AppComponent,
    ListNotesComponent,
    HeaderComponent,
    FooterComponent,
    CreateNotesComponent,
    EditNotesComponent,
    DetailsNotesComponent,
    ListArchivedNotesComponent,
    ListDeletedNotesComponent,
    ListCategoriesComponent,
    CreateCategoryComponent,
    DetailsCategoryComponent,
    EditCategoryComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatPaginatorModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatChipsModule,
        MatTooltipModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
