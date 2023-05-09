import { db } from "../db.js";

export const getCustomers = (req, res) => {
  const q = req.query.status
    ? "SELECT * FROM customers WHERE status=?"
    : "SELECT * FROM customers";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const insertCustomers = (req, res) => {
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
