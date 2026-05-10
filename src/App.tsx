import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Search, 
  Menu, 
  X, 
  Instagram, 
  Phone as WhatsApp, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CreditCard,
  User,
  Package,
  Star,
  ArrowRight,
  Filter,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Product, CartItem, Booking } from './types';

// --- MOCK DATA ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luxury Body Wave Frontal',
    price: 85000,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-1-78ac209c-1778435183930.webp',
    images: [
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-1-78ac209c-1778435183930.webp',
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-3-91c0faff-1778435187917.webp'
    ],
    description: 'High-quality 13x4 HD lace frontal wig with deep waves. 100% Brazilian human hair.',
    length: '24"',
    color: 'Natural Black',
    laceType: 'HD Lace',
    stock: 5,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '2',
    name: 'Sleek Bone Straight',
    price: 120000,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-2-47c9ee7f-1778435184896.webp',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-2-47c9ee7f-1778435184896.webp'],
    description: 'The ultimate luxury. Bone straight hair that remains silky and smooth.',
    length: '28"',
    color: 'Blonde',
    laceType: 'HD Lace',
    stock: 3
  },
  {
    id: '3',
    name: 'Kinky Curly Glueless',
    price: 65000,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-3-871fb635-1778435183757.webp',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-3-871fb635-1778435183757.webp'],
    description: 'Natural looking kinky curls with a glueless cap for easy wear.',
    length: '18"',
    color: 'Dark Brown',
    laceType: 'Transparent',
    stock: 8
  },
  {
    id: '4',
    name: 'Classic Bob Cut',
    price: 45000,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-4-3bc489d1-1778435183896.webp',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-4-3bc489d1-1778435183896.webp'],
    description: 'Timeless bob cut. Sophisticated and low maintenance.',
    length: '12"',
    color: 'Jet Black',
    laceType: 'Closure',
    stock: 12
  }
];

const SERVICES = [
  { id: 'install', name: 'Wig Install', price: 15000 },
  { id: 'revamp', name: 'Wig Revamp', price: 7000 },
  { id: 'coloring', name: 'Coloring Service', price: 20000 }
];

const BEFORE_AFTER = [
  {
    title: 'Frontal Install',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/before-after-1-370f3438-1778435184509.webp'
  },
  {
    title: 'Wig Revamp',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/before-after-2-c338e2cc-1778435184827.webp'
  },
  {
    title: 'Full Transformation',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-2-34dacb25-1778435186904.webp'
  }
];

const GALLERY = [
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-1-6affdf14-1778435184160.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-2-34dacb25-1778435186904.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-3-91c0faff-1778435187917.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/hero-banner-salon-0fa01a1d-1778435184632.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-1-78ac209c-1778435183930.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/bestseller-wig-2-47c9ee7f-1778435184896.webp'
];

// --- COMPONENTS ---

const Navbar = ({ cartCount, onOpenCart, onNavigate }: { cartCount: number, onOpenCart: () => void, onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-serif font-bold tracking-tight text-primary">LuxeWigs</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('shop')} className="text-sm font-medium hover:text-primary transition-colors">Shop</button>
            <button onClick={() => onNavigate('booking')} className="text-sm font-medium hover:text-primary transition-colors">Book Appointment</button>
            <button onClick={() => onNavigate('gallery')} className="text-sm font-medium hover:text-primary transition-colors">Gallery</button>
            <button onClick={() => onNavigate('tracking')} className="text-sm font-medium hover:text-primary transition-colors">Track Order</button>
            <button onClick={() => onNavigate('subscription')} className="text-sm font-medium hover:text-primary transition-colors">Subscription</button>
            <button onClick={() => onNavigate('wholesale')} className="text-sm font-medium hover:text-primary transition-colors">Wholesale</button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onOpenCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button onClick={() => { onNavigate('shop'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Shop</button>
              <button onClick={() => { onNavigate('booking'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Book Appointment</button>
              <button onClick={() => { onNavigate('gallery'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Gallery</button>
              <button onClick={() => { onNavigate('tracking'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Track Order</button>
              <button onClick={() => { onNavigate('subscription'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Subscription</button>
              <button onClick={() => { onNavigate('wholesale'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium">Wholesale</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onShopNow, onBookNow }: { onShopNow: () => void, onBookNow: () => void }) => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/hero-banner-salon-0fa01a1d-1778435184632.webp" 
          alt="Luxury Salon" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6"
        >
          Premium Wigs + <br /> Salon Installs
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-100"
        >
          Exquisite hair pieces and professional styling services in the heart of Aba.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={onShopNow} size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
            Shop Now
          </Button>
          <Button onClick={onBookNow} variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
            Book Appointment
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const Bestsellers = ({ onProductClick }: { onProductClick: (p: Product) => void }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold">Our Bestsellers</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Badge className="absolute top-4 right-4 bg-white/90 text-black border-none">Popular</Badge>
              </div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-primary font-bold">₦{product.price.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustBadges = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">Paystack Secured</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">GIG Shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">Easy Transfers</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">Quality Assured</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold">Client Transformations</h2>
          <p className="text-gray-500 mt-2">Real results from our ABA salon</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BEFORE_AFTER.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-medium text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductDetails = ({ product, onAddToCart, onClose }: { product: Product, onAddToCart: (p: Product) => void, onClose: () => void }) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [shippingCalc, setShippingCalc] = useState<{city: string, price: number} | null>(null);

  const calculateShipping = (city: string) => {
    const prices: Record<string, number> = {
      'Lagos': 3500,
      'Abuja': 4500,
      'Port Harcourt': 4000,
      'Enugu': 2500,
      'Aba': 1500
    };
    setShippingCalc({ city, price: prices[city] || 5000 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[90vh] overflow-y-auto p-2">
      <div className="space-y-4">
        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
          <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedImage(img)}
              className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        {product.videoUrl && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Product Video</h4>
            <video controls className="w-full rounded-lg">
              <source src={product.videoUrl} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Badge className="mb-2">{product.laceType}</Badge>
          <h2 className="text-3xl font-serif font-bold">{product.name}</h2>
          <p className="text-2xl font-bold text-primary mt-2">₦{product.price.toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Length</p>
              <p className="font-bold">{product.length}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Color</p>
              <p className="font-bold">{product.color}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-3">
          <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
          <p className="text-sm font-medium">Only {product.stock} left in stock - order soon!</p>
        </div>

        <Button onClick={() => onAddToCart(product)} size="lg" className="w-full py-6 text-lg">
          Add to Cart
        </Button>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Truck className="h-4 w-4" /> Shipping Calculator (GIG Logistics)
          </h4>
          <div className="flex gap-2">
            <Select onValueChange={calculateShipping}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aba">Aba (Pickup)</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                <SelectItem value="Enugu">Enugu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {shippingCalc && (
            <p className="text-sm text-green-600 font-medium">
              Estimated shipping to {shippingCalc.city}: ₦{shippingCalc.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [loading, setLoading] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Deposit payment initiated! Redirecting to Paystack...');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold">Book an Appointment</h1>
        <p className="text-gray-500 mt-2">Visit our Aba salon for professional installs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SERVICES.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedService.id === s.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{s.name}</span>
                    <span className="text-primary font-bold">₦{s.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarUI
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date() || date.getDay() === 0}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Confirm Booking</CardTitle>
            <CardDescription>A 50% deposit is required to confirm your slot.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="080..." required />
              </div>
              <div className="space-y-2">
                <Label>Selected Slot</Label>
                <Select defaultValue="10am">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="12pm">12:00 PM</SelectItem>
                    <SelectItem value="2pm">02:00 PM</SelectItem>
                    <SelectItem value="4pm">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service Total</span>
                  <span>₦{selectedService.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary">
                  <span>Deposit Due (50%)</span>
                  <span>₦{(selectedService.price / 2).toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" className="w-full py-6" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Pay Deposit via Paystack'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<any>(null);

  const handleTrack = () => {
    if (!orderId) return;
    setStatus({
      id: orderId,
      carrier: 'GIG Logistics',
      status: 'In Transit',
      location: 'Enugu Hub',
      updatedAt: '2 hours ago',
      history: [
        { date: 'Today, 10:00 AM', event: 'Departed Enugu Hub' },
        { date: 'Yesterday, 04:00 PM', event: 'Processed in Aba Branch' },
        { date: 'Yesterday, 11:00 AM', event: 'Order Picked Up' }
      ]
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="text-center mb-10">
        <Package className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-serif font-bold">Track Your Order</h1>
        <p className="text-gray-500">Enter your waybill or order number to see delivery status</p>
      </div>

      <div className="flex gap-2 mb-12">
        <Input 
          placeholder="e.g. GIG-123456" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="py-6"
        />
        <Button onClick={handleTrack} size="lg">Track</Button>
      </div>

      {status && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</p>
                  <p className="text-xl font-bold text-primary">{status.status}</p>
                </div>
                <Badge variant="outline" className="border-primary text-primary">{status.carrier}</Badge>
              </div>
              <p className="text-sm">Current Location: <span className="font-bold">{status.location}</span></p>
              <p className="text-sm text-gray-500">Last updated: {status.updatedAt}</p>
            </CardContent>
          </Card>

          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {status.history.map((item: any, i: number) => (
              <div key={i} className="relative pl-8">
                <div className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-white ${i === 0 ? 'bg-primary' : 'bg-gray-200'}`} />
                <div>
                  <p className="font-bold">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SubscriptionPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <Badge className="mb-4 px-4 py-1">Exclusive Membership</Badge>
          <h1 className="text-5xl font-serif font-bold mb-6">Wig of the Month Club</h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our elite circle of beauty enthusiasts and receive a brand new premium wig every single month, curated just for you.
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              'Premium 100% human hair wigs',
              'Free shipping nationwide',
              '20% off all salon services',
              'First access to new collections',
              'Complimentary wig care kit'
            ].map((perk, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">{perk}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Monthly Subscription</p>
                <p className="text-4xl font-bold">₦25,000<span className="text-lg font-normal text-gray-400">/month</span></p>
              </div>
              <Button size="lg" className="px-10">Join Now</Button>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-3xl -z-10 translate-x-4 translate-y-4 opacity-20" />
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/gallery-1-6affdf14-1778435184160.webp" 
              alt="Premium Wig" 
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = ({ onBookLook }: { onBookLook: () => void }) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold">Our Gallery</h1>
        <p className="text-gray-500 mt-2">Follow us @LuxeWigsAba for daily inspiration</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {GALLERY.map((img, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }}
            className="relative group overflow-hidden rounded-2xl"
          >
            <img src={img} alt="Gallery" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="secondary" onClick={onBookLook}>Book This Look</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const WholesalePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'VENDOR2024') {
      setIsLoggedIn(true);
    } else {
      toast.error('Incorrect access code');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-32 px-4">
        <Card>
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Wholesale Portal</CardTitle>
            <CardDescription>Enter your vendor access code to see bulk pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Access Code" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Access Portal</Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-500 justify-center">
            Don't have a code? Contact us via WhatsApp to apply.
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
          <Badge className="mb-2">Wholesale Prices Active</Badge>
          <h1 className="text-4xl font-serif font-bold">Vendor Portal</h1>
          <p className="text-gray-500">Minimum Order Quantity: 5 Wigs</p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((p) => (
          <Card key={p.id}>
            <div className="aspect-video overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">₦{p.price.toLocaleString()}</span>
                <span className="text-2xl font-bold text-primary">₦{(p.price * 0.7).toLocaleString()}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">30% OFF</Badge>
              </div>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Add Bulk Pack (5x)</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="space-y-20 pb-20">
      <section className="max-w-5xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-8">Our Story</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded in 2018 in Aba, LuxeWigs began with a simple mission: to provide high-quality, affordable human hair to the modern Nigerian woman.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our salon in Aba is more than just a shop—it's a sanctuary for beauty and confidence. Every wig is hand-selected, and every install is performed with meticulous attention to detail.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d32bd0c3-10ed-4510-977e-fe70cf5da3fb/hero-banner-salon-0fa01a1d-1778435184632.webp" alt="Salon" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Visit Us in Aba</h2>
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <p className="text-lg">123 Faulks Road, Aba, Abia State, Nigeria</p>
              </div>
              <div className="flex items-start gap-4 mb-8">
                <WhatsApp className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <p className="font-bold">WhatsApp & Phone</p>
                  <p className="text-lg">+234 800 123 4567</p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto h-14 px-8">
                <WhatsApp className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] bg-gray-200 rounded-3xl overflow-hidden">
            {/* Mock Google Map */}
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <MapPin className="h-12 w-12 mb-4" />
              <p>Google Maps Integration Here</p>
              <p className="text-sm">123 Faulks Road, Aba</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CartSheet = ({ 
  cart, 
  onUpdateQty, 
  onRemove, 
  onCheckout, 
  isOpen, 
  onClose 
}: { 
  cart: CartItem[], 
  onUpdateQty: (id: string, delta: number) => void, 
  onRemove: (id: string) => void,
  onCheckout: () => void,
  isOpen: boolean,
  onClose: () => void
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'gig' | 'pickup'>('gig');
  const shippingCost = shippingMethod === 'gig' ? 3500 : 0;

  const handleProcessCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      onCheckout();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Shopping Cart
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <Button variant="link" onClick={onClose}>Start Shopping</Button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-500">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border rounded-md">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="px-6 py-6 border-t bg-gray-50 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-bold">Shipping Method</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setShippingMethod('gig')}
                  className={`p-2 text-xs border rounded-md ${shippingMethod === 'gig' ? 'border-primary bg-primary/5 font-bold' : 'bg-white'}`}
                >
                  GIG Delivery (₦3,500)
                </button>
                <button 
                  onClick={() => setShippingMethod('pickup')}
                  className={`p-2 text-xs border rounded-md ${shippingMethod === 'pickup' ? 'border-primary bg-primary/5 font-bold' : 'bg-white'}`}
                >
                  Aba Store Pickup (Free)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₦{shippingCost.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{(total + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={handleProcessCheckout} className="w-full h-12" disabled={isCheckingOut}>
              {isCheckingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Checkout via Paystack'}
            </Button>
            <p className="text-[10px] text-center text-gray-400">By checking out, you agree to our Terms of Service</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// --- MAIN APP ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const handleCheckout = () => {
    const waybill = 'LXB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setCart([]);
    setIsCartOpen(false);
    toast.success('Payment Successful!', {
      description: `Your order is being processed. Waybill: ${waybill}`,
      duration: 10000,
    });
    setCurrentPage('tracking');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onShopNow={() => setCurrentPage('shop')} onBookNow={() => setCurrentPage('booking')} />
            <TrustBadges />
            <Bestsellers onProductClick={setSelectedProduct} />
            <BeforeAfterSection />
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-serif font-bold mb-6">Ready for your transformation?</h2>
                <Button onClick={() => setCurrentPage('booking')} size="lg" className="px-12 h-14">Book Now</Button>
              </div>
            </section>
          </>
        );
      case 'shop':
        return (
          <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold">Shop Wigs</h1>
                <p className="text-gray-500">Explore our premium collection</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lengths</SelectItem>
                    <SelectItem value="12">12"</SelectItem>
                    <SelectItem value="18">18"</SelectItem>
                    <SelectItem value="24">24"</SelectItem>
                    <SelectItem value="28">28"</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Lace Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lace</SelectItem>
                    <SelectItem value="hd">HD Lace</SelectItem>
                    <SelectItem value="trans">Transparent</SelectItem>
                    <SelectItem value="clos">Closure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => setSelectedProduct(p)}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-primary font-bold">₦{p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'booking':
        return <BookingPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'gallery':
        return <GalleryPage onBookLook={() => setCurrentPage('booking')} />;
      case 'wholesale':
        return <WholesalePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <div>404 Page Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary/10 selection:text-primary">
      <Toaster position="top-center" richColors />
      
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={setCurrentPage}
      />

      <main>
        {renderPage()}
      </main>

      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <span className="text-3xl font-serif font-bold tracking-tight text-white">LuxeWigs</span>
            <p className="text-slate-400 leading-relaxed">
              Premium hair solutions and professional salon installs in Aba, Nigeria. Redefining beauty, one wig at a time.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors"><Instagram className="h-5 w-5" /></button>
              <button className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors"><WhatsApp className="h-5 w-5" /></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">Shop Wigs</button></li>
              <li><button onClick={() => setCurrentPage('booking')} className="hover:text-white">Book Appointment</button></li>
              <li><button onClick={() => setCurrentPage('subscription')} className="hover:text-white">Wig Club</button></li>
              <li><button onClick={() => setCurrentPage('wholesale')} className="hover:text-white">Wholesale</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => setCurrentPage('tracking')} className="hover:text-white">Track Order</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">Our Story</button></li>
              <li><button className="hover:text-white">Shipping Policy</button></li>
              <li><button className="hover:text-white">FAQs</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-slate-400 mb-4">Subscribe for hair tips and exclusive offers.</p>
            <div className="flex">
              <Input className="bg-slate-800 border-none rounded-r-none" placeholder="Email address" />
              <Button className="rounded-l-none">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} LuxeWigs Premium. All rights reserved.</p>
        </div>
      </footer>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedProduct && (
            <ProductDetails 
              product={selectedProduct} 
              onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }} 
              onClose={() => setSelectedProduct(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Drawer/Sheet */}
      <CartSheet 
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}