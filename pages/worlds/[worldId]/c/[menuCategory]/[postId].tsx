import React, { Suspense } from 'react';
import useNumericParam from '../../../../../hooks/useNumericParam';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

interface MenuItemPostProps {}

const MenuItemPostPageWorlds: React.FC<MenuItemPostProps> = () => {
  const postId = useNumericParam('postId') ?? 0;

  return (
    <Suspense fallback={null}>
      <ModuleCategory postId={postId} />
    </Suspense>
  );
};

export default MenuItemPostPageWorlds;
