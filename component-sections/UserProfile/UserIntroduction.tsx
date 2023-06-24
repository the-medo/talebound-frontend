import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Flex } from '../../components/Flex/Flex';
import ContentSection from '../../components/ContentSection/ContentSection';
import InfoSection from '../../components/InfoSection';
import { useGetUserById } from '../../api/useGetUserById';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileProps } from './UserProfile';
import { useGetPostById } from '../../api/useGetPostById';
import {
  UpdateUserIntroductionRequest,
  useUpdateUserIntroduction,
} from '../../api/useUpdateUserIntroduction';
import { EditorState, LexicalEditor } from 'lexical';
import Editor from '../../components/Editor/Editor';

type UserIntroductionProps = Pick<UserProfileProps, 'userId'>;

const UserIntroduction: React.FC<UserIntroductionProps> = ({ userId }) => {
  const { user, isLoggedIn } = useAuth();
  const [editIntroduction, setEditIntroduction] = React.useState(false);

  const { data: userData, isLoading: isLoadingUser } = useGetUserById({
    variables: userId,
    suspense: true,
  });

  const loadIntroductionData = useMemo(
    () => userData?.introductionPostId !== undefined,
    [userData?.introductionPostId],
  );

  const { data: introductionData, isLoading: isLoadingIntroduction } = useGetPostById({
    enabled: loadIntroductionData,
    variables: userData?.introductionPostId ?? 0,
    suspense: true,
  });

  const updateUserIntroduction = useUpdateUserIntroduction({
    onSuccess: () => {
      setEditIntroduction(false);
    },
  });

  const isLoading = isLoadingUser || (isLoadingIntroduction && loadIntroductionData);

  const isMyPost = useMemo(
    () => user?.id === userData?.id && user?.id !== undefined,
    [user?.id, userData?.id],
  );

  const editIntroductionHandler = useCallback(() => {
    setEditIntroduction(true);
  }, []);

  const onEditorChange = useCallback(() => {}, []);

  useEffect(() => {
    console.log('userData', userData);
  }, [userData]);

  useEffect(() => {
    console.log('introductionData', introductionData);
  }, [introductionData]);

  const onSave = useCallback(
    (editorState: EditorState, _editor: LexicalEditor) => {
      const props: UpdateUserIntroductionRequest = {
        userId: userId,
        body: {
          content: JSON.stringify(editorState),
        },
      };

      updateUserIntroduction.mutate(props);
    },
    [userId],
  );

  const editorState = useMemo(() => {
    if (!isLoading && userData?.introductionPostId !== undefined) {
      return introductionData?.content;
    } else {
      return undefined;
    }
  }, [isLoading, userData?.introductionPostId, introductionData?.content]);

  return (
    <Col fullWidth>
      {editorState && (
        <Editor
          loading={false}
          editorState={editorState}
          postView={!isMyPost || !editIntroduction}
          onChange={onEditorChange}
          onButtonAction={onSave}
          error={updateUserIntroduction.isError}
        />
      )}
      {user?.id === userId && !editIntroduction && (
        <InfoSection
          linkTitle={'Edit introduction'}
          linkAction={editIntroductionHandler}
          background
        >
          {!isLoading && userData?.introductionPostId === undefined && 'Introduction missing'}
        </InfoSection>
      )}
    </Col>
  );
};

export default UserIntroduction;
