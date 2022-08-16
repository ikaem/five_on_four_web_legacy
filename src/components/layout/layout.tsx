import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href='/' passHref>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/match-edit' passHref>
                <a>Create match</a>
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

      <main>{children}</main>

      <footer>Copyright Five on hour</footer>
    </>
  );
};
