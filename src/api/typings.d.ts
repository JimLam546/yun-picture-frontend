declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    description?: string
  }

  type BaseResponseInt_ = {
    code?: number
    data?: number
    description?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    description?: string
  }

  type BaseResponsePagePicture_ = {
    code?: number
    data?: PagePicture_
    description?: string
  }

  type BaseResponsePagePictureVO_ = {
    code?: number
    data?: PagePictureVO_
    description?: string
  }

  type BaseResponsePageSpaceVO_ = {
    code?: number
    data?: PageSpaceVO_
    description?: string
  }

  type BaseResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
    description?: string
  }

  type BaseResponsePicture_ = {
    code?: number
    data?: Picture
    description?: string
  }

  type BaseResponsePictureVO_ = {
    code?: number
    data?: PictureVO
    description?: string
  }

  type BaseResponseSpaceVO_ = {
    code?: number
    data?: SpaceVO
    description?: string
  }

  type BaseResponseUser_ = {
    code?: number
    data?: User
    description?: string
  }

  type BaseResponseUserVO_ = {
    code?: number
    data?: UserVO
    description?: string
  }

  type downloadUsingPOSTParams = {
    /** fileName */
    fileName?: string
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVO_ = {
    current?: number
    pages?: number
    records?: PictureVO[]
    size?: number
    total?: number
  }

  type PageSpaceVO_ = {
    current?: number
    pages?: number
    records?: SpaceVO[]
    size?: number
    total?: number
  }

  type PageUserVO_ = {
    current?: number
    pages?: number
    records?: UserVO[]
    size?: number
    total?: number
  }

  type Picture = {
    category?: string
    compressedUrl?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
    tags?: string
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    userId?: number
  }

  type PictureEditRequest = {
    /** 分类 */
    category?: string
    /** 图片ID */
    id: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 空间ID */
    spaceId?: number
    /** 标签 */
    tags?: string[]
  }

  type PictureUploadByBatchRequest = {
    count?: number
    searchText?: string
  }

  type PictureVO = {
    category?: string
    compressedUrl?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    name?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    spaceId?: number
    tags?: string[]
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    user?: UserVO
    userId?: number
  }

  type Pinyin__ = {
    createTime?: string
    /** 当前页 */
    current?: number
    email?: string
    gender?: number
    id?: number
    isValid?: number
    /** 页大小 */
    pageSize?: number
    phone?: string
    userAccount?: string
    userRole?: string
    username?: string
  }

  type Pinyin_2 = {
    /** ID */
    id: number
    /** 空间ID */
    spaceId?: number
  }

  type Pinyin_3 = {
    /** 文件地址 */
    fileUrl?: string
    /** 图片名称 */
    id?: number
    spaceId?: number
  }

  type Pinyin_4 = {
    id?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewerId?: number
  }

  type Pinyin_5 = {
    /** 分类 */
    category?: string
    /** 图片ID */
    id: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 标签 */
    tags?: string[]
  }

  type Pinyin_6 = {
    /** 分类 */
    category?: string
    /** 当前页 */
    current?: number
    /** 图片ID */
    id?: number
    /** 页大小 */
    pageSize?: number
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比例 */
    picScale?: number
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 图片名称和名称的模糊查询 */
    searchText?: string
    /** 标签（JSON 数组） */
    tags?: string[]
    /** 创建用户 id */
    userId?: number
  }

  type Pinyin_7 = {
    /** 登录头像 */
    avatarUrl?: string
    /** 邮箱 */
    email?: string
    /** 性别：1男 0女 */
    gender?: number
    /** 电话 */
    phone?: string
    /** 个人简介 */
    profile?: string
    /** 登录账号 */
    userAccount: string
    /** 密码 */
    userPassword: string
    /** 角色 */
    userRole?: string
    /** 昵称 */
    username: string
  }

  type Pinyin_8 = {
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
  }

  type Pinyin_9 = {
    /** 当前页 */
    current?: number
    /** 空间ID */
    id?: number
    /** 页大小 */
    pageSize?: number
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
    /** 用户ID */
    userId?: number
  }

  type SpaceAddRequest = {
    spaceLevel?: number
    spaceName?: string
  }

  type SpaceVO = {
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    totalCount?: number
    totalSize?: number
    user?: UserVO
    userId?: number
  }

  type uploadPictureUsingPOSTParams = {
    /** 文件地址 */
    fileUrl?: string
    /** 图片名称 */
    id?: number
    spaceId?: number
  }

  type User = {
    avatarUrl?: string
    createTime?: string
    email?: string
    gender?: number
    id?: number
    isDelete?: number
    isValid?: number
    phone?: string
    profile?: string
    updateTime?: string
    userAccount?: string
    userPassword?: string
    userRole?: string
    username?: string
  }

  type UserDeleteRequest = {
    id?: number
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserRegisterRequest = {
    checkPassword?: string
    userAccount?: string
    userPassword?: string
    username?: string
  }

  type UserUpdateRequest = {
    avatarUrl?: string
    id?: number
    isValid?: number
    profile?: string
    userRole?: string
    username?: string
  }

  type UserVO = {
    avatarUrl?: string
    createTime?: string
    email?: string
    gender?: number
    id?: number
    phone?: string
    profile?: string
    userAccount?: string
    userRole?: string
    username?: string
  }
}
