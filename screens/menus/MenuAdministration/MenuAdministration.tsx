import React, { useCallback, useEffect, useState } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import MenuAdministrationItem from './MenuAdministrationItem';
import { Reorder } from 'framer-motion';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { styled } from '../../../styles/stitches.config';

const ReorderGroupWrapper = styled('div', {
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    loading: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

interface MenuAdministrationProps {
  menuId: number;
}

const MenuAdministration: React.FC<MenuAdministrationProps> = ({ menuId }) => {
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PbMenuItem[]>([]);

  useEffect(() => {
    setItems(menuItemsData);
  }, [menuItemsData]);

  const onReorder = useCallback((x: PbMenuItem[]) => {
    setItems(x);
  }, []);

  return (
    <ReorderGroupWrapper loading={loading}>
      <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
        {items.map((item, i) => (
          <MenuAdministrationItem
            key={item.id}
            currentIndex={i + 1}
            data={item}
            setLoading={setLoading}
          />
        ))}
      </Reorder.Group>
    </ReorderGroupWrapper>
  );
};

export default MenuAdministration;
