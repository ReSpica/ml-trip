<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <div class="search-bar" v-if="topSearchShow">
      <search-bar/>
    </div>
    <home-search-box />
    <home-categories/>
    <home-content/>

  </div>
</template>

<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/modules/home'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'
import useScroll from '@/hooks/useScroll'
import { watch, computed } from 'vue'
// 发送网络请求
const $homeStore = useHomeStore()
$homeStore.fetchHotSuggestData()
$homeStore.fetchCategoriesData()
$homeStore.fetchHouselistData()

const {isReachBottom, scrollTop} = useScroll()
watch(isReachBottom, (_new) => {
  if(!_new) return
  $homeStore.fetchHouselistData().then(() => {
    isReachBottom.value = false
  })
})

const topSearchShow = computed(() => scrollTop.value >= 60)

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  width: 100vw;
  top: 0;
}
</style>
