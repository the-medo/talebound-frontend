import React from 'react';
import { Row } from '../../../components/Flex/Flex';
import { styled } from '../../../styles/stitches.config';
import { useDroppable } from '@dnd-kit/core';
import { DropType } from './menuCategoryUtils';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

export const MoveDropArea = styled(Row, {
  backgroundColor: '$white',
  borderRadius: '$md',
  border: '1px dashed $tertiary400',
  color: '$tertiary400',
  flexGrow: 1,
  transition: 'all 0.2s ease-in-out',

  variants: {
    isActive: {
      true: {
        backgroundColor: '$white400',
        color: '$tertiary400',
        fontWeight: 'bold',
        borderStyle: 'solid',
      },
    },
  },
});

export const NewGroupArea = styled(Row, {
  backgroundColor: '$primary100',
  borderRadius: '$md',
  flexBasis: '30%',
  border: '1px dashed $primary400',
  color: '$primary400',
  transition: 'all 0.2s ease-in-out',

  variants: {
    isActive: {
      true: { backgroundColor: '$primary400', color: '$primary100', fontWeight: 'bold' },
      false: { fontWeight: 'normal' },
    },
  },
});

interface MenuCategoryEntityDropAreaProps {
  content: EntityGroupContentHierarchy;
}

const MenuCategoryEntityDropArea: React.FC<MenuCategoryEntityDropAreaProps> = ({ content }) => {
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id: content.hierarchyId + '-drop_new_group',
    data: { ...content, dropType: DropType.NEW_GROUP },
  });

  return (
    <Row gap="sm">
      <MoveDropArea padding="xs" alignItems="center" justifyContent="around" isActive={!isOver}>
        <span>Move here</span>
        <NewGroupArea
          padding="sm"
          alignItems="center"
          justifyContent="center"
          ref={setDroppableRef}
          isActive={isOver}
        >
          New group
        </NewGroupArea>
      </MoveDropArea>
    </Row>
  );
};

export default MenuCategoryEntityDropArea;
