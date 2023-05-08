import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getRooms = (req, res) => {
  const q = req.query.status
    ? "SELECT * FROM room WHERE status=?"
    : "SELECT * FROM room";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getRoom = (req, res) => {
  const q =
    "SELECT * FROM room WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data[0]);
  });
};

export const insertRoom = (req, res) => {
  return res.status(200).json("Sorry we're repairing!");
}

export const updateRoom = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q =
    "UPDATE room SET `status` = (`status` + 1) % 2 WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
    if (err || data.affectedRows == 0) return res.status(500).json(err);
    return res.json("Room has been updated.");
    });
  });
};
