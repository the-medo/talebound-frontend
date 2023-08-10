import React, { useMemo } from 'react';
import ActionBox from '../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../components/Button/Button';
import { Col, Row } from '../../components/Flex/Flex';
import { TbMenuOrder, TbPencil, TbUsersGroup } from 'react-icons/tb';
import { isWorldCollaborator, useMyWorldRole, WorldAdminRole } from '../../hooks/useWorldAdmins';
import { TitleH4 } from '../../components/Typography/Title';
import { useGetWorldAdmins } from '../../api/worlds/useGetWorldAdmins';
import Avatar from '../../components/Avatar/Avatar';
import Loading from '../../components/Loading/Loading';
import { Text } from '../../components/Typography/Text';
import { Badge } from 'antd';
import { theme } from '../../styles/stitches.config';

interface ActionBoxWorldProps {
  worldId: number;
  activeButton?: 'edit' | 'collaborators' | 'menu';
}

const ActionBoxWorld: React.FC<ActionBoxWorldProps> = ({ worldId, activeButton = 'edit' }) => {
  const role = useMyWorldRole(worldId);

  const { data: worldAdmins = [], isLoading } = useGetWorldAdmins({
    variables: worldId,
  });

  const worldAdminApproved = useMemo(
    () =>
      worldAdmins
        .filter((wa) => wa.approved === 1)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')),
    [worldAdmins],
  );

  const worldAdminRequests = useMemo(
    () => worldAdmins.filter((wa) => wa.approved === 2),
    [worldAdmins],
  );

  return (
    <ActionBox identifier={`action-box-world-edit_${activeButton}`}>
      <Col fullWidth css={{ height: '100%' }} gap="md" justifyContent="between">
        <Col gap="md">
          <Row gap="md">
            <TitleH4>World collaborators</TitleH4>
            <Link href={`/worlds/${worldId}/collaborators`}>
              {role === WorldAdminRole.REQUESTED && (
                <Text i u>
                  (collaboration requested)
                </Text>
              )}
              {role === WorldAdminRole.DENIED && (
                <Text i u>
                  (collaboration denied)
                </Text>
              )}
              {role === WorldAdminRole.NONE && (
                <Text i u>
                  (want to collaborate?)
                </Text>
              )}
            </Link>
          </Row>
          <Row gap="md">
            {isLoading && <Loading size="sm" />}
            {worldAdminApproved.map((worldAdmin) => (
              <Link
                key={worldAdmin.userId}
                href={`/user/${worldAdmin.userId}/profile`}
                title={worldAdmin.user?.username}
              >
                <Avatar size="lg" type="user" url={worldAdmin.user?.avatarImageUrl} />
              </Link>
            ))}
          </Row>
        </Col>
        <Row gap="md" alignSelf="center">
          {isWorldCollaborator(role) && (
            <Link href={`/worlds/${worldId}/edit`}>
              <Button size="md" color={activeButton === 'edit' ? 'primaryOutline' : 'semiGhost'}>
                <TbPencil />
                Edit world
              </Button>
            </Link>
          )}
          <Badge
            color={theme.colors.primary.toString()}
            size="default"
            count={worldAdminRequests.length}
            title={`${worldAdminRequests.length} request${
              worldAdminRequests.length > 1 ? 's' : ''
            }`}
          >
            <Link href={`/worlds/${worldId}/collaborators`}>
              <Button
                size="md"
                color={activeButton === 'collaborators' ? 'primaryOutline' : 'semiGhost'}
              >
                <TbUsersGroup />
                Collaborators
              </Button>
            </Link>
          </Badge>
          {isWorldCollaborator(role) && (
            <Link href={`/worlds/${worldId}/edit/menu`}>
              <Button size="md" color={activeButton === 'menu' ? 'primaryOutline' : 'semiGhost'}>
                <TbMenuOrder />
                Menu administration
              </Button>
            </Link>
          )}
        </Row>
      </Col>
    </ActionBox>
  );
};

export default ActionBoxWorld;
