import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
import { InlineImageNode, Position } from '../InlineImageNode/InlineImageNode';
import * as React from 'react';
import { ChangeEventHandler, useCallback, useState } from 'react';
import Input from '../../../Input/Input';
import { DialogActions } from '../../ui/Dialog';
import { Button } from '../../../Button/Button';
import { styled } from '../../../../styles/stitches.config';

const StyledSelect = styled('select', {
  marginBottom: '1rem',
  width: '290px',
});

export function UpdateInlineImageDialog({
  activeEditor,
  nodeKey,
  onClose,
}: {
  activeEditor: LexicalEditor;
  nodeKey: NodeKey;
  onClose: () => void;
}): JSX.Element {
  const editorState = activeEditor.getEditorState();
  const node = editorState.read(() => $getNodeByKey(nodeKey) as InlineImageNode);
  const [altText, setAltText] = useState(node.getAltText());
  const [showCaption, setShowCaption] = useState(node.getShowCaption());
  const [position, setPosition] = useState<Position>(node.getPosition());

  const handleShowCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCaption(e.target.checked);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value as Position);
  };

  const handleOnConfirm = () => {
    const payload = { altText, position, showCaption };
    if (node) {
      activeEditor.update(() => {
        node.update(payload);
      });
    }
    onClose();
  };

  const altTextChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setAltText(e.target.value);
  }, []);

  return (
    <>
      <div style={{ marginBottom: '1em' }}>
        <Input
          id="alt-text-input"
          label="Alt Text"
          placeholder="Descriptive alternative text"
          onChange={altTextChangeHandler}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>
      Position:
      <StyledSelect
        style={{ marginBottom: '1em', width: '208px' }}
        value={position}
        name="position"
        id="position-select"
        onChange={handlePositionChange}
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="full">Full Width</option>
      </StyledSelect>
      <div className="Input__wrapper">
        <input
          id="caption"
          type="checkbox"
          checked={showCaption}
          onChange={handleShowCaptionChange}
        />
        <label htmlFor="caption">Show Caption</label>
      </div>
      <DialogActions>
        <Button data-test-id="image-modal-file-upload-btn" onClick={() => handleOnConfirm()}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}
