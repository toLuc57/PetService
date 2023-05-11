import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getServices = (req, res) => {
  const q = req.query.status
    ? "SELECT * from attribute_value as attr_v" +
      "JOIN services as s ON attr_v.service_id = s.id " +
      "WHERE s.status = ?"
    : "SELECT * from attribute_value as attr_v " +
      "JOIN services as s ON attr_v.service_id = s.id ";
  db.query(q, [req.query.status], (err, data) => {
    var result = [];
    var oldService, oldAttr, value;
    if (err) return res.status(500).send(err);
    for(var record of data){
      if(oldService != record.service_id){
        oldService = record.service_id;
        oldAttr = record.attribute_id;
        value = {
          "id": record.service_id,
          "name": record.name,
          "img": record.img,
          "desc": record.desc,
          "cat": record.cat,
          "status": record.status,
          "attr": [
            {
              "attribute_id": record.attribute_id, 
              "price": record.price, 
              "weight": record.size,
            }
            // {"attribute_id": record.attribute_id, 
            // "values": [
            //   {"price": record.price, "weight": record.size},
            // ],}
          ]
        }
        result = value != null ? result.concat(value) : [];
        continue;
      }
      value.attr = value.attr.concat({
        "attribute_id": record.attribute_id, 
        "price": record.price, 
        "weight": record.size,
      });
      // console.log(value.attr.values);
      // if(oldAttr != record.attribute_id){
      //   oldAttr = record.attribute_id
      //   value.attr = value.attr.concat({
      //     "attribute_id": record.attribute_id, 
      //     "values": [
      //       {"price": record.price, "weight": record.size},
      //     ],
      //   });
      // }
      // else {
      //   // value.attr.values = value.attr.values.concat({"price": record.price, "weight": record.size});
      // }
    }
    return res.status(200).json(result);
  });
};

export const getService = (req, res) => {
  let result;
  const q =
    "SELECT * FROM services WHERE id = ? ";
  db.query(q, [req.params.id], (err, dataService) => {
    if (err) return res.status(500).json(err);
    if (dataService[0] == null) return res.status(500).json("Not found!");
    
    result = dataService[0];
    const qValue = 
      "SELECT attr.name as `name`, attr_v.price as `price`, attr_v.size as `weight` " +
      "from attribute_value as attr_v JOIN attribute as attr " +
      "ON attr_v.attribute_id = attr.id where service_id = ?";

    db.query(qValue, [req.params.id], (err, dataValues) =>{
      if (err) return res.status(500).json(err);
      result.attr = dataValues;
      return res.status(200).json(result);
    });
        
  });
};

export const addService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO services(`name`, `desc`, `img`, `cat`) VALUES (?)";

    const values = [
      req.body.name,
      req.body.desc,
      req.body.img,
      req.body.cat
    ];
    
    db.query(q, [values], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      const id = data.insertId;
      const qItem = "INSERT INTO attribute_value(`service_id`, `attribute_id`, `price`, `size`) VALUES (?)";
      for(var item of req.body.attr){
        const item_values = [
          id,
          item.attribute_id,
          item.price,
          item.size
        ];

        db.query(qItem, [item_values], (err, data) => {
          if (err || data.affectedRows == 0) return res.status(500).json(err);
          return res.status(201).json("Service has been created."); 
        })
      }
    });
  });
};

export const deleteService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q = "UPDATE services SET `status` = (`status` + 1) % 2 WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
      if (err || data.affectedRows == 0) {
        return res.status(403).json(err);
      }
      return res.json("Service has been deleted!");
    });
  });
};

export const updateService = (req, res) => {
  const token = req.cookies.staff_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, adminInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE services SET `name`=?,`desc`=?,`img`=?,`cat`=?,`requirement` =?,`status`=? WHERE `id` = ?";

    const values = [
      req.body.name, 
      req.body.desc, 
      req.body.img, 
      req.body.cat, 
      req.body.requirement, 
      req.body.status
    ];
    db.query(q, [...values, postId], (err, data) => {
      if (err || data.affectedRows == 0) return res.status(500).json(err);
      return res.json("Service has been updated.");
    });
  });
};