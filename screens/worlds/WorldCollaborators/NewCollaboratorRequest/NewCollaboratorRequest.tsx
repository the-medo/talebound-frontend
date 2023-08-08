import React from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Button } from '../../../../components/Button/Button';
import Textarea from '../../../../components/Textarea/Textarea';

interface NewCollaboratorRequestProps {
  worldId: number;
}

const textareaPlaceholder =
  'What would you like to do here as collaborator? How much experience do you have with this world and with worldbuilding in general?';

const NewCollaboratorRequest: React.FC<NewCollaboratorRequestProps> = ({ worldId }) => {
  return (
    <ContentSection flexWrap="wrap" direction="column" header="Become a collaborator">
      <Textarea
        id="motivational-letter"
        label="Motivational letter"
        placeholder={textareaPlaceholder}
        rows={5}
      />
      <Button>Send request</Button>
    </ContentSection>
  );
};

export default NewCollaboratorRequest;
