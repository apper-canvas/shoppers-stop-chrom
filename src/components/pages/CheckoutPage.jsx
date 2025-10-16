import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useCart from "@/hooks/useCart"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"
import Loading from "@/components/ui/Loading"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, getCartItemsCount, clearCart, isLoading } = useCart()
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  })
  
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const handleInputChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    })
  }

  const handlePlaceOrder = () => {
    // Validate delivery info
    const requiredFields = ["fullName", "email", "phone", "address", "city", "state", "pincode"]
    const missingFields = requiredFields.filter(field => !deliveryInfo[field])
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all delivery information")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(deliveryInfo.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    // Phone validation
    if (deliveryInfo.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    // Pincode validation
    if (deliveryInfo.pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode")
      return
    }

    toast.success("Order placed successfully! 🎉")
    clearCart()
    navigate("/")
  }

  const subtotal = getCartTotal()
  const shipping = subtotal >= 1999 ? 0 : 99
  const total = subtotal + shipping

  if (isLoading) {
    return <Loading />
  }

  if (cartItems.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Checkout</h1>
        <p className="text-secondary mt-1">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-surface rounded-lg p-6 shadow-sm border">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <ApperIcon name="MapPin" size={20} />
              Delivery Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-primary mb-1">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={deliveryInfo.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Phone *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-primary mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  placeholder="House no., Building name, Street, Area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  City *
                </label>
                <Input
                  type="text"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  State *
                </label>
                <Input
                  type="text"
                  name="state"
                  value={deliveryInfo.state}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-primary mb-1">
                  Pincode *
                </label>
                <Input
                  type="text"
                  name="pincode"
                  value={deliveryInfo.pincode}
                  onChange={handleInputChange}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-surface rounded-lg p-6 shadow-sm border">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <ApperIcon name="CreditCard" size={20} />
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-accent"
                />
                <div className="flex-1">
                  <p className="font-medium text-primary">Cash on Delivery</p>
                  <p className="text-xs text-secondary">Pay when you receive</p>
                </div>
                <ApperIcon name="Banknote" size={20} className="text-secondary" />
              </label>
              
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-accent"
                />
                <div className="flex-1">
                  <p className="font-medium text-primary">Credit/Debit Card</p>
                  <p className="text-xs text-secondary">Visa, Mastercard, RuPay</p>
                </div>
                <ApperIcon name="CreditCard" size={20} className="text-secondary" />
              </label>
              
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-accent"
                />
                <div className="flex-1">
                  <p className="font-medium text-primary">UPI</p>
                  <p className="text-xs text-secondary">Google Pay, PhonePe, Paytm</p>
                </div>
                <ApperIcon name="Smartphone" size={20} className="text-secondary" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-lg p-6 shadow-sm border sticky top-8">
            <h2 className="text-lg font-bold text-primary mb-4">
              Order Summary
            </h2>
            
            {/* Cart Items Preview */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className="flex gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary line-clamp-1">{item.name}</p>
                    <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium text-primary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            
            <hr className="my-4" />
            
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
              
              <hr className="my-3" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-primary">Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              variant="primary"
              size="large"
              className="w-full mt-6"
              icon="CheckCircle"
            >
              Place Order
            </Button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 text-sm text-accent hover:text-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage