import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';
import {
  ICreatePhotoVaribles,
  ILoginForm,
  ISignUpForm,
  IUploadImageVariables,
  IUploadRoomVariables,
} from './type';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
});

export const getRooms = () =>
  instance.get('rooms/').then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}/`).then((response) => response.data);
};

export const getReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get('users/me').then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      `/users/kakao`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const usernameLogIn = ({ username, password }: ILoginForm) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.data);

export const signUp = ({ username, password, name, email }: ISignUpForm) =>
  instance
    .post(
      `/users/`,
      { username, password, name, email },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get('rooms/amenities').then((response) => response.data);

export const getCategories = () =>
  instance.get('categories').then((response) => response.data);

export const uploadRoom = (data: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, data, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const getUploadUrl = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const uploadImage = ({ uploadURL, file }: IUploadImageVariables) => {
  const form = new FormData();
  form.append('file', file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
};

export const createPhoto = ({
  file,
  description,
  roomPk,
}: ICreatePhotoVaribles) => {
  return instance.post(
    `rooms/${roomPk}/photos`,
    { file, description },
    {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    }
  );
};
