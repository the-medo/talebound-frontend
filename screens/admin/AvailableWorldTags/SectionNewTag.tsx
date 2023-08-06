import React, { KeyboardEventHandler, useCallback, useEffect } from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Button } from '../../../components/Button/Button';
import { useInput } from '../../../hooks/useInput';
import { useCreateAvailableWorldTag } from '../../../api/tags/useCreateAvailableWorldTag';
import ErrorText from '../../../components/ErrorText/ErrorText';

interface SectionNewTagProps {}

const SectionNewTag: React.FC<SectionNewTagProps> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { value: tagValue, onChange: onChangeTag, setValue: setTagValue } = useInput<string>('');

  const { mutate: createNewTag, isLoading, error } = useCreateAvailableWorldTag();

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleNewTag = useCallback(() => {
    createNewTag(
      {
        tag: tagValue,
      },
      {
        onSuccess: () => {
          setTagValue('');
        },
      },
    );
  }, [createNewTag, setTagValue, tagValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  return (
    <ContentSection flexWrap="wrap" direction="column" header="New tag">
      <Row gap="md" css={{ width: '300px' }}>
        <Input
          disabled={isLoading}
          id={'new-tag'}
          type={'text'}
          value={tagValue}
          onChange={onChangeTag}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          displayHelpers={false}
        />
        <Button loading={isLoading} onClick={handleNewTag}>
          Add
        </Button>
      </Row>
      <ErrorText error={error} />
    </ContentSection>
  );
};

export default SectionNewTag;
