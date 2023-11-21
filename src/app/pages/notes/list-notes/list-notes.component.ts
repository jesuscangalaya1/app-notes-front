import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../../services/note.service";
import {EditNotesComponent} from "../edit-notes/edit-notes.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailsNotesComponent} from "../details-notes/details-notes.component";
import {CategoryService} from "../../../services/category.service";
import {EditCategoryComponent} from "../../categories/edit-category/edit-category.component";
import {SearchService} from "../../../services/search.service";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {CreateCategoryComponent} from "../../categories/create-category/create-category.component";

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {
  notes: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 4;

  categories: any[] | undefined;
  selectedCategoryId: number | undefined;
  filterCategoryName: any;

  constructor(private noteService: NoteService,
              private dialog: MatDialog,
              private categoryService: CategoryService,
              private searchService: SearchService,
              private alertService: SweetAlertService,

  ) {
  }

  ngOnInit() {
    this.loadNotes();
    this.loadCategories();
    this.searchService.currentNotes.subscribe(
      updatedNotes => {
        if (updatedNotes && updatedNotes.length > 0) {
          this.notes = updatedNotes;
        }else {
          this.loadNotes()
        }
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data.content;
    });
  }


  loadNotes() {
    this.noteService.getNotes(this.currentPage, this.pageSize).subscribe(response => {
      this.notes = response.data.content;
      this.totalItems = response.data.totalElements;
    });
  }

  onPageChange(pageNo: number) {
    this.currentPage = pageNo;
    this.loadNotes();
  }


  openEditDialog(note: any) {
    const dialogRef = this.dialog.open(EditNotesComponent, {
      width: '500px',
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNotes();
    });
  }

  openDetailsDialog(noteId: number) {
    this.noteService.getByIdNote(noteId).subscribe(response => {
      this.dialog.open(DetailsNotesComponent, {
        width: '450px',
        data: { note: response.data }
      });
    });
  }

  deleteNote(id: number) {
    const customSwalClass: SweetAlertOptions['customClass'] = {
      container: 'custom-swal-container',
      title: 'custom-swal-title',
      confirmButton: 'btn btn-confirmation custom-confirm-button',
      cancelButton: 'swal2-cancel custom-cancel-button',
    };

    Swal.fire({
      title: 'Confirmation',
      html: 'Are you sure you want to delete this note?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#2980b9',
      confirmButtonText: 'Eliminate',
      cancelButtonText: 'Cancel',
      customClass: customSwalClass,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.deleteNote(id)
          .subscribe(
            () => {
              console.log('User deleted successfully!');
              this.alertService.notification('Deleted note', 'success');
              this.loadNotes();
            },
            (error) => {
              console.log(error);
              this.alertService.notification('Error deleting a note', 'error');
            }
          );
      }
    });
  }

  toggleArchiveStatus(noteId: number, archived: boolean) {
    this.noteService.archiveUnarchiveNote(noteId, !archived).subscribe(() => {
      this.alertService.notification(archived ? 'unarchived note' : 'Archived note', 'success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }

  assignCategoryToNote(categoryId: number, noteId: number) {
    this.categoryService.addCategoryToNote(categoryId, noteId).subscribe(() => {
      console.log('Categoría asignada a la nota');
      this.alertService.notification('Assigned category!', 'success');

      this.loadNotes();
      this.updateNoteInList(noteId, categoryId);
    });
  }

  updateNoteInList(noteId: number, categoryId: number) {
    let note = this.notes.find(n => n.id === noteId);
    if (note) {
      note.categoryId = categoryId;

    }
  }
  removeCategoryFromNote(categoryId: number, noteId: number) {
    this.categoryService.removeCategoryFromNote(categoryId, noteId).subscribe(() => {
      console.log('Categoría eliminada de la nota');
      this.alertService.notification('Note successfully deleted!', 'success');
      this.loadNotes();

    }, error => {
      console.error('Error al eliminar la categoría de la nota', error);
      this.alertService.notification('Error ! ', 'error');

    });
  }

  openEditCategoryDialog(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '450px',
      data: { ...category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(result);

      }
    });
  }

  updateCategory(category: any): void {
    this.categoryService.updateCategory(category.id, category).subscribe(
      response => {

        console.log('Categoría actualizada', response);

        this.alertService.notification('Category successfully updated!', 'success');
        setTimeout(() => {
          this.loadNotes();
          location.reload();
        }, 1000);
      },
      error => {
        console.error('Error al actualizar la categoría', error);
      }
    );
  }
  openAssignCategoryDialog(note: any) {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: { note: note, categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(selectedCategoryId => {
      if (selectedCategoryId) {
        this.assignCategoryToNote(selectedCategoryId, note.id);
      }
    });
  }
}

