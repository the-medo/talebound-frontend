import React, { useCallback, useMemo, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import Avatar from '../../components/Avatar/Avatar';
import { Table } from 'antd';
import { TableProps } from 'antd/lib';
import { Button } from '../../components/Button/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import LocationFormModal from './LocationFormModal';
import { PbLocationPlacement, PbViewLocation } from '../../generated/api-types/data-contracts';
import { useDeleteBulkLocation } from '../../api/locations/useDeleteBulkLocation';
import ErrorText from '../../components/ErrorText/ErrorText';

interface LocationTableProps {
  data: PbViewLocation[];
  canEdit?: boolean;
  placement: PbLocationPlacement;
}

const LocationTable: React.FC<LocationTableProps> = ({ data, canEdit, placement }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateLocation, setUpdateLocation] = useState<PbViewLocation>();

  const {
    mutate: deleteBulkLocations,
    isPending: isPendingDeleteBulk,
    error: errorDeleteBulk,
  } = useDeleteBulkLocation();

  const handleCloseModal = useCallback(() => {
    setUpdateLocation(undefined);
  }, []);

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

  const openEditModal = useCallback((record: PbViewLocation) => setUpdateLocation(record), []);

  const editButton = useCallback(
    (record: PbViewLocation, callback: (record: PbViewLocation) => void) => {
      const onClickHandler = () => callback(record);

      return (
        <Button icon onClick={onClickHandler} size="md" color="primaryOutline">
          <MdEdit />
        </Button>
      );
    },
    [],
  );

  const columns: ColumnType<PbViewLocation>[] = useMemo(() => {
    const cols: ColumnType<PbViewLocation>[] = [
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

    if (canEdit) {
      cols.push({
        title: 'Edit',
        key: 'edit',
        dataIndex: 'edit',
        render: (_, record) => editButton(record, openEditModal),
      });
    }

    return cols;
  }, [canEdit, editButton, openEditModal]);

  const summary: TableProps<PbViewLocation>['summary'] = useCallback(() => {
    if (!canEdit) return undefined;
    if (selectedRowKeys.length === 0) return undefined;

    const deleteBulkHandler = () => {
      const locationIds = selectedRowKeys.map((key) => parseInt(key.toString()));
      deleteBulkLocations(
        { locationIds, placement },
        {
          onSuccess: () => {
            setSelectedRowKeys([]);
          },
        },
      );
    };

    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={4} index={0}>
            <Button color="dangerFill" loading={isPendingDeleteBulk} onClick={deleteBulkHandler}>
              <MdDelete />
              Delete locations ({selectedRowKeys.length})
            </Button>
            <ErrorText error={errorDeleteBulk} />
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  }, [
    canEdit,
    deleteBulkLocations,
    errorDeleteBulk,
    isPendingDeleteBulk,
    placement,
    selectedRowKeys,
  ]);

  return (
    <>
      <Table<PbViewLocation>
        rowSelection={rowSelection}
        showSorterTooltip={false}
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        summary={summary}
      />
      <LocationFormModal
        placement={placement}
        trigger={undefined}
        location={updateLocation}
        open={!!updateLocation}
        setOpen={handleCloseModal}
      />
    </>
  );
};

export default LocationTable;
