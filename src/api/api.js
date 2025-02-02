import {get, post, upload_post} from "./http"

export function API_Login(params, doSuccess) {
    post("/remote/grade_feedback/api/login", params, doSuccess)
}

export function API_UpdatePassWord(params, doSuccess, doFailure) {
    post("/remote/grade_feedback/api/updatePassword", params, doSuccess, doFailure)
}

export function API_FeedBackList(data, doSuccess, doFailure) {
    post("/remote/grade_feedback/api/feedBackList", data, doSuccess, doFailure)
}

export function API_FeedBack(data, doSuccess, doFailure) {
    post("/remote/grade_feedback/api/feedback", data, doSuccess, doFailure)
}

export function API_CancelFeedBack(data, doSuccess, doFailure) {
    post("/remote/grade_feedback/api/cancelFeedBack", data, doSuccess, doFailure)
}

export function API_Test(data, doSuccess) {
    post("/remote/grade_feedback/api/test", data, doSuccess)
}

export function API_Upload(data, doSuccess) {
    upload_post("/remote/grade_feedback/api/upload", data, doSuccess)
}

export function API_ExamPuzzles(data, doSuccess) {
    get("/remote/student/api/examPuzzles", data, doSuccess)
}

export function API_ExamList(data, doSuccess) {
    get("/remote/student/api/examList", data, doSuccess)
}

export function API_SubmitExam(data, doSuccess) {
    post("/remote/student/api/submitExam", data, doSuccess)
}

export function API_ExamRecords(data, doSuccess) {
    get("/remote/student/api/examRecords", data, doSuccess)
}

export function API_IsTeacher(data, doSuccess) {
    get("/remote/grade_feedback/api/isTeacher", data, doSuccess)
}

export function API_CreateClass(data, doSuccess) {
    post("/remote/teacher/api/createClass", data, doSuccess)
}

export function API_QueryClasses(data, doSuccess) {
    get("/remote/teacher/api/queryClasses", data, doSuccess)
}

export function API_ClassList(data, doSuccess) {
    get("/remote/student/api/classList", data, doSuccess)
}

export function API_CheckSession(params, doSuccess, doFailure) {
    get("/remote/grade_feedback/api/checkSession",params,doSuccess, doFailure)
}