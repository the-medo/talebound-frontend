import React, { useCallback, useMemo, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import Avatar from '../../components/Avatar/Avatar';
import { Table } from 'antd';
import { TableProps } from 'antd/lib';
import { Button } from '../../components/Button/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PbDataPost, PbPlacement } from '../../generated/api-types/data-contracts';
import { Row } from '../../components/Flex/Flex';
import PostFormModal from './PostFormModal';

interface PostsTableProps {
  data: PbDataPost[];
  canEdit?: boolean;
  placement: PbPlacement;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({
  data,
  canEdit,
  placement,
  isSelectionTable = false,
  isSelectionMultiple = false,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updatePost, setUpdatePost] = useState<PbDataPost>();

  canEdit = canEdit && !isSelectionTable;

  const handleCloseModal = useCallback(() => {
    setUpdatePost(undefined);
  }, []);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableProps<PbDataPost>['rowSelection'] = useMemo(
    () =>
      canEdit || isSelectionTable
        ? {
            selectedRowKeys,
            onChange: onSelectChange,
            type: isSelectionTable ? (isSelectionMultiple ? 'checkbox' : 'radio') : 'checkbox',
          }
        : undefined,
    [canEdit, selectedRowKeys, onSelectChange, isSelectionTable, isSelectionMultiple],
  );

  const openEditModal = useCallback((record: PbDataPost) => setUpdatePost(record), []);

  const actionButtons = useCallback(
    (record: PbDataPost) => {
      const updateHandler = () => openEditModal(record);

      return (
        <Row gap="xs">
          <Button icon onClick={updateHandler} size="md" color="primaryOutline">
            <MdEdit />
          </Button>
        </Row>
      );
    },
    [openEditModal],
  );

  const columns: ColumnType<PbDataPost>[] = useMemo(() => {
    const cols: ColumnType<PbDataPost>[] = [
      {
        title: '',
        key: 'imageThumbnailUrl',
        dataIndex: 'imageThumbnailUrl',
        render: (value: string) => <Avatar size="lg" url={value} />,
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (value: string) => <b>{value}</b>,
        sorter: (a, b) => (a.title ?? '').localeCompare(b.title ?? ''),
        width: '200px',
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        sorter: (a, b) => (a.description ?? '').localeCompare(b.description ?? ''),
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'action-buttons',
        render: (_, record) => actionButtons(record),
      });
    }

    return cols;
  }, [canEdit, placement, actionButtons]);

  const onRow: TableProps<PbDataPost>['onRow'] = useCallback(
    (record: PbDataPost) => {
      if (!isSelectionTable) return {};

      return {
        onClick: () => {
          setSelectedRowKeys([record.id!]);
        },
      };
    },
    [isSelectionTable],
  );

  return (
    <>
      <Table<PbDataPost>
        // loading={isPendingDelete}
        rowSelection={rowSelection}
        showSorterTooltip={false}
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        onRow={onRow}
      />
      {/*<ErrorText error={errorDelete} />*/}
      <PostFormModal
        placement={placement}
        trigger={undefined}
        post={updatePost}
        open={!!updatePost}
        setOpen={handleCloseModal}
      />
    </>
  );
};

export default PostsTable;
