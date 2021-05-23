// @flow
import React from "react";
import PropTypes from "prop-types";
import ItemImage from "./ItemImage";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";

const SortableImage = SortableElement(({ image, isSelectedFunc, handleImageToggle, handleAltTextChange }) => {
  return (
    <ItemImage
      key={image.id}
      id={image.id}
      url={image.normal}
      selected={isSelectedFunc(image)}
      alt={image.alt_text}
      handleImageToggle={handleImageToggle}
      handleAltTextChange={handleAltTextChange}
    />
  );
});

const SortableListImage = SortableContainer(
  ({ items, isSelectedFunc, handleImageToggle, handleAltTextChange }) => {
    return (
      <ul className="images-list row" style={{ paddingLeft: "0", listStyleType: "none" }}>
        {items.map((image, index) => (
          <SortableImage
            isSelectedFunc={isSelectedFunc}
            key={`list-${items[index].id}`}
            index={index}
            image={image}
            handleImageToggle={handleImageToggle}
            handleAltTextChange={handleAltTextChange}
          />
        ))}
      </ul>
    );
  }
);

class ItemImageList extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    selectedImages: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  state = {
    images: this.props.images
  };

  images = () => {
    return this.props.images;
  };

  isSelected = image => {
    return this.props.selectedImages.indexOf(image.id) > -1;
  };

  handleImageToggle = id => {
    const newSelectedImages = this.props.selectedImages;
    const indexOfImage = newSelectedImages.indexOf(id);
    if (indexOfImage > -1) {
      // remove it
      newSelectedImages.splice(indexOfImage, 1);
    } else {
      // add it
      newSelectedImages.push(id);
    }
    this.props.handleChange(newSelectedImages, "selected_image_ids");
  };

  handleAltTextChange = (updatedAltText, id) => {
    const newImages = this.props.images.map(image => {
      if (image.id === id) {
        image.alt_text = updatedAltText;
      }
      return image;
    });
    this.props.handleChange(newImages, "listing_images");
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { images } = this.state;
    const newSelectedImages = arrayMove(images, oldIndex, newIndex).map(image => image.id);
    this.props.handleChange(newSelectedImages, "selected_image_ids");
    this.setState({
      images: arrayMove(images, oldIndex, newIndex)
    });
  };

  generateImages = () => {
    return (
      <SortableListImage
        pressDelay={110}
        lockToContainerEdges
        action={this.handleImageRemove}
        isSelectedFunc={this.isSelected}
        axis="xy"
        onSortEnd={this.onSortEnd}
        items={this.state.images}
        handleImageToggle={this.handleImageToggle}
        handleAltTextChange={this.handleAltTextChange}
      />
    );
  };

  render() {
    return <div>{this.generateImages()}</div>;
  }
}

export default ItemImageList;



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemImageList/index.js