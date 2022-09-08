import escapeHtml from 'escape-html'
import { Text } from 'slate'

function convertToEmbedYoutube(url) {
    const videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition)
    }
    return "https://www.youtube.com/embed/" + videoId
}

export  const Serializer = node => {

    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        console.log("node bold : ",node);
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        if (node.italic) {
            string = `<em>${string}</em>`
        }
        if (node.underline) {
            string = `<u>${string}</u>`
        }
        if (node.strikethrough) {
            string = `<s>${string}</s>`
        }
        if (node.color) {
            string = `<span style="color:${node.color}">${string}</span>`
        }
        if (node.bgColor) {
            string = `<span style="background-color:${node.bgColor}">${string}</span>`
        }
        if(node.fontSize){
            if (node.fontSize === "small") {
                string = `<span style="font-size:12px">${string}</span>`
            } else if (node.fontSize === "normal") {
                string = `<span style="font-size:16px">${string}</span>`
            } else if (node.fontSize === "medium") {
                string = `<span style="font-size:20px">${string}</span>`
            } else if (node.fontSize === "huge") {
                string = `<span style="font-size:24px">${string}</span>`
            }
        }
        if(node.fontFamily){
            string = `<span style="font-family:${node.fontFamily}">${string}</span>`
        }
        if(node.subscript){
            string = `<sub>${string}</sub>`
        }
        if(node.superscript){
            string = `<sup>${string}</sup>`
        }


        return string
    }

    const children = node.children.map(n => Serializer(n)).join('')

    switch (node.type) {
        case 'blockquote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.href)}">${children}</a>`
        case 'image':
            return `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.alt)}" height="${escapeHtml(node.height)}" width="${escapeHtml(node.width)}"/>`
        case 'video':
            return `<iframe src="${escapeHtml(node.url).includes('youtube')?convertToEmbedYoutube(escapeHtml(node.url)):escapeHtml(node.url)}" height="${escapeHtml(node.height)}" width="${escapeHtml(node.width)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        case 'headingOne':
            return `<h1>${children}</h1>`
        case 'headingTwo':
            return `<h2>${children}</h2>`
        case 'headingThree':
            return `<h3>${children}</h3>`
        case 'alignLeft':
            return `<div style="text-align: left">${children}</div>`
        case 'alignCenter':
            return `<div style="text-align: center">${children}</div>`
        case 'alignRight':
            return `<div style="text-align: right">${children}</div>`
        case 'orderedList':
            return `<ol>${children}</ol>`
        case 'unorderedList':
            return `<ul>${children}</ul>`
        case 'list-item':
            return `<li>${children}</li>`

        default:
            return children
    }
}
