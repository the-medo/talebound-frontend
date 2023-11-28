import React, { useCallback, useMemo } from 'react';
import { parseError } from '../../../utils/types/error';
import Editor, { EditorOnSaveAction, PostViewType } from '../../../components/Editor/Editor';
import { Col } from '../../../components/Flex/Flex';
import { EMPTY_EDITOR_STATE } from '../../../components/Editor/utils/emptyEditorState';
import {
  UpdateWorldIntroductionRequest,
  useUpdateWorldIntroduction,
} from '../../../api/worlds/useUpdateWorldIntroduction';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';
import { useWorld } from '../../../hooks/useWorld';
import { usePost } from '../../../hooks/usePost';

type WorldIntroductionProps = {
  worldId: number;
  postViewOnly?: boolean;
};

const WorldIntroduction: React.FC<WorldIntroductionProps> = ({ worldId, postViewOnly = false }) => {
  const role = useMyWorldRole(worldId);
  const hasRightToEdit = isWorldCollaborator(role);

  const { world, isFetching: isFetchingWorld } = useWorld(worldId);

  const { post, isFetching: isFetchingIntroduction } = usePost(world?.descriptionPostId);

  const updateWorldIntroduction = useUpdateWorldIntroduction();

  const isFetching = isFetchingWorld || isFetchingIntroduction;

  const hasIntroduction = !isFetching && post?.content !== undefined;

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, _draft, successAction, errorAction, settleAction) => {
      const props: UpdateWorldIntroductionRequest = {
        worldId: worldId,
        postId: post?.id,
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
    [worldId, post?.id, updateWorldIntroduction],
  );

  const editorState = useMemo(() => {
    if (!isFetching && post?.id !== undefined) {
      return post?.content;
    } else if (!hasIntroduction) {
      return EMPTY_EDITOR_STATE;
    } else {
      return undefined;
    }
  }, [hasIntroduction, isFetching, post?.id, post?.content]);

  const resetErrorHandler = useCallback(() => {
    updateWorldIntroduction.reset();
  }, [updateWorldIntroduction]);

  return (
    <Col fullWidth>
      <Editor
        key={post?.id}
        loading={updateWorldIntroduction.isPending}
        hasRightToEdit={hasRightToEdit}
        editorState={editorState}
        disabled={false}
        editable={!postViewOnly}
        defaultPostViewType={PostViewType.POST}
        alreadyExists={post?.id !== undefined}
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
