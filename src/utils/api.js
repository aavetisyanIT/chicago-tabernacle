import axios from 'axios';
import url from '../assets/api-endpoints';

export const getAllArticles = () => {
  const response = axios.get(url.articlesUrl);
  return response;
};
export const getAllAnnouncements = () => {
  const response = axios.get(url.announcementsUrl);
  return response;
};
