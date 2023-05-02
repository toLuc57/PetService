import { db } from "../db.js";

export const getRevenues = (req, res) => {
  const q = 
  "SELECT year(o.required_date) as `Year`, sum(oi.list_price) as `Total`" +
  "FROM order_items as oi JOIN orders as o ON o.id = oi.order_id GROUP BY year(o.required_date)"
    
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getRevenue = (req, res) => {
  const q =
  "select sum(list_price) as `Total` from order_items " + 
  "where order_id in (select id from orders where year(required_date) = ?)";

  db.query(q, [req.params.year], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};