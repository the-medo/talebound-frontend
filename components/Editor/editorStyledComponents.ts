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

  '& .other h2': {
    fontSize: '18px',
    color: '#444',
    marginBottom: '7px',
  },

  '& .other a': {
    color: '#777',
    textDecoration: 'underline',
    fontSize: '14px',
  },

  '& .other ul': {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },

  '& h1': {
    fontSize: '24px',
    color: '#333',
  },

  '& .ltr ': {
    textAlign: 'left',
  },

  '& .rtl': {
    textAlign: 'right',
  },

  '& .editor-input': {
    minHeight: '150px',
    resize: 'none',
    fontSize: '15px',
    //caret-color: rgb(5, 5, 5);
    position: 'relative',
    tabSize: '1',
    outline: '0',
    padding: '15px 10px',
    caretColor: '#444',
  },

  '& .editor-text-bold ': {
    fontWeight: 'bold',
  },

  '& .editor-text-italic ': {
    fontStyle: 'italic',
  },

  '& .editor-text-underline': {
    textDecoration: 'underline',
  },

  '& .editor-text-strikethrough': {
    textDecoration: 'line-through',
  },

  '& .editor-text-underlineStrikethrough': {
    textDecoration: 'underline line-through',
  },

  '& .editor-text-code': {
    backgroundColor: 'rgb(240, 242, 245)',
    padding: '1px 0.25rem',
    fontFamily: 'Menlo, Consolas, Monaco, monospace',
    fontSize: '94%',
  },

  '& .editor-link': {
    color: 'rgb(33, 111, 219)',
    textDecoration: 'none',
  },

  '& .editor-code': {
    backgroundColor: 'rgb(240, 242, 245)',
    fontFamily: 'Menlo, Consolas, Monaco, monospace',
    display: 'block',
    padding: '8px 8px 8px 52px',
    lineHeight: '1.53',
    fontSize: '13px',
    margin: '8px 0',
    tabSize: '2',
    /* white-space: pre; */
    overflowX: 'auto',
    position: 'relative',
  },

  '& .editor-code:before': {
    content: 'attr(data-gutter)',
    position: 'absolute',
    backgroundColor: '#eee',
    left: '0',
    top: '0',
    borderRight: '1px solid #ccc',
    padding: '8px',
    color: '#777',
    whiteSpace: 'pre-wrap',
    textAlign: 'right',
    minWidth: '25px',
  },

  '& .editor-code:after': {
    content: 'attr(data-highlight-language)',
    top: '0',
    right: '3px',
    padding: '3px',
    fontSize: '10px',
    textTransform: 'uppercase',
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
  },

  '& .editor-tokenComment': {
    color: 'slategray',
  },

  '& .editor-tokenPunctuation ': {
    color: '#999',
  },

  '& .editor-tokenProperty': {
    color: '#905',
  },

  '& .editor-tokenSelector': {
    color: '#690',
  },

  '& .editor-tokenOperator': {
    color: '#9a6e3a',
  },

  '& .editor-tokenAttr': {
    color: '#07a',
  },

  '& .editor-tokenVariable': {
    color: '#e90',
  },

  '& .editor-tokenFunction': {
    color: '#dd4a68',
  },

  '& .editor-paragraph': {
    margin: '0 0 8px',
    position: 'relative',
  },

  '& .editor-paragraph:last-child': {
    marginBottom: '0',
  },

  '& .editor-heading-h1': {
    fontSize: '24px',
    color: 'rgb(5, 5, 5)',
    fontWeight: '400',
    margin: '0 0 12px',
    padding: '0',
  },

  '& .editor-heading-h2': {
    fontSize: '15px',
    color: 'rgb(101, 103, 107)',
    fontWeight: '700',
    margin: '10px 0 0',
    padding: '0',
    textTransform: 'uppercase',
  },

  '& .editor-quote': {
    margin: '0 0 0 20px',
    fontSize: '15px',
    color: 'rgb(101, 103, 107)',
    borderLeftColor: 'rgb(206, 208, 212)',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    paddingLeft: '16px',
  },

  '& .editor-list-ol': {
    padding: 0,
    margin: '0 0 0 16px',
  },

  '& .editor-list-ul': {
    padding: 0,
    margin: '0 0 0 16px',
  },

  '& .editor-listitem': {
    margin: '8px 32px 8px 32px',
  },

  '& .editor-nested-listitem': {
    listStyleType: 'none',
  },

  '& pre::-webkit-scrollbar': {
    background: 'transparent',
    width: '10px',
  },

  '& pre::-webkit-scrollbar-thumb': {
    background: '#999',
  },
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
