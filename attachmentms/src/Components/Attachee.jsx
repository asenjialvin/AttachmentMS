import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Attachee = () => {
  const [attachee, setAttachee] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/attachee")
      .then((result) => {
        if (result.data.Status) {
          setAttachee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_attachee/'+attachee_id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Attachee List</h3>
      </div>
      <Link to="/dashboard/add_attachee" className="btn btn-success">
        Add  Attachee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Institution</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attachee.map((e) => (
              <tr>
                <td>{e.attachee_name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.attachee_image}
                    className="attachee_image"
                  />
                </td>
                <td>{e.attachee_email}</td>
                <td>{e.attachee_address}</td>
                <td>{e.attachee_institution}</td>
                <td>{e.attachee_salary}</td>
                <td>{e.category_name}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_attachee/` + e.attachee_id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.attachee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attachee;
