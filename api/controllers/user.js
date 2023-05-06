import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
  const q = req.query.status
    ? "SELECT id, name, username, email, img, status FROM users WHERE status=?"
    : "SELECT id, name, username, email, img, status FROM users";
    
  db.query(q, [req.query.status], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const q =
    "SELECT id, name, username, email, img, status FROM users WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data[0]);
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    console.log(id);
    const q = "UPDATE users SET `status` = (`status` + 1) % 2 WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
      if (err || data.affectedRows == 0) {
        return res.status(403).json("You can delete only your user!");
      }
      return res.json("User has been deleted!");
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM users WHERE `id` = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.oldPassword,
        data[0].password
      );
      if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPasword, salt);

      const userId = req.params.id;
      const q =
        "UPDATE users SET `name`=?,`password`=?,`img`=? WHERE `id` = ?";

      const values = [req.body.name, hash, req.body.img, userInfo.id];
      db.query(q, [...values, userId, userInfo.id], (err, data) => {
        if (err || data.affectedRows == 0) return res.status(500).json(err);
        return res.json("User has been updated.");
      });
    });    
  });
};
