import React, { useMemo } from 'react';
import { usePlacement } from '../../hooks/usePlacement';
import { useGetPostsByPlacement } from '../../api/posts/useGetPostsByPlacement';
import PostsTable from './PostsTable';

interface PostListProps {
  canEdit?: boolean;
}

const PostList: React.FC<PostListProps> = ({ canEdit }) => {
  const [placement, validPlacement] = usePlacement('post');

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
        .map((p) => p?.post!) ?? []
    );
  }, [postsDataPages]);

  const totalPostCount = useMemo(() => {
    return postsDataPages?.pages[0]?.totalCount ?? 0;
  }, [postsDataPages]);

  console.log(postsData);
  console.log(postsDataPages);

  return (
    <div>
      Total posts: {totalPostCount} <br />
      <button onClick={() => fetchNextPage()}> Load new page</button>
      {/*{postsData.map((post) => post.postTitle)}*/}
      <PostsTable data={postsData} canEdit={canEdit} placement={placement} />
    </div>
  );
};

export default PostList;
