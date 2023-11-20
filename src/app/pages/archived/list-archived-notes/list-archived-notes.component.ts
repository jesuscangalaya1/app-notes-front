import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../../services/note.service";
import {DetailsNotesComponent} from "../../notes/details-notes/details-notes.component";
import {MatDialog} from "@angular/material/dialog";
import {EditNotesComponent} from "../../notes/edit-notes/edit-notes.component";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-list-archived-notes',
  templateUrl: './list-archived-notes.component.html',
  styleUrls: ['./list-archived-notes.component.scss']
})
export class ListArchivedNotesComponent implements OnInit {
  notes: any[] | undefined;
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 4;

  constructor(private noteService: NoteService,
              private dialog: MatDialog,
              private alertService: SweetAlertService,


  ) { }

  ngOnInit() {
    this.loadArchivedNotes();
  }

  loadArchivedNotes() {
    this.noteService.getAllArchivedNotes(this.currentPage, this.pageSize).subscribe(response => {
      this.notes = response.data.content;
      this.totalItems = response.data.totalElements;
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
      title: 'Confirmación',
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
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            },
            (error) => {
              console.log(error);
              this.alertService.notification('Error deleting a note', 'error');
            }
          );
      }
    });
  }

  openDetailsDialog(noteId: number) {
    this.noteService.getByIdNote(noteId).subscribe(response => {
      this.dialog.open(DetailsNotesComponent, {
        width: '400px',
        data: { note: response.data }
      });
    });
  }

  openEditDialog(note: any) {
    const dialogRef = this.dialog.open(EditNotesComponent, {
      width: '500px',
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadArchivedNotes();
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
  onPageChange(pageNo: number) {
    this.currentPage = pageNo;
    this.loadArchivedNotes();
  }
}
