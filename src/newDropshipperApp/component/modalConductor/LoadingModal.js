import React from "react";
import styled from "styled-components";

import { Modal } from "newDropshipperApp/spocketUI";
import { default as Loadable } from "components/_Shared/commonLoadable";

const Wrapper = styled.div`
  width: calc(100vw - 12px);
  display: flex;
  height: 100vh;
`;
export const LoadingModal = () => {
  return (
    <Modal cleanModalContent>
      <Wrapper>
        <Loadable active={true} />
      </Wrapper>
    </Modal>
  );
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/LoadingModal.js