import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getOrders = (req, res) => {
  const q = 
  "select * from orders";
    
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getOrder = (req, res) => {
    let result;
    const qOrder =
    "select * from orders where id = ?";

    db.query(qOrder, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows == 0) return res.status(500).json("Not found!");
      result = data[0];
      const qOrderItems =
      "select * from order_items where order_id = ?";
      db.query(qOrderItems, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        result.items = data;
        return res.status(200).json(result); 
      });
    });
};

export const insertOrder = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO orders(`customer_id`, `staff_id`) VALUES (?)";

    const values = [
      req.body.customer_id,
      adminInfo.id
    ];
    
    db.query(q, [values], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      const id = data.insertId;
      const qItem = "INSERT INTO order_items(`order_id`, `item_id`, `cat`, `quatity`, `list_price`, `discount`) VALUES (?)";
      for(var item of req.body.items){
        const item_values = [
          id,
          item.item_id,
          item.cat,
          item.quatity,
          item.list_price,
          item.discount
        ];

        db.query(qItem, [item_values], (err, data) => {
          if (err || data.affectedRows == 0) return res.status(500).json(err);
          return res.status(201).json("Order has been created."); 
        })
      }
    });
  });
};

export const updateOrder = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE orders SET `order_status`= 1 WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if(err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Order has been updated.");
    })
  })
}

export const deleteOrder = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, staffInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE orders SET `order_status`= 1 WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
      if(err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Order has been updated.");
    })
  })
}