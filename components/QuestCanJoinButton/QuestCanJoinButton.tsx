import React from 'react';
import { Button } from '../Button/Button';
import { TbLockOff, TbLockOpen } from 'react-icons/tb';

type QuestCanJoinButtonProps = {
  canJoin: boolean;
};

const QuestCanJoinButton = ({ canJoin }: QuestCanJoinButtonProps) => {
  return (
    <Button color={canJoin ? 'primaryOutline' : 'semiGhost'} size="sm" data-pressable="false" icon>
      {canJoin ? <TbLockOpen /> : <TbLockOff />}
    </Button>
  );
};

export default QuestCanJoinButton;
