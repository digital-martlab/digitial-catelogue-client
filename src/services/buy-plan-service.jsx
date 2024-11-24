import { apiRequest } from "@/lib/axios"
import apiAsyncHandle from "@/lib/catch-async-api"
import { enpoints } from "@/lib/endpoints"

export const createOrderFn = apiAsyncHandle(async (payload) => {
    return apiRequest.post(enpoints.home.buy_plan_order, payload)
})

export const verifyOrderFn = apiAsyncHandle(async (payload) => {
    return apiRequest.post(enpoints.home.buy_plan_verify, payload)
})
