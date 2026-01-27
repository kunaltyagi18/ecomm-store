import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, Shield, HeadphonesIcon, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { categories } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductCard from '@/components/product/ProductCard';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const products = await productService.getFeatured();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
    { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Dedicated help' },
    { icon: Sparkles, title: 'Best Quality', desc: 'Premium products' },
  ];

  const categoryImages: Record<string, string> = {
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    'Clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    'Home & Garden': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop',
    'Sports': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative hero-gradient">
        <div className="container section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                New Collection 2024
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Elevate Your
                <span className="block text-primary">Lifestyle</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Discover curated collections of premium products designed for the modern lifestyle. Quality meets style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-gradient text-lg px-8 py-6" asChild>
                  <Link to="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link to="/products?category=Electronics">Explore Categories</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold">4.9</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-sm text-muted-foreground">Premium Brands</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/30 rounded-full blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                alt="Shopping"
                className="relative z-10 rounded-3xl shadow-2xl object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container section-padding">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary font-medium mb-2">Categories</p>
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          </div>
          <Button variant="ghost" className="hidden md:flex" asChild>
            <Link to="/products">
              View All Categories
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(1, 5).map((cat, index) => (
            <Link key={cat} to={`/products?category=${cat}`} className="group">
              <Card className="card-hover overflow-hidden border-0 shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={categoryImages[cat] || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=${index}`}
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-background mb-1">{cat}</h3>
                    <p className="text-background/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30">
        <div className="container section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-medium mb-2">Our Products</p>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Collection</h2>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
            }
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container section-padding">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop"
            alt="Sale"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent flex items-center">
            <div className="p-8 md:p-16 max-w-xl">
              <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Limited Time Offer</p>
              <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
                Up to 50% Off
              </h2>
              <p className="text-background/80 text-lg mb-8">
                Exclusive deals on our premium collection. Don't miss out on these incredible savings.
              </p>
              <Button size="lg" className="btn-gradient" asChild>
                <Link to="/products">Shop the Sale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground">
        <div className="container section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <Button size="lg" variant="secondary" className="px-8 py-4 rounded-xl font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-70 mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;