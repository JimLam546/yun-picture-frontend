<template>
  <div class="upload-image-view">
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div class="header-left">
          <router-link to="/">
            <a-button type="primary" shape="circle">
              <template #icon><IconArrowLeft /></template>
            </a-button>
          </router-link>
          <span style="margin-left: 16px; font-size: 18px; font-weight: 500">上传图片</span>
        </div>
      </a-layout-header>
      <a-layout-content style="background: #fff; padding: 24px">
        <a-form
          :model="formState"
          :rules="rules"
          ref="formRef"
          layout="vertical"
          @finish="handleSubmit"
        >
          <a-row :gutter="24">
            <!-- 左侧图片预览区域 -->
            <a-col :span="12">
              <div class="upload-preview-container">
                <a-upload
                  v-model:file-list="fileList"
                  list-type="picture-card"
                  class="image-uploader"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="preview-image" />
                  <div v-else>
                    <IconPlus />
                    <div style="margin-top: 8px">点击上传</div>
                  </div>
                </a-upload>
              </div>
            </a-col>
            <!-- 右侧表单区域 -->
            <a-col :span="12">
              <a-form-item name="name" label="图片名称" required>
                <a-input v-model:value="formState.name" placeholder="请输入图片名称" />
              </a-form-item>

              <a-form-item name="description" label="图片简介">
                <a-textarea
                  v-model:value="formState.description"
                  placeholder="请输入图片简介"
                  :rows="4"
                />
              </a-form-item>

              <a-form-item name="category" label="分类" required>
                <a-select v-model:value="formState.category" placeholder="请选择分类">
                  <a-select-option value="绘画作品">绘画作品</a-select-option>
                  <a-select-option value="体育">体育</a-select-option>
                  <a-select-option value="风景">风景</a-select-option>
                  <a-select-option value="抽象">抽象</a-select-option>
                  <a-select-option value="城市">城市</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item name="tags" label="标签" required>
                <a-select
                  v-model:value="formState.tags"
                  mode="multiple"
                  placeholder="请选择标签"
                  :options="tagOptions"
                  :max-tag-count="5"
                />
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit" :loading="uploading" block>
                  上传图片
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  Layout as ALayout,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Button as AButton,
  Upload as AUpload,
  Select as ASelect,
  SelectOption as ASelectOption,
  Row as ARow,
  Col as ACol,
  message,
} from 'ant-design-vue'
import { ArrowLeftOutlined as IconArrowLeft, PlusOutlined as IconPlus } from '@ant-design/icons-vue'

interface FormState {
  name: string
  description: string
  category: string
  tags: string[]
  file: File | null
}

const router = useRouter()
const formRef = ref()
const fileList = ref([])
const imageUrl = ref<string>('')
const uploading = ref<boolean>(false)

const formState = reactive<FormState>({
  name: '',
  description: '',
  category: '',
  tags: [],
  file: null,
})

const rules = {
  name: [{ required: true, message: '请输入图片名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  tags: [{ required: true, message: '请选择至少一个标签', trigger: 'change' }],
}

const tagOptions = [
  { value: '绘画作品', label: '绘画作品' },
  { value: '体育', label: '体育' },
  { value: '风景', label: '风景' },
  { value: '抽象', label: '抽象' },
  { value: '城市', label: '城市' },
]

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件！')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('图片大小不能超过5MB！')
  }
  return isImage && isLt5M
}

const handleChange = (info: any) => {
  if (info.file.status === 'uploading') {
    return
  }
  if (info.file.status === 'done') {
    // 获取上传的文件
    formState.file = info.file.originFileObj
    // 创建本地预览URL
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      imageUrl.value = reader.result as string
    })
    reader.readAsDataURL(info.file.originFileObj)
  }
}

const handleSubmit = async (values: any) => {
  if (!formState.file) {
    message.error('请选择要上传的图片')
    return
  }

  try {
    uploading.value = true
    // TODO: 调用上传API
    // const formData = new FormData()
    // formData.append('file', formState.file)
    // formData.append('name', formState.name)
    // formData.append('description', formState.description)
    // formData.append('category', formState.category)
    // formData.append('tags', JSON.stringify(formState.tags))
    // const response = await uploadImage(formData)

    message.success('上传成功')
    router.push('/')
  } catch (error) {
    console.error('上传失败:', error)
    message.error('上传失败，请稍后重试')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-image-view {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.header-left {
  display: flex;
  align-items: center;
}

.upload-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background-color: #fafafa;
  border-radius: 8px;
  padding: 24px;
}

.image-uploader {
  width: 100%;
  height: 100%;
}

:deep(.ant-upload.ant-upload-select-picture-card) {
  width: 100%;
  height: 300px;
  margin: 0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
