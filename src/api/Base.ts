import axios from 'axios';

const baseURL = "http://192.168.1.2:3000/api/v1";

export const publicApi = axios.create({
  baseURL,
});

export const privateApi = axios.create({
  baseURL,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  withCredentials: true,
});
