<template>
  <div class="city top-page">
    <van-search v-model="search" placeholder="城市区域配置" shape="round" show-action></van-search>
    <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
    </van-tabs>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed} from 'vue'
import { storeToRefs } from 'pinia';
import useCityStore from '@/stores/modules/city'
import CityGroup from './cpns/city-group.vue'

//搜索值
const search = ref('')
//tab绑定值
const tabActive = ref()
//城市状态管理
const $CityStore = useCityStore()
//获取城市信息
const {allCities} = storeToRefs($CityStore)
//请求城市信息
$CityStore.fetchAllCitiesData().then(() => {})
//获取标签信息
const tags = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.content {
  height: calc(100vh - 98px);
  overflow: auto;
}
</style>
