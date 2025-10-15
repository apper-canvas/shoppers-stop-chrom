import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("shoppers-stop-cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error loading cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveCart = (items) => {
    try {
      localStorage.setItem("shoppers-stop-cart", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart:", error)
    }
  }

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(
      item => 
        item.productId === product.Id.toString() && 
        item.size === selectedSize && 
        item.color === selectedColor
    )

    let newCartItems

    if (existingItemIndex >= 0) {
      newCartItems = [...cartItems]
      newCartItems[existingItemIndex].quantity += quantity
    } else {
      const newItem = {
        productId: product.Id.toString(),
        name: product.name,
        brand: product.brand,
        price: product.salePrice || product.price,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        image: product.images[0]
      }
      newCartItems = [...cartItems, newItem]
    }

    setCartItems(newCartItems)
    saveCart(newCartItems)
    toast.success("Added to cart!")
  }

  const removeFromCart = (productId, size, color) => {
    const newCartItems = cartItems.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    )
    setCartItems(newCartItems)
    saveCart(newCartItems)
    toast.success("Removed from cart")
  }

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    const newCartItems = cartItems.map(item => {
      if (item.productId === productId && item.size === size && item.color === color) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })

    setCartItems(newCartItems)
    saveCart(newCartItems)
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("shoppers-stop-cart")
    toast.success("Cart cleared")
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }
}

export default useCart