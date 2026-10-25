import { CartItem, CustomerOrderDetails, Product } from '../types';

export const WHATSAPP_PHONE_NUMBER = '919119076000';
export const WHATSAPP_DISPLAY_PHONE = '+91 9119076000';

export function createGeneralWhatsAppLink(): string {
  const message = `Hello Graceful Bitess! I would like to know more about your chocolate collection and place an order. Please share the available products and prices.`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createProductInquiryWhatsAppLink(product: Product): string {
  const message = `Hello Graceful Bitess! I am interested in ordering:
*${product.name}* (Starting at ₹${product.basePrice})
Link: ${window.location.origin}/#product-${product.slug}

Please confirm availability and delivery in Aligarh.`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppOrderMessage(
  cart: CartItem[],
  orderDetails: CustomerOrderDetails,
  subtotal: number,
  deliveryFee: number,
  discount: number,
  total: number,
  couponCode?: string
): string {
  const itemsText = cart
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.selectedVariant.name})\n   Qty: ${item.quantity} × ₹${item.selectedVariant.price} = ₹${item.quantity * item.selectedVariant.price}`
    )
    .join('\n\n');

  let text = `🍫 *NEW CHOCOLATE ORDER REQUEST — GRACEFUL BITESS*\n`;
  text += `──────────────────────\n`;
  text += `*Customer Details:*\n`;
  text += `👤 Name: ${orderDetails.fullName}\n`;
  text += `📞 Phone: ${orderDetails.phone}\n`;
  text += `📍 Address: ${orderDetails.addressLine}, ${orderDetails.area}, ${orderDetails.city} - ${orderDetails.pincode}\n`;
  if (orderDetails.landmark) {
    text += `🏷️ Landmark: ${orderDetails.landmark}\n`;
  }
  text += `🗓️ Preferred Date: ${orderDetails.deliveryDate || 'Earliest Available'}\n`;
  text += `⏰ Preferred Slot: ${orderDetails.deliveryTimeSlot} (Delivery: 10 AM–6 PM)\n`;

  if (orderDetails.deliveryInstructions) {
    text += `📝 Delivery Notes: ${orderDetails.deliveryInstructions}\n`;
  }

  if (orderDetails.giftMessage) {
    text += `🎁 *Personal Gift Card Message:*\n"${orderDetails.giftMessage}"\n`;
  }

  text += `──────────────────────\n`;
  text += `*Ordered Items:*\n${itemsText}\n`;
  text += `──────────────────────\n`;
  text += `*Subtotal:* ₹${subtotal}\n`;
  if (discount > 0) {
    text += `*Discount${couponCode ? ` (${couponCode})` : ''}:* -₹${discount}\n`;
  }
  text += `*Delivery Fee (Aligarh Local):* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n`;
  text += `*Final Estimated Total:* ₹${total}\n`;
  text += `*Payment Preference:* ${
    orderDetails.paymentMethod === 'cod'
      ? 'Cash / UPI on Delivery'
      : orderDetails.paymentMethod === 'upi'
      ? 'Direct UPI / QR Transfer'
      : 'WhatsApp Order & Direct Confirmation'
  }\n`;
  text += `──────────────────────\n`;
  text += `_Please review and confirm this order and dispatch timing with me. Thank you!_`;

  return text;
}

export function createOrderWhatsAppLink(
  cart: CartItem[],
  orderDetails: CustomerOrderDetails,
  subtotal: number,
  deliveryFee: number,
  discount: number,
  total: number,
  couponCode?: string
): string {
  const message = formatWhatsAppOrderMessage(cart, orderDetails, subtotal, deliveryFee, discount, total, couponCode);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
