import { showAlert } from "@/lib/catch-async-api";
import { getAllProductsFn, getFilteredProductsFn } from "@/services/store/store-service";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
    const [storeInfo, setStoreInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(1.9999);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");

    const getAllProducts = () => {
        getAllProductsFn({
            acc_id: storeInfo?.acc_id,
            params: {
                ...(selectedCategories !== 1.9999 && { ctg_id: selectedCategories })
            }
        })
            .then(({ data }) => {
                setProducts(data);
            });
    }

    const getFilterProducts = () => {
        getFilteredProductsFn({
            acc_id: storeInfo?.acc_id,
            params: {
                ...(selectedCategories !== 1.9999 && { ctg_id: selectedCategories }),
                search
            }
        })
            .then(({ data }) => {
                setFilteredProducts(data);
            });
    }

    useEffect(() => {
        if (storeInfo && categories)
            getAllProducts();
    }, [storeInfo]);

    useEffect(() => {
        let timer;
        if (storeInfo && categories)
            timer = setTimeout(getFilterProducts, 500);

        return () => clearTimeout(timer);
    }, [categories, selectedCategories, storeInfo, search]);


    const handleSetCartItem = (item) => {
        const isExist = cartItems.some((cart) => cart.product_id === item.product_id && cart.variant_id === item.variant_id);
        if (isExist) {
            return showAlert({ message: "Product is already present in cart." });
        }

        item.quantity = 1;
        const newCartItems = [item, ...cartItems];
        setCartItems(newCartItems);
        showAlert({ message: "Product added successfully." });
    };

    const handleQuantityChange = (productId, variant_id, quantity) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) => {
                if (item.product_id === productId && item.variant_id === variant_id) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const handelDeleteCartItem = (product_id, variant_id) => {
        const newCartItems = cartItems.filter((c) => {
            return !(c.product_id === product_id && c.variant_id === variant_id);
        });
        setCartItems(newCartItems);
    }

    return (
        <StoreContext.Provider value={{
            storeInfo,
            setStoreInfo,
            categories,
            setCategories,
            selectedCategories,
            setSelectedCategories,
            products,
            cartItems,
            handleSetCartItem,
            handleQuantityChange,
            handelDeleteCartItem,
            filteredProducts,
            search,
            setSearch,
            getAllProducts,
            getFilterProducts,
            setCartItems
        }}>
            {children}
        </StoreContext.Provider>
    );
}
