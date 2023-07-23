import React, { useMemo } from 'react';
import Modal from '../../../Modal/Modal';
import TableModalContent, { TableModalContentProps } from './TableModalContent';

interface TableModalProps extends TableModalContentProps {
  trigger: React.ReactNode;
  open?: boolean;
}

const TableModal: React.FC<TableModalProps> = ({ trigger, open, setOpen, ...contentProps }) => {
  const content = useMemo(
    () => <TableModalContent setOpen={setOpen} {...contentProps} />,
    [contentProps, setOpen],
  );

  return <Modal open={open} onOpenChange={setOpen} size="md" trigger={trigger} content={content} />;
};

export default TableModal;
