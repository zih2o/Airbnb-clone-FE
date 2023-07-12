import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';
import {
  ICreateBookingVariables,
  ICreatePhotoVaribles,
  IEditRoomVariables,
  ILoginForm,
  ISignUpForm,
  IUploadImageVariables,
  IUploadRoomVariables,
  Value,
} from './type';
import { formatDate } from './lib/utils';

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
export const editRoom = (data: IEditRoomVariables) => {
  const { roomPk, newRoomData } = data;
  return instance
    .put(`rooms/${roomPk}/`, newRoomData, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
};

export const getReviews = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  const response = await instance.get(
    `rooms/${roomPk}/reviews?page=${pageParam}&perPage=6`
  );
  const { reviews, totalPage, totalReview } = response.data;
  return { nextPage: pageParam + 1, reviews, totalPage, totalReview};
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
type CheckBookingQueryKey = [string, string?, Value?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (Array.isArray(dates)) {
    const [firstDate, secondDate] = dates;
    if (firstDate && secondDate) {
      const checkIn = formatDate(firstDate);
      const checkOut = formatDate(secondDate);
      return instance
        .get(
          `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        )
        .then((response) => response.data);
    }
  }
};

export const createBooking = (data: ICreateBookingVariables) => {
  const { roomPk, bookingData } = data;
  return instance
    .post(`rooms/${roomPk}/bookings`, bookingData, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
};
