import React from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import Evaluation from '../../components/Evaluation/Evaluation';
import { Text } from '@nextui-org/react';

interface SelfEvaluationProps {}

const SelfEvaluation: React.FC<SelfEvaluationProps> = () => {
  return (
    <ContentSection header="Your experience" direction="column" justifyContent="space-between">
      <Text>
        Knowing more about your strengths, experience, and areas of interest can help us facilitate
        better connections and gameplay experiences. Take a moment to reflect and rate your own
        expertise in the following areas:
      </Text>
      <Evaluation
        title="Role playing experience"
        description="Ability to stay in character, make decisions based on your character's personality and backstory, and contribute to the immersive experience of the game."
        value={3}
      />
      <Evaluation
        title="Text-rpg experience"
        description="Overall familiarity with text-based RPGs, taking into account the range and variety of games you've played."
        value={3}
      />
      <Evaluation
        title="Dungeon mastering experience"
        description="Experience in the role of a game master or dungeon master, including planning campaigns, managing player interactions, and improvising in response to player actions."
        value={3}
      />
      <Evaluation
        title="Rules knowledge"
        description="Studying the rules beforehand, understanding and playing by the game's mechanics, rules, and systems."
        value={3}
      />
      <Evaluation
        title="World-Building Experience"
        description="Experience in creating and managing your own worlds or campaigns in text-based RPGs."
        value={3}
      />
    </ContentSection>
  );
};

export default SelfEvaluation;
