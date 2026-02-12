import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  shippingCost?: number;
}

const CartSummary = ({ shippingCost = 0 }: CartSummaryProps) => {
  const { cart } = useCart();
  
  const tax = cart.subtotal * 0.09; // 9% tax
  const freeShippingThreshold = 100;
  const actualShipping = cart.subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const total = cart.subtotal + actualShipping + tax;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal ({cart.itemCount} items)</span>
        <span>${cart.subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        {actualShipping === 0 ? (
          <span className="text-green-600">Free</span>
        ) : (
          <span>${actualShipping.toFixed(2)}</span>
        )}
      </div>

      {cart.subtotal < freeShippingThreshold && shippingCost > 0 && (
        <p className="text-xs text-muted-foreground">
          Add ${(freeShippingThreshold - cart.subtotal).toFixed(2)} more for free shipping!
        </p>
      )}

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Estimated Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <Separator />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
