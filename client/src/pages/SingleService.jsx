import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const SingleService = () => {    
    const [service, setService] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const serviceId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const res = await axios.get(`/services/${serviceId}`);
                setService(res.data);            
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [serviceId]);

    const handDelete = async() => {
        try {
            await axios.delete(`/services/${serviceId}`);
            navigate("/"); 
        } catch (error) {
            console.log(error);
        }
    }

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;        
    }

    return (
        <div className="single">
            <div className="content">
            <img src={`../upload/${service.img}`} alt="" />  
                <div className="user">
                    {service.userImg ? 
                    (<img src={`../upload/${service.img}`} alt="" />) : 
                    (<img src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />) 
                    }
                    <div className="info">
                        <span>{service.username}</span>
                    </div>
                    {(currentUser?.username) && (
                    <div className="edit">
                        <Link to={`/write?edit=2`} state={service}>
                            <img src={Edit} alt="" />
                        </Link>      
                        <img onClick={handDelete} src={Delete} alt="" />
                    </div>
                    )}
                </div>
                <h1>{service.title}</h1>
                {getText(service.desc)}
            </div>
        </div>
    )
}

export default SingleService;