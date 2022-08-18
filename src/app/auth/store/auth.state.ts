import { User } from '../user.model';

export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: null
}
