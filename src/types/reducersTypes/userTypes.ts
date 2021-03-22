export interface IUserData {
  uid: string;
  displayName?: string;
  photoURL?: string;
  email: string;
}

export interface IUserState {
  user: IUserData;
  isAuthed: boolean;
  isExist: boolean;
}
