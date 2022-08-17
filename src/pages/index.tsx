import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// TODO this is temp
import db from '../lib/json-server/data.json';
import Link from 'next/link';
import {
  getUserJoinedMatches,
  transformRawMatchesToMatchesWithPlayers,
} from '../features/matches/utils/helpers/get-my-joined-matches';
import { MatchesList } from '../features/matches/components/matches-list/matches-list';

// TODO this is temp data

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomePageProps> = ({ user }) => {
  // TODO this will later be done via csr and use effect
  const rawMatches = db.matches;
  const rawPlayers = db.players;
  const matches = transformRawMatchesToMatchesWithPlayers(
    rawMatches,
    rawPlayers
  );
  const matchesThatIJoined = getUserJoinedMatches(matches, user);

  return (
    <div className={styles.container}>
      <h1>This is main page</h1>

      <h2>This is matches that I joined</h2>

      <MatchesList matches={matchesThatIJoined} />

      <h2>This is all matches </h2>
      <MatchesList matches={matches} />
    </div>
  );
};

export default Home;

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

  return {
    props: {
      user,
    },
  };
};
