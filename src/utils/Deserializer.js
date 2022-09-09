import {jsx} from 'slate-hyperscript'

const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes = {...markAttributes}

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'strong':
            return nodeAttributes.bold = true
        case 'em':
            return nodeAttributes.italic = true
        case 'u':
            return nodeAttributes.underline = true
        case 's':
            return nodeAttributes.strikethrough = true
        case 'span':
            if (el.style.color) {
                return nodeAttributes.color = el.style.color
            } else if (el.style.bgColor) {
                return nodeAttributes.bgColor = el.style.bgColor
            } else if (el.style.fontSize) {
                return nodeAttributes.fontSize = el.style.fontSize
            } else if (el.style.fontFamily) {
                return nodeAttributes.fontFamily = el.style.fontFamily
            }  else {
                return null
            }
        case 'a':
            return nodeAttributes.href = el.href
        case 'blockquote':
            return jsx('element', {type: 'blockquote'}, deserialize(el, nodeAttributes))
        case 'p':
            return jsx('element', {type: 'paragraph'}, deserialize(el, nodeAttributes))
        case 'sub':
            return nodeAttributes.subscript = true
        case 'sup':
            return nodeAttributes.superscript = true
        default:
            return null

    }

    const children = Array.from(el.childNodes)
        .map(node => deserialize(node, nodeAttributes))
        .flat()

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''))
    }

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'BLOCKQUOTE':
            return jsx('element', {type: 'quote'}, children)
        case 'P':
            return jsx('element', {type: 'paragraph'}, children)
        case 'A':
            return jsx(
                'element',
                {type: 'link', url: el.getAttribute('href')},
                children
            )
        default:
            return children
    }
}
