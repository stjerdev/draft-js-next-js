import React, { Component } from "react"
import { EditorState, DraftHandleValue, RichUtils, Modifier } from "draft-js"
import Editor from "draft-js-plugins-editor"
import createToolbarPlugin from "draft-js-static-toolbar-plugin"
import positionSuggestions from "./plugins/positionSuggestions"
import mentions from "./mentions"
import { myKeyBindingFn } from "./plugins/myKeyBindingFn"
import { dateFormatter } from "./utils/DateFormatter"
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin"
import buttonStyles from "./styles/buttonStyles.css"
import editorStyles from "./styles/editorStyles.css"
import mentionsStyles from "./styles/mentionsStyles.css"
import toolbarStyles from "./styles/toolbarStyles.css"
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons"
import { HeadlinesButton } from "./plugins/moreButton"

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
})
const { Toolbar } = toolbarPlugin

interface Props {
  id?: any
}

export default class TextEditor extends Component<Props> {
  mentionPlugin: any
  editor: any

  constructor(props) {
    super(props)
    this.mentionPlugin = createMentionPlugin({
      mentions,
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      positionSuggestions,
      supportWhitespace: true,
      mentionComponent: mentionProps => (
        <span
          className={mentionProps.className}
          // eslint-disable-next-line no-alert
          onClick={() => alert("Clicked on the Mention!")}
        >
          {mentionProps.children}
        </span>
      ),
    })
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  }

  onChange = editorState => {
    this.setState({
      editorState,
    })
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    })
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = command => {
    let newState
    if (command === "bbbold") {
      console.log("blod")
      newState = RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
    }

    // Modifer Insert Text
    // if (command === "date") {
    //   let newState = dateFormatter({ value: Date.now() })
    //   const editorState = this.state.editorState
    //   const selection = editorState.getSelection()
    //   const contentState = editorState.getCurrentContent()
    //   const ncs = Modifier.insertText(contentState, selection, newState)
    //   const es = EditorState.push(editorState, ncs, "insert-fragment")
    //   this.setState({ editorState: es })
    // }

    if (command === "date") {
      let newState = dateFormatter({ value: Date.now() })
      const editorState = this.state.editorState
      const currentContent = editorState.getCurrentContent()
      const currentSelection = editorState.getSelection()

      const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        newState,
      )

      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "insert-characters",
      )
      this.setState({ editorState: newEditorState })
    }

    if (newState) {
      this.setState({ editorState: newState })
      return "handled"
    }
    return "not-handled"
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin
    const plugins = [this.mentionPlugin, toolbarPlugin]

    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Toolbar>
          {// may be use React.Fragment instead of div to improve perfomance after React 16
          externalProps => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <HeadlinesButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </div>
          )}
        </Toolbar>
        <Editor
          keyBindingFn={myKeyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element
          }}
        />

        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
        />
      </div>
    )
  }
}
