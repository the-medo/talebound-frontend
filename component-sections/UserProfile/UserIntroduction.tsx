import React, { useCallback, useMemo } from 'react';
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
import Editor, { EditorOnSaveAction } from '../../components/Editor/Editor';
import { parseError } from '../../utils/types/error';
import { EMPTY_EDITOR_STATE } from '../../components/Editor/utils/emptyEditorState';

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

  const { data: data, isLoading: isLoadingIntroduction } = useGetPostById({
    enabled: loadIntroductionData,
    variables: userData?.introductionPostId ?? 0,
    suspense: true,
  });

  const updateUserIntroduction = useUpdateUserIntroduction();

  const isLoading = isLoadingUser || (isLoadingIntroduction && loadIntroductionData);

  const hasIntroduction = !isLoading && data?.post?.content !== undefined;

  const isMyPost = useMemo(
    () => user?.id === userData?.id && user?.id !== undefined,
    [user?.id, userData?.id],
  );

  const editIntroductionHandler = useCallback(() => {
    setEditIntroduction(true);
  }, []);

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, draft, successAction, errorAction, settleAction) => {
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
          if (successAction) successAction();
        },
        onError: () => {
          if (errorAction) errorAction();
        },
        onSettled: () => {
          if (settleAction) settleAction();
        },
      });
    },
    [updateUserIntroduction, userData?.introductionPostId, userId],
  );

  const closeEditorHandler = useCallback(() => {
    setEditIntroduction(false);
  }, []);

  const editorState = useMemo(() => {
    if (!isLoading && userData?.introductionPostId !== undefined) {
      return data?.post?.content;
    } else if (!hasIntroduction) {
      return EMPTY_EDITOR_STATE;
    } else {
      return undefined;
    }
  }, [hasIntroduction, isLoading, userData?.introductionPostId, data?.post?.content]);

  const resetErrorHandler = useCallback(() => {
    updateUserIntroduction.reset();
  }, [updateUserIntroduction]);

  /*
  (editorState ||
        (isMyPost && userData?.introductionPostId === undefined))

   */

  return (
    <Col fullWidth>
      <Editor
        loading={updateUserIntroduction.isLoading}
        editorState={editorState}
        disabled={!isMyPost}
        postView={!isMyPost || !editIntroduction}
        isDraft={data?.post?.isDraft ?? false}
        alreadyExists={data?.post?.id !== undefined}
        draftable={data?.postType?.draftable ?? false}
        onSaveAction={onSave}
        error={parseError(updateUserIntroduction.error)}
        resetError={resetErrorHandler}
        closeEditor={closeEditorHandler}
      />
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
