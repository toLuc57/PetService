import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  //CHECK ADMIN
  const q = "SELECT * FROM account WHERE username = ? AND `status` = 1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Staff " + req.body.username + " not found or the account is passive! ");

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
      .cookie("staff_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("staff_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("Staff has been logged out.")
};

export const updateAccount = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM users WHERE `id` = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Account not found!");
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
        "UPDATE account SET `password`=?,`img`=? WHERE `id` = ?";

      const values = [hash, req.body.img, userInfo.id];
      db.query(q, [...values, userId, userInfo.id], (err, data) => {
        if (err || data.affectedRows == 0) return res.status(500).json(err);
        return res.json("Account has been updated.");
      });
    });    
  });
};
