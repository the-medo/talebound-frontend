import React, { KeyboardEventHandler, useCallback } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetAvailableWorldTags } from '../../../api/tags/useGetAvailableWorldTags';
import { PbTag } from '../../../generated/api-types/data-contracts';
import TagButton from '../../../components/TagButton/TagButton';
import { Col, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { useInput } from '../../../hooks/useInput';
import { useUpdateAvailableWorldTag } from '../../../api/tags/useUpdateAvailableWorldTag';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useDeleteAvailableWorldTag } from '../../../api/tags/useDeleteAvailableWorldTag';
import { Text } from '../../../components/Typography/Text';

const SectionAvailableTags: React.FC = () => {
  const { data: tag = [], isLoading: isLoadingGet } = useGetAvailableWorldTags();

  const {
    mutate: updateTag,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateAvailableWorldTag();

  const {
    mutate: deleteTag,
    isLoading: isLoadingDelete,
    error: errorDelete,
  } = useDeleteAvailableWorldTag();

  const [selectedTag, setSelectedTag] = React.useState<PbTag>();
  const { value: tagValue, onChange: onChangeTag, setValue: setTagValue } = useInput<string>('');

  const isLoading = isLoadingUpdate || isLoadingGet || isLoadingDelete;

  const handleNewTag = useCallback(() => {
    const tagId = selectedTag?.id;
    if (tagId) {
      updateTag(
        {
          tagId,
          newTag: tagValue,
        },
        {
          onSuccess: () => {
            setSelectedTag(undefined);
            setTagValue('');
          },
        },
      );
    }
  }, [selectedTag?.id, updateTag, tagValue, setTagValue]);

  const handleDeleteTag = useCallback(() => {
    const tagId = selectedTag?.id;
    if (tagId) {
      deleteTag(tagId, {
        onSuccess: () => {
          setSelectedTag(undefined);
          setTagValue('');
        },
      });
    }
  }, [selectedTag?.id, deleteTag, setTagValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  const onTagSelect = useCallback(
    (tag: PbTag) => {
      setSelectedTag(tag);
      setTagValue(tag.tag ?? '');
    },
    [setTagValue],
  );

  return (
    <ContentSection flexWrap="wrap" direction="column" header="World tag administration">
      <Row alignItems="start" wrap css={{ width: '100%' }} gap="sm">
        <Row wrap css={{ width: 'max(calc(100% - 400px), 300px)' }} gap="sm">
          {tag.map((t) => (
            <TagButton
              tag={t}
              key={t.id}
              onSelect={onTagSelect}
              active={t.id === selectedTag?.id}
            />
          ))}
          {tag.length === 0 && <p>No tags available</p>}
        </Row>
        <Col gap="md" css={{ width: '300px' }}>
          <Row gap="md">
            <Input
              disabled={!selectedTag}
              id={'update-tag'}
              type={'text'}
              value={tagValue}
              onChange={onChangeTag}
              onKeyDown={handleKeyDown}
              displayHelpers={false}
            />
            <Button disabled={!selectedTag} loading={isLoading} onClick={handleNewTag}>
              Update
            </Button>
            <Button
              color="dangerOutline"
              disabled={!selectedTag}
              loading={isLoading}
              onClick={handleDeleteTag}
            >
              Delete
            </Button>
          </Row>
          <Text size="sm" i>
            (Select a tag to perform action)
          </Text>
          <ErrorText error={errorUpdate ?? errorDelete} />
        </Col>
      </Row>
    </ContentSection>
  );
};

export default SectionAvailableTags;
