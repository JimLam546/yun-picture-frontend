import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '@/request/request'",
  schemaPath: 'http://localhost:8080/v2/api-docs?group=test1',
  serversPath: './src',
})