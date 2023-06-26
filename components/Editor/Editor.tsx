import { LexicalEditor } from 'lexical';
import { EditorState } from 'lexical';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorContainer, EditorInner, Placeholder } from './editorStyledComponents';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import ExampleTheme from './themes/EditorTheme';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { MarkNode } from '@lexical/mark';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import debounce from 'lodash.debounce';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin/AutoLinkPlugin';
import MarkdownPlugin from './plugins/MarkdownPlugin/MarkdownPlugin';
import { TableNode as NewTableNode } from './nodes/TableNode';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { Button } from '../Button/Button';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import Loading from '../Loading/Loading';
import { RxCross1 } from 'react-icons/rx';
import { EMPTY_EDITOR_STATE } from './utils/emptyEditorState';

const editorConfig: InitialConfigType = {
  // The editor theme
  theme: ExampleTheme,
  namespace: 'editor',

  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    NewTableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    MarkNode,
    HorizontalRuleNode,
  ],
};

export type EditorOnSaveAction = (
  editorState: EditorState,
  editor: LexicalEditor,
  draft: boolean,
  successAction?: () => void,
  errorAction?: () => void,
  finishedAction?: () => void,
) => void;

interface EditorProps {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  editorState?: string;
  onSaveAction?: EditorOnSaveAction;
  actionLabel?: 'Save' | 'Post';
  draftable?: boolean;
  isDraft?: boolean;
  alreadyExists?: boolean;
  disabled?: boolean;
  postView?: boolean;
  closeEditor?: () => void;
  loading?: boolean;
  error?: string;
  debounceTime?: number;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  editorState,
  onSaveAction,
  actionLabel = 'Save',
  draftable,
  isDraft = false,
  alreadyExists,
  disabled = false,
  postView,
  closeEditor,
  loading,
  error,
  debounceTime = 0,
}) => {
  const finalDisabled = useMemo(() => (postView ? true : disabled), [postView, disabled]);
  const finalActionLabel = useMemo(() => (alreadyExists ? 'Save' : actionLabel), [actionLabel]);
  const contentEditable = useMemo(() => <ContentEditable className="editor-input" />, []);

  const editorStateRef = useRef<EditorState>();
  const editorRef = useRef<LexicalEditor>();
  const placeholder = useMemo(() => <Placeholder>No content yet</Placeholder>, []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [contentSaved, setContentSaved] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(false);

  const initialConfig = useMemo(() => {
    return {
      ...editorConfig,
      editorState: editorState ?? EMPTY_EDITOR_STATE,
      editable: !finalDisabled,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //, editorState

  useEffect(() => {
    editorRef.current?.setEditable(!finalDisabled);
  }, [finalDisabled]);

  useEffect(() => {
    window.onbeforeunload = contentSaved
      ? null
      : (e: BeforeUnloadEvent) => {
          e.preventDefault();
          e.returnValue = '';

          if (editorStateRef.current && editorRef.current) {
            onChange(editorStateRef.current, editorRef.current);
          }
        };

    return () => {
      window.onbeforeunload = null;
    };
  }, [contentSaved, onChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((editorState: EditorState, editor: LexicalEditor) => {
      editorStateRef.current = editorState;
      editorRef.current = editor;
      onChange(editorState, editor);
      if (debounceTime > 0) setContentSaved(true);
    }, debounceTime),
    [onChange, debounceTime],
  );

  const onChangeHandler = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (isInitialLoad) {
        editorStateRef.current = editorState;
        editorRef.current = editor;
        setIsInitialLoad(false);
        return;
      }

      // if (debounceTime > 0) setContentSaved(false);
      setContentSaved(false);
      onChangeHandlerDebounced(editorState, editor);
    },
    [isInitialLoad, onChangeHandlerDebounced, debounceTime],
  );

  const closeEditorHandler = useCallback(() => {
    if (closeEditor) closeEditor();
  }, [closeEditor]);

  const discardChangesHandler = useCallback(() => {
    if (editorRef.current && !contentSaved) {
      editorRef.current?.setEditorState(
        editorRef.current?.parseEditorState(initialConfig.editorState ?? EMPTY_EDITOR_STATE),
      );
    }
    closeEditorHandler();
  }, [closeEditorHandler, contentSaved]);

  const handleSaveAction = useCallback(() => {
    if (onSaveAction) {
      setActionInProgress(true);
      onSaveAction(
        editorStateRef.current!,
        editorRef.current!,
        isDraft,
        () => {
          setContentSaved(true);
        },
        () => {},
        () => {
          closeEditorHandler();
          setActionInProgress(false);
        },
      );
    }
  }, [isDraft, onSaveAction]);

  const handleSaveAndPublish = useCallback(() => {
    if (onSaveAction) {
      setActionInProgress(true);
      onSaveAction(
        editorStateRef.current!,
        editorRef.current!,
        false,
        () => {
          setContentSaved(true);
        },
        () => {},
        () => {
          closeEditorHandler();
          setActionInProgress(false);
        },
      );
    }
  }, [onSaveAction]);

  const handleSaveAndKeepEditingAction = useCallback(() => {
    if (onSaveAction) {
      setActionInProgress(true);
      onSaveAction(
        editorStateRef.current!,
        editorRef.current!,
        isDraft,
        () => {
          setContentSaved(true);
        },
        () => {},
        () => {
          setActionInProgress(false);
        },
      );
    }
  }, [isDraft, onSaveAction]);

  const handleSaveDraftAction = useCallback(() => {
    if (!draftable) return;
    if (onSaveAction) {
      setActionInProgress(true);
      onSaveAction(
        editorStateRef.current!,
        editorRef.current!,
        true,
        () => {
          setContentSaved(true);
        },
        () => {},
        () => {
          setActionInProgress(false);
        },
      );
    }
  }, [onSaveAction, draftable]);

  return (
    <Col fullWidth gap="sm">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorContainer postView={postView}>
          {!postView && <ToolbarPlugin />}
          {loading && <Loading />}
          <EditorInner postView={postView}>
            <RichTextPlugin
              contentEditable={contentEditable}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeHandler} ignoreSelectionChange={true} />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <MarkdownPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
          </EditorInner>
        </EditorContainer>
      </LexicalComposer>
      <Col gap="sm">
        {!postView && (
          <Row gap="sm">
            {!contentSaved && (
              <>
                <Button disabled={actionInProgress} onClick={handleSaveAction}>
                  {finalActionLabel}{' '}
                </Button>
                {draftable && isDraft && (
                  <Button
                    disabled={actionInProgress}
                    type="secondaryFill"
                    onClick={handleSaveAndPublish}
                  >
                    Save and publish
                  </Button>
                )}
                <Button
                  disabled={actionInProgress}
                  type="primaryOutline"
                  onClick={handleSaveAndKeepEditingAction}
                >
                  {finalActionLabel} and keep editing
                </Button>
                {draftable && !alreadyExists && (
                  <Button
                    disabled={actionInProgress}
                    type="secondaryOutline"
                    onClick={handleSaveDraftAction}
                  >
                    Save as draft
                  </Button>
                )}
              </>
            )}
            <Button
              disabled={actionInProgress}
              type="dangerOutline"
              onClick={discardChangesHandler}
            >
              <Text>{contentSaved ? 'Close' : 'Discard'}</Text>
              <RxCross1 size="0.8em" />
            </Button>
          </Row>
        )}
        {error && <Text color="danger">{error}</Text>}
      </Col>
    </Col>
  );
};

export default Editor;
