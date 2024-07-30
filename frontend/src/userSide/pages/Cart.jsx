import React, { useState } from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import {
    deleteCartItemApi,
    getAllCartItemApi,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { VND } from "../../utils/convertVND";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "antd";
import {
    decreaseItemService,
    increaseItemService,
} from "../../services/cartServices";

const Cart = () => {
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "pathImg",
            key: "pathImg",
            render: (value) => {
                return (
                    <img width={"100px"} height={"100px"} src={value} alt="1" />
                );
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (value) => {
                return <>{VND.format(value)}</>;
            },
        },
        {
            title: "Số lượng",
            key: "quantity",
            render: (render) => {
                return (
                    <div style={{ display: "flex" }}>
                        <button
                            className="btn--sub__addCart"
                            onClick={() => {
                                handleDecrease(render.id);
                            }}
                        >
                            <i className="ri-subtract-fill"></i>
                        </button>

                        <div className="btn--sub__count">
                            <p>{render.quantity}</p>
                        </div>
                        <button
                            className="btn--sub__addCart"
                            onClick={() => {
                                handleIncrease(render.id);
                            }}
                        >
                            <i className="ri-add-fill"></i>
                        </button>
                    </div>
                );
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (render) => {
                return (
                    <Button
                        ghost
                        danger
                        onClick={() => removeProductFromCart(render.id)}
                    >
                        Xóa
                    </Button>
                );
            },
        },
    ];
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined) {
        navigate("/login");
    }
    const [loadingDelete, setLoadingDelete] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const summary = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();

    const removeProductFromCart = (id) => {
        const fetchRemoveProductFromCartApi = async () => {
            setLoadingDelete(true);
            const result = await dispatch(deleteCartItemApi(id));
            if (result.status === 200) {
                toast.success("Xóa thành công!");
                setLoadingDelete(false);
                dispatch(getAllCartItemApi());
            }
        };

        fetchRemoveProductFromCartApi();
    };
    const handleIncrease = async (id) => {
        const result = await increaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };
    const handleDecrease = async (id) => {
        const result = await decreaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };
    return (
        <Helmet title="Cart">
            {loadingDelete ? (
                <Progress animated value="100" className="progress"></Progress>
            ) : (
                ""
            )}
            <CommonSection title="Giỏ hàng" />
            <section>
                <Container>
                    <Row>
                        <Col lg="9">
                            {cartItems.length === 0 ? (
                                <h2 className="fs-4 text-center">
                                    Không có mặt hàng nào được thêm vào giỏ hàng
                                </h2>
                            ) : (
                                // <table className="table bordered">
                                //     <thead>
                                //         <tr>
                                //             <th>Hình ảnh</th>
                                //             <th>Tên sản phẩm</th>
                                //             <th>Giá</th>
                                //             <th>Số lượng</th>
                                //             <th>Xóa</th>
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         {cartItems.map((item, index) => (
                                //             <Tr
                                //                 item={item}
                                //                 key={index}
                                //                 onRemoveProductFromCart={
                                //                     removeProductFromCart
                                //                 }
                                //             />
                                //         ))}
                                //     </tbody>
                                // </table>
                                <Table
                                    dataSource={cartItems}
                                    columns={columns}
                                />
                            )}
                        </Col>
                        <Col lg="3">
                            <div style={{ display: "flex" }}>
                                <h4>Tổng cộng: &nbsp;</h4>
                                <h6 className="d-flex align-items-center justify-content-between">
                                    <span className="fs-4 fw-bold">
                                        {VND.format(summary)}
                                    </span>
                                </h6>
                            </div>
                            <p className="fs-6 mt-2">
                                <i>
                                    *Thuế và phí vận chuyển sẽ được tính khi
                                    thanh toán
                                </i>
                            </p>
                            <div>
                                <button className="buy__btn w-100 ">
                                    <Link to="/checkout">Thanh toán</Link>
                                </button>
                                <button className="buy__btn w-100 mt-3">
                                    <Link to="/shop">Tiếp tục mua sắm</Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

const Tr = (props) => {
    const { item, onRemoveProductFromCart } = props;

    return (
        <tr>
            <td>
                <img src={item.pathImg} alt="#" />
            </td>
            <td>{item.name}</td>
            <td>{VND.format(item.price)}</td>
            <td>{item.quantity}</td>
            <td>
                <motion.span
                    whileTap={{ scale: 1.2 }}
                    onClick={() => onRemoveProductFromCart(item.id)}
                >
                    <i className="ri-delete-bin-line"></i>
                </motion.span>
            </td>
        </tr>
    );
};
export default Cart;
