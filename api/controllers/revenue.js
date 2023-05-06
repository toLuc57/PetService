import { db } from "../db.js";

export const getRevenues = (req, res) => {
  const q = 
  "SELECT DATE_FORMAT(o.required_date, '%b') as `Month`, sum(oi.list_price*(1-oi.discount)) as `Total`" +
  "FROM order_items as oi JOIN orders as o ON o.id = oi.order_id GROUP BY month(o.required_date) LIMIT 6"
    
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getRevenue = (req, res) => {
  const q =
  "select sum(list_price*(1-oi.discount)) as `Total` from order_items as oi " + 
  "where order_id in (select id from orders where date(required_date) = date(CURRENT_TIMESTAMP()))";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};