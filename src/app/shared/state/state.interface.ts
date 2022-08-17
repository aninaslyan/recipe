import { FeatureSelectors } from './feature-selectors.enum';
import { ShoppingListState } from '../../shopping-list/store/shopping-list.state';

export interface AppState {
  [FeatureSelectors.ShoppingList]: ShoppingListState
}
