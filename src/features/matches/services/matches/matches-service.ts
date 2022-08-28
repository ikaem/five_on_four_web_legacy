import { generateHttpRequestConfig } from '../../../../lib/axios/generate-http-request-config';
import { httpWrapper } from '../../../../lib/axios/http-wrapper';
import { envVars } from '../../../../utils/config/env-vars';
import { createGetFakeMatchesRequestConfig, createGetFakeMatchRequestConfig, createGetMatchesRequestConfig } from './request-configs';
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

    console.log("response", response)

    // TODO transfrom this into fake matches

    return response;
  }

  getFakeMatch = async (matchId: string) => {
    const config = createGetFakeMatchRequestConfig(matchId);
    const response = await httpWrapper(config);

    console.log("response", response)

    // TODO transfrom this into fake match

    return response;
  }


}


export const matchesService = new MatchesService();