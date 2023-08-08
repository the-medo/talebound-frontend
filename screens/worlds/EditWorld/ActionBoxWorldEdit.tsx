import React from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { TbMenuOrder, TbPencil, TbUsersGroup } from 'react-icons/tb';

interface ActionBoxWorldEditProps {
  worldId: number;
  activeButton?: 'edit' | 'collaborators' | 'menu';
}

const ActionBoxWorldEdit: React.FC<ActionBoxWorldEditProps> = ({
  worldId,
  activeButton = 'edit',
}) => {
  return (
    <ActionBox identifier={`action-box-world-edit_${activeButton}`}>
      <Row gap="md">
        <Link href={`/worlds/${worldId}/edit`}>
          <Button size="md" color={activeButton === 'edit' ? 'primaryOutline' : 'semiGhost'}>
            <TbPencil />
            Edit world
          </Button>
        </Link>
        <Link href={`/worlds/${worldId}/collaborators`}>
          <Button
            size="md"
            color={activeButton === 'collaborators' ? 'primaryOutline' : 'semiGhost'}
          >
            <TbUsersGroup />
            Collaborators
          </Button>
        </Link>
        <Link href={`/worlds/${worldId}/edit/menu`}>
          <Button size="md" color={activeButton === 'menu' ? 'primaryOutline' : 'semiGhost'}>
            <TbMenuOrder />
            Menu administration
          </Button>
        </Link>
      </Row>
    </ActionBox>
  );
};

export default ActionBoxWorldEdit;
