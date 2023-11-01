import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditAttachee = () => {
    const {id} = useParams()
    const [attachee, setAttachee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        institution: "",
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

        axios.get('http://localhost:3000/auth/attachee/'+id)
        .then(result => {
            setAttachee({
                ...attachee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                institution: result.data.Result[0].institution,
                salary: result.data.Result[0].salary,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_attachee/'+id, attachee)
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
              value={attachee.name}
              onChange={(e) =>
                setAttachee({ ...attachee, name: e.target.value })
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
              value={attachee.email}
              onChange={(e) =>
                setAttachee({ ...attachee, email: e.target.value })
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
              value={attachee.salary}
              onChange={(e) =>
                setAttachee({ ...attachee, salary: e.target.value })
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
              value={attachee.address}
              onChange={(e) =>
                setAttachee({ ...attachee, address: e.target.value })
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
              value={attachee.institution}
              onChange={(e) =>
                setAttachee({ ...attachee, institution: e.target.value })
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
                return <option value={c.id}>{c.name}</option>;
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