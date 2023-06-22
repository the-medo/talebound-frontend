import React, { useCallback } from 'react';
import { Col, Flex } from '../../components/Flex/Flex';
import ContentSection from '../../components/ContentSection/ContentSection';
import InfoSection from '../../components/InfoSection';
import { useGetUserById } from '../../api/useGetUserById';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileProps } from './UserProfile';
import Editor from '../../components/Editor/Editor';

type UserIntroductionProps = Pick<UserProfileProps, 'userId'>;

const UserIntroduction: React.FC<UserIntroductionProps> = ({ userId }) => {
  const { user, isLoggedIn } = useAuth();
  const [editIntroduction, setEditIntroduction] = React.useState(false);

  const { data, isLoading, error } = useGetUserById({
    variables: userId,
    suspense: true,
  });

  const editIntroductionHandler = useCallback(() => {
    setEditIntroduction(true);
  }, []);

  const onEditorChange = useCallback(() => {}, []);

  return (
    <Col css={{ flexGrow: 1, flexBasis: '30rem' }}>
      <ContentSection direction="column" header="Introduction">
        {editIntroduction && (
          <Flex style={{ height: '600px' }}>
            <Editor onChange={onEditorChange} />
          </Flex>
        )}
        {user?.id === userId && !editIntroduction && (
          <InfoSection
            linkTitle={'Edit introduction'}
            linkAction={editIntroductionHandler}
            background
          >
            Introduction missing
          </InfoSection>
        )}
      </ContentSection>
    </Col>
  );
};

export default UserIntroduction;
