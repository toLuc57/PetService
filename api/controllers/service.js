import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getServices = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM services WHERE cat=?"
    : "SELECT * FROM services";
    
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getService = (req, res) => {
  const q =
    "SELECT * FROM services WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data[0]);
  });
};

export const addService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO services(`name`, `desc`, `img`, `cat`, `requirement`,`status`) VALUES (?)";

    const values = [
      req.body.name,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.requirement,
      req.body.status,
    ];
    
    db.query(q, [values], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Service has been created.");
    });
  });
};

export const deleteService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q = "UPDATE services SET `status` = (`status` + 1) % 2 WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
      if (err || data.affectedRows == 0) {
        return res.status(403).json(err);
      }
      return res.json("Service has been deleted!");
    });
  });
};

export const updateService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE services SET `name`=?,`desc`=?,`img`=?,`cat`=?,`requirement` =?,`status`=? WHERE `id` = ?";

    const values = [
      req.body.name, 
      req.body.desc, 
      req.body.img, 
      req.body.cat, 
      req.body.requirement, 
      req.body.status
    ];
    db.query(q, [...values, postId], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Service has been updated.");
    });
  });
};