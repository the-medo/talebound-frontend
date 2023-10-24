import React, { useCallback, useMemo, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import Avatar from '../../components/Avatar/Avatar';
import { Table } from 'antd';

interface LocationTableData {
  name?: string;
  description?: string;
  thumbnailImageUrl?: string;
}

interface LocationTableProps {
  data: LocationTableData[];
  canEdit?: boolean;
}

const columns: ColumnType<LocationTableData>[] = [
  {
    title: '',
    key: 'thumbnailImageUrl',
    dataIndex: 'thumbnailImageUrl',
    render: (value: string) => <Avatar size="lg" url={value} />,
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    render: (value: string) => <b>{value}</b>,
    sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
    sorter: (a, b) => (a.description ?? '').localeCompare(b.description ?? ''),
  },
];

const LocationTable: React.FC<LocationTableProps> = ({ data, canEdit }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = useMemo(
    () =>
      canEdit
        ? {
            selectedRowKeys,
            onChange: onSelectChange,
          }
        : undefined,
    [canEdit, selectedRowKeys, onSelectChange],
  );

  return (
    <Table<LocationTableData>
      rowSelection={rowSelection}
      showSorterTooltip={false}
      columns={columns}
      dataSource={data}
      rowKey="id"
      size="small"
    />
  );
};

export default LocationTable;
