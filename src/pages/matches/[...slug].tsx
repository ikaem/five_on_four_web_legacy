import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MatchesList } from '../../features/matches/components/matches-list/matches-list';
import { transformRawMatchesToMatchesWithPlayers } from '../../features/matches/utils/helpers/get-my-joined-matches';

import db from '../../lib/json-server/data.json';

const MatchFilteredPage: NextPage = () => {
  // TODO this component will have following rendered in client
  /* 
  - joined players 
  - other players 
  - any data that might change 
  - eventually, we could have the whole thing connect to some room via web socket and listen on changes if user joins match or something
  - actually, the whole thing can be csr, apart from meta stuff
  */

  // TODO use this only for filtering
  const [matches, setMatches] = useState<Match[]>([]);

  const { query } = useRouter();
  const slug = query.slug;
  console.log('query:', query);
  // this is url http://localhost:3000/matches/2022/08/09
  // this is query id: (3) ['2022', '08', '09']

  const handleLoadMatches = useCallback(async () => {
    if (typeof slug === 'string') return;
    if (typeof slug === 'undefined') return;

    const rawMatches = db.matches;
    const rawPlayers = db.players;
    const matches = transformRawMatchesToMatchesWithPlayers(
      rawMatches,
      rawPlayers
    );

    console.log({ matches });

    console.log({ slug });

    const dateString = slug.join('-');
    const date = new Date(dateString).toISOString();
    console.log({ date, dateString });

    const filteredMatches = matches.filter((m) => {
      // TODO this could be done better 
      const yearOnly = new Date().getFullYear()
      const monthOnly = new Date().getMonth() + 1

      console.log({yearOnly, monthOnly})
      const isoDateMatchSlice = m.datetime.slice(0, 7);
      const isoDateSearchSlice = date.slice(0, 7);

      return isoDateMatchSlice === isoDateSearchSlice;

      // const

      // const matchDate =
    });
    // here we could possibly specify dates

    // const matches: Match[] = db.matches.slice(0, 3).map((m) => ({
    //   ...m,
    //   joined_players: [],
    // }));

    setMatches(filteredMatches);
  }, [slug]);

  useEffect(() => {
    handleLoadMatches();
  }, [handleLoadMatches]);

  if (matches.length === 0) return <h1>There are no matches</h1>;

  // TODO this will later be done via csr and use effect

  return (
    <div>
      <h1>This is matches page</h1>

      <MatchesList matches={matches} />
    </div>
  );
};

export default MatchFilteredPage;

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
