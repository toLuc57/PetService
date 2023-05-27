import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { DarkModeContext } from "../../context/darkModeContext";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [rightItems, setRightItems] = useState([
      {"id": 1, "name": "Item 1", "attr": "attr1", "price": 200},
      {"id": 2, "name": "Item 1", "attr": "attr2", "price": 300},
      {"id": 3, "name": "Item 2", "attr": "attr3", "price": 390},
  ]);
  const [leftItems, setLeftItems] = useState([]);
  const [rooms, setRooms] = useState([]);

  const {currentAdmin} = useContext(DarkModeContext);

  const cat = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchRoom = async() =>{
      try {
        const res = await axios.get(`/rooms?status=1`);
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchService = async() =>{
      try {
        const res = await axios.get(`/items`, document.getElementById("Weight").value);
        setRightItems(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if(cat === "orders"){
      fetchRoom();
      fetchService();
    }    
  }, [cat]);

  const serviceColumns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 50,
      renderCell: (param) => {
        return (
          <div onClick={() => handleAdd(param.row.id)}>{param.row.id}</div>
        )
      }},
    { 
      field: "name", 
      headerName: "Name", 
      width: 230,
      renderCell: (param) => {
        return (
          <div onClick={() =>handleAdd(param.row.id)}>{param.row.name}</div>
        )}
    },
    { 
      field: "attr_name", 
      headerName: "Attribute", 
      width: 230,
      renderCell: (param) => {
        return (
          <div onClick={() =>handleAdd(param.row.id)}>{param.row.attr_name}</div>
        )}
    }
  ];

  const handleAdd = (id) => {
      var item = rightItems.find(((i) => i.id == id)); 
      var isUnderfined = true;
      for(var i of leftItems){
          if(i.id != item.id) 
              continue;
          
          if(i.quatity != null){
              i.quatity += 1;
              isUnderfined = false;
          }
      }
      if(isUnderfined){
          var i = item;
          i.quatity = 1;
          // const fetchPrice = async e=> {
          //   e.preventDefault();
          //   try{             
          //     const res = await axios.get("")
          //   }catch (error){

          //   }
          //   fetchPrice();
          // }
          setLeftItems(leftItems.concat(i));
      }
      else {
          setLeftItems(leftItems.concat({"action": "update"}));
          setLeftItems(leftItems.filter((i) => i.action == null));
      }
      console.log(leftItems);
  }
  const handleDelete = (id) =>{
      var item = leftItems.find(((i) => i.id == id));
      var isGreaterOne = item.quatity > 1;
      if(isGreaterOne){
          item.quatity -= 1;
          setLeftItems(leftItems.concat({"action": "update"}));
          setLeftItems(leftItems.filter((i) => i.action == null));
      }
      else {
          setLeftItems(leftItems.filter((i) => i.id != id));
      }
      console.log(leftItems);
  }
  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      let inputValues;
      switch(cat){
        case "orders":
          const resCustomer = await axios.post(`/customers`, {"name": document.getElementById("Customer").value});
          inputValues = {
            "customer_id": resCustomer.data.id,
            "staff_id": currentAdmin.id,
            "room_id": document.getElementById("Room").value,
            "items": leftItems,
        };
          break;
        case "services":
          break;
        case "users":
          break;
        default:
          break; 
      }
      console.log(inputValues);
      await axios.post(`/${cat}`, inputValues);
      navigate(`/${cat}`);
      window.alert("Insert successfully");
    } catch (error) {
      window.alert("Error");
      console.log(error);
    }
  }

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
                <div className="formInput" id={input.id}>
                  <label>{input.label}</label>
                  {input.type !== "select"
                    ? <input type={input.type} id={input.label} placeholder={input.placeholder} step={input.step} min={input.min}/>
                    : <select>
                      {rooms.map((i)=>(
                        <option id={input.label} value={i.id}>{i.name}</option>
                      ))}
                    </select>
                  }
                </div>
              ))}
              {cat === "orders" &&
                <div className="items">
                  <label>Items</label>
                  <div className="widgets">
                    <div className="formInput">                    
                      <DataGrid
                        className="datagrid"
                        rows={rightItems}
                        columns={serviceColumns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                      />
                    </div>
                    <div className="orderItems">                    
                      <ul>
                        {leftItems.map((item) => (
                          <li data-order={item.id}>
                            <div className="leftItem">
                                <span>{item.name}</span>
                            </div>
                            <div className="rightItem">
                                <span onClick={() => handleDelete(item.id)}>-</span>
                                <span>{item.quatity}</span>
                                <span onClick={() => handleAdd(item.id)}>+</span>
                            </div>                                
                          </li>                        
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              }
              <button className="submit" onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;