import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureSelectors } from '../../shared/state/feature-selectors.enum';
import { AuthState } from './auth.state';

const authFeature = createFeatureSelector<AuthState>(FeatureSelectors.Auth);
const selector = <T>(mapping: (state: AuthState) => T) => createSelector(authFeature, mapping);

export const authLoading = selector((state: AuthState) => state.loading);
export const alertMessage = selector((state: AuthState) => state.alertMessage);
export const userData = selector((state: AuthState) => state.user);
export const isAuthenticated = createSelector(userData, userData => !!userData);
