import React from "react";
import { Modal } from "newDropshipperApp/spocketUI";
import ListingDetails from "newDropshipperApp/component/Product/ListingDetails";

export default function ListingDetailModal() {
  return (
    <Modal cleanModalContent>
      <ListingDetails />
    </Modal>
  );
}



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/ListingDetailModal.js