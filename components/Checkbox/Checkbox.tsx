import React, { PropsWithChildren, useMemo } from 'react';
import { CheckboxRoot } from '../../components-radix-ui/Checkbox/CheckboxRoot';
import { CheckboxIndicator } from '../../components-radix-ui/Checkbox/CheckboxIndicator';
import { MdCheck } from 'react-icons/md';
import { Flex } from '../Flex/Flex';
import { CSSProperties } from '@stitches/react';

interface CheckboxProps extends PropsWithChildren {
  id?: string;
  defaultValue?: boolean;
  value?: boolean;
  disabled?: boolean;
  childrenRender?: 'before' | 'after';
  childrenDirection?: CSSProperties['flexDirection'];
  onChange?: (v: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  defaultValue = false,
  value,
  disabled = false,
  onChange,
  childrenRender = 'after',
  childrenDirection = 'row',
  children,
}) => {
  const checkboxRenderer = useMemo(
    () => (
      <CheckboxRoot
        checked={value}
        onCheckedChange={onChange}
        defaultChecked={defaultValue}
        id={id}
        disabled={disabled}
      >
        <CheckboxIndicator>
          <MdCheck size={20} />
        </CheckboxIndicator>
      </CheckboxRoot>
    ),
    [value, onChange, defaultValue, id],
  );

  if (!children) return checkboxRenderer;

  return (
    <Flex alignItems="center" css={{ flexDirection: childrenDirection }}>
      {childrenRender === 'before' && children}
      {checkboxRenderer}
      {childrenRender === 'after' && children}
    </Flex>
  );
};

export default Checkbox;
