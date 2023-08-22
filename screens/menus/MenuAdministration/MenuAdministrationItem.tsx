import React, { useCallback, useEffect } from 'react';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Reorder, useDragControls } from 'framer-motion';
import { styled } from '../../../styles/stitches.config';
import NavbarHeader from '../../../components/LeftNavbar/NavbarHeader';
import { NavbarItem, NavbarSquare } from '../../../components/LeftNavbar/navbarComponents';
import { MdDragIndicator } from 'react-icons/md';
import { UpdateMenuItemParams, useUpdateMenuItem } from '../../../api/menus/useUpdateMenuItem';
import { useInput } from '../../../hooks/useInput';
import Input from '../../../components/Input/Input';
import debounce from 'lodash.debounce';
import { simplifyString } from '../../../utils/functions/simplifyString';
import Checkbox from '../../../components/Checkbox/Checkbox';

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

const InputWrapper = styled('div', {
  width: '200px',
  padding: '0.25rem',
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
  const {
    value: nameValue,
    onChange: onChangeName,
    setValue: setNameValue,
  } = useInput(data.name ?? '');
  const {
    value: codeValue,
    onChange: onChangeCode,
    setValue: setCodeValue,
  } = useInput(data.code ?? '');

  const {
    mutate: updateMenuItem,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
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

  const sendPayload = useCallback(
    (payload: UpdateMenuItemParams['body']) => {
      if (data.menuId && data.id) {
        updateMenuItem({
          menuId: data.menuId,
          menuItemId: data.id,
          body: payload,
        });
      }
    },
    [data.id, data.menuId, updateMenuItem],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((payload: UpdateMenuItemParams['body']) => {
      sendPayload(payload);
    }, 1000),
    [data.id, data.menuId],
  );

  useEffect(() => {
    if (nameValue !== data.name) {
      onChangeHandlerDebounced({ name: nameValue });
    }
  }, [data.name, nameValue, onChangeHandlerDebounced]);

  useEffect(() => {
    if (codeValue !== data.code) {
      setCodeValue(simplifyString(codeValue));
      onChangeHandlerDebounced({ code: simplifyString(codeValue) });
    }
  }, [data.code, codeValue, onChangeHandlerDebounced, setCodeValue]);

  // in case of error, set the value to the one from the server
  useEffect(() => {
    setCodeValue(simplifyString(data.code ?? ''));
  }, [isErrorUpdate, data.code, setCodeValue]);

  useEffect(() => {
    setNameValue(data.name ?? '');
  }, [isErrorUpdate, data.name, setNameValue]);

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
        <InputWrapper>
          <Input
            id={`menu-item-title-${data.id}`}
            value={nameValue}
            onChange={onChangeName}
            aria-labelledby="Menu item label"
            placeholder="Title"
            required
            displayHelpers={false}
          />
        </InputWrapper>
        <InputWrapper>
          {!data.isMain && (
            <Input
              id={`menu-item-code-${data.id}`}
              value={codeValue}
              onChange={onChangeCode}
              aria-labelledby="Menu item code"
              placeholder="Code"
              required
              displayHelpers={false}
            />
          )}
        </InputWrapper>
        <Checkbox
          id={`menu-item-is-main-${data.id}`}
          checked={data.isMain}
          childrenRender="before"
          onCheckedChange={(x) => sendPayload({ isMain: !!x })}
          // mode="transparent"
        >
          Is header:
        </Checkbox>
      </Item>
    </Reorder.Item>
  );
};

export default MenuAdministrationItem;
