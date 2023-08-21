import React, { useCallback, useEffect, useState } from 'react';
import { useGetMenuById } from '../../../api/menus/useGetMenuById';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import MenuAdministrationItem from './MenuAdministrationItem';
import { Reorder } from 'framer-motion';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';

interface MenuAdministrationProps {
  menuId: number;
}

const MenuAdministration: React.FC<MenuAdministrationProps> = ({ menuId }) => {
  const { data: menuData } = useGetMenuById({ variables: menuId });
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const [items, setItems] = useState<PbMenuItem[]>([]);

  useEffect(() => {
    console.log('Setting items - menuItemsData');
    setItems(menuItemsData);
  }, [menuItemsData]);

  const onReorder = useCallback((x: PbMenuItem[]) => {
    console.log('Setting items X', x);
    setItems(x);
  }, []);

  return (
    <div>
      {JSON.stringify(menuData)}
      {JSON.stringify(menuItemsData)}
      <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
        {items.map((item) => (
          <MenuAdministrationItem key={item.code} data={item} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default MenuAdministration;
