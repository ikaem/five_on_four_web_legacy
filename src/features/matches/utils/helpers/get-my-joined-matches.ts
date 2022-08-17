import { User } from '../../../../pages/matches';
import { Match, Player } from '../../../../pages/matches/[id]';

// TODO not sure if this would be here
export const getUserJoinedMatches = (matches: Match[], user: User) => {
  let matchesPlayers: Player[] = [];

  for (const match of matches) {
    const temp = matchesPlayers.concat(match.joined_players);
    matchesPlayers = temp;
  }

  // now we have an array of players
  // now we want only players that are users

  const userPlayers = matchesPlayers.filter((p) => p.user_id === user.id);

  // now we want to filter matches to return only matches that are in user players
  // fort his, we want to get user players be a map
  const userPlayersMap: Record<number, Player> = {};

  for (const player of userPlayers) {
    // this will now map each match id of player
    userPlayersMap[player.match_id] = player;
  }

  const filteredMatches = matches.filter((m) => {
    if (userPlayersMap[m.id]) return true;
    return false;
  });

  return filteredMatches;

  // i could also i guess go through each match

  // TODO optmize this later so i we dont have loop inside loop
  // const filteredMatches = matches.filter(m => m.joined_players)
};

// TODO also move this elswehre
export type RawMatch = {
  datetime: string;
  description: string;
  duration: number;
  id: number;
  location: string;
  max_players: number;
  name: string;
  phone_number: string;
};

// TODO this should also live somewhere else
export const transformRawMatchToMatchWithPlayers =
  (rawMatch: RawMatch) =>
  (matchPlayers: Player[]): Match => {
    const match: Match = {
      datetime: rawMatch.datetime,
      description: rawMatch.description,
      duration: rawMatch.duration,
      id: rawMatch.id,
      location: rawMatch.location,
      max_players: rawMatch.max_players,
      name: rawMatch.name,
      phone_number: rawMatch.phone_number,
      joined_players: matchPlayers,
    };

    return match;
  };

export const transformRawMatchesToMatchesWithPlayers = (
  rawMatches: RawMatch[],
  players: Player[]
) => {
  // create map of matches

  // console.log("WHAT IS THIS", rawMatches)

  const matchesMap = rawMatches.reduce<Record<number, Match>>(
    (acc, current) => {
      acc[current.id] = {
        datetime: current.datetime,
        description: current.description,
        duration: current.duration,
        id: current.id,
        location: current.location,
        max_players: current.max_players,
        name: current.name,
        phone_number: current.phone_number,
        joined_players: [],
      };

      return acc;
    },
    {}
  );

  // then loop over all players
  // if a player has match id that exists in the map, add it ther - add it anyway

  for (const player of players) {
    console.log({ player });
    const match = matchesMap[player.match_id];
    console.log({ match });
    matchesMap[player.match_id].joined_players.push(player);
  }

  const matches = Object.keys(matchesMap).map((key) => {
    return matchesMap[Number.parseInt(key)];
  });

  return matches;
};
