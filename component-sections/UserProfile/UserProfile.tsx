import React, { useEffect } from 'react';
import { useGetUserById } from '../../api/useGetUserById';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Column, Row } from '../../components/Flex/Flex';
import { TitleH4 } from '../../components/Typography/Typography';
import { parseISO } from 'date-fns';
import { formatDate } from '../../utils/functions/formatDate';
import InfoRow from '../../components/InfoRow/InfoRow';
import InfoRowBox from '../../components/InfoRow/InfoRowBox';
import InfoSection from '../../components/InfoSection';
import { Button } from '../../components/Button/Button';
import { useGetAverageUserEvaluationByType } from '../../api/useGetAverageUserEvaluationByType';
import { PbEvaluationType } from '../../generated/api-types/data-contracts';
import Evaluation from '../../components/Evaluation/Evaluation';
import Avatar from '../../components/Avatar/Avatar';

interface UserProfileProps {
  userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data, isLoading, error } = useGetUserById({
    variables: userId,
    suspense: true,
  });

  const { data: evaluationData } = useGetAverageUserEvaluationByType({
    variables: {
      userId: userId,
      type: PbEvaluationType.Self,
    },
    suspense: true,
  });

  useEffect(() => {
    console.log('data', data);
    console.log('createdAt', data?.createdAt, parseISO(data?.createdAt ?? ''));
  }, [data]);

  return (
    <>
      <Column css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection direction="row" flexBasis="100%">
          <Column css={{ $$gap: '0.5rem' }}>
            <Avatar type="user" size="2xl" url={data?.avatarImageUrl} />
            <Button fullWidth type="secondary">
              Edit
            </Button>
            <Button fullWidth type="secondary">
              Message
            </Button>
            <Button fullWidth type="secondary">
              Ban
            </Button>
          </Column>
          <Column fullWidth css={{ $$gap: '0.25rem' }}>
            <TitleH4>{data?.username}</TitleH4>
            <Row fullWidth css={{ $$justifyContent: 'space-between' }}>
              <Column css={{ $$gap: '0.25rem' }}>
                <InfoRowBox>
                  <InfoRow title="Last active:" value="unknown" />
                  <InfoRow title="Registered:" value={formatDate(data?.createdAt, false, 'week')} />
                </InfoRowBox>
              </Column>
              <Column css={{ flexBasis: '370px' }}>
                {(evaluationData?.averageEvaluationVote ?? []).map((evaluation) => (
                  <Evaluation data={evaluation} disabled compact />
                ))}
              </Column>
            </Row>
          </Column>
        </ContentSection>
      </Column>
      <Column css={{ flexGrow: 1, flexBasis: '30rem' }}>
        <ContentSection direction="column" header="Introduction">
          <InfoSection linkTitle={'Add introduction'} linkHref={'/quests'} background>
            Introduction missing
          </InfoSection>
        </ContentSection>
      </Column>
    </>
  );
};

export default UserProfile;
