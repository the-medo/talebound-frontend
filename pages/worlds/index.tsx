import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import { Col, Row } from '../../components/Flex/Flex';
import ImageCard from '../../components/ImageCard/ImageCard';

const Worlds: React.FC = () => {
  return (
    <>
      <Head>
        <title>Worlds</title>
      </Head>
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <ImageCard
            title="Alagaezia"
            basedOn={`Eragon "trilogy"`}
            questCount={3}
            activityCount={12}
            playModeCount={2}
            src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/public"
            tags={['fantasy', 'magic', 'dragons', 'books']}
          />
          <ImageCard
            title="The Discworld"
            basedOn="books by Terry Pratchett"
            playModeCount={1}
            questCount={4}
            activityCount={2.3}
            src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/public"
            tags={['fantasy', 'magic', 'books', 'humor', 'satire']}
          />
          <ImageCard
            title="Alagaezia"
            basedOn={`Eragon "trilogy"`}
            questCount={3}
            activityCount={12}
            playModeCount={2}
            src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/public"
            tags={['fantasy', 'magic', 'dragons', 'books']}
          />
          <ImageCard
            title="The Discworld"
            basedOn="books by Terry Pratchett"
            playModeCount={1}
            questCount={4}
            activityCount={2.3}
            src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/public"
            tags={['fantasy', 'magic', 'books', 'humor', 'satire']}
          />
        </Row>
      </Layout>
    </>
  );
};

export default Worlds;
