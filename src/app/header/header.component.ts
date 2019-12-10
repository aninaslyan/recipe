import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user
      .subscribe(user => {
          this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
