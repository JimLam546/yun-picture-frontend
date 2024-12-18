// @ts-ignore
/* eslint-disable */
import request from '@/request/request'

/** hello GET /hello */
export async function helloUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.helloUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<string>('/hello', {
    method: 'GET',
    params: {
      // name has a default value: unknown user
      name: 'unknown user',
      ...params,
    },
    ...(options || {}),
  })
}

/** hello PUT /hello */
export async function helloUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.helloUsingPUTParams,
  options?: { [key: string]: any }
) {
  return request<string>('/hello', {
    method: 'PUT',
    params: {
      // name has a default value: unknown user
      name: 'unknown user',
      ...params,
    },
    ...(options || {}),
  })
}

/** hello POST /hello */
export async function helloUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.helloUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<string>('/hello', {
    method: 'POST',
    params: {
      // name has a default value: unknown user
      name: 'unknown user',
      ...params,
    },
    ...(options || {}),
  })
}

/** hello DELETE /hello */
export async function helloUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.helloUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<string>('/hello', {
    method: 'DELETE',
    params: {
      // name has a default value: unknown user
      name: 'unknown user',
      ...params,
    },
    ...(options || {}),
  })
}

/** hello PATCH /hello */
export async function helloUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.helloUsingPATCHParams,
  options?: { [key: string]: any }
) {
  return request<string>('/hello', {
    method: 'PATCH',
    params: {
      // name has a default value: unknown user
      name: 'unknown user',
      ...params,
    },
    ...(options || {}),
  })
}

/** html GET /html */
export async function htmlUsingGet(options?: { [key: string]: any }) {
  return request<string>('/html', {
    method: 'GET',
    ...(options || {}),
  })
}

/** html PUT /html */
export async function htmlUsingPut(options?: { [key: string]: any }) {
  return request<string>('/html', {
    method: 'PUT',
    ...(options || {}),
  })
}

/** html POST /html */
export async function htmlUsingPost(options?: { [key: string]: any }) {
  return request<string>('/html', {
    method: 'POST',
    ...(options || {}),
  })
}

/** html DELETE /html */
export async function htmlUsingDelete(options?: { [key: string]: any }) {
  return request<string>('/html', {
    method: 'DELETE',
    ...(options || {}),
  })
}

/** html PATCH /html */
export async function htmlUsingPatch(options?: { [key: string]: any }) {
  return request<string>('/html', {
    method: 'PATCH',
    ...(options || {}),
  })
}

/** saveUser GET /save_user */
export async function saveUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveUserUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<string>('/save_user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** saveUser PUT /save_user */
export async function saveUserUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveUserUsingPUTParams,
  options?: { [key: string]: any }
) {
  return request<string>('/save_user', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** saveUser POST /save_user */
export async function saveUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveUserUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<string>('/save_user', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** saveUser DELETE /save_user */
export async function saveUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveUserUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<string>('/save_user', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** saveUser PATCH /save_user */
export async function saveUserUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveUserUsingPATCHParams,
  options?: { [key: string]: any }
) {
  return request<string>('/save_user', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** user GET /user */
export async function userUsingGet(options?: { [key: string]: any }) {
  return request<API.User>('/user', {
    method: 'GET',
    ...(options || {}),
  })
}

/** user PUT /user */
export async function userUsingPut(options?: { [key: string]: any }) {
  return request<API.User>('/user', {
    method: 'PUT',
    ...(options || {}),
  })
}

/** user POST /user */
export async function userUsingPost(options?: { [key: string]: any }) {
  return request<API.User>('/user', {
    method: 'POST',
    ...(options || {}),
  })
}

/** user DELETE /user */
export async function userUsingDelete(options?: { [key: string]: any }) {
  return request<API.User>('/user', {
    method: 'DELETE',
    ...(options || {}),
  })
}

/** user PATCH /user */
export async function userUsingPatch(options?: { [key: string]: any }) {
  return request<API.User>('/user', {
    method: 'PATCH',
    ...(options || {}),
  })
}
