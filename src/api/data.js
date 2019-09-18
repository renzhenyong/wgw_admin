import axios from '@/libs/api.request'

// 查询所有
export const findall = (str,name,page,rows) => {
  return axios.request({
    url: 'api/new/news',
     params: {
    type:str,
    name:name,
    page:page,
    rows:rows,
    },
    method: 'get'
  })
}
// 保存
export const saveNewsinfo = formData => {
  return axios.request({
    url: 'api/new/saveNews',
  data:formData,
    method: 'post'
  })
}
//根据newid获取一条新闻
export const selectNewById = (newid) => {
  return axios.request({
    url: 'api/new/findById/'+newid,
    // params: {
    //   id:newid
    //   },
    method: 'get'
  })
}
// 根据id删除一条消息
export const deleteNew = (id) => {
  return axios.request({
    url: 'api/new/delete/'+id,
    method: 'delete'
  })
}
// 审核新闻
export const verifyNew = (id,statu,reason) => {
  return axios.request({
    url: 'api/new/verify',
    params: {
      id:id,
      statu:statu,
      reason:reason,
      },
    method: 'post'
  })
}

export const add = () => {
  return axios.request({
    url: 'api/Adduser',
     params: {
      name:"aaa",
      age:12
    },
    method: 'post'
  })
}

export const del = () => {
  return axios.request({
    url: 'api/delete/'+2,
    method: 'delete'
  })
}

export const update = () => {
  return axios.request({
    url: 'api/update1',
    data:{
      id:3,
      name:"bbb",
      age:10
    },
    method: 'put'
  })
}


export const selectByNameLike = () => {
  return axios.request({
    url: 'api/findByNameLike/'+"b",
    method: 'get'
  })
}

export const selectUserById = (id) => {
  return axios.request({
    url: 'selectUserById',
    params: {
      id:1
    },
    method: 'get'
  })
}


export const menuList = () => {
  return axios.request({
    url: 'api/new/menu_percent',
    method: 'get'
  })
}


export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'upload',
    data: formData,
    method:'post'
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
