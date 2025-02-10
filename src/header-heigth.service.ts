import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderHeightService {
  private headerHeightSubject = new BehaviorSubject<number>(0);
  headerHeight$ = this.headerHeightSubject.asObservable();

  updateHeaderHeight(height: number): void {
    this.headerHeightSubject.next(height);
  }
}