import React from "react"
import { useNavigate } from "react-router-dom"
import CartItem from "@/components/molecules/CartItem"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import useCart from "@/hooks/useCart"
import { toast } from "react-toastify"

const CartPage = () => {
  const navigate = useNavigate()
  const { 
    cartItems, 
    isLoading, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    getCartItemsCount
  } = useCart()

  const handleCheckout = () => {
    toast.success("Order placed successfully! 🎉")
    clearCart()
    navigate("/")
  }

  if (isLoading) {
    return <Loading />
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Empty
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
          actionLabel="Continue Shopping"
          actionPath="/"
        />
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal >= 1999 ? 0 : 99
  const total = subtotal + shipping
  const savings = cartItems.reduce((acc, item) => {
    // Calculate savings if there would be original prices
    return acc
  }, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          <p className="text-secondary mt-1">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <Button
          onClick={clearCart}
          variant="ghost"
          size="small"
          icon="Trash2"
          className="text-accent hover:bg-red-50"
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <CartItem
              key={`${item.productId}-${item.size}-${item.color}-${index}`}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-lg p-6 shadow-sm border sticky top-8">
            <h2 className="text-lg font-bold text-primary mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal ({getCartItemsCount()} items)</span>
                <span className="text-primary font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-primary'}`}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              
              {shipping > 0 && (
                <div className="text-xs text-accent bg-red-50 p-2 rounded">
                  Add ₹{(1999 - subtotal).toLocaleString()} more for FREE shipping
                </div>
              )}
              
              <hr className="my-3" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-primary">Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="primary"
              size="large"
              className="w-full mt-6"
              icon="CreditCard"
            >
              Proceed to Checkout
            </Button>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-3 text-sm text-accent hover:text-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              Continue Shopping
            </button>

            {/* Security Features */}
            <div className="mt-6 pt-4 border-t">
              <div className="grid grid-cols-1 gap-3 text-xs text-secondary">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Shield" size={14} className="text-green-600" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="RotateCcw" size={14} className="text-green-600" />
                  <span>Easy returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Award" size={14} className="text-green-600" />
                  <span>Authentic products guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage