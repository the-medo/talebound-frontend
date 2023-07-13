import type { Position } from '../InlineImageNode/InlineImageNode';
import { $isInlineImageNode } from '../InlineImageNode/InlineImageNode';
import type { GridSelection, LexicalEditor, NodeKey, NodeSelection, RangeSelection } from 'lexical';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import * as React from 'react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import useModal from '../../hooks/useModal';
// import FloatingLinkEditorPlugin from '../plugins/FloatingLinkEditorPlugin/index';
// import FloatingTextFormatToolbarPlugin from '../plugins/FloatingTextFormatToolbarPlugin/index';
// import LinkPlugin from '../plugins/LinkPlugin';
import Placeholder from '../../ui/Placeholder';
import { styled } from '../../../../styles/stitches.config';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { Button } from '../../../Button/Button';
import { LazyImage } from './LazyImage';
import { UpdateInlineImageDialog } from './UpdateInlineImageDialog';

const InlineImageNodeContentEditable = styled(ContentEditable, {
  minHeight: '20px',
  border: '0px',
  resize: 'none',
  cursor: 'text',
  caretColor: '$black900',
  display: 'block',
  position: 'relative',
  tabSize: '1',
  outline: '0px',
  padding: '$2',
  userSelect: 'text',
  fontSize: '$md',
  lineHeight: '1.4em',

  width: 'calc(100% - 20px)',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

const InlineImageNodePlaceholder = styled(Placeholder, {
  fontSize: '13px',
  color: '#888',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  bottom: '4px',
  left: '4px',
  top: 'auto',
  right: 'auto',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  pointerEvents: 'none',
});

const ImageCaptionContainer = styled('div', {
  display: 'block',
  backgroundColor: '$white600',
  minWidth: '100%',
  color: '#000',
  overflow: 'hidden',
  minHeight: '28px',

  '& p.editor-paragraph': {
    fontSize: '13px',
    color: '$primary800',
  },
});

export default function InlineImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  showCaption,
  caption,
  position,
}: {
  altText: string;
  caption: LexicalEditor;
  height: 'inherit' | number;
  nodeKey: NodeKey;
  showCaption: boolean;
  src: string;
  width: 'inherit' | number;
  position: Position;
}): JSX.Element {
  const [modal, showModal] = useModal();
  const imageRef = useRef<null | HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(
    null,
  );
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isInlineImageNode(node)) {
          node.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey],
  );

  const onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null);
          event.preventDefault();
          caption.focus();
          return true;
        } else if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [caption, isSelected, showCaption],
  );

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (activeEditorRef.current === caption || buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [caption, editor, setSelected],
  );

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_LOW),
    );
    return () => {
      isMounted = false;
      unregister();
    };
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, onEnter, onEscape, setSelected]);

  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = isSelected;
  return (
    <Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          <Button
            css={{
              position: 'absolute',
              right: 12,
              top: 12,
              cursor: 'pointer',
              userSelect: 'none',
              opacity: 0.7,
              ':hover': {
                opacity: 1,
              },
            }}
            ref={buttonRef}
            onClick={() => {
              showModal('Update Inline Image', (onClose) => (
                <UpdateInlineImageDialog
                  activeEditor={editor}
                  nodeKey={nodeKey}
                  onClose={onClose}
                />
              ));
            }}
          >
            Edit
          </Button>
          <LazyImage
            focused={isFocused}
            grabbable={isFocused && $isNodeSelection(selection)}
            position={position}
            src={src}
            altText={altText}
            imageRef={imageRef}
            width={width}
            height={height}
          />
        </div>
        {showCaption && (
          <ImageCaptionContainer>
            <LexicalNestedComposer initialEditor={caption}>
              <AutoFocusPlugin />
              {/*<LinkPlugin />
              <FloatingLinkEditorPlugin />
              <FloatingTextFormatToolbarPlugin />*/}
              <RichTextPlugin
                contentEditable={<InlineImageNodeContentEditable />}
                placeholder={
                  <InlineImageNodePlaceholder>Enter a caption...</InlineImageNodePlaceholder>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </LexicalNestedComposer>
          </ImageCaptionContainer>
        )}
      </>
      {modal}
    </Suspense>
  );
}
