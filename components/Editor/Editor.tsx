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
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
// import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
// import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import debounce from 'lodash.debounce';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ToolbarPlugin from './ToolbarPlugin/ToolbarPlugin';

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
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

interface EditorProps {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  editorState?: string;
  disabled?: boolean;
  loading?: boolean;
  debounceTime?: number;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  editorState,
  disabled,
  loading,
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

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <ToolbarPlugin />
        <EditorInner>
          {/*<Spin spinning={loading}>*/}
          <RichTextPlugin
            contentEditable={contentEditable}
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChangeHandler} ignoreSelectionChange={true} />
          <AutoFocusPlugin />
          {/*<CodeHighlightPlugin />*/}
          <ListPlugin />
          <LinkPlugin />
          {/*<AutoLinkPlugin />*/}
          {/*<ListMaxIndentLevelPlugin maxDepth={7} />*/}
          {/*</Spin>*/}
        </EditorInner>
      </EditorContainer>
    </LexicalComposer>
  );
};

export default Editor;
