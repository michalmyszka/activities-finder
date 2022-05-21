export class CategoryFilter {
  category: string
  subcategories: SubcategoryFilter[]

  constructor(category: string, activitySubcategories: string[]) {
    this.category = category
    this.subcategories = activitySubcategories.flatMap(
      (subcategory) => <SubcategoryFilter>{ subcategory: subcategory }
    )
  }

  getSelectedSubcategories(): SubcategoryFilter[] {
    return this.subcategories.filter((subcategory) => subcategory.selected)
  }

  deselectAll() {
    this.subcategories.forEach((subcategory) => (subcategory.selected = false))
  }
}

export interface SubcategoryFilter {
  subcategory: string
  selected: boolean
}
