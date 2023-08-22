import React, { useCallback, useEffect } from 'react';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Reorder, useDragControls } from 'framer-motion';
import { styled } from '../../../styles/stitches.config';
import NavbarHeader from '../../../components/LeftNavbar/NavbarHeader';
import { NavbarItem, NavbarSquare } from '../../../components/LeftNavbar/navbarComponents';
import { MdDragIndicator } from 'react-icons/md';
import { useUpdateMenuItem } from '../../../api/menus/useUpdateMenuItem';
import { useInput } from '../../../hooks/useInput';
import Input from '../../../components/Input/Input';

const NavbarWrapper = styled('div', {
  width: '$navbarWidth',
  backgroundColor: '$navbarBackground',
  padding: '0.25rem',
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    main: {
      true: {
        padding: '0rem',
      },
    },
  },
});

const Item = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  userSelect: 'none',
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    dragging: {
      true: {
        opacity: 0.5,
        outline: '2px solid red',
      },
    },
  },
});

const DragHandle = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem',
  cursor: 'grab',

  variants: {
    dragging: {
      true: {
        cursor: 'grabbing',
      },
    },
  },
});

interface MenuAdministrationItemProps {
  data: PbMenuItem;
  currentIndex: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuAdministrationItem: React.FC<MenuAdministrationItemProps> = ({
  data,
  currentIndex,
  setLoading,
}) => {
  const controls = useDragControls();
  const [dragging, setDragging] = React.useState(false);
  const { value: nameValue, onChange: onChangeName } = useInput(data.name ?? '');
  const { value: codeValue, onChange: onChangeCode } = useInput(data.name ?? '');

  const {
    mutate: updateMenuItem,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateMenuItem({
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (isLoadingUpdate) {
      setLoading(true);
    }
  }, [setLoading, isLoadingUpdate]);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
    if (data.menuId && data.id) {
      updateMenuItem({
        menuId: data.menuId,
        menuItemId: data.id,
        body: {
          position: currentIndex,
        },
      });
    }
  }, [currentIndex, data.id, data.menuId, updateMenuItem]);

  return (
    <Reorder.Item
      as="div"
      value={data}
      dragListener={false}
      dragControls={controls}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Item dragging={dragging}>
        <DragHandle dragging={dragging} onPointerDown={(e) => controls.start(e)}>
          <MdDragIndicator size={20} />
        </DragHandle>
        <NavbarWrapper main={data.isMain}>
          {data.isMain && <NavbarHeader title={data.name ?? ''} />}
          {!data.isMain && (
            <NavbarItem href={'#'}>
              {data.name ?? 'Menu item'}
              <NavbarSquare />
            </NavbarItem>
          )}
        </NavbarWrapper>
        <div style={{ width: '150px' }}>
          <Input
            id={`menu-item-name-${data.id}`}
            value={nameValue}
            onChange={onChangeName}
            aria-labelledby="login"
            placeholder="Title"
            required
            displayHelpers={false}
            // onKeyDown={submitOnEnter}
            // fullWidth
            // mode="transparent"
          />
        </div>
        <input type="text" value={data.code} />
        {data.position} | {currentIndex}
      </Item>
    </Reorder.Item>
  );
};

export default MenuAdministrationItem;
