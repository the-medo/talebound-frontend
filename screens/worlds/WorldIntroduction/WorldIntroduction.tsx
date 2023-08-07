import React, { useCallback, useMemo } from 'react';
import { PostTypeEnum, usePostType } from '../../../hooks/usePostType';
import { parseError } from '../../../utils/types/error';
import Editor, { EditorOnSaveAction, PostViewType } from '../../../components/Editor/Editor';
import { Col } from '../../../components/Flex/Flex';
import { EMPTY_EDITOR_STATE } from '../../../components/Editor/utils/emptyEditorState';
import {
  UpdateWorldIntroductionRequest,
  useUpdateWorldIntroduction,
} from '../../../api/worlds/useUpdateWorldIntroduction';
import { useGetPostById } from '../../../api/useGetPostById';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import { useMyWorldAdmin } from '../../../hooks/useWorldsOfUser';

type WorldIntroductionProps = {
  worldId: number;
  postViewOnly?: boolean;
};

const WorldIntroduction: React.FC<WorldIntroductionProps> = ({ worldId, postViewOnly = false }) => {
  const isMyPost = useMyWorldAdmin(worldId).isAdmin;
  const postType = usePostType(PostTypeEnum.WorldDescription);

  const { data: worldData, isLoading: isLoadingWorld } = useGetWorldById({
    variables: worldId,
    suspense: true,
  });

  const postId = useMemo(() => worldData?.descriptionPostId, [worldData?.descriptionPostId]);

  const loadIntroductionData = useMemo(() => postId !== undefined, [postId]);

  const { data: postData, isLoading: isLoadingIntroduction } = useGetPostById({
    enabled: loadIntroductionData,
    variables: postId ?? 0,
    suspense: true,
  });

  const updateWorldIntroduction = useUpdateWorldIntroduction();

  const isLoading = isLoadingWorld || (isLoadingIntroduction && loadIntroductionData);

  const hasIntroduction = !isLoading && postData?.post?.content !== undefined;

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, _draft, successAction, errorAction, settleAction) => {
      const props: UpdateWorldIntroductionRequest = {
        worldId: worldId,
        postId: postId,
        body: {
          content: JSON.stringify(editorState),
        },
      };

      updateWorldIntroduction.mutate(props, {
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
    [worldId, postId, updateWorldIntroduction],
  );

  const editorState = useMemo(() => {
    if (!isLoading && postId !== undefined) {
      return postData?.post?.content;
    } else if (!hasIntroduction) {
      return EMPTY_EDITOR_STATE;
    } else {
      return undefined;
    }
  }, [hasIntroduction, isLoading, postId, postData?.post?.content]);

  const resetErrorHandler = useCallback(() => {
    updateWorldIntroduction.reset();
  }, [updateWorldIntroduction]);

  return (
    <Col fullWidth>
      <Editor
        loading={updateWorldIntroduction.isLoading}
        hasRightToEdit={isMyPost}
        editorState={editorState}
        disabled={false}
        editable={!postViewOnly}
        defaultPostViewType={PostViewType.POST}
        alreadyExists={postId !== undefined}
        draftable={false}
        isDraft={false}
        onSaveAction={onSave}
        error={parseError(updateWorldIntroduction.error)}
        resetError={resetErrorHandler}
      />
    </Col>
  );
};

export default WorldIntroduction;
