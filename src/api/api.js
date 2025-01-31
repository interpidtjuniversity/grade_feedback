import {get, post, upload_post} from "./http"

export function API_Login(params, doSuccess) {
    post("/grade_feedback/api/login", params, doSuccess)
}

export function API_UpdatePassWord(params, doSuccess, doFailure) {
    post("/grade_feedback/api/updatePassword", params, doSuccess, doFailure)
}

export function API_FeedBackList(data, doSuccess, doFailure) {
    post("/grade_feedback/api/feedBackList", data, doSuccess, doFailure)
}

export function API_FeedBack(data, doSuccess, doFailure) {
    post("/grade_feedback/api/feedback", data, doSuccess, doFailure)
}

export function API_CancelFeedBack(data, doSuccess, doFailure) {
    post("/grade_feedback/api/cancelFeedBack", data, doSuccess, doFailure)
}

export function API_Test(data, doSuccess) {
    post("/grade_feedback/api/test", data, doSuccess)
}

export function API_Upload(data, doSuccess) {
    upload_post("/grade_feedback/api/upload", data, doSuccess)
}

export function API_ExamPuzzles(data, doSuccess) {
    get("/student/api/examPuzzles", data, doSuccess)
}

export function API_ExamList(data, doSuccess) {
    get("/student/api/examList", data, doSuccess)
}

export function API_SubmitExam(data, doSuccess) {
    post("/student/api/submitExam", data, doSuccess)
}

export function API_ExamRecords(data, doSuccess) {
    get("/student/api/examRecords", data, doSuccess)
}

export function API_CreateClass(data, doSuccess) {
    post("/teacher/api/createClass", data, doSuccess)
}

export function API_QueryClasses(data, doSuccess) {
    get("/teacher/api/queryClasses", data, doSuccess)
}

export function API_ClassList(data, doSuccess) {
    get("/student/api/classList", data, doSuccess)
}

export function API_CheckSession(params, doSuccess, doFailure) {
    get("/grade_feedback/api/checkSession",params,doSuccess, doFailure)
}