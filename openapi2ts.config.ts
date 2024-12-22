import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '@/request/request'",
  schemaPath: 'http://localhost:8080/v2/api-docs?group=%E9%BB%98%E8%AE%A4%E5%88%86%E7%BB%84',
  serversPath: './src',
})
