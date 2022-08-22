import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import fs from 'fs/promises';
import { join } from 'path';

type StatsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const StatsPage: NextPage<StatsPageProps> = ({ stats }) => {
  return (
    <div>
      <h1>These are stats:</h1>

      <p>Matches number: {stats.matchesNumber}</p>
      <p>Players number: {stats.playersNumber}</p>
      <p>Users number: {stats.usersNumber}</p>
    </div>
  );
};

export default StatsPage;

export const getStaticProps: GetStaticProps<{
  stats: Stats;
  // TODO this might need to return some auth information or something
  // and i prefer it to be done via get serverside props
}> = async () => {
  // Todo CWD, WILL BE IN THE ROOT
  // THIS IS OVERALL PROJECT FOLDER WHEN NEXT RUNS IT
  const path = join(process.cwd(), 'src', 'lib', 'json-server', 'data.json');
  const fileContents = await fs.readFile(path);

  const rawData = fileContents.toString();

  const data = JSON.parse(rawData);

  // console.log({ data });

  const stats: Stats = {
    matchesNumber: data.matches.length,
    playersNumber: data.players.length,
    usersNumber: data.users.length,
  };

  console.log({ stats });

  return {
    props: {
      stats,
    },
  };
};

type Stats = {
  matchesNumber: number;
  playersNumber: number;
  usersNumber: number;
};
