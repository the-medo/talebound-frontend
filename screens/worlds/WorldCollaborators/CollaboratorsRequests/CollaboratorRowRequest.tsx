import React from 'react';
import { PbWorldAdmin } from '../../../../generated/api-types/data-contracts';
import Avatar from '../../../../components/Avatar/Avatar';
import { TitleH4 } from '../../../../components/Typography/Title';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { TbShieldCheck, TbShieldOff, TbShieldQuestion } from 'react-icons/tb';
import { Button } from '../../../../components/Button/Button';
import Link from 'next/link';
import { formatDate } from '../../../../utils/functions/formatDate';

interface PropsByApprovedState {
  color: 'danger' | 'secondary';
  icon: React.ReactNode;
  text: string;
  showDenyButton?: boolean;
}

const propsByApprovedState: {
  denied: PropsByApprovedState;
  requested: PropsByApprovedState;
} = {
  denied: {
    color: 'danger',
    icon: <TbShieldOff size={30} />,
    text: 'Denied',
    showDenyButton: false,
  },
  requested: {
    color: 'secondary',
    icon: <TbShieldQuestion size={30} />,
    text: 'Requested',
    showDenyButton: true,
  },
};

interface CollaboratorRowRequestProps {
  data: PbWorldAdmin;
}

const CollaboratorRowRequest: React.FC<CollaboratorRowRequestProps> = ({ data }) => {
  data.superAdmin = true;

  const profileLink = `/user/${data.user?.id}/profile`;
  const props = propsByApprovedState[data.approved === 2 ? 'requested' : 'denied'];

  return (
    <Row gap="md" alignItems="start" wrap>
      <Link href={profileLink}>
        <Avatar type="user" url={data.user?.avatarImageUrl} />
      </Link>
      <Text color={props.color}>{props.icon}</Text>
      <Col css={{ width: '250px' }}>
        <Link href={profileLink}>
          <TitleH4 color={props.color}>{data.user?.username}</TitleH4>
        </Link>
        <Text i size="sm">
          {props.text}: {formatDate(data.createdAt, false, 'week')}
        </Text>
      </Col>
      <Col css={{ width: '250px' }}>
        <Text size="sm" i>
          {data.motivationalLetter ?? 'No motivational letter'}
        </Text>
      </Col>
      <Row gap="md">
        <Button size="sm">
          <TbShieldCheck />
          Approve
        </Button>
        {props.showDenyButton && (
          <Button color="dangerOutline" size="sm">
            <TbShieldOff />
            Deny
          </Button>
        )}
      </Row>
    </Row>
  );
};

export default CollaboratorRowRequest;
