import axios from '@/libs/api.request'



export const login = (userName, password,id) => {
  // const data = {
  //   userName,
  //   password
  // }
  return axios.request({
    url: 'api/user/login',
    params: {
      userName,
      password,
      id
    },
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'api/user/get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const selectById = (id) => {
  return axios.request({
    url: 'selectUserById',
    params: {
      id
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'api/user/logout',
    method: 'post'
  })
}
export const department = () => {
  return axios.request({
    url: 'api/department/department',
    method: 'get'
  })
}

export const selectUserById = (id) => {
  return axios.request({
    url: 'api/user/findByUserId/'+id,
    method: 'get',
  })
}

// 根据id删除一条消息
export const deleteUser = (id) => {
  return axios.request({
    url: 'api/user/deleteuser/'+id,
    method: 'delete'
  })
}

export const resetpwd = (id) => {
  return axios.request({
    url: 'api/user/resetpwd',
    params: {
      id:id,
      },
    method: 'post'
  })
}
export const modfypwd = (id,oldpwd,newpwd) => {
  return axios.request({
    url: 'api/user/modifypwd',
    params: {
      id:id,
      oldpwd:oldpwd,
      newpwd:newpwd
      },
    method: 'post'
  })
}

export const findusers = (userName,page,rows) => {
  return axios.request({
    url: 'api/user/users',
     params: {
      userName:userName,
    page:page,
    rows:rows,
    },
    method: 'get'
  })
}

// 保存
export const saveUserInfo = formData => {
  return axios.request({
    url: 'api/user/saveUser',
  data:formData,
    method: 'post'
  })
}


export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

