import React from 'react';
import { Button } from '../Button/Button';
import InputFile from '../InputFile/InputFile';

interface InputFileModalProps {}

//TODO: rework to RadixUI Dialog

const InputFileModal: React.FC<InputFileModalProps> = () => {
  const [visible, setVisible] = React.useState(true);

  const closeHandler = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div>InputFileModal</div>
      {/*<Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>*/}
      {/*  <Modal.Header>*/}
      <h4>Upload your avatar</h4>
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body>*/}
      <InputFile showBorder={false} showTitle={false} />
      {/*  </Modal.Body>*/}
      {/*  <Modal.Footer>*/}
      <Button onClick={closeHandler}>Upload</Button>
      {/*  </Modal.Footer>*/}
      {/*</Modal>*/}
    </>
  );
};

export default InputFileModal;
