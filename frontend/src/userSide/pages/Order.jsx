import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
const Order = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined) {
        navigate("/login");
    }
    useEffect(() => {
        const id = user?.id;
        const result = async () => {
            const data = await getAllOrderAnUserService(id);
            if (data.data?.status === 200) {
                setOrder(data.data.data);
            }
        };
        result();
    }, []);
    return (
        <div>
            <h2
                
                className="order_h2"
            >
                Danh sách lịch sử mua hàng
            </h2>
            {order.length !== 0 ? (
                order.map((item, index) => {
                    return <OrderCard item={item} key={index} />;
                })
            ) : (
                // <div className="loading--api">
                //     <Spinner animation="grow" variant="success" />
                // </div>
                <div></div>
            )}
        </div>
    );
};

export default Order;
