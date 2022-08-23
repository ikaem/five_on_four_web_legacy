import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import db from '../../lib/json-server/data.json';

type MatchPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const MatchPage: NextPage<MatchPageProps> = ({ match }) => {
  const router = useRouter();

  // TODO this component will have following rendered in client
  /* 
  - joined players 
  - other players 
  - any data that might change 
  - eventually, we could have the whole thing connect to some room via web socket and listen on changes if user joins match or something
  - actually, the whole thing can be csr, apart from meta stuff
  */

  // TODO here should use router.isFallback
  // if (match === null) return <h1>There is no match</h1>;

  // TODO probably good to split into components if gets complicated

  if (!match) return <h1>Loading...</h1>;
  // if(router.isFallback) return <h1>Loading...</h1>

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

// JSUT FOR STATIC ILLUSTRACTION
export const getStaticPaths: GetStaticPaths = () => {
  const paths = db.matches.slice(0, db.matches.length - 2).map((m) => {
    return {
      params: {
        id: m.id.toString(),
        // we could have multiple identifiers here if page lives in a nested dynamic stuff
      },
    };
  });

  return {
    paths,
    // https://stackoverflow.com/a/67787457 - ntoe that if page has not been built for this path, we weill have to await if with router.isfallback
    fallback: true,
    // fallback: false,
    // fallback: "blocking"
  };
};

// TODO i am not sure i want to statically render this - because these will keep being added
// server side might be better, probably because of auth too
export const getStaticProps: GetStaticProps<
  {
    match: Match;
    // TODO this might need to return some auth information or something
    // and i prefer it to be done via get serverside props
  },
  { id: string }
> = async (context) => {
  const { id } = context.params;

  const matchId = Number.parseInt(id);
  const foundMatch = db.matches.find((m) => m.id === matchId);


  if (!foundMatch)
    return {
      // TODO should redirect somehow
      notFound: true,
      // redirect: {
      //   destination: "/login",
      //   // todo NOT INTERESTED IN THIS THAT MUCH
      //   permanent: true,
      //   statusCode: 200,
      //   basePath: "/"
      // }
    };

  const players = db.players.filter((p) => {
    return p.match_id === matchId;
  });

  const loadedMatch: Match = {
    ...foundMatch,
    joined_players: players,
  };


  return {
    props: {
      match: loadedMatch,
    },
    revalidate: 60,
  };
};
