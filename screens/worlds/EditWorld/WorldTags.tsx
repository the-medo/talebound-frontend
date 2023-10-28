import React, { useCallback, useMemo } from 'react';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { useAddWorldTag } from '../../../api/worlds/useAddWorldTag';
import { useRemoveWorldTag } from '../../../api/worlds/useRemoveWorldTag';
import { TitleH2 } from '../../../components/Typography/Title';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import { Row } from '../../../components/Flex/Flex';
import TagButton from '../../../components/TagButton/TagButton';
import { PbModuleType, PbViewTag } from '../../../generated/api-types/data-contracts';
import ErrorText from '../../../components/ErrorText/ErrorText';

interface WorldTagsProps {
  worldId: number;
  disabled?: boolean;
}

const WorldTags: React.FC<WorldTagsProps> = ({ worldId, disabled }) => {
  const { data: availableTags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });
  const { data: worldData } = useGetWorldById({ variables: worldId });

  const { mutate: addTag, isPending: isPendingAdd, error: errorAdd } = useAddWorldTag();
  const { mutate: removeTag, isPending: isPendingRemove, error: errorRemove } = useRemoveWorldTag();

  const tags = useMemo(() => worldData?.tags ?? [], [worldData?.tags]);

  const onTagSelect = useCallback(
    (tag: PbViewTag) => {
      if (!tag.tag || !tag.id) return;
      if (tag.id && tags.includes(tag.tag)) {
        removeTag({ worldId, tagId: tag.id });
      } else {
        addTag({ worldId, tagId: tag.id });
      }
    },
    [addTag, removeTag, tags, worldId],
  );

  const isPending = isPendingAdd || isPendingGet || isPendingRemove;

  return (
    <>
      <TitleH2 css={{ marginTop: '$lg' }} marginBottom="md">
        Tags
      </TitleH2>
      <Row wrap css={{ width: '100%' }} gap="sm">
        {availableTags.map((t) => (
          <TagButton
            disabled={disabled || isPending}
            tag={t}
            key={t.id}
            onSelect={onTagSelect}
            active={tags.includes(t.tag ?? '')}
          />
        ))}
        {availableTags.length === 0 && <p>No tags available</p>}
        <ErrorText error={errorAdd ?? errorRemove} />
      </Row>
    </>
  );
};

export default WorldTags;
