import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Service =()=>{
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

    // const services = [{
    //     id: 1,
    //     name: "1st title",
    //     desc: "Lorem",
    //     img:"https://images.pexels.com/photos/15327232/pexels-photo-15327232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     requirement: "require something 1",
    // },
    // {
    //     id: 2,
    //     name: "2nd title",
    //     desc: "Lorem",
    //     img:"https://images.pexels.com/photos/3489072/pexels-photo-3489072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     requirement: "require something 2",
    // },
    // ];

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;        
    }

    return(
        <div className="service">            
            <div className="content">
                <div className="title">
                    <h1>TẠI SAO NÊN THƯỜNG XUYÊN TẮM VỆ SINH & CẮT TỈA LÔNG CHO THÚ CƯNG ?</h1>
                </div>
                <div className="desc">
                    <ol>
                        <li> Giúp thú cưng phòng tránh bệnh tật</li>
                        <span>
                            Bộ lông có ý nghĩa rất lớn đối với động vật, việc chăm sóc bộ lông cho thú cưng của bạn là vấn đề cần được quan tâm và quan trọng không kém gì chế độ dinh dưỡng cho thú cưng. 
                        </span>
                        <li>Làm đẹp cho thú cưng</li>
                        <span>
                        Rất nhiều bạn trẻ hiện nay đã chọn cách tạo kiểu lông cho người bạn của mình trông thật đáng yêu, và ngộ nghĩnh. Và với những kiểu lông thật đặc biệt này mà chúng ta có những cuộc “dog show” thật nhiều “màu sắc”. Nhiều bạn còn làm tặng thú cưng của mình cả những bộ quần áo hết sức ngộ nghĩnh.
                        </span>
                        <li>Giữ cho thú cưng sạch sẽ hơn.</li>  
                        <span>
                        Những chú chó lông dài sẽ dễ bị bết lông; hay tình trạng vết bẩn bám sâu vào trong khiến việc làm sạch khó khăn hơn. Lông ngắn sẽ giúp thú cưng của bạn giảm được bụi bặm bám vào lông trong khi hoạt động; cũng như vui chơi.
                        </span>                      
                    </ol>
                </div>
            </div>
            <div className="cost">
                <h1>Các dịch vụ</h1>
                {services.map(service => (
                    <div className="item" key={service.id}>
                        <div className="img">
                            <Link to="/">
                            {service.img ? 
                            (<img src={`../upload/${service.img}`} alt="" />) : 
                            (<img src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />) 
                            }
                            </Link>                            
                        </div>
                        <div className="content">
                            {/* <Link className="link" to={`posts/${service.id}`}> */}
                                <h2>{service.name}</h2>
                            {/* </Link> */}
                            <p style={{color:"red"}}>{getText(service.requirement)}</p>
                            <p>{getText(service.desc)}</p>                            
                            <button onClick="#">Read more...</button>
                        </div>
                    </div>
                ))}               
            </div>            
        </div>
    )
}

export default Service;