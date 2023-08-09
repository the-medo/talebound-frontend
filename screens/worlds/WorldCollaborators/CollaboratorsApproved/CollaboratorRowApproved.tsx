import React from 'react';
import { PbWorldAdmin } from '../../../../generated/api-types/data-contracts';
import Avatar from '../../../../components/Avatar/Avatar';
import { TitleH4 } from '../../../../components/Typography/Title';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { TbShield, TbShieldOff, TbShieldStar } from 'react-icons/tb';
import { Button } from '../../../../components/Button/Button';
import Link from 'next/link';
import { formatDate } from '../../../../utils/functions/formatDate';
import { useMyWorldRole, WorldAdminRole } from '../../../../hooks/useWorldAdmins';

interface CollaboratorRowApprovedProps {
  data: PbWorldAdmin;
}

//Make super - gold button color? css={{ backgroundColor: '$warning' }}

const CollaboratorRowApproved: React.FC<CollaboratorRowApprovedProps> = ({ data }) => {
  data.superAdmin = true;
  const role = useMyWorldRole(data.worldId ?? 0);

  const profileLink = `/user/${data.user?.id}/profile`;

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
      {role === WorldAdminRole.SUPER_COLLABORATOR && (
        <Row gap="md">
          <Button size="sm">
            <TbShieldStar />
            Make super
          </Button>
          <Button color="dangerOutline" size="sm">
            <TbShieldOff />
            Remove from collaborators
          </Button>
        </Row>
      )}
    </Row>
  );
};

export default CollaboratorRowApproved;
