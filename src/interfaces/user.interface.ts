export interface IUser {
  id: string;
  name: string;
  email: string;
  lastName: string;
  fullName: string;
  username: string;
  department: string;
  extension: string;
  profile: string;
  profilePhoto: string;
}

export interface IUserNew {
  name: string;
  racf: string;
  extension: string;
  email: string;
  department: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  racf?: string;
  extension?: string;
  email?: string;
  department?: string;
  devices?: Array<string>;
  callflow?: string;
  contactList?: { contacts: Array<string> }
}
