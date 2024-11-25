import { apiRequest, multpartHeader } from "@/lib/axios"
import apiAsyncHandle from "@/lib/catch-async-api"
import { enpoints } from "@/lib/endpoints"

export const updateProfileFn = apiAsyncHandle(async (payload) => {
    return apiRequest.patch(enpoints.admin.profile, payload, {
        headers: multpartHeader
    })
})