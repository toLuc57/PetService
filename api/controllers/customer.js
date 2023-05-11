import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getCustomers = (req, res) => {
  const q = req.query.status
    ? "SELECT * FROM customers WHERE status=?"
    : "SELECT * FROM customers";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const insertCustomer = (req, res) => {
  const q = "SELECT * FROM customers where `name` = ?";
    
  db.query(q, [req.body.name], (err, data) => {
    if (err) return res.status(500).send(err);
    if(data[0] == null){
      const qInsert = "INSERT INTO customers(`name`,`phone`,`gender`,`address`,`CMND/CCCD`) VALUE (?)";
      const values = [
        req.body.name,
        req.body.phone,
        req.body.gender,
        req.body.address,
        req.body.code
      ]
      db.query(qInsert, [values], (err, dataInsert) => {
        if (err) return res.status(500).send(err);
        const qQuery = "SELECT * FROM customers where id =?";
        db.query(qQuery, [dataInsert.insertId], (err, dataCustomer) => {
          if (err) return res.status(500).send(err);
          return res.status(200).json(dataCustomer[0]);
        })
      })
    }
    else {
      return res.status(200).json(data[0]);
    }    
  });
};

export const updateCustomer = (req, res) => {
  return res.json("Ops! We're updating");
}

export const deleteCustomer = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE customers SET `status`= 1 WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if(err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Customer has been updated.");
    })
  })
}