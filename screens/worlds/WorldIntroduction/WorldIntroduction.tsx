import React, { useCallback, useMemo } from 'react';
import { parseError } from '../../../utils/types/error';
import Editor, { EditorOnSaveAction, PostViewType } from '../../../components/Editor/Editor';
import { Col } from '../../../components/Flex/Flex';
import { EMPTY_EDITOR_STATE } from '../../../components/Editor/utils/emptyEditorState';
import {
  UpdateWorldIntroductionRequest,
  useUpdateWorldIntroduction,
} from '../../../api/worlds/useUpdateWorldIntroduction';
import { useGetPostById } from '../../../api/posts/useGetPostById';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';

type WorldIntroductionProps = {
  worldId: number;
  postViewOnly?: boolean;
};

const WorldIntroduction: React.FC<WorldIntroductionProps> = ({ worldId, postViewOnly = false }) => {
  const role = useMyWorldRole(worldId);
  const hasRightToEdit = isWorldCollaborator(role);

  const { data: worldData, isPending: isPendingWorld } = useGetWorldById({
    variables: worldId,
  });

  const postId = useMemo(() => worldData?.descriptionPostId, [worldData?.descriptionPostId]);

  const loadIntroductionData = useMemo(() => postId !== undefined, [postId]);

  const { data: postData, isPending: isPendingIntroduction } = useGetPostById({
    variables: loadIntroductionData ? postId ?? 0 : 0,
  });

  const updateWorldIntroduction = useUpdateWorldIntroduction();

  const isPending = isPendingWorld || (isPendingIntroduction && loadIntroductionData);

  const hasIntroduction = !isPending && postData?.post?.content !== undefined;

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
    if (!isPending && postId !== undefined) {
      return postData?.post?.content;
    } else if (!hasIntroduction) {
      return EMPTY_EDITOR_STATE;
    } else {
      return undefined;
    }
  }, [hasIntroduction, isPending, postId, postData?.post?.content]);

  const resetErrorHandler = useCallback(() => {
    updateWorldIntroduction.reset();
  }, [updateWorldIntroduction]);

  return (
    <Col fullWidth>
      <Editor
        key={postId}
        loading={updateWorldIntroduction.isPending}
        hasRightToEdit={hasRightToEdit}
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
