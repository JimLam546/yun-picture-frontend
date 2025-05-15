<template>
  <div class="image-gallery-view">
    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <a-input-search
          placeholder="搜索你感兴趣的图片"
          style="width: 600px"
          enter-button="搜索"
          @search="onSearch"
        />
      </a-layout-header>
      <a-layout-content style="background: #fff; padding: 0 24px 24px">
        <div class="filter-section">
          <a-tabs default-active-key="all" @change="handleCategoryChange">
            <a-tab-pane key="all" tab="全部"></a-tab-pane>
            <a-tab-pane key="photography" tab="摄影作品"></a-tab-pane>
            <a-tab-pane key="painting" tab="绘画作品"></a-tab-pane>
            <a-tab-pane key="desktop" tab="桌面壁纸"></a-tab-pane>
            <a-tab-pane key="mobile" tab="手机壁纸"></a-tab-pane>
          </a-tabs>
          <div class="tags-section" style="margin-top: 8px">
            <span>标签:</span>
            <span
              v-for="tag in availableTags"
              :key="tag"
              style="margin-right: 8px; margin-bottom: 8px"
            >
              <a-tag
                :color="selectedTags.includes(tag) ? 'blue' : 'default'"
                @click="toggleTagSelection(tag)"
                style="cursor: pointer"
              >
                {{ tag }}
              </a-tag>
            </span>
          </div>
        </div>
        <a-row :gutter="[16, 16]" style="margin-top: 24px">
          <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="image in images" :key="image.id">
            <a-card hoverable>
              <template #cover>
                <img
                  :alt="image.name"
                  :src="image.thumbnailUrl || image.compressedUrl || image.url"
                  style="height: 200px; object-fit: cover; cursor: pointer"
                  @click="navigateToDetail(image.id)"
                />
              </template>
              <a-card-meta :title="image.name">
                <template #description>
                  <div class="card-description-tags">
                    <a-tag
                      v-for="tag in image.tags"
                      :key="tag"
                      :color="getTagColor(tag)"
                      style="margin-right: 4px; margin-bottom: 4px"
                      >{{ tag }}</a-tag
                    >
                  </div>
                </template>
              </a-card-meta>
              <template #actions>
                <a-tooltip title="点赞"> <IconThumbUp /> {{ image.likes }} </a-tooltip>
                <a-tooltip title="收藏"> <IconStar /> {{ image.stars }} </a-tooltip>
                <a-tooltip title="下载"> <IconDownload /> {{ image.downloads }} </a-tooltip>
                <a-dropdown>
                  <a class="ant-dropdown-link" @click.prevent>
                    <IconMore />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click="navigateToDetail(image.id)"
                        >查看详情</a-menu-item
                      >
                      <a-menu-item key="2">分享</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-card>
          </a-col>
        </a-row>
        <div style="text-align: center; margin-top: 24px">
          <a-pagination
            :current="currentPage"
            :total="totalImages"
            :page-size="pageSize"
            @change="handlePageChange"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Layout as ALayout,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  InputSearch as AInputSearch,
  Tabs as ATabs,
  TabPane as ATabPane,
  Tag as ATag,
  Row as ARow,
  Col as ACol,
  Card as ACard,
  CardMeta as ACardMeta,
  Tooltip as ATooltip,
  Dropdown as ADropdown,
  Menu as AMenu,
  MenuItem as AMenuItem,
  Pagination as APagination,
} from 'ant-design-vue'
import {
  HeartOutlined as IconThumbUp, // Using Heart for likes as an example
  StarOutlined as IconStar,
  DownloadOutlined as IconDownload,
  MoreOutlined as IconMore,
} from '@ant-design/icons-vue'
import { getPictureVoListByPageWithCacheUsingPost } from '@/api/pictureController'

interface ImageItem {
  id: string
  name: string
  url: string
  tags: string[]
  likes: number
  stars: number
  downloads: number
  compressedUrl: string
  thumbnailUrl: string
}

const router = useRouter()
const images = ref<ImageItem[]>([])
const currentPage = ref(1)
const pageSize = ref(12) // Number of images per page
const totalImages = ref(0)
const selectedTags = ref<string[]>([])
const availableTags = ref(['体育', '风景', '抽象', '城市']) // Define available tags for checkboxes

const navigateToDetail = (imageId: string) => {
  router.push(`/image/${imageId}`)
}

const onSearch = (value: string) => {
  console.log('Search:', value)
  // Implement search logic here
  fetchImages()
}

const handleCategoryChange = (key: string) => {
  console.log('Category changed:', key)
  // Implement category filter logic here
  fetchImages()
}

const toggleTagSelection = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1) // Remove tag
  } else {
    selectedTags.value.push(tag) // Add tag
  }
  // The watcher on selectedTags will automatically call fetchImages
}

watch(selectedTags, () => {
  fetchImages()
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchImages()
}

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

const fetchImages = async () => {
  try {
    console.log('Fetching images with selected tags:', selectedTags.value)
    const response = await getPictureVoListByPageWithCacheUsingPost({
      current: currentPage.value,
      pageSize: pageSize.value,
      // 可以添加其他筛选参数
    })
    console.log('响应结果：', response.data)

    if (response.code === 0 && response.data) {
      // 将后端返回的数据映射到组件所需的格式
      images.value = response.data.records.map((item) => ({
        id: item.id,
        name: item.name,
        url: item.thumbnailUrl || item.url, // 优先使用缩略图
        tags: item.tags || [],
        likes: 0, // 这些字段后端暂时没有，先默认为0
        stars: 0,
        downloads: 0,
        compressedUrl: item.compressedUrl,
        thumbnailUrl: item.thumbnailUrl,
      }))
      totalImages.value = response.data.total || 0
    } else {
      console.error('获取图片列表失败:', response.description)
      images.value = []
      totalImages.value = 0
    }
  } catch (error) {
    console.error('获取图片列表失败:', error)
    images.value = []
    totalImages.value = 0
  }
}

onMounted(() => {
  fetchImages()
})
</script>

<style scoped>
.image-gallery-view {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.filter-section {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
}

.card-description-tags {
  min-height: 48px; /* Accommodate roughly two lines of tags */
}

/* Add any additional custom styles here */
/* Custom styles for the search input to match the image */
.image-gallery-view :deep(.ant-input-search .ant-input) {
  height: 40px; /* 增加高度 */
  border-radius: 6px 0 0 6px !important;
}

.image-gallery-view :deep(.ant-input-search .ant-input-search-button) {
  height: 40px; /* 增加高度 */
  line-height: 40px; /* 调整行高以垂直居中文本 */
  border-radius: 0 6px 6px 0 !important;
}
</style>
