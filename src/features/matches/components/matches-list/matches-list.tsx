import Link from 'next/link';
import { Match } from '../../../../pages/matches/[id]';

type MatchesListProps = {
  matches: Match[];
};

export const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  return (
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
  );
};
