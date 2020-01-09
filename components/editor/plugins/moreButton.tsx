import {
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
} from "draft-js-buttons"
import React, { Component } from "react"
import editorStyle from "../styles/editorStyles.css"

export class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("click", this.onWindowClick)
    })
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick)
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    // @ts-ignore
    this.props.onOverrideContent(undefined)

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton]
    return (
      <div>
        {buttons.map((
          Button,
          i, // eslint-disable-next-line
        ) => (
          // @ts-ignore
          <Button key={i} {...this.props} />
        ))}
      </div>
    )
  }
}

export class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    // @ts-ignore
    this.props.onOverrideContent(HeadlinesPicker)

  render() {
    return (
      <div className={editorStyle.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyle.headlineButton}>
          H
        </button>
      </div>
    )
  }
}
