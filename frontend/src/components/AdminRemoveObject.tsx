"use client";
import styles from "@/styles/adminremoveobject.module.css";
import { FC, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

interface AdminRemoveObjectProps {
  id: number;
  title: string;
  removeFn: Function;
}

const AdminRemoveObject: FC<AdminRemoveObjectProps> = ({
  id,
  title,
  removeFn,
}) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <button
        className="px-3 py-2 rounded bg-danger text-light d-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#removeModal"
      >
        <FaTrash />
      </button>
      <div
        className="modal fade"
        id="removeModal"
        // @ts-expect-error
        tabIndex="-1"
        aria-labelledby="removeModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="removeModal">
                Remove {title}?
              </h1>
              <FaTimes
                className={`fs-6 ${styles.modalCloseButton}`}
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body text-start cursor-pointer">
              Do you really want to remove this object?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeFn(id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRemoveObject;
