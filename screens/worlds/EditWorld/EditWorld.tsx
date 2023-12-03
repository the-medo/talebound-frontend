import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, HelperType } from '../../../utils/form/helperTypes';
import { validateString } from '../../../utils/form/validatePassword';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2 } from '../../../components/Typography/Title';
import { Button } from '../../../components/Button/Button';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useUpdateWorld } from '../../../api/worlds/useUpdateWorld';
import WorldImages from './WorldImages';
import ModuleTags from './ModuleTags';
import Loading from '../../../components/Loading/Loading';
import ActionBoxModule from '../ActionBoxModule';
import { useMyModuleRole, ModuleAdminRole } from '../../../hooks/useModuleAdmins';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { Text } from '../../../components/Typography/Text';
import ModuleEntityTagAdministration from '../../../component-sections/Module/ModuleEntityTagAdministration/ModuleEntityTagAdministration';
import { useWorld } from '../../../hooks/useWorld';
import { useImage } from '../../../hooks/useImage';

const WorldIntroduction = React.lazy(() => import('../WorldIntroduction/WorldIntroduction'));

interface EditWorldProps {
  worldId: number;
}

const EditWorld: React.FC<EditWorldProps> = ({ worldId }) => {
  const { world, module, moduleId } = useWorld(worldId);
  const role = useMyModuleRole(moduleId);
  const updateWorldMutation = useUpdateWorld();
  const disabled = useMemo(() => role !== ModuleAdminRole.SUPER_COLLABORATOR, [role]);

  const { value: nameValue, onChange: onChangeName, setValue: setNameValue } = useInput<string>('');
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  const { image: thumbnailImg } = useImage(module?.thumbnailImgId ?? 0);

  const {
    value: basedOnValue,
    onChange: onChangeBasedOn,
    setValue: setBasedOnValue,
  } = useInput<string>('');

  const {
    value: shortDescriptionValue,
    onChange: onChangeShortDescription,
    setValue: setShortDescriptionValue,
  } = useInput<string>('');

  useEffect(() => {
    setNameValue(world?.name ?? '');
  }, [setNameValue, world?.name]);

  useEffect(() => {
    setBasedOnValue(world?.basedOn ?? '');
  }, [setBasedOnValue, world?.basedOn]);

  useEffect(() => {
    setShortDescriptionValue(world?.shortDescription ?? '');
  }, [setShortDescriptionValue, world?.shortDescription]);

  const helperNameMessage: HelperMessage = useMemo(
    () => validateString(nameValue, 3, 64),
    [nameValue],
  );

  const buttonDisabled = useMemo(
    () => helperNameMessage.type === HelperType.Danger,
    [helperNameMessage.type],
  );

  const onSubmit = useCallback(() => {
    updateWorldMutation.mutate({
      worldId: worldId,
      body: {
        name: nameValue,
        basedOn: basedOnValue,
        shortDescription: shortDescriptionValue,
      },
    });
  }, [nameValue, basedOnValue, shortDescriptionValue, updateWorldMutation, worldId]);

  const tags = useMemo(() => module?.tags ?? [], [module?.tags]);

  return (
    <>
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <ContentSection flexWrap="wrap" direction="column">
              <Row fullWidth gap="md" justifyContent="between">
                <Col css={{ width: '400px' }}>
                  <TitleH2 marginBottom="md">Edit world</TitleH2>
                  <Input
                    disabled={disabled}
                    id="world-name"
                    label="World name"
                    type="text"
                    value={nameValue}
                    onChange={onChangeName}
                    required
                    fullWidth
                    maxLength={64}
                    helperText={helperNameMessage.text}
                    helperType={helperNameMessage.type}
                  />
                  <Flex>
                    <Input
                      disabled={disabled}
                      id="world-based-on"
                      label="Based on"
                      type="text"
                      value={basedOnValue}
                      onChange={onChangeBasedOn}
                      fullWidth
                      maxLength={100}
                      helperText="(up to 100 characters, empty for original world)"
                    />
                  </Flex>
                  <Flex>
                    <Input
                      disabled={disabled}
                      id="world-based-on"
                      label="Short description"
                      type="text"
                      value={shortDescriptionValue}
                      onChange={onChangeShortDescription}
                      fullWidth
                      maxLength={1000}
                      helperText="(up to 1000 characters)"
                    />
                  </Flex>
                  <Button
                    loading={updateWorldMutation.isPending}
                    disabled={disabled || buttonDisabled}
                    size="md"
                    color="primaryFill"
                    onClick={onSubmit}
                  >
                    Update world
                  </Button>
                  <WorldImages worldId={worldId} disabled={disabled} />
                </Col>
                <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
                  <Col gap="md" alignItems="center">
                    <TitleH2 marginBottom="md">World preview</TitleH2>
                    <Suspense fallback={<Loading />}>
                      <ImageCard
                        title={nameValue ?? 'World name'}
                        basedOn={basedOnValue}
                        questCount={3}
                        activityCount={12}
                        playModeCount={2}
                        imgSrc={
                          thumbnailImg?.url ??
                          'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/766aced8-ab7c-4288-5b83-6339c21e0800/600x400'
                        }
                        href="#"
                        availableTags={availableTags}
                        tags={tags}
                      />
                    </Suspense>
                    <ErrorText error={updateWorldMutation.error} />
                  </Col>
                </Col>{' '}
              </Row>
            </ContentSection>
            {moduleId > 0 && (
              <>
                <ContentSection flexWrap="wrap" direction="column" header="Tags">
                  <Text>
                    Select tags that describe your world. This will make it easier for other users
                    to find it.
                  </Text>
                  {module && (
                    <ModuleTags
                      moduleType={PbModuleType.MODULE_TYPE_WORLD}
                      moduleId={moduleId}
                      module={module}
                      tags={tags}
                      disabled={disabled}
                    />
                  )}
                </ContentSection>
                <ContentSection
                  flexWrap="wrap"
                  direction="column"
                  header="Entity tag administration"
                >
                  <ModuleEntityTagAdministration
                    moduleType={PbModuleType.MODULE_TYPE_WORLD}
                    moduleId={moduleId}
                  />
                </ContentSection>
              </>
            )}
          </Col>

          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            <ContentSection direction="column" header="Introduction">
              <Suspense fallback={<Loading />}>
                <WorldIntroduction worldId={worldId} postViewOnly={false} />
              </Suspense>
            </ContentSection>
          </Col>
        </Row>
      </Layout>
      <ActionBoxModule moduleId={moduleId} activeButton="edit" />
    </>
  );
};

export default EditWorld;
