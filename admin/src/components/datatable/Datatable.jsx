import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { 
  userColumns,
  serviceColumns,
  orderColumns,
} 
  from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Datatable = ({type}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleDelete = async(id) => {
    try {
        await axios.delete(`/${type}/${id}`);
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/${type}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Change status
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
          break;
        case 'services':
          setColumns(serviceColumns.concat(actionColumn));
          break;
        // case 'products':
        //   setColumns(productColumns.concat(actionColumn));          
        //   break;
        case 'orders':
          setColumns(orderColumns.concat(actionColumn));
        default:
          break;
      }
      var res = await axios.get(`${type}`);
      setData(res.data);
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
    case 'orders':
      db = {
        datatableTitle: "Add New Order",
        linkName: "Add Order"
      }
      break;
    default:
      break;
  }

  console.log(data);

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
