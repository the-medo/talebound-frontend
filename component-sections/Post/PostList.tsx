import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePlacement } from '../../hooks/usePlacement';
import { PAGE_SIZE_POSTS, useGetPostsByPlacement } from '../../api/posts/useGetPostsByPlacement';
import PostsTable from './PostsTable';

interface PostListProps {
  canEdit?: boolean;
}

const PostList: React.FC<PostListProps> = ({ canEdit }) => {
  const [placement] = usePlacement('post');
  const [openedPage, setOpenedPage] = useState(1);

  const {
    data: postsDataPages,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsByPlacement({ variables: placement });

  const postsData = useMemo(() => {
    return (
      postsDataPages?.pages
        ?.map((page) => page.posts)
        .flat()
        .map((p) => p!.post!) ?? []
    );
  }, [postsDataPages]);

  useEffect(() => {
    if (
      hasNextPage &&
      postsData.length > 0 &&
      postsData.length <= PAGE_SIZE_POSTS * (openedPage - 1)
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, postsData.length, openedPage, fetchNextPage]);

  const totalPostCount = useMemo(() => {
    return postsDataPages?.pages[0]?.totalCount ?? 0;
  }, [postsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <PostsTable
      totalCount={totalPostCount}
      loading={isFetchingPosts}
      data={postsData}
      canEdit={canEdit}
      placement={placement}
      onPageChange={onPageChange}
    />
  );
};

export default PostList;
