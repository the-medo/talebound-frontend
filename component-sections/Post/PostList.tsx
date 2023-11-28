import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useModuleRoute } from '../../hooks/useModuleRoute';
import { PAGE_SIZE_POSTS, useGetPostsByModule } from '../../api/posts/useGetPostsByModule';
import PostsTable from './PostsTable';
import { PbEntityType } from '../../generated/api-types/data-contracts';

interface PostListProps {
  canEdit?: boolean;
}

const PostList: React.FC<PostListProps> = ({ canEdit }) => {
  const [module] = useModuleRoute(PbEntityType.ENTITY_TYPE_POST);
  const [openedPage, setOpenedPage] = useState(1);

  const {
    data: postsDataPages,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsByModule({ variables: module });

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
      module={module}
      onPageChange={onPageChange}
    />
  );
};

export default PostList;
