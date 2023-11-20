import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = environment.apiUrlNotes;

  constructor(private http: HttpClient) { }

  getNotes(pageNo: number = 1, pageSize: number = 10, sortBy: string = 'id', sortDir: string = 'asc'): Observable<any> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<any>(`${this.apiUrl}/pagination`, { params });
  }

  createNote(noteCreationRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, noteCreationRequest);
  }
  updateNote(id: number, noteRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, noteRequest);
  }

  getByIdNote(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, null);
  }
  archiveUnarchiveNote(id: number, archived: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/archive?archived=${archived}`, null);
  }

  getAllArchivedNotes(pageNo: number = 1, pageSize: number = 10, sortBy: string = 'id', sortDir: string = 'asc'): Observable<any> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<any>(`${this.apiUrl}/archived`, { params });
  }

  getAllDeletedNotes(pageNo: number = 1, pageSize: number = 10, sortBy: string = 'id', sortDir: string = 'asc'): Observable<any> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<any>(`${this.apiUrl}/deleted`, { params });
  }

  restoreNote(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/restore`, null);
  }
  deleteNoteById(noteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${noteId}`);
  }

}
