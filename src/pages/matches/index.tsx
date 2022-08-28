import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
// TODO this is temp
import db from '../../lib/json-server/data.json';
import Link from 'next/link';
import { MatchesList } from '../../features/matches/components/matches-list/matches-list';
import { transformRawMatchesToMatchesWithPlayers } from '../../features/matches/utils/helpers/get-my-joined-matches';
import { MatchesSearch } from '../../features/matches/components/matches-search/matches-search';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMatchesService } from '../../features/matches/services/matches/use-matches-service';
import axios from 'axios';

// TODO this is temp data fetching on client side
// not convinced i will use it here

type MatchesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MatchesPage: NextPage<MatchesPageProps> = ({ user }) => {
  const router = useRouter();

  // TODO this will later be done via csr and use effect
  const rawMatches = db.matches;
  const rawPlayers = db.players;
  const matches = transformRawMatchesToMatchesWithPlayers(
    rawMatches,
    rawPlayers
  );

  const onSubmitSearch = (year: string, month: string) => {
    router.push({
      pathname: '/matches/[...slug]',
      query: {
        // slug: `${year}/${month}`,
        slug: [year, month],
      },
    });
  };

  // useEffect(() => {

  // }, []);

  return (
    <div>
      <h1>This is matches page</h1>

      <MatchesSearch onSubmit={onSubmitSearch} />

      <MatchesList matches={matches} />
    </div>
  );
};

export default MatchesPage;

// TODO matches should probably be handled rendered in csr, because data will be specific for each user

// TODO define model for auth or something - might change later with firebase
export type User = {
  id: number;
  nickname: string;
};

// TODO this general html part could be done statically too - but, if we want to authenticate via server side, no stastic then
export const getServerSideProps: GetServerSideProps<{
  user: User;
  // TODO this might need to return some auth information or something
  // and i prefer it to be done via get serverside props
}> = async () => {
  const user: User = {
    id: 1,
    nickname: 'Zidane',
  };

  const response = axios
    .get(
      'https://api.darksky.net/forecast/7e5a6c3357123c8400c93c56caa83743/42.3601,-71.0589,1661677583?exclude=currently,flags'
    )
    .then(console.log);

  return {
    props: {
      user,
    },
  };
};
