import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const Cart = () => {
  const { cart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Button asChild><Link to="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-0">
            {cart.items.map(item => <CartItem key={item.product._id} item={item} />)}
          </div>
          <Button variant="ghost" className="mt-4 text-muted-foreground" onClick={clearCart}>Clear Cart</Button>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <CartSummary shippingCost={10} />
              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">Proceed to Checkout<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
