import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../../services/note.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private categoryService: CategoryService, private notesService: SearchService) {
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      this.categoryService.getNotesByCategoryName(this.searchTerm).subscribe(
        notes => {
          this.notesService.updateNotesList(notes);
        },
        error => {
          console.error('Error al buscar notas', error);
        }
      );
    } else {
      this.notesService.loadAllNotes();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }
}
