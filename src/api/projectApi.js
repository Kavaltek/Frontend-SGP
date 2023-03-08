import axiosClient from "./axiosClient"

const projectApi = {
  create: params => axiosClient.post('project/create', params)
}
export default projectApi