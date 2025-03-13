import axios from "axios";

export async function AxiosRequest(url, method, headers, params) {

    return params ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params
    }) :
        axios({
            url: url,
            method: method,
            headers: headers,
            data: {}
        })
}
export const LoginDetails = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/login`, "POST", headers, data)
}

export const SignupDetails = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/signup`, "POST", headers, data)
}

export const RoleGetApiDetails = () => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/roles`, "GET", headers, {})
}

export const PostApiDetails = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users`, "POST", headers, data);
}

export const GetDetailsById = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "GET", headers, {})
}

export const DeleteApiDetails = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "DELETE", headers, {})
}

export const UpdateApiDetails = (data,id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "PATCH", headers, data)
}


export const Api = (apiname,recordsPerPage,page,column,order,filterinput) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&sort=${column}&orderby=${order}&name=${filterinput}`, "GET", headers, {})
}

export const FilterApi = (apiname,column,order,field,value,recordsPerPage,page) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?sort=${column}&orderby=${order}&${field}=${value}&limit=${recordsPerPage}&page=${page}`, "GET", headers, {})
}
export const SortingApi = (apiname,column,order,recordsPerPage,page,filterinput) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?sort=${column}&orderby=${order}&limit=${recordsPerPage}&page=${page}&name=${filterinput}`, "GET", headers, {})
}
export const SelectApi = (apiname,value) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?status=${value}`, "GET", headers, {})
}