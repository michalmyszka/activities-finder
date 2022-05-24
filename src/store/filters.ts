import { CategoryFilter, SubcategoryFilter } from '@/models/filter'
import { defineStore } from 'pinia'

export interface ActivitiesState {
  categoryFilters: CategoryFilter[]
  placeFilters: string
}

export const useFiltersStore = defineStore('filters', {
  state: (): ActivitiesState => ({
    categoryFilters: [] as CategoryFilter[],
    placeFilters: '',
  }),

  getters: {
    selectedCategories(): CategoryFilter[] {
      return this.categoryFilters.filter((category) =>
        category.subcategories.find((subcategory) => subcategory.selected)
      )
    },

    selectedSubcategories(): SubcategoryFilter[] {
      return this.categoryFilters
        .flatMap((category) => category.subcategories)
        .filter((subcategory) => subcategory.selected)
    },
  },

  actions: {},
})
