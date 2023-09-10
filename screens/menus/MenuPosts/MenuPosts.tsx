import React from 'react';
import { useGetMenuItemPostsByMenuId } from '../../../api/menus/useGetMenuItemPostsByMenuId';

interface MenuPostsProps {
  menuId: number;
}

const MenuPosts: React.FC<MenuPostsProps> = ({ menuId }) => {
  const { data: menuItemsData = [] } = useGetMenuItemPostsByMenuId({
    variables: menuId,
    enabled: menuId > 0,
  });

  return (
    <div>
      <ul>
        {menuItemsData.map((item) => (
          <li key={item.postId}>{item.post?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPosts;
