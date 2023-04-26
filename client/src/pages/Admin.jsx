import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const res = await axios.get(`/services`);
                setServices(res.data);            
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent === "null" ? "" : doc.body.textContent;        
    }

    return (
        <div className="home">
            <div className="container">
                <div className="header">
                    <div className="title">
                        <h1>Pages for Admin</h1>
                    </div>
                    <div className="img">
                        <img src="https://images.pexels.com/photos/12106763/pexels-photo-12106763.jpeg?auto=compress&bri=5&cs=tinysrgb&fit=crop&h=500&w=2500" alt="" />
                    </div>
                </div>
                {services.map(service => (
                    <div className="item" key={service.id}>
                        <div className="img">
                            <Link to={`services/${service.id}`}>
                            {service.img ? 
                            (<img src={`../upload/${service.img}`} alt="" />) : 
                            (<img src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />) 
                            }
                            </Link>                            
                        </div>
                        <div className="content">
                            <Link className="link" to={`services/${service.id}`}>
                                <h2 style={{textTransform: "uppercase"}}>{service.name}</h2>
                            </Link>
                            <p style={{color:"red"}}>Requirement: {getText(service.requirement)}</p>
                            <p>Desc: {getText(service.desc)}</p>
                            <Link to={`services/${service.id}`}>
                                <button>Edit | Delete</button>
                            </Link>
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    )
}

export default Admin;