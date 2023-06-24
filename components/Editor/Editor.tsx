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
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import { Text } from '../Typography/Text';
import Loading from '../Loading/Loading';
import Spin from '../Spin/Spin';

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

interface EditorProps {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  editorState?: string;
  onButtonAction?: (editorState: EditorState, editor: LexicalEditor) => void;
  buttonLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  debounceTime?: number;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  editorState,
  onButtonAction,
  buttonLabel = 'Save',
  disabled,
  loading,
  error,
  debounceTime = 2000,
}) => {
  const contentEditable = useMemo(() => <ContentEditable className="editor-input" />, []);

  const editorStateRef = useRef<EditorState>();
  const editorRef = useRef<LexicalEditor>();
  const placeholder = useMemo(() => <Placeholder>No content yet</Placeholder>, []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [contentSaved, setContentSaved] = useState(true);

  const initialConfig = useMemo(() => {
    return {
      ...editorConfig,
      editorState: editorState,
      editable: !disabled,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]); //, editorState

  useEffect(() => {
    window.onbeforeunload = contentSaved
      ? null
      : (e: BeforeUnloadEvent) => {
          e.preventDefault();
          e.returnValue = '';

          if (editorStateRef.current && editorRef.current) {
            console.log('IN saveOnLeave !!!!!!!', editorRef.current.getEditorState());
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
      setContentSaved(true);
    }, debounceTime),
    [onChange],
  );

  const onChangeHandler = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (isInitialLoad) {
        console.log('EDITOR - Initial load');
        editorStateRef.current = editorState;
        editorRef.current = editor;
        setIsInitialLoad(false);
        return;
      }
      console.log('EDITOR - ON CHANGE DETECTED');

      setContentSaved(false);
      onChangeHandlerDebounced(editorState, editor);
    },
    [isInitialLoad, onChangeHandlerDebounced],
  );

  const handleButtonAction = useCallback(() => {
    if (onButtonAction) onButtonAction(editorStateRef.current!, editorRef.current!);
    console.log('EDITOR - ON BUTTON ACTION');
  }, [onButtonAction]);

  return (
    <Spin loading={true}>
      <Col gap="sm" alignItems="end">
        <LexicalComposer initialConfig={initialConfig}>
          <EditorContainer>
            {!disabled && <ToolbarPlugin />}
            <EditorInner>
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
        <Row gap="md">
          {error && <Text color="danger">An error occurred</Text>}
          <Button onClick={handleButtonAction}>{buttonLabel}</Button>
        </Row>
      </Col>
    </Spin>
  );
};

export default Editor;
