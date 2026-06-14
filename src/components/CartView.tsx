import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Trash2, Tag, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (productId: string, size?: string, color?: string) => void;
  onClearCart: () => void;
  onNavigateHome: () => void;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmed';

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateHome
}: CartViewProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [step, setStep] = useState<CheckoutStep>('cart');

  // Checkout shipping input states
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  // Checkout payment input states
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [orderId, setOrderId] = useState('');

  // Computes
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const appliedDiscount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal === 0 ? 0 : subtotal > 200 ? 0 : 15.00;
  const estTax = (subtotal - appliedDiscount) * 0.08;
  const total = subtotal - appliedDiscount + shippingFee + estTax;

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === 'SOFT20') {
      setDiscountPercent(20);
      setPromoMessage('20% discount applied successfully!');
    } else if (code === 'WELCOME') {
      setDiscountPercent(15);
      setPromoMessage('15% welcome savings applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try SOFT20 or WELCOME.');
      setDiscountPercent(0);
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setStep('shipping');
  };

  const handleSubmitShipping = (e: FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.address || !shippingForm.city || !shippingForm.zip) {
      alert('Please fill out all required shipping details.');
      return;
    }
    setStep('payment');
  };

  const handleSubmitPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!paymentForm.cardNumber || !paymentForm.expiry || !paymentForm.cvv) {
      alert('Please provide valid card details.');
      return;
    }
    
    // Simulate payment transaction, generate random order ID
    const randomId = 'SS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setStep('confirmed');
    onClearCart();
  };

  if (step === 'confirmed') {
    return (
      <div id="checkout-confirmed-panel" className="px-5 py-12 text-center select-none pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600"
        >
          <ShieldCheck className="w-8 h-8" />
        </motion.div>
        <h2 className="text-2xl font-bold text-brand-primary mb-2">Order Confirmed!</h2>
        <p className="text-sm text-brand-secondary mb-6 leading-relaxed">
          Thank you for choosing Lucky Store. Your payment processed completely, and your order has been dispatched to our premium logistical partners.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 text-left max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">Order Reference</span>
            <span className="text-sm font-extrabold text-brand-primary">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">Status</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Processing</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">Deliver To</span>
            <span className="text-xs font-semibold text-brand-primary truncate max-w-[200px]">{shippingForm.fullName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider">Est. Delivery</span>
            <span className="text-xs font-bold text-brand-primary">2-3 Business Days</span>
          </div>
        </div>

        <button
          id="btn-confirmed-go-home"
          onClick={onNavigateHome}
          className="bg-brand-primary text-white rounded-xl py-3.5 px-8 font-bold text-sm tracking-wide shadow-md active-scale cursor-pointer hover:opacity-95"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-32">
      <h2 className="text-2xl font-bold text-brand-primary mb-5 select-none tracking-tight">Shopping Bag</h2>

      {step === 'cart' && (
        <>
          {cartItems.length === 0 ? (
            <div id="cart-empty-state" className="py-12 text-center select-none">
              <ShoppingBagIconEmpty />
              <p className="text-sm font-semibold text-brand-secondary mt-4 mb-2">
                Your shopping bag is empty
              </p>
              <p className="text-xs text-brand-secondary/70 mb-6">
                Fill it with our hand-tailored minimalist premium pieces.
              </p>
              <button
                id="btn-cart-empty-shop"
                onClick={onNavigateHome}
                className="bg-brand-primary text-white text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-xl shadow-md cursor-pointer active-scale"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Product items loop */}
              {cartItems.map((item, id) => (
                <motion.div
                  id={`cart-item-${item.product.id}`}
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl border border-gray-100 flex p-3 gap-3 shadow-sm select-none"
                >
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-semibold text-sm text-brand-primary truncate">
                          {item.product.name}
                        </h3>
                        <button
                          id={`btn-cart-remove-${item.product.id}`}
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-gray-400 hover:text-brand-accent p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Configured variations text */}
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.selectedSize && (
                            <span className="text-[10px] font-semibold text-brand-secondary bg-gray-100 px-1.5 py-0.5 rounded">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="text-[10px] font-semibold text-brand-secondary bg-gray-100 px-1.5 py-0.5 rounded">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-1.5">
                      <span className="font-bold text-sm text-brand-primary">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-gray-100 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="p-1 hover:bg-gray-100 rounded-md text-brand-primary duration-150 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-brand-primary px-1 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="p-1 hover:bg-gray-100 rounded-md text-brand-primary duration-150 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Promo code voucher inputs */}
              <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 select-none mt-6">
                <div className="flex gap-2.5">
                  <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Tag className="w-4 h-4" />
                    </span>
                    <input
                      id="input-cart-promo"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (SOFT20 / WELCOME)"
                      className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary/50 text-brand-primary"
                    />
                  </div>
                  <button
                    id="btn-cart-promo-apply"
                    onClick={handleApplyPromo}
                    className="bg-brand-primary text-white text-xs font-bold px-4 rounded-lg cursor-pointer hover:bg-opacity-95 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] font-semibold mt-2 ${promoMessage.includes('Invalid') ? 'text-brand-accent' : 'text-emerald-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Order totalized statistics */}
              <div id="cart-summary" className="bg-white rounded-xl border border-gray-100 mt-6 p-4 space-y-2.5 shadow-sm text-sm">
                <div className="flex justify-between text-brand-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-primary">₹{subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Voucher ({discountPercent}%)</span>
                    <span>-₹{appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-secondary animate-fade-in">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-primary">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-brand-secondary">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-brand-primary">₹{estTax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex justify-between text-brand-primary font-bold text-base select-none">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout trigger */}
              <button
                id="btn-cart-checkout"
                onClick={handleStartCheckout}
                className="w-full bg-brand-primary text-white py-4 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide shadow-md hover:bg-opacity-95 transition-all active-scale mt-6 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}

      {/* STEP 2: SHIPPING INFOS */}
      {step === 'shipping' && (
        <form onSubmit={handleSubmitShipping} className="space-y-4">
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 mb-4 text-xs font-bold text-brand-secondary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent" /> Step 1 of 2: Shipping Destination
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                id="input-ship-name"
                type="text"
                required
                value={shippingForm.fullName}
                onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                placeholder="Lalit Kumar"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">Full Address</label>
              <input
                id="input-ship-address"
                type="text"
                required
                value={shippingForm.address}
                onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                placeholder="Street address, unit or apartment number"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">City</label>
                <input
                  id="input-ship-city"
                  type="text"
                  required
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  placeholder="San Francisco"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">ZIP Code</label>
                <input
                  id="input-ship-zip"
                  type="text"
                  required
                  value={shippingForm.zip}
                  onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                  placeholder="94105"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">Mobile Phone (Optional)</label>
              <input
                id="input-ship-phone"
                type="text"
                value={shippingForm.phone}
                onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                placeholder="+1 555-019-2834"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div id="checkout-shipping-actions" className="flex gap-3 pt-4">
            <button
              id="btn-ship-back"
              type="button"
              onClick={() => setStep('cart')}
              className="w-1/3 border border-gray-200 text-brand-primary py-3 rounded-lg font-bold text-xs"
            >
              Back
            </button>
            <button
              id="btn-ship-continue"
              type="submit"
              className="w-2/3 bg-brand-primary text-white py-3 rounded-lg font-bold text-xs hover:opacity-95"
            >
              Next: Payment Info
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: SIMULATED CREDIT PAYMENTS */}
      {step === 'payment' && (
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 mb-4 text-xs font-bold text-brand-secondary flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-accent animate-pulse" /> Step 2 of 2: Secure Payment Information
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">Card Number</label>
              <input
                id="input-pay-card"
                type="text"
                required
                maxLength={19}
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                placeholder="4111 2222 3333 4444"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">Expiry Date</label>
                <input
                  id="input-pay-expiry"
                  type="text"
                  required
                  maxLength={5}
                  value={paymentForm.expiry}
                  onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                  placeholder="12/28"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1.5">CVV / CVC</label>
                <input
                  id="input-pay-cvv"
                  type="password"
                  required
                  maxLength={4}
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  placeholder="•••"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Secure total notice info */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-brand-secondary text-center leading-relaxed">
            Highly secure end-to-end sandbox SSL. You will be billed a total of <strong className="text-brand-primary">₹{total.toFixed(2)}</strong>.
          </div>

          <div id="checkout-payment-actions" className="flex gap-3 pt-4">
            <button
              id="btn-pay-back"
              type="button"
              onClick={() => setStep('shipping')}
              className="w-1/3 border border-gray-200 text-brand-primary py-3 rounded-lg font-bold text-xs"
            >
              Back
            </button>
            <button
              id="btn-pay-submit"
              type="submit"
              className="w-2/3 bg-emerald-500 text-white py-3 rounded-lg font-bold text-xs hover:bg-emerald-600 shadow-md shadow-emerald-100/50"
            >
              Pay ₹{total.toFixed(2)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Custom internal small asset icon
function ShoppingBagIconEmpty() {
  return (
    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
