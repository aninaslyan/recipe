import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { isAuthenticated, userData } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated$ = this.store.select(isAuthenticated);

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe(
        () => {
        },
        error => {
          console.log('There is no recipe ' + error);
        });
  }

  onLogOut() {
    this.authService.logOut();
  }
}
