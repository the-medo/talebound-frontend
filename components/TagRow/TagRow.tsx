import React, { useMemo } from 'react';
import { Row } from '../Flex/Flex';
import TagButton from '../TagButton/TagButton';

const FONT_WIDTH = 6;
const PADDING_WIDTH = 18;
const GAP_WIDTH = 2;

interface TagRowProps {
  tags: string[];
  width: number;
}

const TagRow: React.FC<TagRowProps> = ({ tags, width }) => {
  const [displayedTags, hiddenTags] = useMemo(() => {
    let widthLeft = width;
    const tagLengths = tags.map((tag) => tag.length * FONT_WIDTH + PADDING_WIDTH + GAP_WIDTH); //18px for padding + border, 2px gap
    const tagsToDisplay: string[] = [];
    const tagsHidden: string[] = [];
    const tagCount = tags.length;

    let tagsLeft = tagCount;
    let done = false;

    tags.forEach((tag, i) => {
      if (done) {
        tagsHidden.push(tag);
        return;
      }
      tagsLeft = tagCount - (i + 1);
      const tagsMoreText = tagsLeft + 1 > 0 ? `+${tagsLeft + 1} more` : '';
      const tagsMoreWidth = tagsMoreText.length * FONT_WIDTH + PADDING_WIDTH + GAP_WIDTH; //18px for padding + border, 2px gap

      if (widthLeft - tagLengths[i] - tagsMoreWidth > 0) {
        tagsToDisplay.push(tag);
        widthLeft = widthLeft - tagLengths[i];
      } else if (widthLeft - tagsMoreWidth > 0) {
        tagsToDisplay.push(tagsMoreText);
        tagsHidden.push(tag);
        widthLeft = widthLeft - tagsMoreWidth;
        done = true;
      } else {
        //remove last tag if it doesn't fit
        tagsToDisplay.pop();
        tagsToDisplay.push(tagsMoreText);
        tagsHidden.push(tag);
        done = true;
      }
    });

    return [tagsToDisplay, tagsHidden];
  }, [tags, width]);

  return (
    <Row justifyContent="center" gap="xs">
      {displayedTags.map((tag, i) => (
        <TagButton
          tag={tag}
          key={tag}
          tooltip={
            i === displayedTags.length - 1 && hiddenTags.length > 0
              ? hiddenTags.join(', ')
              : undefined
          }
          colorNonactive="semiGhost"
        />
      ))}
    </Row>
  );
};

export default TagRow;
