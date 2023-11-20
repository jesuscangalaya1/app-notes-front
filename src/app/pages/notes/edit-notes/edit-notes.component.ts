import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoteService} from "../../../services/note.service";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  note: any;

  constructor(
    private dialogRef: MatDialogRef<EditNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService,
    private alertService: SweetAlertService,
  ) {
    this.note = { ...data.note };
  }

  ngOnInit(): void {
    }

  submitNote() {
    this.noteService.updateNote(this.note.id, this.note).subscribe(response => {
      console.log('Nota actualizada:', response);
      this.alertService.notification('Note updated successfully!', 'success');

      this.dialogRef.close();
    });
  }

  cancelEdit() {
    this.dialogRef.close();
  }

}
