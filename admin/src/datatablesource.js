export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Username",
    width: 140,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img != null ? params.row.img : "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} 
          alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Full name",
    width: 230,
    renderCell: (params) => {
      return (
        <div >
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status == 1 ? "active" : "passive"}`}>
          {params.row.status == 1 ? "active" : "passive"}
        </div>
      );
    },
  },
];

// temporary rows
export const userRows = [
  {
    id: 1,
    name: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    username: 35,
  },
  {
    id: 2,
    name: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    username: 42,
  },
  {
    id: 3,
    name: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    username: 45,
  },
  {
    id: 4,
    name: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    username: 16,
  },
  {
    id: 5,
    name: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    username: 22,
  },
  {
    id: 6,
    name: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    username: 15,
  },
  {
    id: 7,
    name: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    username: 44,
  },
  {
    id: 8,
    name: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    username: 36,
  },
  {
    id: 9,
    name: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    username: 65,
  },
  {
    id: 10,
    name: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    username: 65,
  },
];

export const serviceColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img != null ? params.row.img : "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} 
          alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "requirement",
    headerName: "Requirement",
    width: 230,
  },
  // {
  //   field: "weight",
  //   headerName: "Weight",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithWei">
  //         <span className="value">{params.row.weight} kg</span>
  //       </div>
  //     );
  //   },
  // },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status == "1" ? "active" : "passive"}`}>
          {params.row.status == "1" ? "active" : "passive"}
        </div>
      );
    },
  },
];

//temporary data
export const serviceRows = [
  {
    id: 1,
    name: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    requirement: "1snow@gmail.com",
    weight: 35,
  },
  {
    id: 2,
    name: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "2snow@gmail.com",
    status: "passive",
    weight: 42,
  },
  {
    id: 3,
    name: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "3snow@gmail.com",
    status: "pending",
    weight: 45,
  },
  {
    id: 4,
    name: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "4snow@gmail.com",
    status: "active",
    weight: 16,
  },
  {
    id: 5,
    name: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "5snow@gmail.com",
    status: "passive",
    weight: 22,
  },
  {
    id: 6,
    name: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "6snow@gmail.com",
    status: "active",
    weight: 15,
  },
  {
    id: 7,
    name: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "7snow@gmail.com",
    status: "passive",
    weight: 44,
  },
  {
    id: 8,
    name: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "8snow@gmail.com",
    status: "active",
    weight: 36,
  },
  {
    id: 9,
    name: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "snow@gmail.com",
    status: "pending",
    weight: 65,
  },
  {
    id: 10,
    name: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    requirement: "snow@gmail.com",
    status: "active",
    weight: 65,
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customer_id",
    headerName: "Customer Id",
    width: 140,
  },
  {
    field: "staff_id",
    headerName: "Staff Id",
    width: 230,
    renderCell: (params) => {
      return (
        <div>
          {params.row.staff_id}
        </div>
      );
    },
  },
  {
    field: "room_id",
    headerName: "Room Id",
    width: 230,
    renderCell: (params) => {
      return (
        <div>
          {params.row.room_id ? params.row.room_id :"Not filled out"}
        </div>
      );
    },
  },
  {
    field: "order_status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.order_status == 1 ? "active" : "passive"}`}>
          {params.row.order_status == 1 ? "Paid" : "Unpaid"}
        </div>
      );
    },
  },
];

export const customerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Full name",
    width: 230,
    renderCell: (params) => {
      var imgUrl;
      switch(params.row.gender){
        case "male":
          imgUrl = "https://t4.ftcdn.net/jpg/01/20/10/39/360_F_120103906_MNhlpXOPI3xKidkvnhAhMWc7MwfktVf6.jpg";
          break;
        case "female":
          imgUrl = "https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk=";
          break;
        default: 
          imgUrl = "https://www.citypng.com/public/uploads/preview/png-red-question-symbol-mark-icon-11664604913fofuexjtok.png"
        break;
      }
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={imgUrl} 
          alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 190,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "status",
    headerName: "status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status == 1 ? "active" : "passive"}`}>
          {params.row.status == 1 ? "active" : "passive"}
        </div>
      );
    },
  },
]