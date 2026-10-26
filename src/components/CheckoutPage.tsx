import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Tag,
  Printer,
  ShoppingBag,
  ArrowRight,
  Check,
  Building,
  Home
} from 'lucide-react';
import { CartItem, ShippingAddress, DeliveryOption, PaymentMethodType, Order } from '../types.ts';

interface CheckoutPageProps {
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onBackToStore: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onOrderSuccess,
  onBackToStore
}) => {
  // Step tracking (1: Address, 2: Delivery, 3: Payment, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Alex Reynolds',
    email: 'alex.reynolds@example.com',
    phone: '+1 (555) 392-8172',
    street: '452 Broadway, Floor 4',
    apartment: 'Suite 401',
    city: 'New York',
    state: 'NY',
    zipCode: '10013',
    country: 'United States'
  });

  // Delivery Speed State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextThreeDays = new Date();
  nextThreeDays.setDate(nextThreeDays.getDate() + 3);

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'priority',
      name: 'FREE Prime Next-Day Delivery',
      description: `Guaranteed delivery tomorrow, ${tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      estimatedDate: tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      price: 0
    },
    {
      id: 'standard',
      name: 'Standard Ground Shipping',
      description: `Estimated delivery ${nextThreeDays.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      estimatedDate: nextThreeDays.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      price: 0
    },
    {
      id: 'express',
      name: 'Priority Express Rush',
      description: 'Morning expedited courier delivery with real-time GPS tracking',
      estimatedDate: tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      price: 14.99
    }
  ];

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(deliveryOptions[0]);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('712');
  const [cardName, setCardName] = useState('Alex Reynolds');

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    amount: number;
  } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Calculate calculations
  const rawSubtotal = items.reduce((acc, it) => {
    const warrantyCost = it.withWarranty ? 29.99 : 0;
    return acc + (it.finalPrice + warrantyCost) * it.quantity;
  }, 0);

  const discountAmount = appliedPromo ? (rawSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const deliveryFee = selectedDelivery.price;
  const taxableAmount = Math.max(0, rawSubtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.0825; // 8.25%
  const finalOrderTotal = taxableAmount + deliveryFee + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();

    if (code === 'TECH20') {
      const discount = (rawSubtotal * 20) / 100;
      setAppliedPromo({ code: 'TECH20', discountPercent: 20, amount: discount });
      setPromoInput('');
    } else if (code === 'PRIME10') {
      const discount = (rawSubtotal * 10) / 100;
      setAppliedPromo({ code: 'PRIME10', discountPercent: 10, amount: discount });
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try entering "TECH20" for 20% off.');
    }
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      // Call our Express backend /api/orders endpoint
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress,
          deliveryOption: selectedDelivery,
          paymentDetails: {
            method: paymentMethod,
            cardNumber: cardNumber.replace(/\s+/g, '')
          },
          promoCode: appliedPromo?.code
        })
      });

      if (!response.ok) {
        throw new Error('Order creation failed on backend');
      }

      const data = await response.json();
      const newOrder: Order = data.order;

      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
      setCurrentStep(4);
    } catch {
      // Fallback local order creation if offline
      const fallbackOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: `VOLT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        items,
        shippingAddress,
        deliveryOption: selectedDelivery,
        paymentDetails: {
          method: paymentMethod,
          cardNumber: `•••• •••• •••• 9812`
        },
        subtotal: rawSubtotal,
        shippingCost: deliveryFee,
        tax: estimatedTax,
        discount: discountAmount,
        total: finalOrderTotal,
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: selectedDelivery.estimatedDate,
        status: 'confirmed'
      };
      setConfirmedOrder(fallbackOrder);
      onOrderSuccess(fallbackOrder);
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick preset sample addresses
  const handlePresetAddress = (type: 'home' | 'office') => {
    if (type === 'home') {
      setShippingAddress({
        fullName: 'Alex Reynolds',
        email: 'alex.reynolds@example.com',
        phone: '+1 (555) 392-8172',
        street: '742 Evergreen Terrace',
        apartment: 'Apt 2B',
        city: 'Springfield',
        state: 'OR',
        zipCode: '97477',
        country: 'United States'
      });
    } else {
      setShippingAddress({
        fullName: 'Alex Reynolds (Tech Lab)',
        email: 'alex.work@example.com',
        phone: '+1 (555) 441-9920',
        street: '100 Congress Avenue',
        apartment: 'Suite 1800',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'United States'
      });
    }
  };

  // Confirmed Order Receipt Screen
  if (currentStep === 4 && confirmedOrder) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Banner */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Thank You, Your Order is Confirmed!
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                A confirmation receipt and tracking link have been dispatched to{' '}
                <strong className="text-amber-400">{confirmedOrder.shippingAddress.email}</strong>
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono">
              <span className="text-slate-400">Order Number:</span>
              <span className="text-amber-400 font-bold">{confirmedOrder.orderNumber}</span>
            </div>

            {/* Delivery Timeline Pill */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-left max-w-lg mx-auto flex items-center gap-3">
              <Truck className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">
                  Estimated Delivery: {confirmedOrder.estimatedDeliveryDate}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Shipped via {confirmedOrder.deliveryOption.name} with signature verification.
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Order Items ({confirmedOrder.items.length})</h2>
              <button
                onClick={() => window.print()}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
            </div>

            <div className="space-y-4">
              {confirmedOrder.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={it.product.image}
                      alt={it.product.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate max-w-xs sm:max-w-md">
                        {it.product.shortTitle || it.product.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Qty: {it.quantity} {it.selectedColor && `· Color: ${it.selectedColor}`}{' '}
                        {it.withWarranty && '· 2-Yr Care Plan'}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-white font-bold tabular-nums shrink-0">
                    ${((it.finalPrice + (it.withWarranty ? 29.99 : 0)) * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block mb-1 font-semibold">Shipping Address</span>
                <p className="text-slate-200">
                  {confirmedOrder.shippingAddress.fullName}
                  <br />
                  {confirmedOrder.shippingAddress.street}
                  {confirmedOrder.shippingAddress.apartment && ` ${confirmedOrder.shippingAddress.apartment}`}
                  <br />
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state}{' '}
                  {confirmedOrder.shippingAddress.zipCode}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-semibold">Payment Summary</span>
                <p className="text-slate-200">
                  Method: <span className="uppercase">{confirmedOrder.paymentDetails.method.replace('_', ' ')}</span>
                  <br />
                  {confirmedOrder.paymentDetails.cardNumber && (
                    <span>Account: {confirmedOrder.paymentDetails.cardNumber}</span>
                  )}
                  <br />
                  Total Paid:{' '}
                  <strong className="text-amber-400 font-mono">
                    ${confirmedOrder.total.toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={onBackToStore}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <span>Continue Shopping Volt Electronics</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form (Empty Cart Check)
  if (items.length === 0) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400">
            Please add an electronic product to your cart before proceeding to checkout.
          </p>
          <button
            onClick={onBackToStore}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
          >
            Explore Electronic Deals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Focused Checkout Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="text-lg font-black tracking-tight text-white hover:text-amber-400 transition-colors"
            >
              VOLT <span className="text-amber-400 text-xs font-semibold">CHECKOUT</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Steps Breadcrumbs Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs font-semibold max-w-2xl mx-auto">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">1</span>
            <span>Shipping Address</span>
          </div>
          <span className="text-slate-700">·</span>
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">2</span>
            <span>Delivery Method</span>
          </div>
          <span className="text-slate-700">·</span>
          <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">3</span>
            <span>Payment & Review</span>
          </div>
        </div>

        {/* Main 2-Column Split: Form (Left) & Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-step checkout details */}
          <div className="lg:col-span-8 space-y-6">
            {/* SECTION 1: SHIPPING ADDRESS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <span>Shipping Address</span>
                </h2>

                {/* Preset address pills */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePresetAddress('home')}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <Home className="w-3 h-3 text-amber-400" /> Use Home Address
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetAddress('office')}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <Building className="w-3 h-3 text-amber-400" /> Use Office Address
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    placeholder="Street name, building number"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Apartment / Suite</label>
                  <input
                    type="text"
                    value={shippingAddress.apartment}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                    placeholder="Apt, Suite, Floor (optional)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number (for Courier SMS) *</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">State / Prov *</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: DELIVERY SPEED */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span>Choose Delivery Speed</span>
                </h2>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Prime Express Included
                </span>
              </div>

              <div className="space-y-3">
                {deliveryOptions.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setSelectedDelivery(opt)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedDelivery.id === opt.id
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={selectedDelivery.id === opt.id}
                        onChange={() => setSelectedDelivery(opt)}
                        className="text-amber-500 focus:ring-amber-500 border-slate-700 bg-slate-900"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{opt.name}</span>
                          {opt.price === 0 && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black">
                              FREE
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{opt.description}</div>
                      </div>
                    </div>

                    <div className="text-right text-xs font-mono font-bold text-white">
                      {opt.price === 0 ? '$0.00' : `$${opt.price.toFixed(2)}`}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* SECTION 3: PAYMENT METHOD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <span>Select Payment Method</span>
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card · Apple Pay · COD</span>
                </div>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'credit_card', label: 'Credit Card' },
                  { id: 'apple_pay', label: 'Apple Pay' },
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'cash_on_delivery', label: 'Cash on Deliv.' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as PaymentMethodType)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      paymentMethod === m.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 text-xs mt-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Expires (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cash_on_delivery' && (
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-400">Cash on Delivery (Pay upon Arrival)</div>
                  <p className="text-slate-400 text-[11px]">
                    You may pay via cash or mobile contactless card reader upon package arrival. Exact change is appreciated.
                  </p>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-white">Apple Pay Quick Express</div>
                  <p className="text-slate-400 text-[11px]">
                    Your Touch ID / Face ID authorization will confirm the charge upon placing order.
                  </p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-sky-400">PayPal Instant Checkout</div>
                  <p className="text-slate-400 text-[11px]">
                    Connected securely with Buyer Protection up to $10,000.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Order Summary & Place Order */}
          <div className="lg:col-span-4 sticky top-20 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. TECH20)"
                      className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg border border-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                    <span>Coupon {appliedPromo.code} applied (-{appliedPromo.discountPercent}%)</span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && <div className="text-[11px] text-rose-400">{promoError}</div>}
              </form>

              {/* Items Mini List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-xs py-1">
                    <div className="truncate max-w-[180px] text-slate-300">
                      {it.quantity}x {it.product.shortTitle || it.product.title}
                    </div>
                    <div className="font-mono text-white tabular-nums">
                      ${((it.finalPrice + (it.withWarranty ? 29.99 : 0)) * it.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Rows */}
              <div className="space-y-2 text-xs pt-3 border-t border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Items Subtotal:</span>
                  <span className="font-mono text-white tabular-nums">${rawSubtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Promo Discount ({appliedPromo.code}):</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Shipping & Handling:</span>
                  <span className="font-mono text-emerald-400 tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Estimated Sales Tax (8.25%):</span>
                  <span className="font-mono text-white tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
                  <span>Order Total:</span>
                  <span className="font-mono text-amber-400 tabular-nums text-lg">
                    ${finalOrderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-98 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Your Order</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-slate-400 space-y-1">
                <p>By placing your order, you agree to Volt's Electronic Sales Terms.</p>
                <div className="flex items-center justify-center gap-2 text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day Money Back Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
