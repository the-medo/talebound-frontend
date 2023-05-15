import { Modal } from '@nextui-org/react';
import React from 'react';
import { Button } from '../Button/Button';
import InputFile from '../InputFile/InputFile';

interface InputFileModalProps {}

const InputFileModal: React.FC<InputFileModalProps> = () => {
  const [visible, setVisible] = React.useState(true);

  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  return (
    <>
      <div>InputFileModal</div>
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <h4>Upload your avatar</h4>
        </Modal.Header>
        <Modal.Body>
          <InputFile showBorder={false} showTitle={false} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeHandler}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InputFileModal;
