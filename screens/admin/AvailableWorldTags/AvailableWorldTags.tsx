import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleAvailableWorldTags from '../../../articles/Admin/ArticleAvailableWorldTags';
import SectionNewTag from './SectionNewTag';
import SectionAvailableTags from './SectionAvailableTags';

const AvailableWorldTags: React.FC = () => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <SectionAvailableTags />
        <SectionNewTag />
      </Col>

      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleAvailableWorldTags />
      </Col>
    </Row>
  );
};

export default AvailableWorldTags;
