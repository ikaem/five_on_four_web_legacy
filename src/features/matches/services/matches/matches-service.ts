import { generateHttpRequestConfig } from '../../../../lib/axios/generate-http-request-config';
import { httpWrapper } from '../../../../lib/axios/http-wrapper';
import { envVars } from '../../../../utils/config/env-vars';
import { createGetFakeMatchesRequestConfig, createGetMatchesRequestConfig } from './request-configs';
// export const createGetAllBloodSuppliesRequestConfig = () => {
//   const config = generateHttpRequestConfig({
//     url: `${envVars.API_URL}/blood-supplies`,
//     method: 'get',
//   });

//   return config;
// };

class MatchesService {

  getMatches = async () => {
    const config = createGetMatchesRequestConfig();
    const response = await httpWrapper(config);

    return response;
  }

  getFakeMatches = async () => {
    const config = createGetFakeMatchesRequestConfig();
    const response = await httpWrapper(config);

    return response;
  }

}


export const matchesService = new MatchesService();