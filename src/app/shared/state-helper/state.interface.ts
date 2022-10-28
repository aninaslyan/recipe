import { FeatureSelectors } from './feature-selectors.enum';
import { ShoppingListState } from '../../shopping-list/store/shopping-list.state';
import { AuthState } from '../../auth/store/auth.state';

export interface AppState {
  [FeatureSelectors.ShoppingList]: ShoppingListState,
  [FeatureSelectors.Auth]: AuthState
}
