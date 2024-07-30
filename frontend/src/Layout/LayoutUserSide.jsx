import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCartItemApi } from "../redux/slices/cartSlice";
import { getAllCategoryApi } from "../redux/slices/categorySlice";
import { getAllOrderApi } from "../redux/slices/orderSlice.js";
import { getAllProductsApi } from "../redux/slices/productSlice";
import Routers from "../routers/RoutersUserSide";
import Footer from "../userSide/components/Footer/Footer";
import Header from "../userSide/components/Header/Header";
const LayoutUserSide = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGetAllProductsApi = async () => {
            await dispatch(getAllProductsApi());
            await dispatch(getAllCategoryApi());
            await dispatch(getAllOrderApi());
            await dispatch(getAllCartItemApi());
        };

        fetchGetAllProductsApi();
    }, []);
    return (
        <>
            <Header />
            <div style={{ minHeight: "600px" }}>
                <Routers />
            </div>
            <Footer />
        </>
    );
};

export default LayoutUserSide;
