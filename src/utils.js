import axios from 'axios';

export const getContent = async (_id, token) => {
  const data = await axios.get(`contents/${_id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const genres = [
  'Action',
  'Comedy',
  'Fantasy',
  'Detective',
  'Horror',
  'Animation',
];
