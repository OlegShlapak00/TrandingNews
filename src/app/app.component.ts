import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from "./api.service";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { forkJoin, Observable } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { INewsItem } from "./models";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatPaginatorModule, MatCardModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  $listItems?: Observable<INewsItem[]>
  title = 'trending-news';
  listIDs: number[] = [];
  length?: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getListIDs().subscribe(IDs => {
      this.listIDs = IDs;
      this.length = IDs.length;
      this.onPageChange();
    });
  }

  openUrl(link: string) {
    window.open(link);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.onPageChange();
  }

  private onPageChange() {
    this.isLoading = true;
    const shownItems = this.listIDs.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);

    this.$listItems = forkJoin(
      shownItems.map(id => this.apiService.getNewsItem(id))
    );
  }
}
