import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import db from '../../lib/json-server/data.json';

const MatchPage: NextPage = () => {
  // TODO this component will have following rendered in client
  /* 
  - joined players 
  - other players 
  - any data that might change 
  - eventually, we could have the whole thing connect to some room via web socket and listen on changes if user joins match or something
  - actually, the whole thing can be csr, apart from meta stuff
  */

  // TODO use this only for filtering 
  const [match, setMatch] = useState(null);

  const { query } = useRouter();
  const id = query.id;
  console.log('query:', query);
  // this is url http://localhost:3000/matches/2022/08/09
  // this is query id: (3) ['2022', '08', '09']
  
  const handleLoadMatch = useCallback(async () => {
    // TOD Oset loading here and so on
    
    // TODO we could be checking stuff here
    // this is if filename was [...id].tsx
    // this if check is no good, because args would always be an array

    const matchId = Number.parseInt(id.toString());
    const foundMatch = db.matches.find((m) => m.id === matchId);

    if (foundMatch === null) setMatch(null);

    const players = db.players.filter((p) => {
      return p.match_id === matchId;
    });

    const loadedMatch: Match = {
      ...foundMatch,
      joined_players: players,
    };

    setMatch(loadedMatch);
  }, [id]);

  useEffect(() => {
    handleLoadMatch();
  }, [handleLoadMatch]);

  if (match === null) return <h1>There is no match</h1>;

  return <h1>This is match page for match {match.name}</h1>;
};

export default MatchPage;

// TODO this will need to be extended to include players
// move match elsehwere, in feature somewhere
export type Match = {
  datetime: string;
  description: string;
  duration: number;
  id: number;
  location: string;
  max_players: number;
  name: string;
  phone_number: string;
  joined_players: Player[];
};

export type Player = {
  id: number;
  match_id: number;
  status: string;
  user_id: number;
};
