import React, { KeyboardEventHandler, useCallback, useEffect } from 'react';
import { Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Button } from '../../../components/Button/Button';
import { useInput } from '../../../hooks/useInput';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useCreateModuleEntityAvailableTag } from '../../../api/tags/useCreateModuleEntityAvailableTag';

interface ModuleEntityNewTagProps {
  moduleId: number;
}

const ModuleEntityNewTag: React.FC<ModuleEntityNewTagProps> = ({ moduleId }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { value: tagValue, onChange: onChangeTag, setValue: setTagValue } = useInput<string>('');

  const { mutate: createNewTag, isPending, error } = useCreateModuleEntityAvailableTag();

  useEffect(() => {
    if (!isPending) {
      inputRef.current?.focus();
    }
  }, [isPending]);

  const handleNewTag = useCallback(() => {
    createNewTag(
      {
        moduleId,
        tag: tagValue,
      },
      {
        onSuccess: () => {
          setTagValue('');
        },
      },
    );
  }, [moduleId, createNewTag, setTagValue, tagValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  return (
    <>
      <Row gap="md" css={{ width: '300px' }}>
        <Input
          disabled={isPending}
          id={'new-tag'}
          type={'text'}
          value={tagValue}
          onChange={onChangeTag}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          displayHelpers={false}
        />
        <Button loading={isPending} onClick={handleNewTag}>
          Add
        </Button>
      </Row>
      <ErrorText error={error} />
    </>
  );
};

export default ModuleEntityNewTag;
