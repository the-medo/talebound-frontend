import React, { useCallback } from 'react';
import { Button, ButtonVariants } from '../Button/Button';
import { PbTag } from '../../generated/api-types/data-contracts';

interface TagButtonProps {
  tag: PbTag;
  count?: number;
  onSelect?: (tag: PbTag) => void;
  active?: boolean;
  colorNonactive?: ButtonVariants['color'];
  colorActive?: ButtonVariants['color'];
}

const TagButton: React.FC<TagButtonProps> = ({
  tag: { id, tag },
  count,
  onSelect,
  active,
  colorNonactive = 'primaryOutline',
  colorActive = 'primaryFill',
}) => {
  const onClick = useCallback(() => {
    if (onSelect) {
      onSelect({ id, tag });
    }
  }, [id, onSelect, tag]);

  return (
    <Button size="sm" onClick={onClick} color={active ? colorActive : colorNonactive}>
      {tag}
      {count !== undefined && ` (${count})`}
    </Button>
  );
};

export default TagButton;
