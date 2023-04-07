import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({cat})=>{
    const [posts, setPosts] = useState([]);

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
    return(
        <div className="menu">
            <h1>Other post you may like</h1>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={post.img} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>
            ))}
        </div>        
    )
}

export default Menu;