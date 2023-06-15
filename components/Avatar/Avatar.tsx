import React, { useMemo } from 'react';
import { AvatarRoot } from '../../components-radix-ui/Avatar/AvatarRoot';
import { AvatarImage } from '../../components-radix-ui/Avatar/AvatarImage';
import { AvatarFallback } from '../../components-radix-ui/Avatar/AvatarFallback';
import { AvatarSize, AvatarType, emptyUrlByType } from './avatarLib';
import { ImageVariant, modifyImageVariant } from '../../utils/images/image_utils';

interface AvatarProps {
  url?: string;
  type?: AvatarType;
  size?: AvatarSize;
  fallbackText?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url, type = 'unknown', size = 'lg', fallbackText }) => {
  const optimizedUrl = useMemo(() => {
    if (!url) return undefined;

    switch (size) {
      case 'xs':
      case 'sm':
        return modifyImageVariant(url, ImageVariant['30x30']);
      case 'md':
      case 'lg':
      case 'xl':
        return modifyImageVariant(url, ImageVariant['100x100']);
      case '2xl':
        return modifyImageVariant(url, ImageVariant['200x200']);
    }
  }, [url, size]);

  return (
    <AvatarRoot size={size}>
      <AvatarImage src={optimizedUrl ?? emptyUrlByType[type]} alt={`Avatar ${fallbackText}`} />
      {fallbackText && <AvatarFallback delayMs={600}>{fallbackText}</AvatarFallback>}
    </AvatarRoot>
  );
};

export default Avatar;
