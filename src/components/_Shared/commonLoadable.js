import React from "react";
import PropTypes from "prop-types";

import * as S from "./commonLoadable.style";

function CommonLoadable(props) {
  const { active, text, spinnerSize, background, children } = props;

  // Only render overlay, spinner and text if active is true
  const renderSpinner = () => {
    if (!active) return null;
    return (
      <S.Overlay bgColor={background}>
        <S.Spinner spinnerSize={spinnerSize}>
          <S.Circle1 />
          <S.Circle2 />
          <S.Circle3 />
        </S.Spinner>
        {text && <S.Text>{text}</S.Text>}
      </S.Overlay>
    );
  };

  return (
    <S.Container>
      {renderSpinner()}
      {children}
    </S.Container>
  );
}

CommonLoadable.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
  spinnerSize: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node
};

export default CommonLoadable;



// WEBPACK FOOTER //
// ./src/components/_Shared/commonLoadable.js