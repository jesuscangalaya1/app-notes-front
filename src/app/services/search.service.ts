import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {NoteService} from "./note.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private notesSource = new BehaviorSubject<any[]>([]);
  currentNotes = this.notesSource.asObservable();
  constructor(private noteService: NoteService) { }

  loadAllNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notesSource.next(notes);
    });
  }

  updateNotesList(notes: any[]): void {
    this.notesSource.next(notes);
  }

}
