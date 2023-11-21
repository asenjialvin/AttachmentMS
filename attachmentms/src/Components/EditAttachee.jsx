import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditAttachee = () => {
    const {attachee_id} = useParams()
    const [attachee, setAttachee] = useState({
        attachee_name: "",
        attachee_email: "",
        attachee_address: "",
        attachee_institution: "",
        attachee_salary: "",
        category_id: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/attachee/'+attachee_id)
        .then(result => {
            setAttachee({
                ...attachee,
                attachee_name: result.data.Result[0].attachee_name,
                attachee_email: result.data.Result[0].attachee_email,
                attachee_address: result.data.Result[0].attachee_address,
                attachee_institution: result.data.Result[0].attachee_institution,
                attachee_salary: result.data.Result[0].attachee_salary,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_attachee/'+attachee_id, attachee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/attachee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Attachee</h3>
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
              value={attachee.attachee_name}
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
              value={attachee.attachee_email}
              onChange={(e) =>
                setAttachee({ ...attachee, attachee_email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={attachee.attachee_salary}
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
              placeholder="P.O Box 123"
              autoComplete="off"
              value={attachee.attachee_address}
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
              value={attachee.attachee_institution}
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
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Attachee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAttachee