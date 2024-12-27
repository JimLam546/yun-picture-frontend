declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    description?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    description?: string
  }

  type BaseResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
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

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type PageUserVO_ = {
    current?: number
    pages?: number
    records?: UserVO[]
    size?: number
    total?: number
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

  type UserAddRequest = {
    avatarUrl?: string
    email?: string
    gender?: number
    phone?: string
    profile?: string
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

  type UserQueryRequest = {
    createTime?: string
    current?: number
    email?: string
    gender?: number
    id?: number
    isValid?: number
    pageSize?: number
    phone?: string
    userAccount?: string
    userRole?: string
    username?: string
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
