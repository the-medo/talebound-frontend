'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useGetMenuItemPostsByMenuId } from '../../../api/menus/useGetMenuItemPostsByMenuId';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Table } from 'antd';
import { formatDate } from '../../../utils/functions/formatDate';
import Avatar from '../../../components/Avatar/Avatar';
import { ColumnType } from 'antd/es/table';
import { TitleH2 } from '../../../components/Typography/Title';
import PostNew from '../../../component-sections/Post/PostNew';
import { Button } from '../../../components/Button/Button';
import { TbMenuOrder, TbPlus } from 'react-icons/tb';
import { SelectOptionGroup, SelectOptions } from '../../../components-radix-ui/Select/selectLib';
import Select from '../../../components/Select/Select';
import { useCreateMenuItemPost } from '../../../api/menus/useCreateMenuItemPost';
import { useUpdateMenuPosts } from '../../../api/menus/useUpdateMenuPosts';
import { Text } from '../../../components/Typography/Text';
import ErrorText from '../../../components/ErrorText/ErrorText';

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

interface MenuPostsProps {
  menuId: number;
  canEdit?: boolean;
}

const MenuPosts: React.FC<MenuPostsProps> = ({ menuId, canEdit }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [createPostMode, setCreatePostMode] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>();

  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });
  const { data: menuItemPostsData = [] } = useGetMenuItemPostsByMenuId({
    variables: menuId,
    enabled: menuId > 0,
  });
  const { mutate: updateMenuPosts, isLoading, error } = useUpdateMenuPosts();

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

  const columns: ColumnType<PostTableData>[] = useMemo(
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
        defaultSortOrder: 'descend',
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
        sorter: (a, b) => {
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

        let category: string | undefined = '- none -';
        if (menuItem) {
          category = menuItem.parent
            ? `${menuItem.parent.name} - ${menuItem.item.name}`
            : menuItem.item.name;
        }

        return {
          avatar: p.post?.imageThumbnailUrl,
          key: p.postId,
          category,
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

  const toggleCreatePostMode = useCallback(() => {
    setCreatePostMode((p) => !p);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const options: SelectOptions = useMemo(() => {
    const groups: SelectOptionGroup[] = [
      {
        label: 'Unassign',
        options: [
          {
            value: '0',
            label: ' - no category - ',
          },
        ],
      },
    ];

    menuItemsData.forEach((item) => {
      if (item.id) {
        if (item.isMain) {
          groups.push({ label: item.name ?? '-', options: [] });
        } else {
          groups[groups.length - 1].options.push({
            value: item.id.toString(),
            label: item.name ?? '-',
          });
        }
      }
    });

    return {
      type: 'group',
      groups,
    };
  }, [menuItemsData]);

  const hasSelected = selectedRowKeys.length > 0;

  const submitCategoryChange = useCallback(() => {
    if (selectedRowKeys.length > 0) {
      updateMenuPosts({
        menuId,
        body: {
          postIds: selectedRowKeys.map((k) => parseInt(k.toString())),
          menuItemId: selectedAction ? parseInt(selectedAction) : undefined,
        },
      });
    }
  }, [updateMenuPosts, menuId, selectedRowKeys, selectedAction]);

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
          {hasSelected && (
            <Col css={{ maxWidth: '500px' }} gap="md" fullWidth>
              <TitleH2>Change category</TitleH2>
            </Col>
          )}
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ContentSection>
          <Row gap="md" fullWidth justifyContent="between">
            <TitleH2>New post</TitleH2>
            {canEdit && (
              <Row gap="md">
                <Button
                  color={createPostMode ? 'primaryFill' : 'primaryOutline'}
                  onClick={toggleCreatePostMode}
                >
                  <TbPlus />
                  Create post
                </Button>
              </Row>
            )}
          </Row>
          {createPostMode && <PostNew menuId={menuId} menuItemId={0} />}
        </ContentSection>
        <ContentSection>
          <TitleH2>Change category</TitleH2>
          {!hasSelected && <Text>Select posts to change their category or unassign them</Text>}
          {hasSelected && (
            <>
              <Text>{selectedRowKeys.length} selected post</Text>
              <Row gap="md" alignItems="center">
                <Select
                  id="menu_item_id"
                  options={options}
                  placeholder="Choose a category..."
                  onValueChange={setSelectedAction}
                  value={selectedAction}
                  noHelper={true}
                />
                <Button onClick={submitCategoryChange} loading={isLoading}>
                  Submit
                </Button>
                <ErrorText error={error} />
              </Row>
            </>
          )}
        </ContentSection>
      </Col>
    </Row>
  );
};

export default MenuPosts;
