import React, { Component, useEffect, useState } from "react";

export default function CustomModal({
  title,
  content,
  onClose,
  isClosed,
  noContentPadding,
  size,
}) {
  const [modalIsClosed, setModalIsClosed] = useState(isClosed || false);

  useEffect(async () => {
    setModalIsClosed(isClosed || false);
  }, [isClosed]);

  const closeModal = () => {
    setModalIsClosed(true);
    onClose && onClose();
  };

  return modalIsClosed ? null : (
    <>
      <div
        className="modal fade show"
        id="modalForm"
        style={{ display: "block", paddingRight: "16px" }}
        aria-modal="true"
        role="dialog"
      >
        <div className={`modal-dialog modal-${size}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <a
                style={{ cursor: "pointer" }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => closeModal()}
              >
                <em className="icon ni ni-cross" />
              </a>
            </div>
            <div className={`modal-body ${noContentPadding && " p-0"}`}>
              {content}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

CustomModal.defaultProps = {
  size: "",
};
