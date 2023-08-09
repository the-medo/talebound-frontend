import React, { useCallback } from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Button } from '../../../../components/Button/Button';
import Textarea from '../../../../components/Textarea/Textarea';
import { useCreateWorldAdmin } from '../../../../api/worlds/useCreateWorldAdmin';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { useInput } from '../../../../hooks/useInput';
import { useMyWorldRole, WorldAdminRole } from '../../../../hooks/useWorldAdmins';
import { TbShieldOff, TbShieldQuestion } from 'react-icons/tb';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { useAuth } from '../../../../hooks/useAuth';

interface NewCollaboratorRequestProps {
  worldId: number;
}

const textareaPlaceholder =
  'What would you like to do here as collaborator? How much experience do you have with this world and with world building in general?';

const NewCollaboratorRequest: React.FC<NewCollaboratorRequestProps> = ({ worldId }) => {
  const role = useMyWorldRole(worldId);
  const { isLoggedIn } = useAuth();
  const { mutate: createWorldAdmin, isLoading, error } = useCreateWorldAdmin();
  const { value: motivation, onChange } = useInput<string, HTMLTextAreaElement>('');

  const sendCollaboratorRequest = useCallback(() => {
    createWorldAdmin({
      worldId,
      motivationalLetter: motivation,
    });
  }, [createWorldAdmin, motivation, worldId]);

  switch (role) {
    case WorldAdminRole.SUPER_COLLABORATOR:
    case WorldAdminRole.COLLABORATOR:
      return null;
    case WorldAdminRole.NONE:
      if (!isLoggedIn) {
        return null;
      }
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Become a collaborator">
          <Textarea
            id="motivational-letter"
            label="Motivational letter"
            placeholder={textareaPlaceholder}
            rows={5}
            value={motivation}
            onChange={onChange}
          />
          <Button loading={isLoading} onClick={sendCollaboratorRequest}>
            Send request
          </Button>
          <ErrorText error={error} />
        </ContentSection>
      );
    case WorldAdminRole.REQUESTED:
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Request pending">
          <Row gap="md">
            <Text color="secondary">
              <TbShieldQuestion size={30} />
            </Text>
            <p>Your request has been sent. Please wait for the world admin to accept it.</p>
          </Row>
        </ContentSection>
      );
    case WorldAdminRole.DENIED:
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Request denied">
          <Row gap="md">
            <Text color="danger">
              <TbShieldOff size={30} />
            </Text>
            <p>Your request was denied.</p>
          </Row>
        </ContentSection>
      );
  }
};

export default NewCollaboratorRequest;
