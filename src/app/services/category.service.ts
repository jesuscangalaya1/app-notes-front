import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl =  environment.apiUrlCategories;

  constructor(private http: HttpClient) { }

  createCategory(categoryRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, categoryRequest);
  }

  addCategoryToNote(categoryId: number, noteId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${categoryId}/notes/${noteId}/add`, null);
  }

  getCategoryWithNotes(categoryId: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`);
  }

  getAllCategories(pageNo: number = 1, pageSize: number = 60, sortBy: string = 'id', sortDir: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<any>(`${this.apiUrl}/list`, { params });
  }
  removeCategoryFromNote(categoryId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}/notes/${noteId}/remove`);
  }

  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${categoryId}`, categoryData);
  }

  getNotesByCategoryName(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notes`, { params: { categoryName } });
  }

}
