export interface IUserData {
  uid: string;
  displayName?: string;
  photoURL?: string;
  email: string;
}

export interface IUserState {
  user: IUserData; 
  isAuth: boolean;
  isExist: boolean;
}
