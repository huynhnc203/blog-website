import React from "react";
import {Image} from '@chakra-ui/react'

const FormCardComment = () => {
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <div className="card card-white post">
            <div className="post-heading d-flex">
              <div className="float-left image">
                <Image
                  src="default.jpg"
                  className="rounded-circle me-2"
                  width= "40px"
                  height= "40px"
                  alt="avatar of user"
                />
              </div>
              <div className="float-left meta">
                <div className="title h5">
                  <a href="#">
                    <b>JohnDoe</b>
                  </a>
                </div>
                <h6 className="text-muted time">time</h6>
              </div>
            </div>
            <div className="card-body py-1">
              <form>
                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="visually-hidden"
                  >
                    Comment
                  </label>
                  <textarea
                    className="form-control form-control-sm border border-2 rounded-3"
                    id="exampleFormControlTextarea1"
                    style={{ height: "50px" }}
                    placeholder="Add a comment..."
                    minLength={3}
                    maxLength={255}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <footer className="card-footer bg-transparent border-0 text-end">
              <button className="btn btn-link btn-sm me-2 text-decoration-none">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCardComment;
