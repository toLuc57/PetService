import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { 
  userColumns, 
  userRows, 
  serviceColumns, 
  serviceRows } 
  from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    switch(type){
      case 'users':
        setColumns(userColumns.concat(actionColumn));
        setData(userRows);  
        break;
      case 'services':
        setColumns(serviceColumns.concat(actionColumn));
        setData(serviceRows);  
        break;
      case 'products':
        setColumns(userColumns.concat(actionColumn));
        setData([]);
        break;
      default:
        break;
    }
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
