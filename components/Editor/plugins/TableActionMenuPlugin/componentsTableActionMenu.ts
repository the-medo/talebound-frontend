import { styled } from '../../../../styles/stitches.config';

export const TableActionMenuDropdown = styled('div', {
  zIndex: '10',
  display: 'block',
  position: 'fixed',
  boxShadow: '0 12px 28px #0003,0 2px 4px #0000001a,inset 0 0 0 1px #ffffff80',
  borderRadius: '8px',
  minHeight: '40px',
  backgroundColor: '#fff',

  '& .item': {
    margin: '0 8px',
    padding: '8px',
    color: '#050505',
    cursor: 'pointer',
    lineHeight: '16px',
    fontSize: '15px',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    flexShrink: '0',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '0',
    maxWidth: '250px',
    minWidth: '100px',
  },

  '& .item.fontsize-item, & .item.fontsize-item .text': {
    minWidth: 'unset',
  },

  '& .item .active': {
    display: 'flex',
    width: '20px',
    height: '20px',
    backgroundSize: 'contain',
  },

  '& .item:first-child': {
    marginTop: '8px',
  },

  '& .item:last-child': {
    marginBottom: '8px',
  },

  '& .item:hover': {
    backgroundColor: '#eee',
  },

  '& .item .text': {
    display: 'flex',
    lineHeight: '20px',
    flexGrow: '1',
    minWidth: '150px',
  },

  '& .item .icon': {
    display: 'flex',
    width: '20px',
    height: '20px',
    userSelect: 'none',
    marginRight: '12px',
    lineHeight: '16px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  '& .divider': {
    width: 'auto',
    backgroundColor: '#eee',
    margin: '4px 8px',
    height: '1px',
  },
});

//<div className="table-cell-action-button-container" ref={menuButtonRef}>

export const TableCellActionButtonContainer = styled('div', {
  position: 'absolute',
  top: '0',
  left: '0',
  willChange: 'transform',
});

export const TableCellActionButton = styled('div', {
  backgroundColor: 'none',
  // display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  position: 'relative',
  borderRadius: '15px',
  color: '#222',
  display: 'inline-block',
  cursor: 'pointer',
});
