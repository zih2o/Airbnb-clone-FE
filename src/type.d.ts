export interface IRoomPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IRoomPhoto[];
  owner: IUser;
}

export interface IRoomPage {
  rooms: IRoomList[];
  nextPage: number;
  totalPage: number;
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
  kind: string;
  icon_image: string;
}

export interface ICategory {
  pk: number;
  name: string;
  kind: string;
}

export interface IRoomDetail extends IRoomList {
  created_at: string;
  updated_at: string;
  category: ICategory;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  owner: IRoomOwner;
  amenities: IAmenity[];
}

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}
export interface IEditRoomVariables {
  newRoomData: IUploadRoomVariables;
  roomPk: string;
}

export interface IUploadPhotosVariables {
  file: File;
  description: string;
  room: string;
}

export interface IReview {
  payload: string;
  rating: number;
  user: IRoomOwner;
}
export interface IReviewsPage {
  reviews: IReview[];
  totalPage: number;
  totalReview: number;
  nextPage: number;
}

export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export interface ISignUpForm extends ILoginForm {
  name: string;
  email: string;
}

export interface ISignUpError {
  error: string;
}

export interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export interface ICreatePhotoVaribles {
  file: string;
  description: string;
  roomPk: string;
}

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ICreateBookingForm {
  guests: number;
  check_in: Date;
  check_out: Date;
}
export interface ICreateBookingVariables {
  roomPk: string;
  bookingData: ICreateBookingForm;
}
