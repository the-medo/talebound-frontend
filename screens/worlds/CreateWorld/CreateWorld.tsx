import React, { useMemo } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, helperOK } from '../../../utils/form/helperTypes';
import { validatePassword } from '../../../utils/form/validatePassword';
import { styled } from '../../../styles/stitches.config';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';

const InputWrapper = styled('div', {
  width: '50%',
});

const InputHelper = styled('div', {
  // backgroundColor: '$primary100',
  borderRadius: '$md',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
  // flexBasis: '300px',
  // flexGrow: 10,
  fontSize: '$sm',

  'div li': {
    listStyleType: 'none',
    paddingLeft: '$md',
  },
});

interface CreateWorldProps {}

const helperNameMessage: HelperMessage = {
  ...helperOK,
  text: '(3 - 64 characters)',
};
const helperBasedOnMessage: HelperMessage = {
  ...helperOK,
  text: '(up to 100 characters, empty for original world)',
};
const helperShortDescriptionMessage: HelperMessage = {
  ...helperOK,
  text: '(up to 1000 characters)',
};

const CreateWorld: React.FC<CreateWorldProps> = () => {
  const { value: nameValue, onChange: onChangeName } = useInput<string>('');
  const { value: basedOnValue, onChange: onChangeBasedOn } = useInput<string>('');
  const { value: shortDescriptionValue, onChange: onChangeShortDescription } = useInput<string>('');

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="row" header="World creation">
            <Col css={{ width: '400px' }}>
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
              <InputHelper>
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
              </InputHelper>
              <Flex>
                <Input
                  id="world-based-on"
                  label="Based on"
                  type="text"
                  onChange={onChangeBasedOn}
                  fullWidth
                  maxLength={100}
                  helperText={helperBasedOnMessage.text}
                  helperType={helperBasedOnMessage.type}
                />
              </Flex>
              <InputHelper>
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
              </InputHelper>
              <Flex>
                <Input
                  id="world-based-on"
                  label="Short description"
                  type="text"
                  onChange={onChangeShortDescription}
                  fullWidth
                  maxLength={1000}
                  helperText={helperShortDescriptionMessage.text}
                  helperType={helperShortDescriptionMessage.type}
                />
              </Flex>
              <InputHelper>
                Will be displayed when viewing just basic information about the world. Maybe some
                introduction, style, setting, etc. Great to provide if it is your own universe, but
                not necessary.
              </InputHelper>
            </Col>
            <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
              <Col gap="md" alignItems="center">
                <TitleH2>World preview</TitleH2>
                <Text i size="sm">
                  You will be able to change image and tags later.
                </Text>
                <ImageCard
                  title={nameValue ?? 'World name'}
                  basedOn={basedOnValue}
                  questCount={3}
                  activityCount={12}
                  playModeCount={2}
                  src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/public"
                  tags={['fantasy', 'magic', 'dragons', 'books']}
                />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ContentSection direction="column" header="World creation">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in
              massa tempor. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.
              Morbi enim nunc faucibus a pellentesque sit amet. Pulvinar mattis nunc sed blandit
              libero volutpat sed cras ornare. Metus dictum at tempor commodo ullamcorper a lacus
              vestibulum. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Amet
              tellus cras adipiscing enim. Dis parturient montes nascetur ridiculus mus. Faucibus
              turpis in eu mi bibendum neque egestas. Aliquet eget sit amet tellus cras adipiscing
              enim eu. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim.
              Lorem ipsum dolor sit amet consectetur adipiscing.
            </p>
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateWorld;
