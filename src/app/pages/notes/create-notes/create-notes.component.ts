import { Component } from '@angular/core';
import {NoteService} from "../../../services/note.service";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent {
  newNote = {
    title: '',
    description: '',
    categoryIds: []
  };
  noteCreated = false;
  constructor(private noteService: NoteService,
              private alertService: SweetAlertService,
              ) { }

  submitNote() {
    this.noteService.createNote({
      noteRequest: {
        title: this.newNote.title,
        description: this.newNote.description
      },
      categoryIds: this.newNote.categoryIds
    }).subscribe(response => {
      console.log('Nota creada:', response);
      this.alertService.notification('Note create successfully!', 'success');

      this.resetForm();
      this.noteCreated = true;
      setTimeout(() => this.noteCreated = false, 2000);

    });
  }

  resetForm() {
    this.newNote = {
      title: '',
      description: '',
      categoryIds: []
    };
  }
}
