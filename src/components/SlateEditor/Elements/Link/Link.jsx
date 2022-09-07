import React from 'react';
import { useFocused, useSelected, useSlateStatic } from 'slate-react'

import './styles.css'
import {removeLink} from "../../utils/link";
import unlink from '../../Toolbar/toolbarIcons/unlink.svg'


const Link = ({ attributes, element, children}) => {
    const editor = useSlateStatic();
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div className='link' >
            <a href={element.href} {...attributes}>{children}</a>
            {selected && focused && (
                <div className='link-popup' contentEditable='false'>
                    <a href={element.href}>{element.href}</a>
                    <button onClick={()=>removeLink(editor)}><img src={unlink} alt="" /></button>
                </div>
            )}
        </div>
    )
}

export default Link
