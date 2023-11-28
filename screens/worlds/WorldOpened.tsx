import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderImage } from '../../store/globalSlice';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { useWorld } from '../../hooks/useWorld';

interface WorldOpenedProps {
  worldId: number;
}

const WorldOpened: React.FC<WorldOpenedProps> = ({ worldId }) => {
  const dispatch = useDispatch();
  const { module } = useWorld(worldId);

  useEffect(() => {
    if (module?.headerImgUrl) {
      dispatch(setHeaderImage(imageModifyVariant(module?.headerImgUrl, ImageVariant['1920x300'])));
      console.log('worldData?.imageHeader: ', module?.headerImgUrl);
    }
  }, [dispatch, module?.headerImgUrl]);

  return null;
};

export default WorldOpened;
