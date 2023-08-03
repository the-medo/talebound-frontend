import React, { useCallback, useMemo } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, HelperType } from '../../../utils/form/helperTypes';
import { validateString } from '../../../utils/form/validatePassword';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2, TitleH3 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import ErrorText from '../../../components/ErrorText/ErrorText';
import DescriptionImage from '../../../components/DescriptionImage/DescriptionImage';
import { useUpdateWorld } from '../../../api/worlds/useUpdateWorld';
import ArticleJourneyOfWorldCrafting from '../../../articles/Worlds/ArticleJourneyOfWorldCrafting';

interface EditWorldProps {
  worldId: number;
}

const EditWorld: React.FC<EditWorldProps> = ({ worldId }) => {
  const updateWorldMutation = useUpdateWorld();
  const { value: nameValue, onChange: onChangeName } = useInput<string>('');
  const { value: basedOnValue, onChange: onChangeBasedOn } = useInput<string>('');
  const { value: shortDescriptionValue, onChange: onChangeShortDescription } = useInput<string>('');

  const helperNameMessage: HelperMessage = useMemo(
    () => validateString(nameValue, 3, 64),
    [nameValue],
  );

  const buttonDisabled = useMemo(
    () => helperNameMessage.type === HelperType.Danger,
    [helperNameMessage.type],
  );

  const onSubmit = useCallback(() => {
    console.log('submit: ', nameValue, basedOnValue, shortDescriptionValue);

    updateWorldMutation.mutate({
      worldId: worldId,
      body: {
        name: nameValue,
        basedOn: basedOnValue,
        shortDescription: shortDescriptionValue,
      },
    });
  }, [nameValue, basedOnValue, shortDescriptionValue, updateWorldMutation]);

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="row">
            <Col css={{ width: '400px' }}>
              <TitleH2 marginBottom="md">New world</TitleH2>
              <Input
                id="world-name"
                label="World name"
                type="text"
                onChange={onChangeName}
                required
                fullWidth
                maxLength={64}
                helperText={helperNameMessage.text}
                helperType={helperNameMessage.type}
              />
              <Flex>
                <Input
                  id="world-based-on"
                  label="Based on"
                  type="text"
                  onChange={onChangeBasedOn}
                  fullWidth
                  maxLength={100}
                  helperText="(up to 100 characters, empty for original world)"
                />
              </Flex>
              <Flex>
                <Input
                  id="world-based-on"
                  label="Short description"
                  type="text"
                  onChange={onChangeShortDescription}
                  fullWidth
                  maxLength={1000}
                  helperText="(up to 1000 characters)"
                />
              </Flex>
              <Button
                loading={updateWorldMutation.isLoading}
                disabled={buttonDisabled}
                size="md"
                color="primaryFill"
                onClick={onSubmit}
              >
                Update world
              </Button>
            </Col>
            <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
              <Col gap="md" alignItems="center">
                <TitleH2 marginBottom="md">World preview</TitleH2>
                <ImageCard
                  title={nameValue ?? 'World name'}
                  basedOn={basedOnValue}
                  questCount={3}
                  activityCount={12}
                  playModeCount={2}
                  src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/766aced8-ab7c-4288-5b83-6339c21e0800/600x400"
                  tags={['fantasy', 'magic', 'dragons', 'books']}
                />
                <Text i size="sm">
                  Note: You will be able to change image and tags later.
                </Text>
                <ErrorText error={updateWorldMutation.error} />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ArticleJourneyOfWorldCrafting />
        </Col>
      </Row>
    </Layout>
  );
};

export default EditWorld;
