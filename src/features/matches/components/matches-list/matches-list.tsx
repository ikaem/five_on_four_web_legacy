import Link from 'next/link';
import { Match } from '../../../../pages/matches/[id]';
import { MatchBrief } from '../match-brief/match-brief';

type MatchesListProps = {
  matches: Match[];
};

export const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  return (
    <ul>
      {matches.map((m) => {
        return <MatchBrief key={m.id} match={m} onUserMatchAction={() => console.log("joining or unjoining match")} />;
      })}
    </ul>
  );
};
