import React from "react";

const Service =()=>{
    const attributes = [
        "Lông ngắn",
        "Lông dài"
    ]

    const items = [{
        id: 1,
        name: "Dịch vụ tắm spa",
        attributes: {
            "Lông ngắn": 100,
            "Lông dài": 140
        },           
        weight: "5",
    },    
    {
        id: 2,
        name: "Dịch vụ tắm spa",
        attributes: {
            "Lông ngắn": 150,
            "Lông dài": 200
        },
        weight: "10",
    },
    ];

    // const getText = (html)=>{
    //     const doc = new DOMParser().parseFromString(html, "text/html");
    //     return doc.body.textContent;        
    // }

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
                <h1>Bảng giá dịch vụ</h1>
                <div className="table">
                    <table>
                    <tr>
                        <th>Chó</th>
                        {attributes.map(attribute => (
                            <th>{attribute}</th>
                        ))}
                    </tr>
                    {items.map(item => (
                        <tr>
                            <td>&lt;{item.weight}kg</td>
                            {attributes.map(attribute => (
                                <td>{item.attributes[`${attribute}`]}.000đ</td>
                            ))}
                        </tr>
                    ))}                
                    </table>
                    <table>
                    <tr>
                        <th>Mèo</th>
                        {attributes.map(attribute => (
                            <th>{attribute}</th>
                        ))}
                    </tr>
                    {items.map(item => (
                        <tr>
                            <td>&lt;{item.weight}kg</td>
                            {attributes.map(attribute => (
                                <td>{item.attributes[`${attribute}`]}.000đ</td>
                            ))}
                        </tr>
                    ))}                
                    </table>
                </div>
            </div>            
        </div>
    )
}

export default Service;