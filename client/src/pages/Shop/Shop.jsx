import React from "react";
import {Link} from "react-router-dom";

const Shop = () => {
    const items = [{
        id: 1,
        name: "IRIS USA 3-Piece 35 Lbs / 45 Qt WeatherPro Airtight Pet Food Storage Container Combo with Scoop and Treat Box for Dog Cat and Bird Food, Keep Pests Out, Translucent Body, Easy Mobility, Blue Moon",
        price: '$ 36.99',
        img:"https://m.media-amazon.com/images/I/91t9Vo8dP6L._AC_SL1500_.jpg",
    },    
    {
        id: 2,
        name: "Furhaven Large Dog Bed Trail Pup Travel Pillow Mat w/ Stuff Sack, Washable - Aqua/Granite Gray, Large",
        price: '$ 26.99',
        img:"https://m.media-amazon.com/images/I/712dqab9xVL._AC_SL1500_.jpg",
    },
    ];

    return (
        <div className="shop">
            <div className="container">
                {items.map(item => (
                    <div className="item" key={item.id}>
                        <div className="img">
                            <Link to={`${item.img}`}>
                                <img src={`${item.img}`} alt="" />
                            </Link>                            
                        </div>
                        <div className="content">
                            <Link className="link" to={`/shop/${item.id}`}>
                                <h6>{item.name}</h6>
                            </Link>
                            <p><b>Price:</b> {item.price}</p>
                            <button onClick="#">Read more...</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop;