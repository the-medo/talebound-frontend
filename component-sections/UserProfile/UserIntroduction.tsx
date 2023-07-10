import React, { useCallback, useMemo } from 'react';
import { Col } from '../../components/Flex/Flex';
import { useGetUserById } from '../../api/useGetUserById';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileProps } from './UserProfile';
import { useGetPostById } from '../../api/useGetPostById';
import {
  UpdateUserIntroductionRequest,
  useUpdateUserIntroduction,
} from '../../api/useUpdateUserIntroduction';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { parseError } from '../../utils/types/error';
import { EMPTY_EDITOR_STATE } from '../../components/Editor/utils/emptyEditorState';

type UserIntroductionProps = Pick<UserProfileProps, 'userId'> & {
  postViewOnly?: boolean;
};

const UserIntroduction: React.FC<UserIntroductionProps> = ({ userId, postViewOnly = false }) => {
  const { user, isLoggedIn: _isLoggedIn } = useAuth();

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

  return (
    <Col fullWidth>
      <Editor
        loading={updateUserIntroduction.isLoading}
        hasRightToEdit={isMyPost}
        editorState={editorState}
        disabled={false}
        editable={!postViewOnly}
        defaultPostViewType={PostViewType.POST}
        isDraft={data?.post?.isDraft ?? false}
        alreadyExists={data?.post?.id !== undefined}
        draftable={data?.postType?.draftable ?? false}
        onSaveAction={onSave}
        error={parseError(updateUserIntroduction.error)}
        resetError={resetErrorHandler}
      />
    </Col>
  );
};

export default UserIntroduction;
