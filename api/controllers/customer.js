import { db } from "../db.js";

export const getCustomers = (req, res) => {
  const q = req.query.status
    ? "SELECT * FROM customer WHERE status=?"
    : "SELECT * FROM customer";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};
