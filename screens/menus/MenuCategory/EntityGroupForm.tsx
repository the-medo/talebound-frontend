import React, { useCallback, useState } from 'react';
import {
  PbEntityGroup,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
} from '../../../generated/api-types/data-contracts';
import { useInput } from '../../../hooks/useInput';
import Textarea from '../../../components/Textarea/Textarea';
import Input from '../../../components/Input/Input';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';
import { SelectOptions } from '../../../components-radix-ui/Select/selectLib';
import { useUpdateEntityGroup } from '../../../api/entities/useUpdateEntityGroup';
import ErrorText from '../../../components/ErrorText/ErrorText';

const textareaPlaceholder = 'Description of the group. What information does this post contain?';

const optionsStyle: SelectOptions = {
  type: 'options',
  options: [
    { value: PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED, label: 'Framed' },
    { value: PbEntityGroupStyle.ENTITY_GROUP_STYLE_NOT_FRAMED, label: 'Not-framed' },
  ],
};

const optionsDirection: SelectOptions = {
  type: 'options',
  options: [
    {
      value: PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_HORIZONTAL,
      label: 'Horizontal',
    },
    { value: PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL, label: 'Vertical' },
  ],
};

interface EntityGroupFormProps {
  entityGroup?: PbEntityGroup;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  onFinishCallback?: () => void;
  menuItemId: number;
}

const EntityGroupForm: React.FC<EntityGroupFormProps> = ({
  entityGroup,
  canChangeTitle = true,
  canChangeDescription = true,
  onFinishCallback,
  menuItemId,
}) => {
  const { value: name, onChange: onChangeName } = useInput<string>(entityGroup?.name ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    entityGroup?.description ?? '',
  );

  const {
    mutate: updateEntityGroup,
    isPending: isPendingUpdate,
    // isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateEntityGroup();

  const [style, setStyle] = useState<string>(
    entityGroup?.style ?? PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED,
  );
  const [direction, setDirection] = useState<string>(
    entityGroup?.direction ?? PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL,
  );

  const pending = isPendingUpdate;

  const updateEntityGroupHandler = useCallback(() => {
    if (entityGroup?.id) {
      updateEntityGroup(
        {
          menuItemId,
          entityGroupId: entityGroup.id,
          body: {
            name,
            description,
            style: style as PbEntityGroupStyle,
            direction: direction as PbEntityGroupDirection,
          },
        },
        { onSuccess: onFinishCallback },
      );
    }
  }, [
    entityGroup.id,
    updateEntityGroup,
    menuItemId,
    name,
    description,
    style,
    direction,
    onFinishCallback,
  ]);

  if (!canChangeTitle && !canChangeDescription) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input id="name" label="Name" onChange={onChangeName} value={name} required fullWidth />
          )}
          {canChangeDescription && (
            <Textarea
              id="description"
              label="Short description"
              placeholder={textareaPlaceholder}
              rows={5}
              value={description}
              onChange={onChange}
            />
          )}
          <Select
            id="style"
            label="Style of group"
            fullWidth={true}
            onValueChange={setStyle}
            value={style}
            options={optionsStyle}
          />
          <Select
            id="direction"
            label="Direction of items"
            fullWidth={true}
            onValueChange={setDirection}
            value={direction}
            options={optionsDirection}
          />
          <Button onClick={updateEntityGroupHandler} loading={pending}>
            {entityGroup ? 'Update' : 'Create'}
          </Button>
          <ErrorText error={errorUpdate} />
        </Col>
      </Row>
    </>
  );
};

export default EntityGroupForm;
