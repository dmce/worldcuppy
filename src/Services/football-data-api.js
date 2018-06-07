import { footballDataOrgConfig as config } from './api-config';

const header = new Headers({
  'X-Auth-Token': `${config.key}`,
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const accessApi = async (method, endPoint, route = '') => {
  return await fetch(`${config.footballDataUrl}/${endPoint}`, {
    mode: 'cors',
    method: method,
    headers: header,
  })
    .then(handleErrors)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const footballData = {
  getFixtures: competition => {
    return accessApi('GET', `competitions/${competition}/fixtures`);
  },
};

export default footballData;
