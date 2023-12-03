import React, { useCallback, useMemo, useState } from 'react';
import { useGetPostById } from '../../api/posts/useGetPostById';
import {
  UpdatePostCacheHelper,
  UpdatePostRequest,
  useUpdatePost,
} from '../../api/posts/useUpdatePost';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { Col, Row } from '../../components/Flex/Flex';
import { parseError } from '../../utils/types/error';
import { Client } from 'react-hydration-provider';
import LoadingText from '../../components/Loading/LoadingText';
import { TitleH2 } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { TbAlignBoxLeftTop, TbPencil } from 'react-icons/tb';
import PostEditMode from './PostEditMode';
import ContentSection from '../../components/ContentSection/ContentSection';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';

interface PostProps {
  postId: number;
  canEdit: boolean;
  cacheHelper?: UpdatePostCacheHelper;
  customTitle?: string;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  isModal?: boolean;
}

const Post: React.FC<PostProps> = ({
  postId,
  canEdit,
  cacheHelper,
  customTitle,
  canChangeTitle,
  canChangeDescription,
  canChangeThumbnail,
  isModal = false,
}) => {
  const [editModeDetails, setEditModeDetails] = useState(false);
  const [editModeContent, setEditModeContent] = useState(false);
  const { data: postData, isPending: isPendingPost } = useGetPostById({
    variables: postId,
  });

  const updatePost = useUpdatePost();

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, _draft, successAction, errorAction, settleAction) => {
      const props: UpdatePostRequest = {
        postId: postId,
        cacheHelper,
        body: {
          content: JSON.stringify(editorState),
        },
      };

      updatePost.mutate(props, {
        onSuccess: () => {
          console.log('TEST1');
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
    [cacheHelper, postId, updatePost],
  );

  const editorState = useMemo(() => {
    if (!isPendingPost && postId !== undefined) {
      return postData?.post?.content;
    } else {
      return undefined;
    }
  }, [isPendingPost, postId, postData?.post?.content]);

  const resetErrorHandler = useCallback(() => {
    updatePost.reset();
  }, [updatePost]);

  const toggleEditModeDetails = useCallback(() => {
    setEditModeDetails((p) => !p);
  }, []);

  const toggleEditModeContent = useCallback(() => {
    setEditModeContent((p) => !p);
  }, []);

  const thumbnailImage = useMemo(() => {
    const img = postData?.post?.imageThumbnailUrl;
    if (img) return imageModifyVariant(img, ImageVariant['600x400']);
    return undefined;
  }, [postData?.post?.imageThumbnailUrl]);

  if (isPendingPost) return <LoadingText />;

  return (
    <Client>
      <ContentSection
        flexWrap="wrap"
        direction="column"
        cornerImage={thumbnailImage}
        noMargin={isModal}
      >
        <Col fullWidth gap="md">
          <Row gap="md" fullWidth justifyContent="between" wrap>
            <TitleH2>{customTitle ?? postData?.post?.title}</TitleH2>
            {canEdit && (
              <Row gap="md" paddingRight={isModal ? '2xl' : undefined}>
                <Button
                  color={editModeDetails ? 'primaryFill' : 'semiGhost'}
                  onClick={toggleEditModeDetails}
                >
                  <TbPencil />
                  Edit details
                </Button>
                <Button
                  color={editModeContent ? 'primaryFill' : 'semiGhost'}
                  onClick={toggleEditModeContent}
                >
                  <TbAlignBoxLeftTop />
                  Edit content
                </Button>
              </Row>
            )}
          </Row>
          {editModeDetails && (
            <PostEditMode
              key={`post-edit-mode-${postId}`}
              postId={postId}
              cacheHelper={cacheHelper}
              canChangeTitle={canChangeTitle}
              canChangeDescription={canChangeDescription}
              canChangeThumbnail={canChangeThumbnail}
            />
          )}
          <Editor
            key={postId}
            loading={updatePost.isPending}
            editable={editModeContent && canEdit}
            hasRightToEdit={editModeContent && canEdit}
            editorState={editorState}
            disabled={false}
            defaultPostViewType={PostViewType.POST}
            changedPostViewType={editModeContent ? PostViewType.EDIT : undefined}
            closeEditor={toggleEditModeContent}
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
