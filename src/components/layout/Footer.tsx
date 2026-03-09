import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card mt-auto hidden md:block">
    <div className="container py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-3">ApniDukaan</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Dinanagar ka apna online kirana store. Ghar baithe order karo, 30 minute mein delivery.</p>
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 hover:underline">
            Shop Now <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
            <li><Link to="/auth" className="hover:text-primary transition-colors">Login / Signup</Link></li>
            <li><Link to="/wholesale" className="hover:text-primary transition-colors">Wholesale Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Delivery Areas</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>📍 Dinanagar</li>
            <li>📍 Awankha</li>
            <li>📍 Taragarh</li>
            <li>📍 Kahnuwan</li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="font-heading font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-medium text-foreground">Mobile:</span>
              <a href="tel:7696572670" className="hover:text-primary transition-colors">7696572670</a>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground">Address:</span>
              <span>Hari dass satya pal railway road, Dinanagar</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground">Timing:</span>
              <span>9:00 AM to 8:30 PM</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 ApniDukaan. All rights reserved. Made with ❤️ in Dinanagar.
      </div>
    </div>
  </footer>
);

export default Footer;
