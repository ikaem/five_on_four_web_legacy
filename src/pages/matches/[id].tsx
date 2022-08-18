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
  const [match, setMatch] = useState<Match | null>(null);

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

    console.log('typeof', typeof id);

    const queryId = typeof id === 'string' ? id : id?.[0];

    const matchId = Number.parseInt(queryId);
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

  // TODO probably good to split into components if gets complicated
  return (
    <div>
      <h1>{match.name}</h1>

      <div>
        <p>Date:</p>
        <time dateTime='2022-07-01'>{match.datetime}</time>
      </div>

      <div>
        <p>Location:</p>
        <address>{match.location}</address>
      </div>

      <div>
        <p>Max players:</p>
        <p>{match.max_players}</p>
      </div>

      <div>
        <p>Max description:</p>
        <p>{match.description}</p>
      </div>

      <div>
        <p>Organizer phone number:</p>
        <a href={`tel:${match.phone_number}`}>{match.phone_number}</a>
      </div>

      <div>
        <p>Joined players:</p>
        <ul>
          {match.joined_players.map((p) => (
            <li key={p.id}>
              <p>{p.user_id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
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

// TODO move this to utils
// function formatDate (date: Date) {

//   return date.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",

//   })

// }
