import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

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
    // here we could possibly specify dates

    const matches: Match[] = db.matches.slice(0, 3).map((m) => ({
      ...m,
      joined_players: [],
    }));

    setMatches(matches)
  }, []);

  useEffect(() => {
    handleLoadMatches();
  }, [handleLoadMatches]);

  if (matches.length === 0) return <h1>There are no matches</h1>;

  return (
    <div>
      <h1>This is filtered matches</h1>

      <ul>
        {matches.map((m) => {
          return (
            <li key={m.id}>
              {/* <Link href={`/matches/${m.id}`} passHref> */}
              <Link
                href={{
                  pathname: '/matches/[id]',
                  query: {
                    id: m.id,
                  },
                }}
                passHref
              >
                <a>{m.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
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
