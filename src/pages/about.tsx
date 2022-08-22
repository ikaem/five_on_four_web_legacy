import { GetStaticProps, NextPage } from 'next';

// todo this is pre-rendered (static generation) by default becuase there is no dynamic content on the page

const AboutPage: NextPage = () => {
  return <h1>This is About page</h1>;
};


export default AboutPage;

