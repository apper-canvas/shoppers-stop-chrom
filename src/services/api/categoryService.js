import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

class CategoryService {
  constructor() {
    this.tableName = "category_c"
  }

  transformCategoryFromDB(dbCategory) {
    if (!dbCategory) return null
    
    let subcategories = []
    if (dbCategory.subcategories_c) {
      try {
        subcategories = JSON.parse(dbCategory.subcategories_c)
      } catch {
        subcategories = dbCategory.subcategories_c.split('\n').filter(s => s.trim())
      }
    }

    return {
      Id: dbCategory.Id,
      name_c: dbCategory.name_c || "",
      display_c: dbCategory.display_c || "",
      subcategories: subcategories
    }
  }

  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "subcategories_c"}}
        ],
        pagingInfo: { limit: 50, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(c => this.transformCategoryFromDB(c))
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Failed to load categories")
      return []
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "subcategories_c"}}
        ]
      }

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params)

      if (!response.success) {
        console.error(response.message)
        return null
      }

      return this.transformCategoryFromDB(response.data)
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error)
      return null
    }
  }

  async getByName(name) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "subcategories_c"}}
        ],
        where: [{
          FieldName: "name_c",
          Operator: "EqualTo",
          Values: [name.toLowerCase()]
        }],
        pagingInfo: { limit: 1, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        return null
      }

      if (response.data && response.data.length > 0) {
        return this.transformCategoryFromDB(response.data[0])
      }

      return null
    } catch (error) {
      console.error("Error fetching category by name:", error)
      return null
    }
  }

  async create(category) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const subcategories_c = Array.isArray(category.subcategories)
        ? JSON.stringify(category.subcategories)
        : category.subcategories_c || ""

      const record = {
        name_c: category.name_c,
        display_c: category.display_c,
        subcategories_c: subcategories_c
      }

      const params = { records: [record] }
      const response = await apperClient.createRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to create category:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successful = response.results.filter(r => r.success)
        if (successful.length > 0) {
          return this.transformCategoryFromDB(successful[0].data)
        }
      }

      return null
    } catch (error) {
      console.error("Error creating category:", error)
      toast.error("Failed to create category")
      return null
    }
  }

  async update(id, categoryData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const record = { Id: parseInt(id) }
      
      if (categoryData.name_c !== undefined) record.name_c = categoryData.name_c
      if (categoryData.display_c !== undefined) record.display_c = categoryData.display_c
      if (categoryData.subcategories !== undefined) {
        record.subcategories_c = JSON.stringify(categoryData.subcategories)
      } else if (categoryData.subcategories_c !== undefined) {
        record.subcategories_c = categoryData.subcategories_c
      }

      const params = { records: [record] }
      const response = await apperClient.updateRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update category:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successful = response.results.filter(r => r.success)
        if (successful.length > 0) {
          return this.transformCategoryFromDB(successful[0].data)
        }
      }

      return null
    } catch (error) {
      console.error("Error updating category:", error)
      toast.error("Failed to update category")
      return null
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = { RecordIds: [parseInt(id)] }
      const response = await apperClient.deleteRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to delete category:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        
        return response.results.some(r => r.success)
      }

      return false
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error("Failed to delete category")
      return false
    }
  }
}
export default new CategoryService()