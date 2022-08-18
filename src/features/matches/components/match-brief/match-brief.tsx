import Link from 'next/link';
import { Match } from '../../../../pages/matches/[id]';

import classes from './match-brief.module.css';

type MatchBriefProps = {
  match: Match;
};

export const MatchBrief: React.FC<MatchBriefProps> = ({ match }) => {
  return (
    <li className={classes['match-brief']}>
      {/* <Link href={`/matches/${m.id}`} passHref> */}

      <img
        className={classes['match-brief__image']}
        src='images/futsal.jpg'
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
        <a className='match-brief__title'>{match.name}</a>
      </Link>

      <br />
    </li>
  );
};
