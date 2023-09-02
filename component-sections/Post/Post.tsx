import React, { useCallback, useMemo } from 'react';
import { useGetPostById } from '../../api/posts/useGetPostById';
import { UpdatePostRequest, useUpdatePost } from '../../api/posts/useUpdatePost';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { Col } from '../../components/Flex/Flex';
import { parseError } from '../../utils/types/error';
import { Client } from 'react-hydration-provider';
import LoadingText from '../../components/Loading/LoadingText';

interface PostProps {
  postId: number;
  postViewOnly: boolean;
}

const Post: React.FC<PostProps> = ({ postId, postViewOnly }) => {
  const { data: postData, isLoading: isLoadingPost } = useGetPostById({
    enabled: postId > 0,
    variables: postId,
  });

  const updatePost = useUpdatePost();

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, _draft, successAction, errorAction, settleAction) => {
      const props: UpdatePostRequest = {
        postId: postId,
        body: {
          content: JSON.stringify(editorState),
        },
      };

      updatePost.mutate(props, {
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
    [postId, updatePost],
  );

  const editorState = useMemo(() => {
    if (!isLoadingPost && postId !== undefined) {
      return postData?.post?.content;
    } else {
      return undefined;
    }
  }, [isLoadingPost, postId, postData?.post?.content]);

  const resetErrorHandler = useCallback(() => {
    updatePost.reset();
  }, [updatePost]);

  if (isLoadingPost) return <LoadingText />;

  return (
    <Client>
      <Col fullWidth>
        <Editor
          key={postId}
          loading={updatePost.isLoading}
          editable={!postViewOnly}
          hasRightToEdit={!postViewOnly}
          editorState={editorState}
          disabled={false}
          defaultPostViewType={PostViewType.POST}
          alreadyExists={postId !== undefined}
          draftable={false}
          isDraft={false}
          onSaveAction={onSave}
          error={parseError(updatePost.error)}
          resetError={resetErrorHandler}
        />
      </Col>
    </Client>
  );
};

export default Post;
