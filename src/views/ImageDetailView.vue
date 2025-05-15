<template>
  <div class="image-detail-view">
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
          <span style="margin-left: 16px; font-size: 18px; font-weight: 500">图片详情</span>
        </div>
        <div class="header-right">
          <a-button type="primary" @click="handleDownload">下载图片</a-button>
        </div>
      </a-layout-header>
      <a-layout-content style="background: #fff; padding: 24px">
        <a-row :gutter="24">
          <!-- 左侧图片区域 -->
          <a-col :span="16">
            <div class="image-container">
              <img
                :src="imageDetail.url || imageDetail.compressedUrl || imageDetail.thumbnailUrl"
                :alt="imageDetail.name"
                class="detail-image"
              />
            </div>
          </a-col>
          <!-- 右侧信息区域 -->
          <a-col :span="8">
            <a-card :bordered="false" class="info-card">
              <h2 class="image-title">{{ imageDetail.name }}</h2>

              <div class="image-info-section">
                <div class="info-item">
                  <span class="info-label">作者：</span>
                  <span class="info-value">{{ imageDetail.author || '未知' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">简介：</span>
                  <span class="info-value">{{ imageDetail.description || '暂无简介' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">分类：</span>
                  <span class="info-value">{{ imageDetail.category || '未分类' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">格式：</span>
                  <span class="info-value">{{ imageDetail.format || '未知' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">分辨率：</span>
                  <span class="info-value">{{ imageDetail.resolution || '未知' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">大小：</span>
                  <span class="info-value">{{ formatFileSize(imageDetail.size) }}</span>
                </div>
              </div>

              <div class="image-tags">
                <span class="info-label">标签：</span>
                <div class="tags-container">
                  <a-tag
                    v-for="tag in imageDetail.tags"
                    :key="tag"
                    :color="getTagColor(tag)"
                    style="margin-right: 8px; margin-bottom: 8px"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
              </div>

              <div class="image-stats">
                <a-statistic-group>
                  <a-statistic title="点赞" :value="imageDetail.likes || 0">
                    <template #suffix>
                      <IconThumbUp />
                    </template>
                  </a-statistic>
                  <a-statistic title="收藏" :value="imageDetail.stars || 0">
                    <template #suffix>
                      <IconStar />
                    </template>
                  </a-statistic>
                  <a-statistic title="下载" :value="imageDetail.downloads || 0">
                    <template #suffix>
                      <IconDownload />
                    </template>
                  </a-statistic>
                </a-statistic-group>
              </div>

              <div class="action-buttons">
                <a-button type="primary" @click="handleLike" style="margin-right: 16px">
                  <template #icon><IconThumbUp /></template>
                  点赞
                </a-button>
                <a-button @click="handleStar" style="margin-right: 16px">
                  <template #icon><IconStar /></template>
                  收藏
                </a-button>
                <a-button type="primary" @click="handleShare">
                  <template #icon><IconShareAlt /></template>
                  分享
                </a-button>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Layout as ALayout,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  Row as ARow,
  Col as ACol,
  Card as ACard,
  Button as AButton,
  Tag as ATag,
  Statistic as AStatistic,
  message,
} from 'ant-design-vue'
import {
  HeartOutlined as IconThumbUp,
  StarOutlined as IconStar,
  DownloadOutlined as IconDownload,
  ShareAltOutlined as IconShareAlt,
  ArrowLeftOutlined as IconArrowLeft,
} from '@ant-design/icons-vue'
import { getPictureVoByIdUsingPost } from '@/api/pictureController'

interface ImageDetail {
  id: string
  name: string
  url: string
  compressedUrl?: string
  thumbnailUrl?: string
  author?: string
  description?: string
  category?: string
  format?: string
  resolution?: string
  size?: number
  tags: string[]
  likes: number
  stars: number
  downloads: number
}

const route = useRoute()
const imageId = route.params.id as string
const imageDetail = ref<ImageDetail>({
  id: '',
  name: '',
  url: '',
  tags: [],
  likes: 0,
  stars: 0,
  downloads: 0,
})

const getTagColor = (tag: string) => {
  const colors: { [key: string]: string } = {
    绘画作品: 'green',
    体育: 'blue',
    风景: 'cyan',
    抽象: 'orange',
    城市: 'purple',
    默认: 'default',
  }
  return colors[tag] || 'default'
}

const formatFileSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / (1024 * 1024)).toFixed(2) + ' MB'
}

const fetchImageDetail = async () => {
  try {
    const response = await getPictureVoByIdUsingPost({
      id: imageId,
    })

    if (response.code === 0 && response.data) {
      // 将后端返回的数据映射到组件所需的格式
      console.log(response.data.tags)

      imageDetail.value = {
        id: response.data.id,
        name: response.data.name,
        url: response.data.url,
        compressedUrl: response.data.compressedUrl,
        thumbnailUrl: response.data.thumbnailUrl,
        author: response.data.userId, // 假设userId就是作者
        description: response.data.introduction,
        category: response.data.category,
        format: response.data.picFormat,
        resolution: `${response.data.picWidth || '?'} x ${response.data.picHeight || '?'}`,
        size: response.data.picSize,
        tags: response.data.tags
          ? typeof response.data.tags === 'string'
            ? JSON.parse(response.data.tags)
            : response.data.tags
          : [],
        likes: 0, // 这些字段后端暂时没有，先默认为0
        stars: 0,
        downloads: 0,
      }
    } else {
      message.error('获取图片详情失败: ' + response.description)
    }
  } catch (error) {
    console.error('获取图片详情失败:', error)
    message.error('获取图片详情失败，请稍后再试')
  }
}

const handleLike = () => {
  message.success('点赞成功')
  imageDetail.value.likes++
}

const handleStar = () => {
  message.success('收藏成功')
  imageDetail.value.stars++
}

const handleDownload = () => {
  // 创建一个a标签，设置href为图片url，然后触发点击事件
  const a = document.createElement('a')
  a.href = imageDetail.value.url
  a.download = imageDetail.value.name || 'image'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  message.success('下载成功')
  imageDetail.value.downloads++
}

const handleShare = () => {
  // 复制当前页面链接到剪贴板
  const url = window.location.href
  navigator.clipboard.writeText(url).then(
    () => {
      message.success('链接已复制到剪贴板，可以分享给好友了')
    },
    () => {
      message.error('复制链接失败')
    },
  )
}

onMounted(() => {
  fetchImageDetail()
})
</script>

<style scoped>
.image-detail-view {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.header-left {
  display: flex;
  align-items: center;
}

.image-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.info-card {
  height: 100%;
}

.image-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.image-info-section {
  margin-bottom: 24px;
}

.info-item {
  margin-bottom: 12px;
}

.info-label {
  font-weight: 500;
  margin-right: 8px;
  color: #666;
}

.info-value {
  color: #333;
}

.image-tags {
  margin-bottom: 24px;
}

.tags-container {
  margin-top: 8px;
}

.image-stats {
  margin-bottom: 24px;
}

.action-buttons {
  margin-top: 24px;
}
</style>
