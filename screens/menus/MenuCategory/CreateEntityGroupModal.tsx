import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setNewEntityGroupData } from './menuCategorySlice';
import { EntityGroupObject } from '../../../hooks/useGetMenuItemContentHierarchy';
import EntityGroupForm from './EntityGroupForm';

interface CreateEntityGroupModalProps {
  trigger: React.ReactNode;
  entityGroups: EntityGroupObject;
  menuItemId: number;
}

const CreateEntityGroupModal: React.FC<CreateEntityGroupModalProps> = ({
  trigger,
  entityGroups,
  menuItemId,
}) => {
  const dispatch = useDispatch();
  const targetEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetEntityGroupId,
  );
  const targetPosition = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetPosition,
  );

  const closeModal = useCallback(() => dispatch(setNewEntityGroupData(undefined)), [dispatch]);

  const open = !!targetEntityGroupId && !!targetPosition;

  const content = useMemo(
    () =>
      open && (
        <Suspense fallback={null}>
          <EntityGroupForm onSubmitCallback={closeModal} />
        </Suspense>
      ),
    [open, closeModal, menuItemId],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={`Create new group`}
      content={content}
      onOpenChange={closeModal}
      size="md"
    />
  );
};

export default CreateEntityGroupModal;
