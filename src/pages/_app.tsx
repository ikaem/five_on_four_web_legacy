import { Layout } from '../components/layout/layout';
import '../styles/globals.css';

const MyApp: React.FC<{ Component: React.FC; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
};

export default MyApp;
