import { base } from "./base";
import { req } from "./common";

export const registerApi = async (data) => {
  return await req("POST", `${base}/users/register`, data, "");
};

export const loginApi = async (data) => {
  return await req("POST", `${base}/users/login`, data, "");
};

export const updateProfile = async (body, headers, id) => {
  return await req("PUT", `${base}/users/updateProfile/${id}`, body, headers);
};

export const addProject = async (body, headers) => {
  console.log("hi");
  return await req("post", `${base}/users/addProject`, body, headers);
};

export const getUserProjects = async (header, id) => {
  return await req("GET", `${base}/users/getUserProjects/${id}`, "", header);
};

export const getAllProjects = async (searchData) => {
  return await req(
    "GET",
    `${base}/users/getAllProjects?search=${searchData}`,
    "",
    ""
  );
};

export const getHomeProjects = async () => {
  return await req("GET", `${base}/users/getHomeProjects`, {}, "");
};

export const updateProject = async (id, body, header) => {
  return await req("PUT", `${base}/users/editProject/${id}`, body, header);
};

export const dltProject = async (id, header) => {
  return await req("DELETE", `${base}/users/deleteProject/${id}`, {}, header);
};
