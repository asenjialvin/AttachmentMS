import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

// Admin Login
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

// View Category
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

// Add Category
router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`category_name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end image upload 

// Start of AddAttachee
router.post('/add_attachee',upload.single('attachee_image'), (req, res) => {
    const sql = `INSERT INTO attachee \
    (attachee_name,attachee_email,attachee_password,attachee_address,attachee_institution,attachee_salary,attachee_image,category_id) \
    VALUES (?)`;
    bcrypt.hash(req.body.attachee_password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.attachee_name,
            req.body.attachee_email,
            hash,
            req.body.attachee_address,
            req.body.attachee_institution,
            req.body.attachee_salary,
            req.file.filename,
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})
// End of AddAttachee

// View attachees
router.get('/attachee', (req, res) => {
    const sql = "SELECT * FROM attachee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

// Get attachee by attachee_id
router.get('/attachee/:attachee_id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM attachee WHERE attachee_id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

// Edit attachee based on attachee_id
router.put('/edit_attachee/:attachee_id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE attachee 
        SET attachee_name = ?, attachee_email = ?, attachee_address = ?, attachee_institution = ?, attachee_salary = ?, category_id = ? 
        WHERE attachee_id = ?`;
    const values = [
        req.body.attachee_name,
        req.body.attachee_email,
        req.body.attachee_address,
        req.body.attachee_institution,
        req.body.attachee_salary,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
// End of EditAttachee

// Delete Attachee
router.delete('/delete_attachee/:attachee_id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM attachee WHERE attachee.attachee_id =?';
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// Count number of Admins
router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/attachee_count', (req, res) => {
    const sql = "select count(attachee_id) as attachee from attachee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(attachee_salary) as salaryOFEmp from attachee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// View all Admins
router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
