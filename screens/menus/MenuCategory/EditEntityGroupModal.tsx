import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setEditEntityGroupId } from './menuCategorySlice';
import { EntityGroupObject } from '../../../hooks/useGetMenuItemContentHierarchy';
import EntityGroupForm from './EntityGroupForm';

interface EditEntityGroupModalProps {
  trigger: React.ReactNode;
  entityGroups: EntityGroupObject;
}

const EditEntityGroupModal: React.FC<EditEntityGroupModalProps> = ({ trigger, entityGroups }) => {
  const dispatch = useDispatch();
  const editEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.editEntityGroupId,
  );

  const entityGroup = editEntityGroupId ? entityGroups[editEntityGroupId] : undefined;

  const closeModal = useCallback(() => dispatch(setEditEntityGroupId(undefined)), []);

  const onFinishCallback = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const content = useMemo(
    () => (
      <Suspense fallback={null}>
        {entityGroup && <EntityGroupForm entityGroup={entityGroup} />}
      </Suspense>
    ),
    [entityGroup, onFinishCallback],
  );

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

export default EditEntityGroupModal;
