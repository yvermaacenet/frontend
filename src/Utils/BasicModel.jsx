import React from "react";

const BasicModel = () => {
  return (
    <div
      class="modal fade"
      id="basicModal"
      tabindex="-1"
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Basic Modal</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Non omnis incidunt qui sed occaecati magni asperiores est mollitia.
            Soluta at et reprehenderit. Placeat autem numquam et fuga numquam.
            Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet
            incidunt est facilis. Dolorem neque recusandae quo sit molestias
            sint dignissimos.
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicModel;
