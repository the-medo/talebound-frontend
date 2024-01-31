import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setEditEntityGroupId } from './menuCategorySlice';

interface PostFormModalProps {
  trigger: React.ReactNode;
}

const EditGroupModal: React.FC<PostFormModalProps> = ({ trigger }) => {
  const dispatch = useDispatch();
  const editEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.editEntityGroupId,
  );

  const closeModal = useCallback(() => dispatch(setEditEntityGroupId(undefined)), []);

  const onFinishCallback = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const content = useMemo(() => <Suspense fallback={null}></Suspense>, [onFinishCallback]);

  return (
    <Modal
      trigger={trigger}
      open={!!editEntityGroupId}
      title={`Edit group ${editEntityGroupId}`}
      content={content}
      onOpenChange={closeModal}
      size="sm"
    />
  );
};

export default EditGroupModal;
