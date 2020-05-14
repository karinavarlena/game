import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    
    try {
      const endpoint = `details/fighter/${id}.json`;
      const details = await callApi(endpoint);

      return details;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const fighterService = new FighterService();
