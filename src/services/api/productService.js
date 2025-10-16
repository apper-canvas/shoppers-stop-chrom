import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

class ProductService {
  constructor() {
    this.tableName = "product_c"
  }

  transformProductFromDB(dbProduct) {
    if (!dbProduct) return null
    
    return {
      Id: dbProduct.Id,
      name_c: dbProduct.name_c || "",
      brand_c: dbProduct.brand_c || "",
      category_c: dbProduct.category_c || "",
      subcategory_c: dbProduct.subcategory_c || "",
      price_c: dbProduct.price_c || 0,
      sale_price_c: dbProduct.sale_price_c || null,
      images_c: dbProduct.images_c || "",
      sizes_c: dbProduct.sizes_c || "",
      colors_c: dbProduct.colors_c || "",
      description_c: dbProduct.description_c || "",
      in_stock_c: dbProduct.in_stock_c !== undefined ? dbProduct.in_stock_c : true,
      rating_c: dbProduct.rating_c || 0,
      review_count_c: dbProduct.review_count_c || 0
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
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ],
        pagingInfo: { limit: 100, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(p => this.transformProductFromDB(p))
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products")
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
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ]
      }

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params)

      if (!response.success) {
        console.error(response.message)
        return null
      }

      return this.transformProductFromDB(response.data)
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      return null
    }
  }

  async getByCategory(category) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ],
        where: [{
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [category.toLowerCase()]
        }],
        pagingInfo: { limit: 100, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(p => this.transformProductFromDB(p))
    } catch (error) {
      console.error("Error fetching products by category:", error)
      toast.error("Failed to load category products")
      return []
    }
  }

  async getOnSale() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ],
        where: [{
          FieldName: "sale_price_c",
          Operator: "HasValue",
          Values: []
        }],
        pagingInfo: { limit: 100, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(p => this.transformProductFromDB(p))
    } catch (error) {
      console.error("Error fetching sale products:", error)
      toast.error("Failed to load sale products")
      return []
    }
  }

  async getFeatured(limit = 8) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ],
        pagingInfo: { limit: limit, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(p => this.transformProductFromDB(p))
    } catch (error) {
      console.error("Error fetching featured products:", error)
      toast.error("Failed to load featured products")
      return []
    }
  }

  async searchProducts(query) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const searchTerm = query.toLowerCase()

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "sale_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}}
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [{
                fieldName: "name_c",
                operator: "Contains",
                values: [searchTerm]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "brand_c",
                operator: "Contains",
                values: [searchTerm]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "category_c",
                operator: "Contains",
                values: [searchTerm]
              }],
              operator: "OR"
            }
          ]
        }],
        pagingInfo: { limit: 100, offset: 0 }
      }

      const response = await apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return (response.data || []).map(p => this.transformProductFromDB(p))
    } catch (error) {
      console.error("Error searching products:", error)
      toast.error("Failed to search products")
      return []
    }
  }

  async create(product) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const record = {
        name_c: product.name_c,
        brand_c: product.brand_c,
        category_c: product.category_c,
        subcategory_c: product.subcategory_c,
        price_c: product.price_c,
        sale_price_c: product.sale_price_c,
        images_c: product.images_c,
        sizes_c: product.sizes_c,
        colors_c: product.colors_c,
        description_c: product.description_c,
        in_stock_c: product.in_stock_c,
        rating_c: product.rating_c || 0,
        review_count_c: product.review_count_c || 0
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
          console.error(`Failed to create product:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successful = response.results.filter(r => r.success)
        if (successful.length > 0) {
          return this.transformProductFromDB(successful[0].data)
        }
      }

      return null
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error("Failed to create product")
      return null
    }
  }

  async update(id, productData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const record = { Id: parseInt(id) }
      
      // Only include updateable fields that are provided
      if (productData.name_c !== undefined) record.name_c = productData.name_c
      if (productData.brand_c !== undefined) record.brand_c = productData.brand_c
      if (productData.category_c !== undefined) record.category_c = productData.category_c
      if (productData.subcategory_c !== undefined) record.subcategory_c = productData.subcategory_c
      if (productData.price_c !== undefined) record.price_c = productData.price_c
      if (productData.sale_price_c !== undefined) record.sale_price_c = productData.sale_price_c
      if (productData.images_c !== undefined) record.images_c = productData.images_c
      if (productData.sizes_c !== undefined) record.sizes_c = productData.sizes_c
      if (productData.colors_c !== undefined) record.colors_c = productData.colors_c
      if (productData.description_c !== undefined) record.description_c = productData.description_c
      if (productData.in_stock_c !== undefined) record.in_stock_c = productData.in_stock_c
      if (productData.rating_c !== undefined) record.rating_c = productData.rating_c
      if (productData.review_count_c !== undefined) record.review_count_c = productData.review_count_c

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
          console.error(`Failed to update product:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successful = response.results.filter(r => r.success)
        if (successful.length > 0) {
          return this.transformProductFromDB(successful[0].data)
        }
      }

      return null
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product")
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
          console.error(`Failed to delete product:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        
        return response.results.some(r => r.success)
      }

      return false
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
      return false
    }
  }
}

export default new ProductService()