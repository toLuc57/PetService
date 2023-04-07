import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
    const  state = useLocation().state;
    const [value, setValue] = useState(state?.desc || null);
    const [title, setTitle] = useState(state?.title || null);
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || null);

    const navigate = useNavigate();

    const upload = async()=>{
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post(`/upload/`, formData);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async e=>{
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state ? await axios.put(`/posts/${state.id}`, {
                title, 
                desc:value, 
                img:file ? imgUrl : state.img,
                cat,
            })
            : await axios.post(`/posts/`, {
                title, 
                desc:value, 
                img:file ? imgUrl : "",
                cat,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    }

    if(cat == null){
        setCat("art");
    }

    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input style={{display: "none"}} type="file" name="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    {state ? (<p>{state.img}</p>)
                    : (file ? 
                        (<p>{file.name}</p>)
                        : (<p>No photos have been uploaded yet</p>))
                    }
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "cimema"} name="cat" value="cimema" id="cimema" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="cimema">Cimema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="food">Food</label>
                    </div>                    
                </div>
            </div>
        </div>
    )
}


export default Write;