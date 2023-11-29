import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderImage } from '../../store/globalSlice';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { useWorld } from '../../hooks/useWorld';
import { useImage } from '../../hooks/useImage';

interface WorldOpenedProps {
  worldId: number;
}

const WorldOpened: React.FC<WorldOpenedProps> = ({ worldId }) => {
  const dispatch = useDispatch();
  const { module } = useWorld(worldId);
  const { image: headerImg } = useImage(module?.headerImgId);

  useEffect(() => {
    if (headerImg?.url) {
      dispatch(setHeaderImage(imageModifyVariant(headerImg?.url, ImageVariant['1920x300'])));
      console.log('worldData?.imageHeader: ', headerImg?.url);
    }
  }, [dispatch, headerImg?.url]);

  return null;
};

export default WorldOpened;
