import { User } from '../user.model';

export interface AuthState {
  user: User;
  loading: boolean;
  alertMessage: string;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  alertMessage: null
}
