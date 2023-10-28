import React, { useCallback, useMemo, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import Avatar from '../../components/Avatar/Avatar';
import { Table } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib';
import { Button } from '../../components/Button/Button';
import { MdEdit, MdOpenInNew } from 'react-icons/md';
import { PbDataPost, PbModule } from '../../generated/api-types/data-contracts';
import { Col, Row } from '../../components/Flex/Flex';
import PostFormModal from './PostFormModal';
import { PAGE_SIZE_POSTS } from '../../api/posts/useGetPostsByModule';
import { formatDate } from '../../utils/functions/formatDate';
import PostDetailModal from './PostDetailModal';

interface PostsTableProps {
  data: PbDataPost[];
  totalCount: number;
  canEdit?: boolean;
  loading?: boolean;
  module: PbModule;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
  onPageChange: (page: number, pageSize: number) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
  data,
  totalCount,
  canEdit,
  module,
  loading,
  isSelectionTable = false,
  isSelectionMultiple = false,
  onPageChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updatePost, setUpdatePost] = useState<PbDataPost>();
  const [detailModalPostId, setDetailModalPostId] = useState<number>();

  canEdit = canEdit && !isSelectionTable;

  const handleCloseUpdatePostModal = useCallback(() => setUpdatePost(undefined), []);
  const handleClosePostDetailModal = useCallback(() => setDetailModalPostId(undefined), []);

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

  const openPostModalButtons = useCallback((record: PbDataPost) => {
    const openHandler = () => setDetailModalPostId(record.id!);

    return (
      <Button icon onClick={openHandler} size="md" color="primaryOutline">
        <MdOpenInNew />
      </Button>
    );
  }, []);

  const columns: ColumnType<PbDataPost>[] = useMemo(() => {
    const cols: ColumnType<PbDataPost>[] = [
      {
        title: '',
        key: 'imageThumbnailUrl',
        dataIndex: 'imageThumbnailUrl',
        render: (value: string) => <Avatar size="md" url={value} />,
        width: '40px',
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (value: string) => <b>{value}</b>,
        sorter: (a, b) => (a.title ?? '').localeCompare(b.title ?? ''),
      },
      {
        title: 'Created at',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value: string) => formatDate(value, false, 'week'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
          if (!a.createdAt) return -1;
          if (!b.createdAt) return 1;
          return a.createdAt < b.createdAt ? -1 : 1;
        },
      },
      {
        title: 'Last update at',
        key: 'lastUpdatedAt',
        dataIndex: 'lastUpdatedAt',
        render: (value: string) => formatDate(value, false, 'week'),
        sorter: (a, b) => {
          if (!a.lastUpdatedAt) return -1;
          if (!b.lastUpdatedAt) return 1;
          return a.lastUpdatedAt < b.lastUpdatedAt ? -1 : 1;
        },
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'action-buttons',
        render: (_, record) => actionButtons(record),
        width: '40px',
      });
    }

    cols.push({
      title: '',
      key: 'action-buttons',
      render: (_, record) => openPostModalButtons(record),
      width: '40px',
    });

    return cols;
  }, [canEdit, actionButtons, openPostModalButtons]);

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

  const paginationConfig: TablePaginationConfig | undefined = useMemo(() => {
    return {
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // TODO: i18n
      showSizeChanger: false,
      total: totalCount,
      pageSize: PAGE_SIZE_POSTS,
      size: 'default',
      onChange: onPageChange,
      disabled: loading,
    };
  }, [totalCount, onPageChange, loading]);

  return (
    <>
      <Col fullWidth>
        <Table<PbDataPost>
          loading={loading}
          rowSelection={rowSelection}
          pagination={paginationConfig}
          showSorterTooltip={false}
          columns={columns}
          dataSource={data}
          rowKey="id"
          size="small"
          onRow={onRow}
        />
      </Col>
      {/*<ErrorText error={errorDelete} />*/}
      <PostFormModal
        module={module}
        trigger={undefined}
        post={updatePost}
        open={!!updatePost}
        setOpen={handleCloseUpdatePostModal}
      />
      <PostDetailModal
        postId={detailModalPostId}
        canEdit={canEdit}
        trigger={undefined}
        open={!!detailModalPostId}
        setOpen={handleClosePostDetailModal}
      />
    </>
  );
};

export default PostsTable;
