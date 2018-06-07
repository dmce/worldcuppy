import { worldCuppyConfig as config } from './api-config';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const getData = async (method, endPoint, route = '') => {
  const header = new Headers({
    authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  return await fetch(`${config.url}/${endPoint}/${route}`, {
    mode: 'cors',
    method: method,
    headers: header,
  })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
};

const postData = async (method, endPoint, route = '', body = '') => {
  const header = new Headers({
    authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  return await fetch(`${config.url}/${endPoint}/${route}`, {
    mode: 'cors',
    method: method,
    headers: header,
    body: JSON.stringify(body),
  })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
};

const worldCupApi = {
  get: (endPoint, id) => {
    return getData('GET', endPoint, id);
  },
  getAll: endPoint => {
    return getData('GET', endPoint);
  },
  getByUser: endPoint => {
    return getData('GET', endPoint, localStorage.getItem('sub'));
  },
  delete: (endPoint, body) => {
    return postData('DELETE', endPoint, undefined, body);
  },
  add: (endPoint, body) => {
    return postData('POST', endPoint, undefined, body);
  },
};

export default worldCupApi;
