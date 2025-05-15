// @ts-ignore
/* eslint-disable */
import request from '@/request/request'

/** addSpace POST /space/add */
export async function addSpaceUsingPost(
  body: API.SpaceAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/space/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除空间 POST /space/delete */
export async function deleteByIdUsingPost1(body: API.Pinyin_2, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/space/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间信息（管理员） POST /space/get */
export async function getPictureByIdUsingPost1(
  body: API.Pinyin_9,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceVO_>('/space/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片列表 POST /space/getVO/page */
export async function getSpaceVoListByPageUsingPost(
  body: API.Pinyin_9,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpaceVO_>('/space/getVO/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateSpace POST /space/update */
export async function updateSpaceUsingPost(body: API.Pinyin_8, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/space/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
