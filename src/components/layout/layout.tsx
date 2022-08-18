import Link from 'next/link';
import { PropsWithChildren } from 'react';

import classes from "./layout.module.css";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header className={classes.layout}>
        <nav className='navigation'>
          <ul className="navigation__items">
            <li className='navigation__item'>
              <Link href='/' passHref>
                <a className="navigation__link">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/matches/edit" passHref>
                <a>Create match</a>
              </Link>
            </li>

            <li>
              <Link href="/matches" passHref>
                <a>All matches</a>
              </Link>
            </li>

            <li>
              {/* TODO we dont use logout like this, but just to illustrate replace prop */}
              <Link replace href='/login' passHref>
                <a>Sign out</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* TODO main is good */}
      <main className="layout__main-content">{children}</main>

      <footer className='layout__footer'>Copyright Five on hour</footer>
    </div>
  );
};
