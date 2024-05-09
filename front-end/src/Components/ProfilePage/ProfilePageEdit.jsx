import React from 'react';
import './ProfilePageEdit.css'

const ProfilePage = () => {
    return (
        <div className="container-xl px-4 mt-4">
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    {/* Profile picture card */}
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body d-flex flex-column algin-items-ceter justify-content-center text-center ">
                            {/* Profile picture image */}
                            <img className="img-account-profile rounded-circle mb-2" src="default.jpg" alt="" />
                            {/* Profile picture help block */}
                            <div className="small font-italic text-muted mb-4">Giới hạn về dung lượng file</div>
                            {/* Profile picture upload button */}
                            <button className="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    {/* Account details card */}
                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (username) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUserID">User ID (how your name will appear to other users on the site)</label>
                                    <input className="form-control" id="inputUserID" type="text" placeholder="Enter your User ID" value="User ID" />
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputName">Name</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Nguyen Van A" />
                                    </div>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (organization name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputProfestional">Profesional</label>
                                        <input className="form-control" id="inputProfestional" type="text" placeholder="Enter Profestional" value="AI Enginear" />
                                    </div>
                                </div>
                                {/* Form Group (email address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                    <input className="form-control" id="inputEmail" type="email" placeholder="Enter your email address" value="name@example.com" />
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (phone number) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="113-114-115" />
                                    </div>
                                </div>
                                {/* Save changes button */}
                                <button className="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
