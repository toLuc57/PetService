import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const items = [{
        id: 1,
        title: "Mèo nhị thể",
        desc: 'Mèo nhị thể, còn có thể gọi là <i>mèo hai màu lông</i>, là một con mèo có lông trắng kết hợp với một số màu lông khác, ví dụ như màu đen hoặc đốm. Có nhiều mẫu lông khác nhau của mèo nhị sắc. Trường hợp mèo có số lượng đốm trắng từ ít đến trung bình, giới hạn ở mặt, bàn chân, cổ họng và ngực của một con mèo có lông hoàn toàn màu đen, chúng được biết đến ở Hoa Kỳ với tên gọi khác là mèo tuxedo.',
        img:"https://images.pexels.com/photos/3318215/pexels-photo-3318215.jpeg?auto=compress&cs=tinysrgb&w=600",
    },    
    {
        id: 2,
        title: "Tắm nắng cho mèo",
        desc: "Mèo, đặc biệt là mèo con rất cần được tắm nắng. Nên cho mèo tắm nắng ít nhất 30 phút mỗi ngày để đảm bảo sức khỏe. Nên cho mèo tắm nắng trước 11 giờ trưa, thời gian sau đó ánh nắng gắt rất có hại cho mèo. <br/>Nếu không có thời gian cho mèo tắm nắng thì nên mở cửa sổ cho ánh nắng tràn vào phòng.",
        img:"https://images.pexels.com/photos/2686914/pexels-photo-2686914.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    ];

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;        
    }

    return (
        <div className="home">
            <div className="container">
                <div className="header">
                    <div className="title">
                        <h1>React & Nodejs</h1>
                    </div>
                    <div className="img">
                        <img src="https://images.pexels.com/photos/12106763/pexels-photo-12106763.jpeg?auto=compress&bri=5&cs=tinysrgb&fit=crop&h=500&w=2500" alt="" />
                    </div>
                </div>
                {items.map(item => (
                    <div className="item" key={item.id}>
                        <div className="img">
                            <Link to="/">
                                <img src={`${item.img}`} alt="" />
                            </Link>                            
                        </div>
                        <div className="content">
                            {/* <Link className="link" to={`posts/${item.id}`}> */}
                                <h1>{item.title}</h1>
                            {/* </Link> */}
                            <p>{getText(item.desc)}</p>
                            <button onClick="#">Read more...</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;