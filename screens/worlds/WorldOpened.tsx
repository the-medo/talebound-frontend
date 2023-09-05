import React, { useEffect } from 'react';
import { useGetWorldById } from '../../api/worlds/useGetWorldById';
import { useDispatch } from 'react-redux';
import { setHeaderImage } from '../../store/globalSlice';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';

interface WorldOpenedProps {
  worldId: number;
}

const WorldOpened: React.FC<WorldOpenedProps> = ({ worldId }) => {
  const dispatch = useDispatch();
  const { data: worldData } = useGetWorldById({ variables: worldId, enabled: worldId > 0 });

  useEffect(() => {
    if (worldData?.imageHeader) {
      dispatch(setHeaderImage(imageModifyVariant(worldData.imageHeader, ImageVariant['1920x300'])));
      console.log('worldData?.imageHeader: ', worldData?.imageHeader);
    }
  }, [dispatch, worldData?.imageHeader]);

  return null;
};

export default WorldOpened;
