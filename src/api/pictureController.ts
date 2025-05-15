// @ts-ignore
/* eslint-disable */
import request from '@/request/request'

/** 删除图片 POST /picture/delete */
export async function deleteByIdUsingPost(body: API.Pinyin_2, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/picture/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 编辑图片信息 POST /picture/edit */
export async function editPictureByIdUsingPost(
  body: API.PictureEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/picture/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片信息（管理员） POST /picture/get */
export async function getPictureByIdUsingPost(
  body: API.Pinyin_6,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePicture_>('/picture/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页获取图片列表（管理员） POST /picture/get/page */
export async function getPictureListByPageUsingPost(
  body: API.Pinyin_6,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePicture_>('/picture/get/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片信息 POST /picture/get/vo */
export async function getPictureVoByIdUsingPost(
  body: API.Pinyin_6,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVO_>('/picture/get/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片列表 POST /picture/getVO/page/cache */
export async function getPictureVoListByPageWithCacheUsingPost(
  body: API.Pinyin_6,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePictureVO_>('/picture/getVO/page/cache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 图片审核（管理员） POST /picture/review */
export async function doPictureReviewUsingPost(
  body: API.Pinyin_4,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/picture/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改图片信息（管理员） POST /picture/update */
export async function updateByIdUsingPost(body: API.Pinyin_5, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/picture/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片 POST /picture/upload */
export async function uploadPictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.BaseResponsePictureVO_>('/picture/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}

/** 批量上传内容图片 POST /picture/upload/batch */
export async function uploadPictureByBatchUsingPost(
  body: API.PictureUploadByBatchRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>('/picture/upload/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片(URL) POST /picture/upload/url */
export async function uploadPictureByUrlUsingPost(
  body: API.Pinyin_3,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVO_>('/picture/upload/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
