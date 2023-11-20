import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-details-notes',
  templateUrl: './details-notes.component.html',
  styleUrls: ['./details-notes.component.scss']
})
export class DetailsNotesComponent implements OnInit {
  note: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.note = data.note;
  }

  ngOnInit(): void {
  }
}
