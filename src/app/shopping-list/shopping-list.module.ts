import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';
import { FeatureSelectors } from '../shared/state-helper/feature-selectors.enum';
import { shoppingListReducer } from './store/shopping-list.reducer';
import { ShoppingListEffects } from './store/shopping-list.effects';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule,
    StoreModule.forFeature(FeatureSelectors.ShoppingList, shoppingListReducer),
    EffectsModule.forFeature([ShoppingListEffects])
  ],
  providers: [LoggingService],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingListModule {
}
