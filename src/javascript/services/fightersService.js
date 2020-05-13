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

    getFighterInfo() {

    }
    
    async getFighterDetails(_id) {
        return _id;
    }
}
  
export const fighterService = new FighterService();