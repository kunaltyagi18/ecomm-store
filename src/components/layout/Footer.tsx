import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Store, CreditCard, Truck, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-background/60">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-background/60">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-background/60">30 day returns</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Quality Products</p>
                <p className="text-sm text-background/60">Top brands only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              ShopHub
            </Link>
            <p className="text-background/70 mb-6 max-w-xs">
              Your destination for quality products. We bring you the best brands at competitive prices.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-background/70 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-background/70 hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Clothing" className="text-background/70 hover:text-primary transition-colors">Clothing</Link></li>
              <li><Link to="/products?sort=newest" className="text-background/70 hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Account</h4>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-background/70 hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="text-background/70 hover:text-primary transition-colors">Register</Link></li>
              <li><Link to="/cart" className="text-background/70 hover:text-primary transition-colors">Cart</Link></li>
              <li><Link to="/orders" className="text-background/70 hover:text-primary transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">© 2024 ShopHub. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;