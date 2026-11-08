import React, { useState } from 'react';
import { categories } from './data/categories';
import { products } from './data/products';
import { industries, faqs } from './data/industries';

export default function App() {
  // Global modals and pre-selected values
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quote modal
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState({ name: 'Aura Luxe 5-Star Jacquard Hotel Bath Mat', sku: 'TX-BM-850J' });

  // Sample Swatch Kit modal
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  // Success toast modal
  const [successRef, setSuccessRef] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Interactive Form state
  const [formCategory, setFormCategory] = useState('');
  const [formQuantity, setFormQuantity] = useState(150);
  const [formMessage, setFormMessage] = useState('');

  // Interactive Volume Calculator state
  const [calcVolume, setCalcVolume] = useState(500);

  // Configurator state
  const [configProduct, setConfigProduct] = useState('Institutional Bedsheets (300-600 TC)');
  const [configBranding, setConfigBranding] = useState('Jacquard Woven Crest');
  const [configQty, setConfigQty] = useState(250);

  // Handlers
  const handleSelectCategoryForQuote = (catName) => {
    setFormCategory(catName);
    const element = document.getElementById('bulk-enquiry');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const openQuoteModalFor = (prodName, sku) => {
    setModalItem({ name: prodName, sku });
    setIsQuoteModalOpen(true);
  };

  const handleBulkFormSubmit = (e) => {
    e.preventDefault();
    if (formQuantity < 100) {
      alert("Minimum Order Quantity is 100 pieces for bulk wholesale supply.");
      return;
    }
    const refCode = "TX-RFQ-" + Math.floor(100000 + Math.random() * 900000);
    setSuccessRef(refCode);
    setIsSuccessOpen(true);
    e.target.reset();
    setFormQuantity(150);
  };

  const handleTransferConfig = () => {
    setFormQuantity(configQty);
    setFormCategory('Customized Textile Products');
    setFormMessage(`Configured Custom Spec:\n- Product Line: ${configProduct}\n- Quantity: ${configQty} Pieces\n- Branding: ${configBranding}\n(Please issue institutional proforma quote)`);
    const element = document.getElementById('bulk-enquiry');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered products calculation
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategoryFilter === 'all' || p.category === activeCategoryFilter;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-loom-800 font-sans antialiased selection:bg-gold-light selection:text-loom-950">
      
      {/* Top Bar */}
      <aside aria-label="Announcement" className="bg-loom-950 text-loom-100 text-xs border-b border-loom-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-light border border-gold/30 font-semibold tracking-wider uppercase text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Direct Mill Wholesale
            </span>
            <span className="hidden md:inline text-loom-400">|</span>
            <span className="font-medium text-slate-200">
              <strong className="text-gold-light">MOQ: 100 Pieces</strong> &bull; Bulk Institutional Pricing &bull; Custom Specifications
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs ml-auto sm:ml-0">
            <a href="tel:+919876543210" className="hover:text-gold transition-colors hidden sm:flex items-center gap-1.5">
              <span>+91 98765 43210</span>
            </a>
            <a href="https://wa.me/919876543210?text=Hi%20Texora%20Mills%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20textiles%20(MOQ%20100%2B%20pcs)" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              <span>WhatsApp Procurement</span>
            </a>
            <button onClick={() => setIsSampleModalOpen(true)} className="hidden lg:inline-flex text-gold-light hover:underline font-medium">
              Request Sample Kit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-[38px] z-40 bg-white/95 backdrop-blur-md border-b border-loom-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <a href="#" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-lg bg-loom-950 flex items-center justify-center border border-gold/40 text-gold-light shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.75"/>
                  <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeWidth="1.25" strokeDasharray="1 1"/>
                  <circle cx="12" cy="12" r="2.5" fill="#C5A880" stroke="none"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold tracking-tight text-loom-950 leading-none">TEXORA</span>
                  <span className="text-[10px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 border border-brand-200">MILLS</span>
                </div>
                <p className="text-[11px] font-medium text-loom-500 tracking-wider uppercase mt-1">Textiles &bull; Home Furnishings &bull; B2B</p>
              </div>
            </a>

            <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-loom-700">
              <a href="#categories" className="hover:text-gold-dark transition-colors">Products</a>
              <a href="#industries" className="hover:text-gold-dark transition-colors">Industries We Serve</a>
              <a href="#why-choose-us" className="hover:text-gold-dark transition-colors">Why Choose Us</a>
              <a href="#custom-orders" className="hover:text-gold-dark transition-colors">Custom Manufacturing</a>
              <a href="#featured-products" className="hover:text-gold-dark transition-colors">Product Catalogue</a>
              <a href="#how-to-order" className="hover:text-gold-dark transition-colors">How It Works</a>
              <a href="#quality-trust" className="hover:text-gold-dark transition-colors">Quality & Certs</a>
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <a href="#calculator" className="px-3.5 py-2 text-xs font-semibold rounded-md border border-loom-200 text-loom-700 hover:border-gold hover:text-loom-950 transition-colors">
                Bulk Calculator
              </a>
              <a href="#bulk-enquiry" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md bg-loom-950 text-gold-light hover:bg-loom-900 border border-gold/40 hover:border-gold shadow-md transition-all flex items-center gap-2">
                <span>Get Bulk Quote</span>
                <span className="text-gold">&rarr;</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative bg-loom-950 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/30 text-xs font-semibold tracking-wide text-gold-light mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
            <span>Institutional & Commercial Textile Manufacturer</span>
            <span className="text-white/40">&bull;</span>
            <span className="text-slate-300">ISO 9001:2015 Certified Plant</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-bold leading-[1.1] tracking-tight">
                Premium Textile Solutions <br className="hidden sm:inline" />
                <span className="text-gold-gradient italic font-normal">for Every Business</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                Quality mats, hospitality textiles, bedsheets and customized bulk solutions for hotels, restaurants, wholesalers and businesses.
              </p>

              {/* Crucial Business Model Badge Strip */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-xl">
                <div className="text-xs font-semibold text-gold tracking-widest uppercase mb-2">B2B Wholesale Commitment</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                    <span>Bulk Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold/20 text-gold-light flex items-center justify-center text-xs font-bold">✓</span>
                    <span className="text-gold-light font-bold">MOQ: 100 Pieces</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                    <span>Customization Available</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#featured-products" className="px-7 py-3.5 rounded-lg bg-gold text-loom-950 font-bold text-sm tracking-wide hover:bg-gold-light shadow-lg transition-all flex items-center gap-2">
                  <span>Explore Products</span>
                  <span>&darr;</span>
                </a>
                <a href="#bulk-enquiry" className="px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-gold/60 backdrop-blur-sm transition-all flex items-center gap-2">
                  <span>Request Bulk Quote</span>
                  <span>&rarr;</span>
                </a>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 flex-wrap">
                <span>✓ Factory Direct Pricing</span>
                <span>✓ Pan-India Logistics</span>
                <span>✓ Sample Swatches on Request</span>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/30 bg-loom-900">
                <img 
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" 
                  alt="Luxury Hotel Room with Premium Bedsheets and Floor Rugs" 
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>

          </div>

          {/* Numbers Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-light">100 Pcs</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Accessible MOQ for Businesses</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-light">450+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Hotels, Resorts & Chains Supplied</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-light">150+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Commercial Wash Cycles Endurance</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-light">28 States</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Pan-India Direct Dispatches</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section id="categories" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider">
              Direct Mill Manufacturing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              Product Categories
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              Engineered for high-durability commercial environments, hospitality comfort, and bulk wholesale distribution. Minimum order quantity: 100 pieces per category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-xl overflow-hidden border border-loom-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-52 overflow-hidden bg-loom-100">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-loom-950/80 backdrop-blur-sm text-gold-light text-[10px] font-bold uppercase tracking-wider">
                    {cat.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 text-loom-950 text-[11px] font-bold shadow">
                    MOQ: {cat.moq}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700 mb-1">
                      {cat.target}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-loom-950 group-hover:text-gold-dark transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-loom-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-loom-100 text-[11px] text-loom-500">
                      <strong className="text-loom-800">Specs:</strong> {cat.specs}
                    </div>
                  </div>
                  <button onClick={() => handleSelectCategoryForQuote(cat.name)} className="w-full py-2.5 px-4 rounded-lg bg-loom-950 text-gold-light hover:bg-loom-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    <span>Request Bulk Pricing</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section id="why-choose-us" className="py-20 lg:py-28 bg-white border-y border-loom-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-xs font-bold uppercase tracking-wider">
              Competitive B2B Edge
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              Built for Bulk. Designed for Quality.
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              Why leading hotel chains, restaurant operators, and bulk distributors partner with Texora Textile Mills as their primary manufacturing powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">01</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Premium Quality Materials</h3>
              <p className="text-xs text-loom-600 leading-relaxed">100% Indian and Turkish long-staple ring-spun cotton, high-density non-shed microfibers, and heavy-duty backing.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">02</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Bulk Manufacturing Scale</h3>
              <p className="text-xs text-loom-600 leading-relaxed">State-of-the-art multi-loom automated weaving facility with a monthly capacity of over 1.2 million meters.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">03</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">MOQ from 100 Pieces</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Accessible entry barrier allowing boutique hotels and emerging businesses to source direct factory quality without dead stock.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">04</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Custom Designs & Sizes</h3>
              <p className="text-xs text-loom-600 leading-relaxed">From bespoke runner dimensions to Jacquard woven logo crests and PMS shade matching.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">05</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Wholesale Pricing</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Eliminate distributor markups. Direct-from-manufacturer transparent tier pricing that maximizes client margins.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">06</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Reliable Supply Contracts</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Buffer inventory holding and scheduled batch dispatch options so your hotels never face linen stock-outs.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">07</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Quality Inspection</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Every production batch undergoes yarn tensile tests, dye wash-fastness lab audits, and dimensional stability checks.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-loom-200/80 hover:border-gold hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-lg bg-loom-950 text-gold flex items-center justify-center font-bold">08</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Pan-India & Global Supply</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Contracted fleet and express road freight covering all tier-1, tier-2, and remote resort locations across India.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE */}
      <section id="industries" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider">
              Tailored Institutional Solutions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              We specialize in commercial sectors with strict durability, aesthetics, and bulk supply requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div key={ind.id} className="bg-white rounded-2xl p-7 border border-loom-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-3 bg-brand-50 rounded-xl border border-brand-200">{ind.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark text-[11px] font-bold">{ind.highlight}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-loom-950">{ind.title}</h3>
                    <p className="text-xs font-semibold text-brand-700 mt-1">{ind.tagline}</p>
                  </div>
                  <p className="text-xs text-loom-600 leading-relaxed">{ind.description}</p>
                  <div className="space-y-2 pt-2 border-t border-loom-100">
                    <p className="text-[11px] font-bold text-loom-900 uppercase tracking-wider">Common Deliverables:</p>
                    <ul className="text-xs text-loom-600 space-y-1.5">
                      {ind.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2"><span className="text-gold font-bold">&bull;</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button onClick={() => handleSelectCategoryForQuote(ind.title)} className="w-full py-2.5 rounded-lg border border-loom-950 text-loom-950 hover:bg-loom-950 hover:text-gold-light text-xs font-bold uppercase tracking-wider transition-colors">
                  Request {ind.title} Quote
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CUSTOM BULK ORDERS */}
      <section id="custom-orders" className="py-20 lg:py-28 bg-loom-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-bold uppercase tracking-wider">
                Contract OEM / ODM Weaving
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Your Brand. Your Design. <br />
                <span className="text-gold-gradient italic font-normal">Our Manufacturing.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From luxury hotel monogram crests to private-label barcode packaged retail sets, our factory executes custom weaving, dyeing, and branding to your exacting standards with flexible MOQ starting at just 100 pieces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gold font-bold text-xs uppercase tracking-wider">1. Custom Sizing</span>
                  <h4 className="text-sm font-semibold text-white">Bespoke Dimensions</h4>
                  <p className="text-[11px] text-slate-400">Custom drop lengths for extra deep mattresses, custom runner widths, and bespoke tray placemats.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gold font-bold text-xs uppercase tracking-wider">2. Pantone Dyes</span>
                  <h4 className="text-sm font-semibold text-white">Exact Color Matching</h4>
                  <p className="text-[11px] text-slate-400">Lab-dip color matching against Pantone TCX/TPG references with high wash fastness.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gold font-bold text-xs uppercase tracking-wider">3. Weave & GSM</span>
                  <h4 className="text-sm font-semibold text-white">Tailored Weights</h4>
                  <p className="text-[11px] text-slate-400">From 300 to 600 TC percale, satin stripe, dobby border, waffle, to 1000 GSM heavy bath mats.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gold font-bold text-xs uppercase tracking-wider">4. Branding & Logo</span>
                  <h4 className="text-sm font-semibold text-white">Crests & Labels</h4>
                  <p className="text-[11px] text-slate-400">Jacquard woven crests, high-definition embroidery, debossed leatherette tags, and woven labels.</p>
                </div>
              </div>

              <div className="pt-2">
                <a href="#bulk-enquiry" className="px-7 py-3.5 rounded-lg bg-gold text-loom-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg inline-flex items-center gap-2">
                  <span>Discuss Your Requirement</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Interactive Configurator */}
            <div className="lg:col-span-6">
              <div className="bg-loom-900/90 rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gold-light">Custom Spec Configurator</h3>
                    <p className="text-xs text-slate-400">Select parameters to preview your factory run</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-gold/20 text-gold-light text-[11px] font-bold">MOQ: 100 Pcs</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">Select Product Line</label>
                    <select 
                      value={configProduct} 
                      onChange={(e) => setConfigProduct(e.target.value)}
                      className="w-full bg-loom-950 border border-loom-700 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-gold"
                    >
                      <option value="Institutional Bedsheets (300-600 TC)">Institutional Bedsheets (300-600 TC)</option>
                      <option value="Commercial Bath Mats (700-1000 GSM)">Commercial Bath Mats (700-1000 GSM)</option>
                      <option value="Food Server Mats (Heat Safe Wipe-Clean)">Food Server Mats (Heat Safe Wipe-Clean)</option>
                      <option value="Heavy Entrance Door Mats">Heavy Entrance Door Mats</option>
                      <option value="Floor Rugs & Runners">Commercial Floor Rugs & Runners</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">Branding Method</label>
                      <select 
                        value={configBranding} 
                        onChange={(e) => setConfigBranding(e.target.value)}
                        className="w-full bg-loom-950 border border-loom-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-gold"
                      >
                        <option value="Jacquard Woven Crest">Jacquard Woven Crest</option>
                        <option value="Embroidered Hotel Logo">Embroidered Hotel Logo</option>
                        <option value="Debossed Leatherette Tag">Debossed Leatherette Tag</option>
                        <option value="Woven Brand Label">Woven Brand Label</option>
                        <option value="Unbranded Plain Bulk">Unbranded Plain Bulk</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">Order Quantity</label>
                      <div className="py-2 px-3 bg-loom-950 border border-loom-700 rounded-lg text-gold font-bold text-center">
                        {configQty} Pieces
                      </div>
                    </div>
                  </div>

                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="50" 
                    value={configQty} 
                    onChange={(e) => setConfigQty(Number(e.target.value))}
                    className="w-full accent-gold bg-loom-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="p-4 rounded-xl bg-loom-950 border border-gold/40 space-y-1">
                    <p className="text-slate-400 text-[11px]">Calculated Summary:</p>
                    <p className="text-sm font-semibold text-white">{configQty} pcs of {configProduct} with {configBranding}</p>
                    <p className="text-[11px] text-gold-light">Lead Time: 10 - 15 Business Days &bull; Swatch Approval Included</p>
                  </div>

                  <button 
                    onClick={handleTransferConfig}
                    className="w-full py-3 rounded-lg bg-gold hover:bg-gold-light text-loom-950 font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                  >
                    Transfer Specifications to Quote Form &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS (B2B PRODUCT CATALOGUE) */}
      <section id="featured-products" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider">
                B2B Product Catalogue
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
                Featured Institutional Products
              </h2>
              <p className="text-sm sm:text-base text-loom-600 max-w-xl">
                Factory direct pricing &bull; Rigorous lab tested durability &bull; MOQ 100 Pieces per SKU.
              </p>
            </div>

            <div className="w-full md:w-72">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mats, bedsheets, GSM..." 
                className="w-full bg-white border border-loom-300 rounded-lg px-4 py-2.5 text-xs text-loom-900 focus:outline-none focus:border-gold shadow-sm"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold">
            {['all', 'mats-rugs', 'door-mats', 'bath-mats', 'food-server-mats', 'bedsheets', 'hospitality-textiles', 'restaurant-textiles', 'customized-products'].map(filterKey => (
              <button
                key={filterKey}
                onClick={() => setActiveCategoryFilter(filterKey)}
                className={`px-4 py-2 rounded-lg shrink-0 transition-colors uppercase text-[11px] font-bold ${
                  activeCategoryFilter === filterKey 
                    ? 'bg-loom-950 text-gold-light' 
                    : 'bg-white border border-loom-200 text-loom-700 hover:border-gold'
                }`}
              >
                {filterKey.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-xl overflow-hidden border border-loom-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-56 overflow-hidden bg-loom-100">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-loom-950/80 backdrop-blur-sm text-gold-light text-[10px] font-bold uppercase tracking-wider">
                    {prod.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-white/95 text-loom-950 text-xs font-extrabold shadow-md border border-loom-100">
                    MOQ: {prod.moq}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-loom-500 mb-1 font-mono">
                      <span>{prod.sku}</span>
                      <span className="text-emerald-700 font-semibold font-sans">Lead: {prod.leadTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-loom-950 group-hover:text-gold-dark transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-loom-600 mt-2 font-medium">
                      {prod.specs}
                    </p>
                    <div className="mt-3 pt-3 border-t border-loom-100 text-[11px] text-loom-500 space-y-1">
                      <div><strong className="text-loom-800">Sizes:</strong> {prod.sizes}</div>
                      <div><strong className="text-loom-800">Material:</strong> {prod.material}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button onClick={() => openQuoteModalFor(prod.name, prod.sku)} className="w-full py-2.5 px-3 rounded-lg bg-loom-950 hover:bg-loom-900 text-gold-light text-xs font-bold uppercase tracking-wider transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. HOW TO ORDER */}
      <section id="how-to-order" className="py-20 lg:py-28 bg-white border-y border-loom-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider">
              Streamlined B2B Procurement
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              How to Order in Bulk
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              From technical specification to pan-India freight delivery in 4 clear, transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-loom-200/90 shadow-sm space-y-3">
              <div className="font-serif text-4xl font-bold text-gold/40 mb-4">01</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Share Your Requirement</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Tell us your product category, desired GSM/thread count, dimensions, color preferences, and required quantity (MOQ: 100 Pieces).</p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-loom-200/90 shadow-sm space-y-3">
              <div className="font-serif text-4xl font-bold text-gold/40 mb-4">02</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Get Product & Bulk Quote</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Receive official factory proforma quote with tiered volume pricing, technical spec sheets, and physical sample swatch options.</p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-loom-200/90 shadow-sm space-y-3">
              <div className="font-serif text-4xl font-bold text-gold/40 mb-4">03</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Confirm Your Order</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Finalize pre-production swatch sample approval, branding placement (Jacquard/Embroidery/Labels), and packaging.</p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-loom-200/90 shadow-sm space-y-3">
              <div className="font-serif text-4xl font-bold text-gold/40 mb-4">04</div>
              <h3 className="font-serif text-xl font-bold text-loom-950">Production & Delivery</h3>
              <p className="text-xs text-loom-600 leading-relaxed">Our multi-loom plant executes automated weaving, undergoes strict 4-stage AQL 2.5 QA audit, and dispatches via insured road freight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRUST / QUALITY SECTION */}
      <section id="quality-trust" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-xs font-bold uppercase tracking-wider">
              Quality Assurance & Bull; Institutional Standards
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              Built for Businesses That Value Quality.
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              Engineered to endure heavy commercial wash tunnels, chemical sanitation, and heavy footfall without losing soft hand feel or dimensional stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-loom-200 shadow-sm space-y-2">
              <h4 className="font-serif text-2xl font-bold text-loom-950">ISO 9001:2015</h4>
              <p className="text-xs text-loom-600">Standardized manufacturing protocols across spinning, weaving, finishing, and dispatch.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-loom-200 shadow-sm space-y-2">
              <h4 className="font-serif text-2xl font-bold text-loom-950">OEKO-TEX Standard 100</h4>
              <p className="text-xs text-loom-600">Certified free from harmful chemicals, heavy metals, or toxic azo dyes. Safe for luxury guest contact.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-loom-200 shadow-sm space-y-2">
              <h4 className="font-serif text-2xl font-bold text-loom-950">150+ Commercial Launderings</h4>
              <p className="text-xs text-loom-600">Sanforized pre-shrunk fabrics with less than 2% dimensional change after continuous institutional washing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BULK ENQUIRY FORM */}
      <section id="bulk-enquiry" className="py-20 lg:py-28 bg-white border-t border-loom-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-dark text-xs font-bold uppercase tracking-wider">
              Request Wholesale Pricing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-loom-950 tracking-tight">
              Request a Bulk Quote
            </h2>
            <p className="text-base text-loom-600 leading-relaxed">
              Fill in your institutional procurement details below. Our technical manufacturing desk will issue an official proforma quotation within 24 business hours.
            </p>
            <p className="text-xs font-bold text-gold-dark uppercase tracking-widest">
              Minimum Order Quantity: 100 Pieces per SKU
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#FAF8F5] rounded-2xl p-6 sm:p-10 border border-loom-200/90 shadow-xl">
            <form onSubmit={handleBulkFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Full Name *</label>
                  <input type="text" required placeholder="Rajesh Sharma" className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Company Name *</label>
                  <input type="text" required placeholder="Grand Horizon Resorts" className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Phone / WhatsApp Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Business Email Address *</label>
                  <input type="email" required placeholder="procurement@company.com" className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Business Type *</label>
                  <select required className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold">
                    <option value="" disabled>Select Business Type</option>
                    <option value="Hotels & Resorts">Hotels & Resorts</option>
                    <option value="Restaurants & Cafés">Restaurants & Cafés</option>
                    <option value="Wholesalers & Distributors">Wholesalers & Distributors</option>
                    <option value="Retail Businesses Buying in Bulk">Retail Businesses Buying in Bulk</option>
                    <option value="Interior & Hospitality Projects">Interior & Hospitality Projects</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Product Category *</label>
                  <select 
                    value={formCategory} 
                    onChange={(e) => setFormCategory(e.target.value)}
                    required 
                    className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold"
                  >
                    <option value="">Select Category</option>
                    <option value="Premium Floor Mats and Rugs">Premium Floor Mats and Rugs</option>
                    <option value="Door Mats">Door Mats</option>
                    <option value="Bath Mats">Bath Mats</option>
                    <option value="Food Server Mats / Serving Mats">Food Server Mats / Serving Mats</option>
                    <option value="Bedsheets">Bedsheets</option>
                    <option value="Hotel Textile Products">Hotel Textile Products</option>
                    <option value="Restaurant Textile Products">Restaurant Textile Products</option>
                    <option value="Customized Textile Products">Customized Textile Products</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-loom-700">Required Quantity *</label>
                    <span className="text-[11px] font-bold text-gold-dark">MOQ: 100 Pieces</span>
                  </div>
                  <input 
                    type="number" 
                    min="100" 
                    value={formQuantity} 
                    onChange={(e) => setFormQuantity(Number(e.target.value))}
                    required 
                    className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Customization Requirement</label>
                  <select className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold">
                    <option value="Standard Specifications">Standard Specifications</option>
                    <option value="Custom Sizes & Dimensions">Custom Sizes & Dimensions</option>
                    <option value="Jacquard Woven Logo / Crest">Jacquard Woven Logo / Crest</option>
                    <option value="Pantone PMS Color Matched">Pantone PMS Color Matched</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-loom-700 mb-2">Detailed Specifications / Message</label>
                <textarea 
                  rows={4} 
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Mention desired sizes, GSM preferences, color shades, delivery timeline..." 
                  className="w-full bg-white border border-loom-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-loom-900 focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-loom-950 text-gold-light hover:bg-loom-900 font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Get a Bulk Quote</span>
                <span>&rarr;</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 10. COMPREHENSIVE FOOTER */}
      <footer className="bg-loom-950 text-slate-300 border-t border-loom-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">TEXORA MILLS</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct institutional textile manufacturer specializing in bulk supply of premium floor mats, door mats, bath mats, food server mats, bedsheets, and custom contract hospitality products.
              </p>
              <p className="text-xs text-gold-light"><strong>MOQ:</strong> 100 Pieces per SKU</p>
            </div>

            <div className="space-y-3">
              <p className="font-serif text-base font-bold text-white tracking-wider uppercase text-xs">Categories</p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><a href="#categories" className="hover:text-gold">Floor Mats & Rugs</a></li>
                <li><a href="#categories" className="hover:text-gold">Door Mats</a></li>
                <li><a href="#categories" className="hover:text-gold">Bath Mats</a></li>
                <li><a href="#categories" className="hover:text-gold">Food Server Mats</a></li>
                <li><a href="#categories" className="hover:text-gold">Bedsheets</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-serif text-base font-bold text-white tracking-wider uppercase text-xs">Industries</p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><a href="#industries" className="hover:text-gold">Hotels & Resorts</a></li>
                <li><a href="#industries" className="hover:text-gold">Restaurants & Cafés</a></li>
                <li><a href="#industries" className="hover:text-gold">Wholesalers & Distributors</a></li>
                <li><a href="#industries" className="hover:text-gold">Retail Businesses</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-serif text-base font-bold text-white tracking-wider uppercase text-xs">Contact & Plant</p>
              <div className="text-xs space-y-2 text-slate-400">
                <p>Plot 42-45, Textile Industrial Park, Surat, Gujarat</p>
                <p>Phone: +91 98765 43210</p>
                <p>Email: bulkorders@texoratextiles.com</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; 2026 TEXORA TEXTILE MILLS. All Rights Reserved. Institutional B2B Wholesale Manufacturer.</p>
            <p>MOQ: 100 Pieces &bull; Pan-India Dispatch</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Pill */}
      <aside aria-label="WhatsApp Procurement" className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/919876543210?text=Hi%20Texora%20Mills%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20textiles%20(MOQ%20100%2B%20pcs)"
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-2xl transition-all"
        >
          <span>WhatsApp Procurement</span>
        </a>
      </aside>

      {/* Quick Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-loom-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-loom-200 shadow-2xl relative space-y-4">
            <button onClick={() => setIsQuoteModalOpen(false)} className="absolute top-4 right-4 text-loom-400 hover:text-loom-900 text-lg">&times;</button>
            <h3 className="font-serif text-2xl font-bold text-loom-950">{modalItem.name}</h3>
            <p className="text-xs text-loom-500">SKU: {modalItem.sku} | Minimum Order: 100 Pieces</p>
            <form onSubmit={(e) => { e.preventDefault(); setIsQuoteModalOpen(false); setSuccessRef('TX-QUICK-' + Math.floor(100000 + Math.random() * 900000)); setIsSuccessOpen(true); }} className="space-y-3 text-xs">
              <input type="text" required placeholder="Company / Hotel Name" className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5" />
              <input type="tel" required placeholder="Phone / WhatsApp" className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5" />
              <input type="number" min="100" defaultValue="100" required className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5" />
              <button type="submit" className="w-full py-3 bg-loom-950 text-gold-light font-bold uppercase rounded-lg text-xs">Send Quote Request</button>
            </form>
          </div>
        </div>
      )}

      {/* Sample Kit Modal */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 bg-loom-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-loom-200 shadow-2xl relative space-y-4">
            <button onClick={() => setIsSampleModalOpen(false)} className="absolute top-4 right-4 text-loom-400 hover:text-loom-900 text-lg">&times;</button>
            <h3 className="font-serif text-2xl font-bold text-loom-950">Request Physical Sample Swatch Box</h3>
            <p className="text-xs text-loom-600">Sample kits dispatched within 48 hours for verified commercial buyers.</p>
            <form onSubmit={(e) => { e.preventDefault(); setIsSampleModalOpen(false); alert("Sample box request received! We will send AWB tracking details shortly."); }} className="space-y-3 text-xs">
              <input type="text" required placeholder="Company / Organization Name" className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5" />
              <input type="tel" required placeholder="Contact Phone" className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5" />
              <textarea required rows={2} placeholder="Full Delivery Address" className="w-full bg-[#FAF8F5] border border-loom-300 rounded-lg p-2.5"></textarea>
              <button type="submit" className="w-full py-3 bg-loom-950 text-gold-light font-bold uppercase rounded-lg text-xs">Dispatch Sample Box</button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 bg-loom-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 border border-loom-200 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
            <h3 className="font-serif text-2xl font-bold text-loom-950">Bulk Quote Request Received</h3>
            <p className="text-xs text-loom-600">Your Reference ID: <strong className="text-brand-900">{successRef}</strong></p>
            <p className="text-xs text-loom-500">Our commercial sales team will issue an official proforma quote within 24 business hours.</p>
            <button onClick={() => setIsSuccessOpen(false)} className="w-full py-2.5 bg-loom-950 text-gold-light font-bold text-xs uppercase rounded-lg">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
