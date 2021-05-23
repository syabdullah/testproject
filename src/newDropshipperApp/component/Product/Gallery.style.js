import styled from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 544px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FeaturedImage = styled.img`
  width: 316px;
  height: 316px;
  object-fit: cover;

  @media (max-width: 544px) {
    width: 100%;
  }
`;

export const Thumbnails = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: 16px;
  flex-direction: column;

  @media (max-width: 544px) {
    margin-left: unset;
    flex-direction: row;
  }
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;

  @media (max-width: 544px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 390px) {
    width: 64px;
    height: 64px;
  }
`;

export const ThumbnailWrap = styled.span`
  margin: 8px 0;
  position: relative;

  &:first-child,
  &:last-child {
    margin: 0;
  }

  &:first-child:nth-last-child(2) {
    margin: 8px 0;
  }

  @media (max-width: 544px) {
    margin: 8px 4px;

    &:first-child,
    &:last-child {
      margin: 8px 0;
    }

    &:first-child:nth-last-child(2) {
      margin: 8px 8px 0 0;
    }
  }
`;

export const OverlayEffect = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  display: flex;
  font-size: 24px;
  overflow: hidden;
  font-weight: bold;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const FeaturedImageContainer = styled.button`
  position: relative;
  cursor: pointer;

  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;
`;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Product/Gallery.style.js