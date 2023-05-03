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