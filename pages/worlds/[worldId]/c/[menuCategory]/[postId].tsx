import React from 'react';
import useNumericParam from '../../../../../hooks/useNumericParam';
import MenuCategoryPageWorlds from './index';

interface MenuItemPostProps {}

const MenuItemPostPageWorlds: React.FC<MenuItemPostProps> = () => {
  const postId = useNumericParam('postId') ?? 0;

  return <MenuCategoryPageWorlds postId={postId} />;
};

export default MenuItemPostPageWorlds;
