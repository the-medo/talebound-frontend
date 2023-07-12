import React, { ChangeEventHandler, useCallback, useEffect } from 'react';
import { useInput } from '../../../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { updateInlineImagePayload } from './imageModalSlice';
import { Col } from '../../../Flex/Flex';
import Input from '../../../Input/Input';
import { Text } from '../../../Typography/Text';
import Checkbox from '../../../Checkbox/Checkbox';

interface ImageAttributesProps {}

const ImageAttributes: React.FC<ImageAttributesProps> = () => {
  const dispatch = useDispatch();
  const showCaption = useSelector(
    (state: ReduxState) => state.imageModal.inlineImagePayload.showCaption,
  );
  const position = useSelector((state: ReduxState) => state.imageModal.inlineImagePayload.position);
  const { value: altValue, onChange: onChangeAlt } = useInput<string>('');

  useEffect(() => {
    dispatch(
      updateInlineImagePayload({
        alt: altValue,
      }),
    );
  }, [altValue]);

  const onChangeShowCaption = useCallback(
    (value: boolean) => {
      dispatch(
        updateInlineImagePayload({
          showCaption: value,
        }),
      );
    },
    [dispatch],
  );

  const onChangePosition: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      if (['left', 'right', 'full'].includes(e.target.value)) {
        dispatch(
          updateInlineImagePayload({
            position: e.target.value,
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <Col css={{ width: '300px' }}>
      <Input id={'alt'} label={'Alt'} onChange={onChangeAlt} />
      <select onChange={onChangePosition} value={position}>
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="full">Full</option>
      </select>

      <Checkbox
        id="req_checkbox"
        checked={showCaption}
        onCheckedChange={onChangeShowCaption}
        transparent
      >
        Show caption
      </Checkbox>
    </Col>
  );
};

export default ImageAttributes;
