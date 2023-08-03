import React, { useCallback, useMemo } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, HelperType } from '../../../utils/form/helperTypes';
import { validateString } from '../../../utils/form/validatePassword';
import { styled } from '../../../styles/stitches.config';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2, TitleH3 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { LuGlobe2 } from 'react-icons/lu';
import { useCreateWorld } from '../../../api/worlds/useCreateWorld';
import ErrorText from '../../../components/ErrorText/ErrorText';
import DescriptionImage from '../../../components/DescriptionImage/DescriptionImage';

const InputDescription = styled('div', {
  borderRadius: '$md',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '$sm',

  'div li': {
    listStyleType: 'none',
    paddingLeft: '$md',
  },
});

const CreateWorld: React.FC = () => {
  const createWorldMutation = useCreateWorld();
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

    createWorldMutation.mutate(
      {
        name: nameValue,
        basedOn: basedOnValue,
        shortDescription: shortDescriptionValue,
      },
      {
        // onSuccess: createWorldSuccessCallback, //TODO: redirect to /worlds/:id/edit
      },
    );
  }, [nameValue, basedOnValue, shortDescriptionValue, createWorldMutation]);

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
              <InputDescription>
                Name of the universe or the world. Some examples would be:
                <div>
                  <li>
                    - <i>Middle Earth</i> for The Lord of the Rings
                  </li>
                  <li>
                    - <i>Tamriel</i> for The Elder Scrolls franchise
                  </li>
                  <li>
                    - <i>Alagaezia</i> for the Inheritance Cycle (Eragon)
                  </li>
                </div>
              </InputDescription>
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
              <InputDescription>
                If the world or universe is based on some other work, you can provide the name of
                the original work here. Some examples would be:
                <div>
                  <li>
                    - <i>books by J.R.R.Tolkien</i> for The Lord of the Rings
                  </li>
                  <li>
                    - <i>The Elder Scrolls franchise</i>
                  </li>
                  <li>
                    - <i>Avatar movies</i>
                  </li>
                </div>
              </InputDescription>
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
              <InputDescription>
                Will be displayed when viewing just basic information about the world. Maybe some
                introduction, style, setting, etc. Great to provide if it is your own universe, but
                not necessary.
              </InputDescription>
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
                <Button
                  loading={createWorldMutation.isLoading}
                  disabled={buttonDisabled}
                  size="xl"
                  color="primaryFill"
                  onClick={onSubmit}
                >
                  Create world
                  <LuGlobe2 />
                </Button>
                <ErrorText error={createWorldMutation.error} />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ContentSection direction="column" header="Journey of World Crafting">
            <p>
              <DescriptionImage
                src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/150x150"
                float="right"
                // circle
              />
              Embarking on your world creation journey is as simple as <b>naming your realm</b>.
              With just that, you&apos;ve taken your first step! However, why stop there? Unleash
              your creativity and bring forth a world as immense as the universe itself, teeming
              with complex ecosystems, intricate technologies, mystical magics, captivating
              religions, and enthralling intrigues. The possibilities are limitless.
            </p>

            <TitleH3>Step 1 - The Seed of Creation</TitleH3>

            <p>
              All it takes to spark life into your world is a name. Along with this, you may choose
              to share a glimpse of its unique allure through a short description or a tantalizing
              tale about its origins.
            </p>
            <TitleH3>Step 2 - Breathing Life into Your World</TitleH3>

            <p>
              Just naming your world doesn&apos;t quite do it justice, especially if you want it to
              captivate other adventurers. Talebound equips you with a wide array of customization
              options to sculpt a world that is as compelling as it is unique.
            </p>
            <p>
              <DescriptionImage
                src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/794cc051-844d-4c64-fe4e-6e5367e38000/200x300"
                float="left"
              />
              <b>Appearance</b> - Customize the aesthetic of your world&apos;s page by providing
              unique images for the <i>header</i>, <i>thumbnail</i>, and <i>avatar</i>. These images
              set the stage for adventurers exploring your world.
              <br />
              <br />
              <b>Navigation</b> - Take control of the website&apos;s side navigation by crafting
              your own sections. Within these sections, you&apos;re free to build your own pages,
              articles, and resources - effectively, your personal world encyclopedia.
              <br />
              <br />
              <b>Cartography</b> - Design detailed maps of your realm and mark points of interest.
              These markers can be linked to pages, articles, and resources, creating an interactive
              experience for adventurers.
              <br />
              <br />
            </p>
            <p>
              Don&apos;t forget to add an engaging introductory post displayed on your world&apos;s
              profile, and provide tags for easy discovery of your world in the vast Talebound
              universe.
            </p>
            <TitleH3>Collaboration and Shared Universe Creation</TitleH3>
            <p>
              World-building needn&apos;t be a solitary endeavor. Rally fellow creators to
              contribute to your world. With their aid, you can enrich your resources and add depth
              to your maps. Collaborate, innovate, and elevate your world to new heights.
            </p>
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateWorld;
