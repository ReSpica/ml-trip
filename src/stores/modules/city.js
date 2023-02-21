import { defineStore } from 'pinia'
import { getCityAll } from '@/services'


const useCityStore = defineStore("city", {
  state: () => ({
    allCities: [],
    currentCity: {}
  }),
  actions: {
    async fetchAllCitiesData() {
      if(this.allCities.length > 0) return; 
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore
