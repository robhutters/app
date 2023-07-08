import IUser from './IUser'

export default interface AuthContextType {
  user: IUser;
  signOut: () => void;
  signInMagic: (data: any) => { error: any };
  signIn: (email: string, password: string) => { data: object; user: object; error: any; session: any };
  signUp: (data: any) => { data: object; user: object; error: any; session: any };
  menu: any;
  restricted: any;
  setRestriction: Function;
  profile: any;
  loading: boolean;
}