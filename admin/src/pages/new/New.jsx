import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [rightItems, setRightItems] = useState([
      {"key": 1, "value": "Item 1"},
      {"key": 2, "value": "Item 2"},
      {"key": 3, "value": "Item 3"},
      {"key": 4, "value": "Item 4"},
      {"key": 5, "value": "Item 5"},
  ]);
  const [leftItems, setLeftItems] = useState([]);

  const handSelect = () => {
    var key = document.getElementById("selectItems").value;
    handleAdd(key);
  }

  const handleAdd = (key) => {
      var item = rightItems.find(((i) => i.key == key)); 
      var isUnderfined = true;
      for(var i of leftItems){
          if(i.key != item.key) 
              continue;
          
          if(i.quantity != null){
              i.quantity += 1;
              isUnderfined = false;
          }
      }
      if(isUnderfined){
          var i = item;
          i.quantity = 1;
          setLeftItems(leftItems.concat(i));
      }
      else {
          setLeftItems(leftItems.concat({"action": "update"}));
          setLeftItems(leftItems.filter((i) => i.action == null));
      }
      console.log(leftItems);
  }
  const handleDelete = (key) =>{
      var item = leftItems.find(((i) => i.key == key));
      var isGreaterOne = item.quantity > 1;
      if(isGreaterOne){
          item.quantity -= 1;
          setLeftItems(leftItems.concat({"action": "update"}));
          setLeftItems(leftItems.filter((i) => i.action == null));
      }
      else {
          setLeftItems(leftItems.filter((i) => i.key != key));
      }
      console.log(leftItems);
  }

  const cat = useLocation().pathname.split('/')[1];

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : (cat === "orders" 
                    ? "https://icon-library.com/images/141782.svg.svg" 
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {cat !== "orders" &&
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              {cat === "orders" &&
                <div className="items">
                  <label>Items</label>
                  <div className="widgets">
                    <div className="formInput">                    
                      <select id="selectItems" name="items" onChange={handSelect}>
                        {rightItems.map((item)=>(
                          <option value={item.key}>{item.value}</option>
                        ))}
                      </select>
                    </div>
                    <div className="orderItems">                    
                      <ul>
                        {leftItems.map((item) => (
                          <li data-order={item.key}>
                            <div className="leftItem">
                                <span>Name: {item.value}</span>
                            </div>
                            <div className="rightItem">
                                <span onClick={() => handleDelete(item.key)}>-</span>
                                <span>{item.quantity}</span>
                                <span onClick={() => handleAdd(item.key)}>+</span>
                            </div>                                
                          </li>                        
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              }
              <button className="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
