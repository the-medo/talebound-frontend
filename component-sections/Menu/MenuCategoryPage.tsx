import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import MenuCategory from '../../screens/menus/MenuCategory/MenuCategory';

interface MenuCategoryProps {
  menuId: number;
  postId?: number;
  linkPrefix: string;
  canEdit?: boolean;
}

const MenuCategoryPage: React.FC<MenuCategoryProps> = ({ postId, linkPrefix, menuId, canEdit }) => {
  const router = useRouter();

  const m = router.query['menuCategory'];

  const menuItemCode = useMemo(() => {
    return typeof m === 'string' ? m : '';
  }, [m]);

  return (
    <MenuCategory
      menuItemCode={menuItemCode}
      menuId={menuId}
      postId={postId}
      linkPrefix={`${linkPrefix}/c/${menuItemCode}`}
      canEdit={canEdit}
    />
  );
};

export default MenuCategoryPage;
