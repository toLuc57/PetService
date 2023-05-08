import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getStaffs = (req, res) => {
  const q = req.query.status
    ? "SELECT * FROM staff WHERE status=?"
    : "SELECT * FROM staff";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getStaff = (req, res) => {
  const q =
    "SELECT * FROM staff WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data[0]);
  });
};

export const insertStaff = (req, res) => {
  return res.status(200).json("Sorry we're repairing!");
}

export const deleteStaff = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    console.log(id);
    const q = "UPDATE staff SET `status` = (`status` + 1) % 2 WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
      if (err || data.affectedRows == 0) {
        return res.status(403).json("Not deleted!");
      }
      return res.json("Staff has been deleted!");
    });
  });
};

export const updateStaff = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err || staffInfo.status != 3) return res.status(403).json("Token is not valid!");
    
    const q =
      "UPDATE staff SET `name`=?,`phone`=?,`gender`=?,`CMND/CCCD`=? WHERE `id` = ?";

    const values = [
      req.body.name, 
      req.body.phone, 
      req.body.gender,
      req.body.code,
    ];

    db.query(q, [...values, req.params.id, staffInfo.id], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Staff has been updated.");
    });
  });
};
