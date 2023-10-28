import React, { useCallback, useMemo, useState } from 'react';
import { useModule } from '../../../hooks/useModule';
import { Button } from '../../../components/Button/Button';
import { TbPlus } from 'react-icons/tb';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { TitleH2 } from '../../../components/Typography/Title';
import PostFormModal from '../../../component-sections/Post/PostFormModal';
import PostList from '../../../component-sections/Post/PostList';
import { PbEntityType } from '../../../generated/api-types/data-contracts';

interface PostsScreenProps {
  canEdit?: boolean;
}

const PostsScreen: React.FC<PostsScreenProps> = ({ canEdit }) => {
  const [module] = useModule(PbEntityType.ENTITY_TYPE_POST);
  const [createModal, setCreateModal] = useState(false);

  const openModal = useCallback(() => setCreateModal(true), []);
  const modalTriggerCreate = useMemo(
    () => (
      <Button color={'primaryOutline'} onClick={openModal}>
        <TbPlus />
        Create post
      </Button>
    ),
    [openModal],
  );

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column">
          <Row gap="md" fullWidth justifyContent="between">
            <TitleH2>Posts</TitleH2>
            {canEdit && (
              <Row gap="md">
                <PostFormModal
                  module={module}
                  trigger={modalTriggerCreate}
                  open={createModal}
                  setOpen={setCreateModal}
                />
              </Row>
            )}
          </Row>
          <PostList canEdit={canEdit} />
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}></Col>
    </Row>
  );
};

export default PostsScreen;
