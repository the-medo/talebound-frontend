import { styled } from '../../styles/stitches.config';

export const EditorContainer = styled('div', {
  border: '1px solid #ddd',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignSelf: 'stretch',
  color: '#000',
  position: 'relative',
  lineHeight: '20px',
  fontWeight: 400,
  textAlign: 'left',
  borderRadius: '10px 10px 2px 2px',
});

export const EditorInner = styled('div', {
  background: '#fff',
  position: 'relative',
});

export const Placeholder = styled('div', {
  color: '#999',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '15px',
  left: '10px',
  fontSize: '15px',
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});
