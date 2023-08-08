import React from 'react';
import { TitleH3 } from '../../components/Typography/Title';
import ContentSection from '../../components/ContentSection/ContentSection';
import { TbShield, TbShieldStar } from 'react-icons/tb';

const ArticleWorldCollaboration: React.FC = () => {
  return (
    <ContentSection direction="column" header="World Collaboration - what does it mean?">
      <p>
        Embarking on your world creation journey is as simple as <b>naming your realm</b>. With just
        that, you&apos;ve taken your first step! However, why stop there? Unleash your creativity
        and bring forth a world as immense as the universe itself, teeming with complex ecosystems,
        intricate technologies, mystical magics, captivating religions, and enthralling intrigues.
        The possibilities are limitless.
      </p>

      <TitleH3 color="warning">
        <TbShieldStar size={30} /> Super collaborator
      </TitleH3>

      <p>
        All it takes to spark life into your world is a name. Along with this, you may choose to
        share a glimpse of its unique allure through a short description or a tantalizing tale about
        its origins.
      </p>
      <TitleH3>
        <TbShield size={30} /> Collaborator
      </TitleH3>

      <p>
        Just naming your world doesn&apos;t quite do it justice, especially if you want it to
        captivate other adventurers. Talebound equips you with a wide array of customization options
        to sculpt a world that is as compelling as it is unique.
      </p>
    </ContentSection>
  );
};

export default ArticleWorldCollaboration;
