import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withLinks, insertLink, isLinkActive } from './utils/links'
import { withImages, addImage } from './utils/images'
import { toggleBlock, isBlockActive } from './utils/blocks'
import { toggleMark, isMarkActive } from './utils/marks'
import { HOTKEYS } from './constants'
import Toolbar from './Toolbar'
import Button from './Button'
import Icon from './Icon'
import Image from './Image'
import './styles.css'

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'link':
      return <a {...attributes} href={element.url}>{children}</a>
    case 'image':
      return <Image attributes={attributes} children={children} element={element} />
    // case 'heading-one':
    //   return <h1 {...attributes}>{children}</h1>
    // case 'heading-two':
    //   return <h2 {...attributes}>{children}</h2>
    // case 'numbered-list':
    //   return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }

  return <span {...attributes}>{children}</span>
}

const ToolButton = ({ format, icon, type }) => {
  const editor = useSlate()
  let isActive, toggleFunc;

  switch (type) {
    case "block":
      isActive = isBlockActive(editor, format)
      toggleFunc = toggleBlock
      break;
    case "mark":
      isActive = isMarkActive(editor, format)
      toggleFunc = toggleMark
      break;
    case "link":
      isActive = isLinkActive(editor)
      toggleFunc = insertLink
      break;
    case "image":
      toggleFunc = addImage
      break;
    default:
      break;
  }

  return (
    <Button
      active={isActive}
      onMouseDown={event => {
        event.preventDefault()
        toggleFunc(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' '},
      { text: 'better', underline: true },
      { text: ' than a ' },
      { text: '<textarea>', code: true },
      { text: ' '},
      { text: 'yay', strikethrough: true},
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

const RichEditor = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withImages(withLinks(withHistory(withReact(createEditor())))), [])

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Toolbar>
        <ToolButton format="bold" icon="format_bold" type="mark" />
        <ToolButton format="italic" icon="format_italic" type="mark" />
        <ToolButton format="underline" icon="format_underlined" type="mark" />
        <ToolButton format="strikethrough" icon="strikethrough_s" type="mark" />
        <ToolButton format="code" icon="code" type="mark" />
        <ToolButton format="bulleted-list" icon="format_list_bulleted" type="block" />
        <ToolButton icon="link" type="link" />
        <ToolButton icon="image" type="image" />
        {/* <ToolButton format="heading-one" icon="looks_one" type="block" /> */}
        {/* <ToolButton format="heading-two" icon="looks_two" type="block" /> */}
        {/* <ToolButton format="block-quote" icon="format_quote" type="block" /> */}
        {/* <ToolButton format="numbered-list" icon="format_list_numbered" type="block" /> */}
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

export default RichEditor;