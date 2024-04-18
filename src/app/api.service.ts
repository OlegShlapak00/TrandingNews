import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { INewsItem } from "./models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getListIDs(): Observable<number[]> {
    return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json');
  }

  getNewsItem(id: number): Observable<INewsItem> {
    return this.http.get<INewsItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }
}
