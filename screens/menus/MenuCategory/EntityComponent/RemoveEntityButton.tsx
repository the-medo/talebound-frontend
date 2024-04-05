import React, { useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import { Button } from '../../../../components/Button/Button';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { useGetMenuItemContent } from '../../../../api/menus/useGetMenuItemContent';
import { styled } from '../../../../styles/stitches.config';

export const RemoveButtonWrapper = styled('span', {
  opacity: 0,
  transition: '0.3s all',

  variants: {
    version: {
      default: {},
      'top-right-corner': {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
});

interface RemoveEntityButtonProps {
  entityId: number;
}

const RemoveEntityButton: React.FC<RemoveEntityButtonProps> = ({ entityId }) => {
  const menuItemId = useSelector((state: ReduxState) => state.menuCategory.menuItemId);

  const handleRemoveEntity = useCallback(() => {
    const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
      menuItemId,
    });

    // queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
    //   getMenuItemContentQueryKey,
    //   (oldData) => {
    //     if (!oldData?.contents) return;
    //
    //     const foundEntity = oldData.contents.find((e) => e.contentEntityId === content.entityId);
    //     console.log('FOUND ENTITY: ', foundEntity);
    //     if (!foundEntity) return;
    //
    //     const contents: PbEntityGroupContent[] = oldData.contents
    //       .map((c) => {
    //         const position = c.position ?? 0;
    //         return {
    //           ...c,
    //           position:
    //             c.entityGroupId === foundEntity.entityGroupId &&
    //             position >= (foundEntity?.position ?? 0)
    //               ? position - 1
    //               : position,
    //         };
    //       })
    //       .filter((c) => c.contentEntityId !== content.entityId);
    //
    //     return { ...oldData, contents };
    //   },
    // );
  }, [menuItemId]);

  return (
    <Button icon onClick={handleRemoveEntity} size="sm" color="dangerOutline">
      <MdClose />
    </Button>
  );
};

export default RemoveEntityButton;
