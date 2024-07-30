import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";
import {
    editProductApi,
    getAllProductsApi,
} from "../../../redux/slices/productSlice";

export default function EditProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const editProduct = async (data) => {
        const result = await editProductApi(data);
        if (result.status === 200) {
            toast.success("Chỉnh sửa sản phẩm thành công!");
            dispatch(getAllProductsApi());
            navigate("/admin/products");
        } else {
            toast.success("Chỉnh sửa sản phẩm thất bại!");
        }
    };
    return (
        <div className="container" style={{ padding: "0px 60px" }}>
            <h2 className="">Chỉnh sửa sản phẩm</h2>
            <FormProduct initialData={state} submitForm={editProduct} />
        </div>
    );
}
