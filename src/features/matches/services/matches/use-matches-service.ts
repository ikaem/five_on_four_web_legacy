import { useCallback } from 'react';
import { useRestRequest } from '../../../../lib/hooks/use-rest-request';
import { Match } from '../../../../pages/matches/[id]';
import { matchesService } from './matches-service';


// TODO this cannot be a hook then, it seems - but how did i solve this issue in that other service 
// so the service would then just make a regular http wrapper call
// and this hook would then possibly just return data
export const useMatchesService = () => {
  // const [isMatchesLoading, isMatchesError, matchesError, makeMatchesRequest] =
  //   useRestRequest<Match[]>();

  // const handleGetMatches = useCallback(() => {
  //   let data: Match[] | null;

  //   const makeRequest = async () => {
  //     // const requestConfig = matchesService.createGetMatchesRequestConfig();
  //     const requestConfig = matchesService.createGetFakeMatchesRequestConfig();
  //     const response = await makeMatchesRequest(requestConfig);

  //     data = response;
  //   };

  //   makeRequest();

  //   return {
  //     isLoading: isMatchesLoading,
  //     isError: isMatchesError,
  //     error: matchesError,
  //     data,
  //   };
  // }, [isMatchesError, isMatchesLoading, makeMatchesRequest, matchesError]);

  return {
    handleGetMatches,
  };
};
