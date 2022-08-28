import { useCallback, useMemo, useState } from 'react';
import { useRestRequest } from '../../../../lib/hooks/use-rest-request';
import { Match } from '../../../../pages/matches/[id]';
import {
  getServiceDataStateHandlers,
  INITIAL_SERVICE_DATA_STATE,
  ServiceDataState,
} from '../../../../utils/helpers/get-service-data-state-handlers';
import { getHandlersForMatchesServiceState } from './helpers';
import { matchesService } from './matches-service';
import { MatchesServiceDataState } from './types';

// TODO not sure if this will be used at all
// TODO this cannot be a hook then, it seems - but how did i solve this issue in that other service
// so the service would then just make a regular http wrapper call
// and this hook would then possibly just return data
export const useMatchesService = () => {
  const [matchesState, setMatchesState] = useState<
    ServiceDataState<Match[] | null>
  >(INITIAL_SERVICE_DATA_STATE);
  const [matchState, setMatchState] = useState<ServiceDataState<Match | null>>(
    INITIAL_SERVICE_DATA_STATE
  );

  const matchesStateHandlers = useMemo(() => {
    return getServiceDataStateHandlers(setMatchesState);
  }, []);

  const matchStateHandlers = useMemo(() => {
    return getServiceDataStateHandlers(setMatchState);
  }, []);



  const handleGetFakeMatches = async () => {
    matchesStateHandlers.setError('');
    matchesStateHandlers.startLoading();

    try {
      const matches = await matchesService.getFakeMatches();

      return matches;
    } catch {
      // TODO do show some snackbar depending on the error
      // TODO potentially here we should have some error handler too
      matchesStateHandlers.setError('There was an error fetching matches');
    } finally {
      matchesStateHandlers.stopLoading();
    }
  };

  const handleGetFakeMatch = async (matchId: string) => {
    matchStateHandlers.setError('');
    matchStateHandlers.startLoading();

    try {
      const match = await matchesService.getFakeMatch(matchId);

      // TODO this should actually set data
      return match;
      // matchHandlers.setData(match);
    } catch {
      // TODO do show some snackbar depending on the error
      // TODO potentially here we should have some error handler too
      matchStateHandlers.setError('There was an error fetching matches');
    } finally {
      matchStateHandlers.stopLoading();
    }
  };

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
    matchesState,
    matchState,
    handleGetFakeMatches,
    handleGetFakeMatch,
  };
};
