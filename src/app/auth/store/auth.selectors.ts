import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureSelectors } from '../../shared/state-helper/feature-selectors.enum';
import { AuthState } from './auth.state';

const authFeature = createFeatureSelector<AuthState>(FeatureSelectors.Auth);
const selector = <T>(mapping: (state: AuthState) => T) => createSelector(authFeature, mapping);

export const authLoading = selector((state) => state.loading);
export const alertMessage = selector((state) => state.alertMessage);
export const userData = selector((state) => state.user);
export const isAuthenticated = createSelector(userData, userData => !!userData);
