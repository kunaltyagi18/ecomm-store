import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, Truck } from 'lucide-react';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button asChild><Link to="/products">Back to Products</Link></Button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const inCart = isInCart(product._id);

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to Products</Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
              ))}
            </div>
            <span className="text-muted-foreground">({product.numReviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.isDigital && <Badge>Digital</Badge>}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}><Plus className="h-4 w-4" /></Button>
            </div>

            <Button className="flex-1" disabled={product.stock === 0 || inCart} onClick={() => addToCart(product, quantity)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </Button>

            <Button variant="outline" size="icon" onClick={() => inWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}>
              <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500 text-red-500")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
