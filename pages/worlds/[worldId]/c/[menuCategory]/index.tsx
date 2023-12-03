import React from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

interface MenuCategoryProps {
  postId?: number;
}

const MenuCategoryPageWorlds: React.FC<MenuCategoryProps> = ({ postId }) => {
  return <ModuleCategory postId={postId} />;
};

export default MenuCategoryPageWorlds;
