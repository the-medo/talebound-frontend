import React, { useCallback, useEffect, useMemo } from 'react';
import { Col } from '../../components/Flex/Flex';
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
import Editor, { EditorOnSaveAction } from '../../components/Editor/Editor';

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

  const updateUserIntroduction = useUpdateUserIntroduction();

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

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, draft, successAction, errorAction, finishAction) => {
      const props: UpdateUserIntroductionRequest = {
        userId: userId,
        postId: userData?.introductionPostId,
        body: {
          content: JSON.stringify(editorState),
          saveAsDraft: draft,
        },
      };

      updateUserIntroduction.mutate(props, {
        onSuccess: () => {
          console.log('Inside onSuccess of updateUserIntroduction.mutate');
          if (successAction) successAction();
        },
        onError: () => {
          console.log('Inside onError of updateUserIntroduction.mutate');
          if (errorAction) errorAction();
        },
        onSettled: () => {
          console.log('Inside onSettled of updateUserIntroduction.mutate');
          if (finishAction) finishAction();
        },
      });
    },
    [userData?.introductionPostId, userId],
  );

  const closeEditorHandler = useCallback(() => {
    setEditIntroduction(false);
  }, []);

  const editorState = useMemo(() => {
    if (!isLoading && userData?.introductionPostId !== undefined) {
      return introductionData?.content;
    } else {
      return undefined;
    }
  }, [isLoading, userData?.introductionPostId, introductionData?.content]);

  return (
    <Col fullWidth>
      <p>Content: {introductionData?.content}</p>
      <p>Is draft: {introductionData?.isDraft}</p>
      {(editorState || (isMyPost && userData?.introductionPostId === undefined)) && (
        <Editor
          loading={updateUserIntroduction.isLoading}
          editorState={editorState}
          disabled={!isMyPost}
          postView={!isMyPost || !editIntroduction}
          isDraft={introductionData?.isDraft ?? false}
          alreadyExists={introductionData?.id !== undefined}
          draftable={true}
          onChange={onEditorChange}
          onSaveAction={onSave}
          error={updateUserIntroduction.error?.message}
          closeEditor={closeEditorHandler}
        />
      )}
      {isMyPost && !editIntroduction && (
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
