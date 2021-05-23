// @flow
import React from "react";
import PropTypes from "prop-types";
import JoditEditor from "jodit-react";

const config = {
  readonly: false,
  processPasteHTML: true,
  askBeforePasteHTML: false,

  buttons: [
    "paragraph",
    "fontsize",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "table"
  ],
  buttonsMD: [
    "paragraph",
    "fontsize",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "table"
  ],
  buttonsSM: [
    "paragraph",
    "fontsize",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "table"
  ],
  buttonsXS: [
    "paragraph",
    "fontsize",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "table"
  ],
  removeButtons: [
    "hr",
    "source",
    "superscript",
    "subscript",
    "font",
    "brush",
    "image",
    "file",
    "video",
    "link",
    "selectall",
    "cut",
    "copy",
    "paste",
    "eraser",
    "copyformat",
    "hr",
    "symbol",
    "fullsize",
    "print",
    "about",
    "undo",
    "redo",
    "redo"
  ]
};
class ItemDescription extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  onDescriptionChange = value => {
    this.props.handleChange(value, "description");
  };

  render() {
    let description = this.props.description;

    return (
      <div>
        <JoditEditor value={description} config={config} tabIndex={1} onChange={this.onDescriptionChange} />
      </div>
    );
  }
}

export default ItemDescription;



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemDescription/index.js