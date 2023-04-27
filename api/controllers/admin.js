import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  //CHECK ADMIN
  const q = "SELECT * FROM admins WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Admin" + req.body.username + "not found! ");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("admin_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("admin_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("Admin has been logged out.")
};

export const updateAdmin = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    const q =
      "UPDATE admins SET `password`=? WHERE `id` = ? and `password`= ?";

    const values = [adminInfo.id, req.body.oldPassword];
    db.query(q, [hash, ...values], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Admin has been updated.");
    });
  });
};

export const getUsers = (req, res) => {
  
};

export const getUser = (req, res) => {
  
};

export const addUser = (req, res) => {
  
};

export const putUser = (req, res) => {
  
};

export const deleteUser = (req, res) => {
  
};