import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8000/api",
});

const getMembersData = async () => {
    const response = await instance.get(`/members`);
    return response.data;
};

const getSelectMemberData = async (id) => {
    const response = await instance.get(`/members/${id}`);
    return response.data;
};

const getSolutionsData = async () => {
    const response = await instance.get(`/solutions`);
    return response.data;
};
const getSelectSolutionData = async (id) => {
    const response = await instance.get(`/solutions/${id}`);
    return response.data;
};

const postMembersData = async (memberData) => {
    const response = await instance.post(`/members`, memberData);
    return response.data;
};

const postSolutionsData = async (solutionData) => {
    const response = await instance.post(`/solutions`, solutionData);
    return response.data;
};

const putMembersData = async (memberData, id) => {
    const response = await instance.put(`/members/${id}`, memberData);
    return response.data;
};
const putSolutionsData = async (solutionData, id) => {
    const response = await instance.put(`/solutions/${id}`, solutionData);
    return response.data;
};

const deleteMemberData = async (id) => {
    const response = await instance.delete(`/members/${id}`);
    return response.data;
};
const deleteSolutionData = async (id) => {
    const response = await instance.delete(`/solutions/${id}`);
    return response.data;
};

export {
    getMembersData,
    getSelectMemberData,
    getSolutionsData,
    getSelectSolutionData,
    postMembersData,
    postSolutionsData,
    putMembersData,
    putSolutionsData,
    deleteMemberData,
    deleteSolutionData,
};
