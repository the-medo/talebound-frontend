import React, { Suspense } from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

interface MenuCategoryProps {
  postId?: number;
}

const MenuCategoryPageWorlds: React.FC<MenuCategoryProps> = ({ postId }) => {
  return (
    <Suspense fallback={null}>
      <ModuleCategory postId={postId} />
    </Suspense>
  );
};

export default MenuCategoryPageWorlds;
