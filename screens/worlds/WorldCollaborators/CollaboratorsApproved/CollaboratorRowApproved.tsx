import React, { useCallback, useMemo } from 'react';
import { PbModuleAdmin } from '../../../../generated/api-types/data-contracts';
import Avatar from '../../../../components/Avatar/Avatar';
import { TitleH4 } from '../../../../components/Typography/Title';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { TbShield, TbShieldOff, TbShieldStar } from 'react-icons/tb';
import { Button } from '../../../../components/Button/Button';
import Link from 'next/link';
import { formatDate } from '../../../../utils/functions/formatDate';
import { useMyModuleRole, ModuleAdminRole } from '../../../../hooks/useModuleAdmins';
import { useUpdateModuleAdmin } from '../../../../api/modules/useUpdateModuleAdmin';
import { useDeleteModuleAdmin } from '../../../../api/modules/useDeleteModuleAdmin';
import AlertDialog from '../../../../components/AlertDialog/AlertDialog';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';

interface CollaboratorRowApprovedProps {
  data: PbModuleAdmin;
  canLeave?: boolean;
}

//Make super - gold button color? css={{ backgroundColor: '$warning' }}

const CollaboratorRowApproved: React.FC<CollaboratorRowApprovedProps> = ({
  data,
  canLeave = true,
}) => {
  const role = useMyModuleRole(data.worldId ?? 0);
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);
  const isMyRow = data.user?.id === userId;
  const profileLink = `/user/${data.user?.id}/profile`;

  const {
    mutate: updateWorldAdmin,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleAdmin();

  const {
    mutate: deleteWorldAdmin,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteModuleAdmin();

  const doRequest = useCallback(
    (superAdmin: boolean) => {
      if (data.worldId && data.userId) {
        updateWorldAdmin({
          worldId: data.worldId,
          body: {
            userId: data.userId,
            superAdmin,
          },
        });
      }
    },
    [data.userId, data.worldId, updateWorldAdmin],
  );

  const makeSuperCollaborator = useCallback(() => doRequest(true), [doRequest]);
  const makeBasicCollaborator = useCallback(() => doRequest(false), [doRequest]);

  const deleteSuperCollaborator = useCallback(() => {
    if (data.worldId && data.userId) {
      deleteWorldAdmin({
        worldId: data.worldId,
        userId: data.userId,
      });
    }
  }, [data.userId, data.worldId, deleteWorldAdmin]);

  const deleteButton = useMemo(
    () => (
      <Button color="dangerOutline" size="sm" loading={isPendingDelete}>
        <TbShieldOff />
        Remove from collaborators
      </Button>
    ),
    [isPendingDelete],
  );

  const leaveButton = useMemo(
    () => (
      <Button color="dangerOutline" size="sm" loading={isPendingDelete}>
        <TbShieldOff />
        Leave world
      </Button>
    ),
    [isPendingDelete],
  );

  return (
    <Row gap="md">
      <Link href={profileLink}>
        <Avatar type="user" url={data.user?.avatarImageUrl} />
      </Link>
      <Text color={data.superAdmin ? 'warning' : 'primary'}>
        {data.superAdmin ? <TbShieldStar size={30} /> : <TbShield size={30} />}
      </Text>
      <Col css={{ width: '250px' }}>
        <Link href={profileLink}>
          <TitleH4 color={data.superAdmin ? 'warning' : undefined}>{data.user?.username}</TitleH4>
        </Link>
        <Text i size="sm">
          from: {formatDate(data.createdAt, false, 'week')}
        </Text>
      </Col>
      <Row gap="md">
        {role === ModuleAdminRole.SUPER_COLLABORATOR && !isMyRow && (
          <>
            {data.superAdmin ? (
              <Button size="sm" onClick={makeBasicCollaborator} loading={isPendingUpdate}>
                <TbShield />
                Make basic
              </Button>
            ) : (
              <Button size="sm" onClick={makeSuperCollaborator} loading={isPendingUpdate}>
                <TbShieldStar />
                Make super
              </Button>
            )}
            <AlertDialog
              triggerElement={deleteButton}
              title={`Remove "${data.user?.username}" from collaborators?`}
              description="User will no longer be able to edit this world, but can send request for collaboration again."
              dangerButtonText="Remove collaborator"
              submitAction={deleteSuperCollaborator}
            />
          </>
        )}
        {(canLeave || role !== ModuleAdminRole.SUPER_COLLABORATOR) && isMyRow && (
          <AlertDialog
            triggerElement={leaveButton}
            title={`Leave world`}
            description="You will no longer be able to edit this world. You can send request to be collaborator again."
            dangerButtonText="Leave world"
            submitAction={deleteSuperCollaborator}
          />
        )}
        <ErrorText error={errorUpdate ?? errorDelete} />
      </Row>
    </Row>
  );
};

export default CollaboratorRowApproved;
