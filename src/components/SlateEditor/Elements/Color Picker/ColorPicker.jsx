import React, {useRef, useState} from "react";
import "./ColorPicker.css";
import {ReactEditor} from "slate-react";
import {MdFormatColorText, MdFormatColorFill, MdCheck} from "react-icons/md";
import {Transforms} from "slate";
import usePopup from "../../utils/usePopup";
import {colors} from "./defaultColors";
import {activeMark, addMarkData} from "../../utils/SlateUtilityFunctions";

const logo = {
    color: <MdFormatColorText size={20}/>,
    bgColor: <MdFormatColorFill size={20}/>
};
const ColorPicker = ({format, editor}) => {


    const [selection, setSelection] = useState();
    const [hexValue, setHexValue] = useState("");
    const [validHex, setValidHex] = useState();
    const colorPickerRef = useRef(null);
    const [showOptions, setShowOptions] = usePopup(colorPickerRef);

    // regular expression literal
    const isValideHexSix = /^#[0-9A-Za-z]{6}$/;
    const isValideHexThree = /^#[0-9A-Za-z]{3}$/;

    const changeColor = (e) => {
        const clickedColor = e.target.getAttribute("data-value");
        if (selection) Transforms.select(editor, selection);

        addMarkData(editor, {format, value: clickedColor});
        ReactEditor.focus(editor);
        Transforms.move(editor, {
            distance: 1
        });
        setShowOptions(false);
    };
    const toggleOption = () => {
        setSelection(editor.selection);
        setShowOptions((prev) => !prev);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validHex) return;
        if (selection) Transforms.select(editor, selection);

        addMarkData(editor, {format, value: hexValue});
        setShowOptions(false);
        setValidHex("");
        setHexValue("");
    };
    const handleHexChange = (e) => {
        e.preventDefault();
        const newHex = e.target.value;
        setValidHex(isValideHexSix.test(newHex) || isValideHexThree.test(newHex));
        setHexValue(newHex);
    };
    return (
        <div className="color-picker popup-wrapper" ref={colorPickerRef}>
            <button
                type="button"
                style={{
                    color: showOptions ? "black" : activeMark(editor, format),
                    opacity: "1"
                }}
                className={showOptions ? "clicked" : ""}
                onClick={toggleOption}
            >
                {logo[format]}
            </button>
            {showOptions && (
                <div className="popup">
                    <div className="color-options">
                        {colors.map((color, index) =>
                           (
                                <div
                                    role="button"
                                    tabIndex={index}
                                    key={index}
                                    data-value={color}
                                    onClick={changeColor}
                                    onKeyUp={null}
                                    className="option"
                                    style={{background: color}}
                                />
                            )
                        )}
                    </div>
                    <p style={{textAlign: "center", opacity: "0.7", width: "100%"}}>
                        OR
                    </p>
                    <form onSubmit={handleFormSubmit}>
                        <div
                            className="hexPreview"
                            style={{background: validHex ? hexValue : "#000000"}}
                        />
                        <input
                            type="text"
                            placeholder="#000000"
                            value={hexValue}
                            onChange={handleHexChange}
                            style={{
                                border:
                                    validHex === false ? "1px solid red" : "1px solid lightgray"
                            }}
                        />
                        <button style={{color: validHex ? "green" : ""}} type={"submit"}>
                            <MdCheck size={20}/>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
