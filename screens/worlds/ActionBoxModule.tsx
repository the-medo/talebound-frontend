import React, { useMemo } from 'react';
import ActionBox from '../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../components/Button/Button';
import { Col, Row } from '../../components/Flex/Flex';
import { TbMenuOrder, TbPencil, TbUsersGroup } from 'react-icons/tb';
import {
  isModuleCollaborator,
  useMyModuleRole,
  ModuleAdminRole,
} from '../../hooks/useModuleAdmins';
import { TitleH4 } from '../../components/Typography/Title';
import { useGetModuleAdmins } from '../../api/modules/useGetModuleAdmins';
import Avatar from '../../components/Avatar/Avatar';
import Loading from '../../components/Loading/Loading';
import { Text } from '../../components/Typography/Text';
import { Badge } from 'antd';
import { theme } from '../../styles/stitches.config';

interface ActionBoxModuleProps {
  moduleId: number;
  activeButton?: 'edit' | 'collaborators' | 'menu';
}

const ActionBoxModule: React.FC<ActionBoxModuleProps> = ({ moduleId, activeButton }) => {
  const role = useMyModuleRole(moduleId);

  const { data: moduleAdmins = [], isPending } = useGetModuleAdmins({
    variables: moduleId,
  });

  const moduleAdminApproved = useMemo(
    () =>
      moduleAdmins
        .filter((wa) => wa.approved === 1)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')),
    [moduleAdmins],
  );

  const worldAdminRequests = useMemo(
    () => moduleAdmins.filter((wa) => wa.approved === 2),
    [moduleAdmins],
  );

  return (
    <ActionBox key={`world-${moduleId}`} identifier={`action-box-module-edit_${activeButton}`}>
      <Col fullWidth css={{ height: '100%' }} gap="md" justifyContent="between">
        <Col gap="md">
          <Row gap="md">
            <TitleH4>World collaborators</TitleH4>
            <Link href={`/worlds/${moduleId}/collaborators`}>
              {role === ModuleAdminRole.REQUESTED && (
                <Text i u>
                  (collaboration requested)
                </Text>
              )}
              {role === ModuleAdminRole.DENIED && (
                <Text i u>
                  (collaboration denied)
                </Text>
              )}
              {role === ModuleAdminRole.NONE && (
                <Text i u>
                  (want to collaborate?)
                </Text>
              )}
            </Link>
          </Row>
          <Row gap="md">
            {isPending && <Loading size="sm" />}
            {moduleAdminApproved.map((worldAdmin) => (
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
        <Row gap="md" wrap={true} alignSelf="center">
          {isModuleCollaborator(role) && (
            <Link href={`/worlds/${moduleId}/edit`}>
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
            <Link href={`/worlds/${moduleId}/collaborators`}>
              <Button
                size="md"
                color={activeButton === 'collaborators' ? 'primaryOutline' : 'semiGhost'}
              >
                <TbUsersGroup />
                Collaborators
              </Button>
            </Link>
          </Badge>
          {isModuleCollaborator(role) && (
            <Link href={`/worlds/${moduleId}/edit/menu`}>
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

export default ActionBoxModule;
