import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu"
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";

const Single = () => {    
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);            
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [postId]);

    const handDelete = async() => {
        try {
            await axios.delete(`/posts/${postId}`);
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
            <img src={`../upload/${post.img}`} alt="" />  
                <div className="user">
                    {post.userImg ? 
                    (<img src={`../upload/${post.img}`} alt="" />) : 
                    (<img src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />) 
                    }
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {(currentUser?.username === post.username) && (
                    <div className="edit">
                        <Link to={`/write?edit=2`} state={post}>
                            <img src={Edit} alt="" />
                        </Link>      
                        <img onClick={handDelete} src={Delete} alt="" />
                    </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                {getText(post.desc)}
            </div>            
            <Menu cat={post.cat}/>
        </div>
    )
}

export default Single;