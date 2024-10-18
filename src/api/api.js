import {get, post, upload_post} from "./http"

export function API_Login(params, doSuccess) {
    post("/grade_feedback/api/login", params, doSuccess)
}

export function API_Record_List(data, doSuccess) {
    post("/grade_feedback/api/recordList", data, doSuccess)
}

export function API_Test(data, doSuccess) {
    post("/grade_feedback/api/test", data, doSuccess)
}

export function API_Upload(data, doSuccess) {
    upload_post("/grade_feedback/api/upload", data, doSuccess)
}

export function API_CheckSession(params, doSuccess, doFailure) {
    get("/grade_feedback/api/checkSession",params,doSuccess, doFailure)
}