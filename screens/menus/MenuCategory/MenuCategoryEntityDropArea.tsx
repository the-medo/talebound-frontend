import React from 'react';
import { Row } from '../../../components/Flex/Flex';
import { styled } from '../../../styles/stitches.config';
import { useDroppable } from '@dnd-kit/core';
import { DropType } from './menuCategoryUtils';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

export const MoveDropArea = styled(Row, {
  backgroundColor: '$white',
  borderRadius: '50px',
  flexBasis: '60%',
  paddingLeft: '2rem',
  border: '1px dashed $tertiary400',
  color: '$tertiary400',
  flexGrow: 1,
  transition: 'all 0.2s ease-in-out',

  variants: {
    isActive: {
      true: { backgroundColor: '$tertiary100', fontWeight: 'bold' },
    },
  },
});

export const NewGroupArea = styled(Row, {
  backgroundColor: '$primary100',
  borderRadius: '50px',
  flexBasis: '30%',
  paddingLeft: '2rem',
  border: '1px dashed $primary400',
  color: '$primary400',
  transition: 'all 0.2s ease-in-out',

  variants: {
    isActive: {
      true: { backgroundColor: '$primary400', color: '$primary100', fontWeight: 'bold' },
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
      <MoveDropArea
        padding="md"
        paddingLeft="lg"
        alignItems="center"
        justifyContent="center"
        isActive={!isOver}
      >
        Move here
      </MoveDropArea>
      <NewGroupArea
        padding="md"
        paddingLeft="lg"
        alignItems="center"
        justifyContent="center"
        ref={setDroppableRef}
        isActive={isOver}
      >
        New group
      </NewGroupArea>
    </Row>
  );
};

export default MenuCategoryEntityDropArea;
