export const enpoints = {
    super_admin: {
        login: "/super-admin/login",
        store: "/super-admin/store",
        paid_status_update: "/super-admin/store/payment-status",
        pending_payment_store: "/super-admin/store/pending-payment-stores",
        dashboard: "/super-admin/dashboard",
        plan: "/super-admin/plan",
    },
    admin: {
        login: "/admin/login",
        category: "/admin/category",
        coupon: "/admin/coupon",
        password_change: "/admin/change-password",
        product: "/admin/product",
        gallery: "/admin/gallery",
        dashboard: "/admin/dashboard",
        theme: "/admin/theme",
        forgotPassword: "/admin/forgot-password",
        resetPassword: "/admin/reset-password"
    },
    store: {
        storeInfo: "/store",
        products: "/store/products",
        filteredProducts: "/store/filtered-products",
        coupon: "/store/coupon",
        order: "/store/order",
    },
    home: {
        contact: "/home/contact",
        buy_plan_order: "/buy-plan/order",
        buy_plan_verify: "/buy-plan/verify"
    }
}