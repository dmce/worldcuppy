import { footballDataOrgConfig as config } from './api-config';
import Raven from 'raven-js';

const header = new Headers({
  'X-Auth-Token': `${config.key}`,
});

function handleErrors(response) {
  if (!response.ok) {
    Raven.captureException(response);
    throw new Error(response);
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
    .then(response => response.json())
    .catch(error => {
      Raven.captureException(error);
      throw new Error(error);
    });
};

const footballData = {
  getFixtures: competition => {
    return accessApi('GET', `competitions/${competition}/fixtures`);
  },
};

export default footballData;
