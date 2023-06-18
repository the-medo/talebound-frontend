import React, { PropsWithChildren, useMemo } from 'react';
import { CheckboxRoot, CheckboxVariants } from '../../components-radix-ui/Checkbox/CheckboxRoot';
import { CheckboxIndicator } from '../../components-radix-ui/Checkbox/CheckboxIndicator';
import { MdCheck } from 'react-icons/md';
import { Flex } from '../Flex/Flex';
import { CSSProperties } from '@stitches/react';
import { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';

interface CheckboxProps extends PropsWithChildren, CheckboxVariants, RadixCheckboxProps {
  id?: string;
  childrenRender?: 'before' | 'after';
  childrenDirection?: CSSProperties['flexDirection'];
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  childrenRender = 'after',
  childrenDirection = 'row',
  children,
  ...checkboxProps
}) => {
  const checkboxRenderer = useMemo(
    () => (
      <CheckboxRoot id={id} {...checkboxProps}>
        <CheckboxIndicator>
          <MdCheck size={20} />
        </CheckboxIndicator>
      </CheckboxRoot>
    ),
    [checkboxProps, id],
  );

  if (!children) return checkboxRenderer;

  return (
    <Flex gap="md" alignItems="center" css={{ flexDirection: childrenDirection }}>
      {childrenRender === 'before' && <label htmlFor={id}>{children}</label>}
      {checkboxRenderer}
      {childrenRender === 'after' && <label htmlFor={id}>{children}</label>}
    </Flex>
  );
};

export default Checkbox;
