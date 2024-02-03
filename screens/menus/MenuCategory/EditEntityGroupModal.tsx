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
  menuItemId: number;
}

const EditEntityGroupModal: React.FC<EditEntityGroupModalProps> = ({
  trigger,
  entityGroups,
  menuItemId,
}) => {
  const dispatch = useDispatch();
  const editEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.editEntityGroupId,
  );

  const entityGroup = editEntityGroupId ? entityGroups[editEntityGroupId] : undefined;

  const closeModal = useCallback(() => dispatch(setEditEntityGroupId(undefined)), [dispatch]);

  const content = useMemo(
    () => (
      <Suspense fallback={null}>
        {entityGroup && (
          <EntityGroupForm
            entityGroup={entityGroup}
            menuItemId={menuItemId}
            onFinishCallback={closeModal}
          />
        )}
      </Suspense>
    ),
    [closeModal, entityGroup, menuItemId],
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
