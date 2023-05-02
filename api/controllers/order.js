import { db } from "../db.js";

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

export const updateOrderStatus = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q =
      "UPDATE orders SET `order_status`=? WHERE `id` = ?";

    const values = [req.body.status];
    db.query(q, [...values, id], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Order status has been updated.");
    });
  });
};

export const updateOrder = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q =
      "UPDATE orders SET `order_status`=? WHERE `id` = ?";

    const values = [req.body.status];
    db.query(q, [...values, id], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Order status has been updated.");
    });
  });
};