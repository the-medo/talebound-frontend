import React from 'react';
import { Button, ButtonVariants } from '../Button/Button';
import { PbQuestStatus } from '../../generated/api-types/data-contracts';
import { Text } from '../Typography/Text';

const questStatusMap: Record<
  PbQuestStatus,
  {
    title: string;
    buttonColor?: ButtonVariants['color'];
  }
> = {
  [PbQuestStatus.UNKNOWN]: {
    title: 'Unknown',
    buttonColor: 'dangerOutline',
  },
  [PbQuestStatus.NOT_STARTED]: {
    title: 'Not started',
    buttonColor: 'primaryOutline',
  },
  [PbQuestStatus.IN_PROGRESS]: {
    title: 'In progress',
    buttonColor: 'primaryOutline',
  },
  [PbQuestStatus.FINISHED_COMPLETED]: {
    title: 'Finished',
    buttonColor: 'primaryFill',
  },
  [PbQuestStatus.FINISHED_NOT_COMPLETED]: {
    title: 'Abandoned',
    buttonColor: 'semiGhost',
  },
};

type QuestStatusTagProps = {
  questStatus: PbQuestStatus;
};

const QuestStatusButton = ({ questStatus }: QuestStatusTagProps) => {
  const { title, buttonColor } = questStatusMap[questStatus];

  return (
    <Button color={buttonColor ?? 'semiGhost'} data-pressable="false">
      <Text b>Status: </Text>
      {title}
    </Button>
  );
};

export default QuestStatusButton;
