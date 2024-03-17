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
import { UpdateEntityGroupParams } from '../../../api/entities/useUpdateEntityGroup';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { HelperType } from '../../../utils/form/helperTypes';

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
  canChangeStyle?: boolean;
  canChangeDirection?: boolean;
  onSubmitCallback: (data: UpdateEntityGroupParams['body']) => void;
  submitPending?: boolean;
  submitError?: Error | null;
}

const EntityGroupForm: React.FC<EntityGroupFormProps> = ({
  entityGroup,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeStyle = true,
  canChangeDirection = true,
  onSubmitCallback,
  submitPending = false,
  submitError,
}) => {
  const { value: name, onChange: onChangeName } = useInput<string>(entityGroup?.name ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    entityGroup?.description ?? '',
  );

  const [style, setStyle] = useState<string>(
    entityGroup?.style ?? PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED,
  );
  const [direction, setDirection] = useState<string>(
    entityGroup?.direction ?? PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL,
  );

  const pending = submitPending;

  const updateEntityGroupHandler = useCallback(() => {
    const entityGroupData = {
      name,
      description,
      style: style as PbEntityGroupStyle,
      direction: direction as PbEntityGroupDirection,
    };

    if (entityGroup?.id) {
      onSubmitCallback(entityGroupData);
    }
  }, [name, description, style, direction, entityGroup?.id, onSubmitCallback]);

  if (!canChangeTitle && !canChangeDescription) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input
              id="name"
              label="Name"
              helperText="Empty value means title won't be displayed in real-mode"
              helperType={HelperType.Info}
              onChange={onChangeName}
              value={name}
              required
              fullWidth
            />
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
          {canChangeStyle && (
            <Select
              id="style"
              label="Style of group"
              noHelper={false}
              helperText="You will need to turn off edit mode to see this change."
              helperType={HelperType.Info}
              fullWidth={true}
              onValueChange={setStyle}
              value={style}
              options={optionsStyle}
            />
          )}
          {canChangeDirection && (
            <Select
              id="direction"
              label="Direction of items"
              noHelper={false}
              helperText="You will need to turn off edit mode to see this change."
              helperType={HelperType.Info}
              fullWidth={true}
              onValueChange={setDirection}
              value={direction}
              options={optionsDirection}
            />
          )}
          <Row alignSelf="end">
            <Button onClick={updateEntityGroupHandler} loading={pending}>
              {entityGroup ? 'Update' : 'Create'}
            </Button>
          </Row>
          <ErrorText error={submitError} />
        </Col>
      </Row>
    </>
  );
};

export default EntityGroupForm;
