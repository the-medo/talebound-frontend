import React from 'react';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Reorder } from 'framer-motion';
import { styled } from '../../../styles/stitches.config';

const Item = styled('div', {
  border: '2px solid red',
  padding: '0.25rem',
  margin: '0.25rem',
});

interface MenuAdministrationItemProps {
  data: PbMenuItem;
}

const MenuAdministrationItem: React.FC<MenuAdministrationItemProps> = ({ data }) => {
  return (
    <Reorder.Item as="div" value={data}>
      <Item>
        {data.code} - {data.name}
      </Item>
    </Reorder.Item>
  );
};

export default MenuAdministrationItem;
