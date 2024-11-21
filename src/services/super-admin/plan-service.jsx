import { apiRequest } from "@/lib/axios"
import apiAsyncHandle from "@/lib/catch-async-api"
import { enpoints } from "@/lib/endpoints"

export const getSuperAdminPlansFn = apiAsyncHandle(async () => {
    return apiRequest.get(enpoints.super_admin.plan)
})

export const postSuperAdminPlansFn = apiAsyncHandle(async (payload) => {
    return apiRequest.post(enpoints.super_admin.plan, payload)
})

export const patchSuperAdminPlansFn = apiAsyncHandle(async (payload) => {
    return apiRequest.patch(enpoints.super_admin.plan, payload)
})

export const deleteSuperAdminPlansFn = apiAsyncHandle(async (payload) => {
    return apiRequest.delete(enpoints.super_admin.plan, { data: payload })
})