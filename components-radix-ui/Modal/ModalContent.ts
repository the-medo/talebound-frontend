import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';
import { modalContentStyles } from '../styles';

export const ModalContent = styled(DialogRadix.Content, modalContentStyles);

export type ModalSizeVariants = Stitches.VariantProps<typeof ModalContent>;
