import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../../services/note.service";
import {MatDialog} from "@angular/material/dialog";

import {SweetAlertService} from "../../../services/alert/sweet-alert.service";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-list-deleted-notes',
  templateUrl: './list-deleted-notes.component.html',
  styleUrls: ['./list-deleted-notes.component.scss']
})
export class ListDeletedNotesComponent  implements OnInit {
  notes: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 4;

  constructor(private noteService: NoteService,
              private dialog: MatDialog,
              private alertService: SweetAlertService,
  ) { }

  ngOnInit() {
    this.loadDeletedNotes();
  }

  loadDeletedNotes() {
    this.noteService.getAllDeletedNotes(this.currentPage, this.pageSize).subscribe(response => {
      this.notes = response.data.content;
      this.totalItems = response.data.totalElements;
    });
  }

  restoreDeletedNote(id: number) {
    this.noteService.restoreNote(id).subscribe(() => {
      this.alertService.notification('Restored note', 'success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }


  onPageChange(pageNo: number) {
    this.currentPage = pageNo;
    this.loadDeletedNotes();
  }

  deleteNotePermanently(noteId: number) {
    const customSwalClass: SweetAlertOptions['customClass'] = {
      container: 'custom-swal-container',
      title: 'custom-swal-title',
      confirmButton: 'btn btn-confirmation custom-confirm-button',
      cancelButton: 'swal2-cancel custom-cancel-button',
    };

    Swal.fire({
      title: 'Confirmation',
      html: 'Are you sure you want to permanently delete this note?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#2980b9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: customSwalClass,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.deleteNoteById(noteId).subscribe(() => {
            this.notes = this.notes.filter(note => note.id !== noteId);
          },
          (error) => {
            console.log(error);
            this.alertService.notification('Error deleting a note', 'error');
          }
        );
      }
    });
  }



}
