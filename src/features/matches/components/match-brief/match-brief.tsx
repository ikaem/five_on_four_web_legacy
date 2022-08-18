import Link from 'next/link';
import { Match } from '../../../../pages/matches/[id]';

import classes from './match-brief.module.css';

type MatchBriefProps = {
  match: Match;
  onUserMatchAction: () => void
};

export const MatchBrief: React.FC<MatchBriefProps> = ({ match, onUserMatchAction }) => {
  return (
    <li className={classes['match-brief']}>
      {/* <Link href={`/matches/${m.id}`} passHref> */}

      <img
        className={classes['match-brief__image']}
        src='/images/futsal.jpg'
        alt='match'
      />
      <br />

      {/* TODO cool that we use time  */}
      <time className='match-brief__time'>{match.datetime}</time>

      <address className='match-brief__address'>{match.location}</address>

      <Link
        href={{
          pathname: '/matches/[id]',
          query: {
            id: match.id,
          },
        }}
        passHref
      >
        <a className={classes['match-brief__link']}>{match.name}</a>
      </Link>
      <br />

      <button onClick={onUserMatchAction}>
        Unjoin
      </button>

      <br />
    </li>
  );
};
