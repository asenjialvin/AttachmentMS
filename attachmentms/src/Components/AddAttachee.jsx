import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAttachee = () => {
  const [attachee, setAttachee] = useState({
    attachee_name: "",
    attachee_email: "",
    attachee_password: "",
    attachee_institution: "",
    attachee_salary: "",
    attachee_address: "",
    category_id: "",
    attachee_image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('attachee_name', attachee.attachee_name);
    formData.append('attachee_email', attachee.attachee_email);
    formData.append('attachee_password', attachee.attachee_password);
    formData.append('attachee_address', attachee.attachee_address);
    formData.append('attachee_institution', attachee.attachee_institution);
    formData.append('attachee_salary', attachee.attachee_salary);
    formData.append('attachee_image', attachee.attachee_image);
    formData.append('category_id', attachee.category_id);

    axios.post('http://localhost:3000/auth/add_attachee', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/attachee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Attachee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputInstitution" className="form-label">
              Institution
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputInstitution"
              placeholder="Institution"
              autoComplete="off"
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_institution: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setAttachee({...attachee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.category_id}>{c.category_name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="attachee_image"
              onChange={(e) => setAttachee({...attachee, attachee_image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Attachee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttachee;
