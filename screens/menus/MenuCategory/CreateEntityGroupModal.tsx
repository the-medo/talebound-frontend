import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setNewEntityGroupData } from './menuCategorySlice';
import { EntityGroupObject } from '../../../hooks/useGetMenuItemContentHierarchy';
import EntityGroupForm from './EntityGroupForm';
import {
  CreateEntityGroupParams,
  useCreateEntityGroup,
} from '../../../api/entities/useCreateEntityGroup';

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
  const startEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.startEntityGroupId,
  );
  const startPosition = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.startPosition,
  );
  const targetEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetEntityGroupId,
  );
  const targetPosition = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetPosition,
  );

  const {
    mutate: createEntityGroup,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateEntityGroup();

  const closeModal = useCallback(() => dispatch(setNewEntityGroupData(undefined)), [dispatch]);

  const open = !!targetEntityGroupId && !!targetPosition;

  const createEntityGroupHandler = useCallback(
    (data: CreateEntityGroupParams['body']) => {
      if (targetEntityGroupId) {
        const entityGroupData: CreateEntityGroupParams['body'] = {
          ...data,
          parentEntityGroupId: targetEntityGroupId,
          position: targetPosition,
        };

        createEntityGroup(
          {
            menuItemId,
            startEntityGroupId,
            startPosition,
            body: entityGroupData,
          },
          { onSuccess: closeModal },
        );
      }
    },
    [
      targetEntityGroupId,
      targetPosition,
      createEntityGroup,
      menuItemId,
      startEntityGroupId,
      startPosition,
      closeModal,
    ],
  );

  const content = useMemo(
    () =>
      open && (
        <Suspense fallback={null}>
          <EntityGroupForm
            onSubmitCallback={createEntityGroupHandler}
            submitPending={isPendingCreate}
            submitError={errorCreate}
          />
        </Suspense>
      ),
    [open, createEntityGroupHandler, isPendingCreate, errorCreate],
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
