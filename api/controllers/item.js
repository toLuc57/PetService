import { db } from "../db.js";

export const getItems = (req, res) => {
  const q = 
  "SELECT attr_v.id as `id`, s.id as `service_id`, s.`name` as `name`, attr_v.attribute_id, attr.`name` as `attr_name`, min(price) as 'price' " +
  "from attribute_value as attr_v join services as s on s.id = attr_v.service_id " + 
  "join blog.attribute as attr on attr.id = attr_v.attribute_id " + 
  "where  size >= ? group by s.id, s.name, attr_v.attribute_id, attr.`name`";
    
  db.query(q, [req.body.weight ? req.body.weight : 0], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getItem = (req, res) => {
  const q = req.query.cat ==  "services" 
    ? "SELECT service_id, attribute_id, min(price) as `price`" + 
    "from attribute_value where service_id = ? and size >= ? group by service_id, attribute_id"
    : "SELECT id, min(price) as 'price' from product " + 
    "where id = ? and size >= ? group by id";

  db.query(q,[req.params.id, req.body.weight] , (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};