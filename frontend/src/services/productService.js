import requestApi from "../utils/requestApi";

export const getAllProductService = async () => {
    try {
        const respone = await requestApi({
            method: "get",
            url: "product/all",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getDetailService = async (id) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `product?id=${id}`,
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const deleteProduct = async (id) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `product/delete`,
            data: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            },
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};
export const addProductService = async (formData) => {
    try {
        const respone = await requestApi({
            url: "product/add",
            method: "post",
            data: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        return respone.data;
    }
    catch (error) {
        return error
    }
};

export const editProductService = (formData) => {
    return requestApi({
        url: `product/edit`,
        method: "put",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
    });
};

export const changeStatusProductService = (idProduct, status_number) => {
    return requestApi({
        url: `product/change_status/${idProduct}`,
        method: "put",
        data: { status_number }
    });
};
