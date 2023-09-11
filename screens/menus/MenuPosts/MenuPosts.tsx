'use client';

import React, { useMemo, useState } from 'react';
import { useGetMenuItemPostsByMenuId } from '../../../api/menus/useGetMenuItemPostsByMenuId';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Table } from 'antd';
import { formatDate } from '../../../utils/functions/formatDate';
import Avatar from '../../../components/Avatar/Avatar';

interface MenuPostsProps {
  menuId: number;
}

interface PbMenuItemWithParent {
  item: PbMenuItem;
  parent?: PbMenuItem;
}

interface PostTableData {
  avatar?: string;
  key?: number;
  category?: string;
  title?: string;
  createdAt: Date | undefined;
  lastUpdatedAt: Date | undefined;
}

type MenuItemsById = Record<number, PbMenuItemWithParent>;

const MenuPosts: React.FC<MenuPostsProps> = ({ menuId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });
  const { data: menuItemPostsData = [] } = useGetMenuItemPostsByMenuId({
    variables: menuId,
    enabled: menuId > 0,
  });

  const menuItemsById = useMemo(() => {
    const result: MenuItemsById = {};
    let currentParent: PbMenuItem | undefined;
    menuItemsData.forEach((item) => {
      if (item.id) {
        if (item.isMain) {
          currentParent = item;
          result[item.id] = { item };
        } else {
          result[item.id] = { item, parent: currentParent };
        }
      }
    });
    return result;
  }, [menuItemsData]);

  const columns = useMemo(
    () => [
      {
        title: '',
        key: 'avatar',
        dataIndex: 'avatar',
        render: (value: string) => <Avatar size="lg" url={value} />,
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (value: string) => <b>{value}</b>,
        sorter: (a: PostTableData, b: PostTableData) =>
          (a.title ?? '').localeCompare(b.title ?? ''),
      },
      {
        title: 'Created at',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value: string) => formatDate(value, false, 'week'),
        sorter: (a: PostTableData, b: PostTableData) => {
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
        sorter: (a: PostTableData, b: PostTableData) => {
          if (!a.lastUpdatedAt) return -1;
          if (!b.lastUpdatedAt) return 1;
          return a.lastUpdatedAt < b.lastUpdatedAt ? -1 : 1;
        },
      },
      {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        sorter: (a: PostTableData, b: PostTableData) =>
          (a.category ?? '').localeCompare(b.category ?? ''),
      },
    ],
    [],
  );

  const data: PostTableData[] = useMemo(
    () =>
      menuItemPostsData.map((p) => {
        const menuItem = menuItemsById[p.menuItemId ?? 0];
        const createdAt = p.post?.createdAt;
        const lastUpdatedAt = p.post?.lastUpdatedAt;

        return {
          avatar: p.post?.imageThumbnailUrl,
          key: p.postId,
          category: menuItem.parent
            ? `${menuItem.parent.name} - ${menuItem.item.name}`
            : menuItem.item.name,
          title: p.post?.title,
          createdAt: createdAt ? new Date(createdAt) : undefined,
          lastUpdatedAt: lastUpdatedAt ? new Date(lastUpdatedAt) : undefined,
        };
      }),
    [menuItemsById, menuItemPostsData],
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column" header="Posts">
          <Table<PostTableData>
            rowSelection={rowSelection}
            showSorterTooltip={false}
            columns={columns}
            dataSource={data}
            size="small"
          />
        </ContentSection>
      </Col>
    </Row>
  );
};

export default MenuPosts;
