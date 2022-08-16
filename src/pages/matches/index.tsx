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

// TODO this is temp data

type MatchesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MatchesPage: NextPage<MatchesPageProps> = ({ user }) => {
  // TODO this will later be done via csr and use effect
  const matches = db.matches;

  return (
    <div>
      <h1>This is main page</h1>
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

  return {
    props: {
      user,
    },
  };
};
