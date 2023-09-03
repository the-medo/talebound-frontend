import React, { useCallback, useMemo, useState } from 'react';
import { useGetPostById } from '../../api/posts/useGetPostById';
import { UpdatePostRequest, useUpdatePost } from '../../api/posts/useUpdatePost';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { Col, Row } from '../../components/Flex/Flex';
import { parseError } from '../../utils/types/error';
import { Client } from 'react-hydration-provider';
import LoadingText from '../../components/Loading/LoadingText';
import { TitleH2 } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { TbPencil, TbPencilOff } from 'react-icons/tb';
import PostEditMode from './PostEditMode';
import ContentSection from '../../components/ContentSection/ContentSection';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';

interface PostProps {
  postId: number;
  canEdit: boolean;
  customTitle?: string;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
}

const Post: React.FC<PostProps> = ({
  postId,
  canEdit,
  customTitle,
  canChangeTitle,
  canChangeDescription,
  canChangeThumbnail,
}) => {
  const [editMode, setEditMode] = useState(false);
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

  const toggleEditMode = useCallback(() => {
    setEditMode((p) => !p);
  }, []);

  const thumbnailImage = useMemo(() => {
    const img = postData?.post?.imageThumbnailUrl;
    if (img) return imageModifyVariant(img, ImageVariant['600x400']);
    return undefined;
  }, [postData?.post?.imageThumbnailUrl]);

  if (isLoadingPost) return <LoadingText />;

  return (
    <Client>
      <ContentSection flexWrap="wrap" direction="column" cornerImage={thumbnailImage}>
        <Col fullWidth>
          <Row gap="md" fullWidth justifyContent="between" wrap>
            <TitleH2>{customTitle ?? postData?.post?.title}</TitleH2>
            {canEdit && (
              <Button color="semiGhost" onClick={toggleEditMode}>
                {editMode ? <TbPencilOff /> : <TbPencil />}
                Edit mode
              </Button>
            )}
          </Row>
          {editMode && (
            <PostEditMode
              postId={postId}
              canChangeTitle={canChangeTitle}
              canChangeDescription={canChangeDescription}
              canChangeThumbnail={canChangeThumbnail}
            />
          )}
          <Editor
            key={postId}
            loading={updatePost.isLoading}
            editable={editMode && canEdit}
            hasRightToEdit={editMode && canEdit}
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
      </ContentSection>
    </Client>
  );
};

export default Post;
