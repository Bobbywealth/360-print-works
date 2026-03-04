'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Printer, 
  CreditCard, 
  FileText, 
  Image as ImageIcon, 
  Package, 
  Shirt,
  BadgeCheck,
  Clock,
  DollarSign,
  Palette,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Upload,
  Star,
  Users,
  Award,
  TrendingUp,
  LayoutDashboard,
  LogIn,
  LogOut
} from "lucide-react"

const rotatingWords = ["Business", "Organizations", "Parties", "Events", "Brands", "Teams"]

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="360 Print Works" className="h-10 w-auto" />
            <span className="font-bold text-gray-800 text-lg">360 Print Works</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#portfolio" className="text-gray-600 hover:text-blue-600 transition-colors">Portfolio</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <a href="/crm">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </a>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <a href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </a>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get a Quote
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#portfolio" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {user ? (
                  <>
                    <Button variant="outline" asChild className="w-full justify-center">
                      <a href="/crm">Dashboard</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-center" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full justify-center">
                      <a href="/login">Login</a>
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                      Get a Quote
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Hero Section
function HeroSection() {
  const [currentWord, setCurrentWord] = useState('Business')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const currentIndex = rotatingWords.indexOf(prev)
        return rotatingWords[(currentIndex + 1) % rotatingWords.length]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzRUIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Trusted by 500+ Businesses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Complete Printing Solutions for Your{' '}
              <span className="text-blue-600 inline-block min-w-[180px]">
                <span key={currentWord} className="animate-fade-in inline-block">
                  {currentWord}
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              From business cards to large format printing, we deliver premium quality prints with fast turnaround times. Your success is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Get a Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Our Services
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-500">Projects Done</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-3" />
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
              <img src="/hero.webp" alt="360 Print Works Services" className="w-full h-auto rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const services = [
  { icon: CreditCard, title: "Business Cards", description: "Premium quality business cards with various finishes including matte, glossy, and soft touch." },
  { icon: FileText, title: "Brochures & Flyers", description: "Eye-catching brochures and flyers that effectively communicate your message." },
  { icon: ImageIcon, title: "Banners & Signage", description: "Large format printing for indoor and outdoor banners, signs, and displays." },
  { icon: Shirt, title: "Custom Merchandise", description: "T-shirts, mugs, caps, and promotional items with your brand identity." },
  { icon: Package, title: "Stationery & Letterheads", description: "Professional letterheads, envelopes, and corporate stationery." },
  { icon: Printer, title: "Large Format Printing", description: "Posters, vinyl wraps, vehicle graphics, and window displays." },
  { icon: BadgeCheck, title: "Packaging & Labels", description: "Custom packaging solutions and product labels for your brand." },
  { icon: Users, title: "Promotional Items", description: "Pens, keychains, USB drives, and more branded merchandise." }
]

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Printing Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We offer a comprehensive range of printing solutions to meet all your business needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
                <CardHeader>
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const features = [
  { icon: BadgeCheck, title: "Quality Guarantee", description: "We stand behind every print with our 100% satisfaction guarantee. If you're not happy, we'll make it right." },
  { icon: Clock, title: "Fast Turnaround", description: "Rush orders available. Most standard orders completed within 24-48 hours." },
  { icon: DollarSign, title: "Competitive Pricing", description: "Best value for premium quality printing. Volume discounts available." },
  { icon: Palette, title: "Expert Design Team", description: "Our in-house designers can bring your vision to life or create something entirely new." }
]

function WhyChooseUsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose 360 Print Works?</h2>
            <p className="text-lg text-gray-600 mb-8">We're not just printers — we're your partners in creating impactful visual communications that drive results.</p>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 bg-white/20 rounded-full mb-6">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">See Our Results</h3>
                <p className="text-blue-100 mb-6">Our clients see an average 40% increase in brand recognition after switching to our print solutions.</p>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">View Case Studies</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const portfolioItems = [
  { title: "Corporate Business Cards", category: "Business Cards", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" },
  { title: "Product Brochure", category: "Brochures", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop" },
  { title: "Event Banner", category: "Banners", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { title: "Custom T-Shirts", category: "Merchandise", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop" },
  { title: "Product Packaging", category: "Packaging", image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400&h=300&fit=crop" },
  { title: "Vinyl Signage", category: "Signage", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" },
]

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse through our recent projects and see the quality of our work.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-blue-300 text-sm font-medium">{item.category}</p>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  { name: "Sarah Johnson", company: "Tech Solutions Inc.", content: "360 Print Works has been our go-to printer for 5 years. Their quality is exceptional and turnaround time is unbeatable. Highly recommend!", rating: 5 },
  { name: "Michael Chen", company: "Chen Marketing Group", content: "The team at 360 Print Works truly understands our brand. They deliver consistent quality on every project, big or small.", rating: 5 },
  { name: "Emily Rodriguez", company: "Rodriguez Real Estate", content: "Fast, professional, and affordable. Our business cards and brochures always make a great first impression on clients.", rating: 5 },
  { name: "David Park", company: "Park & Associates", content: "Outstanding service from start to finish. The design team helped create perfect promotional materials for our event.", rating: 5 }
]

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it — hear from our satisfied customers.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', serviceType: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (response.ok) {
        toast({ title: "Quote Request Submitted!", description: "We'll get back to you within 24 hours." })
        setFormData({ name: '', email: '', phone: '', company: '', serviceType: '', description: '' })
      } else { throw new Error('Failed to submit') }
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit quote request. Please try again.", variant: "destructive" })
    } finally { setIsSubmitting(false) }
  }
  
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Free Quote Today</h2>
            <p className="text-blue-100 text-lg mb-8">Tell us about your project and we'll provide a customized quote within 24 hours.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center"><Phone className="h-6 w-6" /></div><div><p className="text-blue-200 text-sm">Call Us</p><p className="font-semibold">(555) 123-4567</p></div></div>
              <div className="flex items-center gap-4"><div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center"><Mail className="h-6 w-6" /></div><div><p className="text-blue-200 text-sm">Email Us</p><p className="font-semibold">info@360printworks.com</p></div></div>
              <div className="flex items-center gap-4"><div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center"><MapPin className="h-6 w-6" /></div><div><p className="text-blue-200 text-sm">Visit Us</p><p className="font-semibold">123 Print Street, Design City, DC 12345</p></div></div>
            </div>
          </div>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Request a Quote</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you quickly.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">Name *</Label><Input id="name" placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                  <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Type</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                    <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business-cards">Business Cards</SelectItem>
                      <SelectItem value="brochures">Brochures & Flyers</SelectItem>
                      <SelectItem value="banners">Banners & Signage</SelectItem>
                      <SelectItem value="merchandise">Custom Merchandise</SelectItem>
                      <SelectItem value="stationery">Stationery & Letterheads</SelectItem>
                      <SelectItem value="large-format">Large Format Printing</SelectItem>
                      <SelectItem value="packaging">Packaging & Labels</SelectItem>
                      <SelectItem value="promotional">Promotional Items</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label htmlFor="description">Project Description</Label><Textarea id="description" placeholder="Tell us about your project..." rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
                <div className="space-y-2">
                  <Label>Upload File (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Request'}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="360 Print Works" className="h-10 w-auto" />
              <span className="font-bold text-white text-lg">360 Print Works</span>
            </div>
            <p className="text-gray-400 mb-6">Complete printing solutions for businesses of all sizes. Quality guaranteed.</p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Business Cards</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Brochures & Flyers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Banners & Signage</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Custom Merchandise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" />(862) 930-3581</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-blue-400 mt-1" /><span>325 Elmwood Ave<br />East Orange, NJ 07018</span></li>
              <li className="mt-4">
                <h4 className="text-white font-medium mb-2">Hours:</h4>
                <div className="text-gray-400 text-sm space-y-1">
                  <div className="flex justify-between"><span>Mon:</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Tue:</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Wed:</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Thu:</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Fri:</span><span>10 AM – 7 PM</span></div>
                  <div className="flex justify-between"><span>Sat:</span><span>10 AM – 2 PM</span></div>
                  <div className="flex justify-between"><span>Sun:</span><span>Closed</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 360 Print Works. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
