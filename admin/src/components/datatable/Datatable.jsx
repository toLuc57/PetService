import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { 
  userColumns,
  serviceColumns, } 
  from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Datatable = ({type}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async()=>{
      switch(type){
        case 'users':
          setColumns(userColumns.concat(actionColumn));
          var res = await axios.get("users");
          setData(res.data);
          break;
        case 'services':
          setColumns(serviceColumns.concat(actionColumn));
          var res = await axios.get("services");
          setData(res.data);  
          break;
        case 'products':
          setColumns(userColumns.concat(actionColumn));
          var res = await axios.get("services");
          setData(res.data);
          break;
        default:
          break;
      }
    }
    fetchData();
  }, [type]);

  let db;
  switch(type){
    case 'users':
      db = {
        datatableTitle: "Add New User",
        linkName: "Add User"
      }
      break;
    case 'services':
      db = {
        datatableTitle: "Add New Services",
        linkName: "Add Service"
      }
      break;
    case 'products':
      db = {
        datatableTitle: "Add New Product",
        linkName: "Add Product"
      }
      break;
    default:
      break;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {db.datatableTitle}
        <Link to="new" className="link">
        {db.linkName}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
