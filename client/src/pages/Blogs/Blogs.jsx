import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";

const Blog = () => {
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;

    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const res = await axios.get(`/posts${cat}`);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [cat]);

    // const posts = [{
    //     id: 1,
    //     title: "1st title",
    //     desc: "Lorem",
    //     img:"https://images.pexels.com/photos/15327232/pexels-photo-15327232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // },
    // {
    //     id: 2,
    //     title: "2nd title",
    //     desc: "Lorem",
    //     img:"https://images.pexels.com/photos/3489072/pexels-photo-3489072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // },
    // ];

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;        
    }

    return (
        <div className="blog">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <Link to={`#${post.img}`}>
                                <img src={`../upload/${post.img}`} alt="" />
                            </Link>                            
                        </div>
                        <div className="content">
                            <Link className="link" to={`${post.id}`}>
                                <h1>{post.title}</h1>
                                <p>{getText(post.desc)}</p>
                                <button>Read more...</button>
                            </Link>                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog;