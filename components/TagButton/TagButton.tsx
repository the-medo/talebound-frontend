import React, { useCallback } from 'react';
import { Button, ButtonVariants } from '../Button/Button';
import { PbTag } from '../../generated/api-types/data-contracts';

type TagButtonProps<T extends PbTag | string> = {
  tag: T;
  count?: number;
  onSelect?: (tag: T) => void;
  active?: boolean;
  colorNonactive?: ButtonVariants['color'];
  colorActive?: ButtonVariants['color'];
  disabled?: boolean;
  tooltip?: string;
};

const TagButton = <T extends PbTag | string>({
  tag,
  count,
  onSelect,
  active = false,
  colorNonactive = 'primaryOutline',
  colorActive = 'primaryFill',
  disabled = false,
  tooltip,
}: TagButtonProps<T>) => {
  const onClick = useCallback(() => {
    if (onSelect) {
      onSelect(tag as T);
    }
  }, [onSelect, tag]);

  return (
    <Button
      disabled={disabled}
      size="sm"
      onClick={onClick}
      color={active ? colorActive : colorNonactive}
      title={tooltip}
    >
      {typeof tag === 'string' ? tag : tag.tag}
      {count !== undefined && ` (${count})`}
    </Button>
  );
};

export default TagButton;
