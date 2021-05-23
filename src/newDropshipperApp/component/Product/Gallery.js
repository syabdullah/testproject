// Libs
import React, { useState, useContext } from "react";
import Lightbox from "react-image-lightbox";

// Components
import ProductFeatures from "newDropshipperApp/pages/search/listingCard/ProductFeatures"; // Best seller, Premium, etc
import StatusTag from "newDropshipperApp/pages/search/listingCard/StatusTag"; // In store, On Import list, etc

// Contexts
import { UserContext } from "contexts/UserContext";

// Style
import * as S from "./Gallery.style";

const Gallery = ({ images, listing }) => {
  const [featureImageIndex, setFeatureImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Context
  const { importedListings, pushedListings } = useContext(UserContext);

  /**
   * Render the Lightbox
   * Example: https://github.com/fritz-c/react-image-lightbox#example
   * @return {ReactElement}
   */
  const renderLightbox = () => {
    const customStyles = {
      overlay: {
        zIndex: 1060
      }
    };
    return (
      <Lightbox
        mainSrc={images[featureImageIndex]}
        nextSrc={images[(featureImageIndex + 1) % images.length]}
        prevSrc={images[(featureImageIndex + images.length - 1) % images.length]}
        onMovePrevRequest={() =>
          setFeatureImageIndex((featureImageIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() => setFeatureImageIndex((featureImageIndex + 1) % images.length)}
        reactModalStyle={customStyles}
        onCloseRequest={() => setIsLightboxOpen(false)}
      />
    );
  };

  const renderStatusTag = () => {
    const isImported = importedListings.includes(listing.id);
    const isPushed = pushedListings.includes(listing.id);

    return <StatusTag isImported={isImported} isPushed={isPushed} />;
  };

  return (
    <S.Container>
      {isLightboxOpen && renderLightbox()}
      <S.FeaturedImageContainer onClick={() => setIsLightboxOpen(true)}>
        {/* Top part of the featured image */}
        {renderStatusTag()}
        {/* Bottom part of the featured image */}
        <ProductFeatures listing={listing} />
        <S.FeaturedImage src={images[featureImageIndex]} alt="featured image" />
      </S.FeaturedImageContainer>

      <S.Thumbnails>
        {images.slice(0, 3).map((image, index) => {
          return (
            <S.ThumbnailWrap key={index}>
              {index === 2 &&
                images.length > 3 && (
                  <S.OverlayEffect
                    onClick={() => {
                      setFeatureImageIndex(index);
                      setIsLightboxOpen(true);
                    }}
                  >
                    +{images.length - 3}
                  </S.OverlayEffect>
                )}
              <S.Thumbnail src={image} onClick={() => setFeatureImageIndex(index)} alt="thumbnail image" />
            </S.ThumbnailWrap>
          );
        })}
      </S.Thumbnails>
    </S.Container>
  );
};

export default Gallery;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Product/Gallery.js