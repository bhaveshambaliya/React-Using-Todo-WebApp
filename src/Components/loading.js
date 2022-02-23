import React from "react";
import { toast } from "react-toastify";

export const loading = () => {
  return (
    <div>
      <div className="countiner">
        <div className="row justify-content-center">
          <img
            src="https://media.giphy.com/media/jAYUbVXgESSti/source.gif"
            className="col-md-12"
          />
        </div>

        {/* {props
          ? toast.info("Please Verify Email", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : null} */}
      </div>
    </div>
  );
};
