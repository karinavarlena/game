import { callApi } from "../helpers/apiHelper";
class FighterService {
    async getFighters() {
      try {
        const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
        const apiResult = await callApi(endpoint, 'GET');
  
        return JSON.parse(atob(apiResult.content));
      } catch (error) {
        throw error;
      }
    }

    async getFighterDetails(_id) {

    }
}
  
export const fighterService = new FighterService();