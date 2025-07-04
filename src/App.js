import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Heart, X, MessageSquare, Gift, Send, Wallet, ChevronDown, Menu } from 'lucide-react';

// Placeholder for your details. Update this.
const YOUR_WHATSAPP_NUMBER = "919075469856"; // Replace with your WhatsApp number

const initialTemplatesData = [
    // =================================================================
    // ======================= INVITATIONS CATEGORY ======================
    // =================================================================
    { id: 1, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/mrMFDSyT/wedding-tamplate.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1a8VNOPrTqV-vRekfjhrKvL2SgR2COjG0/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1JXz_Pmn5Zx0euBbM0rVB052JD-LMjjE5/view?usp=sharing' }, category: 'Invitations', likes: 252 },
    { id: 2, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/4RJs9Yyt/wedding-invitation-tamplate.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1ysLv_Up-d-jv8t9soRMZqJ-bh-yps8bX/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1AmUoEiHsYKhnxarGlZ4iRrPG4XdMNJBt/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 3, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/hxhx18Pz/wedding-invitation-tamplate.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1TGOccFkayTgzvvZZ5A7TNK_1ZFl3cFtl/view?usp=sharing', JPG: 'https://drive.google.com/file/d/14FGucMO0lOqSAxp9M4U9T2UCgmeOAw_R/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 4, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/qMB154xY/wedding-invitation-tamplate.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/17xxGUfyT8nzw6nEirOTHYXuYYR_gOkPU/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1QYuxf6KzrDok7OplAckJQrBB1DauV9Cf/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 5, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/Jj09Pc1r/wedding-invitation-tamplate.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1FloCAxC6yS2oDqmxG6bMdW54XkawulBj/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1PMNoWGuMi8V0xpOW1tMP8C6xtZS_4F88/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 6, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/Mxr6qg9S/wedding-invitation-tamplate-2.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/17kkYdULTchx7GnSJ2QfIf5rKbfKguLcl/view?usp=sharing', JPG: 'https://drive.google.com/file/d/16kualdL7QjmYuFm99Ets7csoUoiktemf/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 7, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/VcdTrZbr/wedding-invitation-tamplate-3.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1CXR71t0f85BfGP-mAlZ9Eqk8CBTbMj9j/view?usp=sharing', JPG: 'https://drive.google.com/file/d/11dfkvdFUxLH2CQwTcVNDyR6b8sUT69SP/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 8, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/hxW9Z1R2/wedding-invitation-tamplate-5.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1oknQgcFKigEl7YVPw6hB-tXbvUJcQjPi/view?usp=sharing', JPG: 'https://drive.google.com/file/d/17EM79qr8dlEB5oKNeE3ZRq9c2iMJiwM5/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 9, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/twbgvCJG/wedding-invitation-tamplate-6.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1GbELy1c757dWn4xLCujO09Vr4QVzthdc/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1J-LEncEzpuUF0R_eAMWQpkbXfZYGda18/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 10, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/213XmTWk/wedding-invitation-tamplate-4.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1Xf-rZCuaJu2eCtmb5TeugXdLOTSy7btw/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1tUPT8NIQcMRuQyxRLRQxpZg2hXYdCKeb/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 11, name: 'Classic Invitation Template', price: '80', previewImages: ['https://i.ibb.co/q3Fk5X32/wedding-invitation-tamplate-7.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1-gvnEP6ocCT1MXToLqgjz6dABL_jPfyo/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1bNfFhI1uo_wiWC4--K6A7FCB_GI4uIi2/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 12, name: 'Classic Invitation Template', price: '80', previewImages: ['#'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },

    { id: 1001, name: 'Modern Geometric Save-the-Date', price: '99', previewImages: ['https://images.unsplash.com/photo-1560962827-2a68f4e20557?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { EPS: '#', PNG: '#' }, category: 'Save-the-Date', likes: 198 },
    { id: 1002, name: 'Vintage Save-the-Date Postcard', price: '149', previewImages: ['https://images.unsplash.com/photo-1530053335839-a35af3d7a8d5?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },

    { id: 2001, name: 'Wedding couple Clipart', price: '49', previewImages: ['https://i.ibb.co/twRmgSRQ/wedding-couple-Illutraction-67.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1F3KaJ3DM_ujUI3GvV9D1pP60eu-K05RX/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1zQ6WgAF1TiJJSj_hUeRXAsKLO8K9LtPy/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1BbAezaAna-BnWhKbS4rfm2EYMY54jPkl/view?usp=sharing' }, category: 'Clipart', likes: 88 },
    { id: 2002, name: 'Just Married Car Clipart', price: '49', previewImages: ['https://i.ibb.co/5gj7xmyT/wedding-couple-Illutraction-66.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/17Ye3NKyku0EEbG_0Ytkb9WQW60FfY0m0/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1Aw3-u9zAW2gp-LQATC4PT9n7m151ucDU/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1QMKznT7OPIOmX6y2FLE8gyu29UrGUcCr/view?usp=sharing' }, category: 'Clipart', likes: 123 },
    { id: 2003, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/spTTffW7/wedding-couple-Illutraction-65.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/19jH3-VlERrLez3p2fDjI47icGUl_r5AH/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1o9Vkcf0eRia2ZBKjj2W9lvsB5jgARdra/view?usp=sharing', JPG: 'https://drive.google.com/file/d/13DOC_xRcwwm9i4dipAKPqFggfOPVtCf4/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2004, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/KjShRcLM/wedding-couple-Illutraction-64.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/186Pu9G4r_R30Vx8aiwgbwOX1yetp1oEk/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1IuQCYoK3VB-rj5wcsVqI2v2bAH0-brVn/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1C48QboOGfA2Duim2CVjycTQuzs6UcRDq/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2005, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/zTn9X47H/wedding-couple-Illutraction-63.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1XwlDXNMgehZH84alkvZpHFO68WvBX8Y6/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1MTWVMZDaEK1dFz8-oebmiIlZXW6-FiwV/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1tWuLrMlvOeaO8z2zdZJY8udnovZAKyN3/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2006, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/WWGbLHpb/wedding-couple-Illutraction-62.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1xb6h7DIii7W8GFZz_Uuh4-cXWud_-Fmw/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1g3iu6YvUIng8W3OXPR0e29wsRKvmmLwA/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1RCxJGNGF7T7vpFRSY-0D_LXxTVfPuu8G/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2007, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/spTTffW7/wedding-couple-Illutraction-65.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2008, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/spTTffW7/wedding-couple-Illutraction-65.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2009, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['https://i.ibb.co/spTTffW7/wedding-couple-Illutraction-65.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2010, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['#'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2011, name: 'Flower Bouquets Clipart', price: '49', previewImages: ['#'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 }
];

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#6d28d9"/>
        <path d="M24 30L42 80L52 55L62 80L80 30" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M80 55H100" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <path d="M90 30V80" stroke="white" strokeWidth="12" strokeLinecap="round"/>
    </svg>
);

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('Home')}>
          <Logo />
          <span className="text-xl font-bold text-violet-700">WeddingTemplateHub</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('Home'); }} className="text-gray-600 hover:text-violet-700 transition-colors">Home</a>
          <a href="#templates" onClick={(e) => { e.preventDefault(); handleLinkClick('Templates'); }} className="text-gray-600 hover:text-violet-700 transition-colors">Templates</a>
          <a href="#howitworks" onClick={(e) => { e.preventDefault(); handleLinkClick('HowItWorks'); }} className="text-gray-600 hover:text-violet-700 transition-colors">How It Works</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); handleLinkClick('FAQ'); }} className="text-gray-600 hover:text-violet-700 transition-colors">FAQ</a>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center p-4">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('Home'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Home</a>
          <a href="#templates" onClick={(e) => { e.preventDefault(); handleLinkClick('Templates'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Templates</a>
          <a href="#howitworks" onClick={(e) => { e.preventDefault(); handleLinkClick('HowItWorks'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">How It Works</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); handleLinkClick('FAQ'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">FAQ</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('About'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">About Us</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('Contact'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Contact Us</a>
        </div>
      )}
    </header>
  );
};

function TemplateCard({ template, onOpenModal, onLike }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group relative transform transition-transform duration-300 hover:-translate-y-2">
      <div onClick={() => onOpenModal(template)} className="aspect-square cursor-pointer">
        <img
          src={template.previewImages[0]}
          alt={`${template.name} Preview`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found`; }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 pointer-events-none">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">{template.name}</h3>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onLike(template.id); }}
        className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors flex items-center gap-1.5 pointer-events-auto opacity-0 group-hover:opacity-100"
      >
        <Heart size={20} />
        <span className="text-sm font-semibold">{template.likes}</span>
      </button>
    </div>
  );
}

function Modal({ isOpen, onClose, template }) {
    const [modalView, setModalView] = useState('main');

    useEffect(() => {
        if (isOpen) {
          setModalView('main');
        }
    }, [isOpen]);

    if (!isOpen || !template) return null;

    const renderMainView = () => {
        const isCustomizable = template.category === 'Invitations' || template.category === 'Save-the-Date';
        const whatsappMessage = `Hi, I want to customise template ID: ${template.id} - ${template.name}. Please provide payment details.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`;

        return (
            <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{template.name}</h3>
                 {isCustomizable ? (
                    <div className="space-y-4">
                        <div className="text-center p-4 bg-violet-50 rounded-lg">
                            <h4 className="font-bold text-lg text-violet-800">Customization Price: ₹{template.price}</h4>
                            <ol className="text-left mt-4 space-y-2 text-gray-600 list-decimal list-inside">
                                <li>Click the WhatsApp button below.</li>
                                <li>Send the pre-filled message with your details.</li>
                                <li>Make the payment on the UPI ID I provide on WhatsApp.</li>
                                <li>You will receive your design within 30 minutes!</li>
                            </ol>
                        </div>
                         <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300">
                            <MessageSquare size={20}/> Chat on WhatsApp to Customise
                        </a>
                        <button onClick={() => setModalView('download')} className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300">
                            <Download size={20}/> Download Open Files
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <button onClick={() => setModalView('download')} className="w-full flex items-center justify-center gap-3 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300">
                            <Download size={20}/> Download Open Files
                        </button>
                    </div>
                )}
            </>
        );
    };

    const renderDownloadView = () => (
       <div>
          <button onClick={() => setModalView('main')} className="text-sm text-violet-600 mb-3">&larr; Back</button>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Download Open Files - {template.name}</h3>
          <div className="flex flex-col gap-3">
              {Object.entries(template.downloadFormats).map(([format, link]) => (
                   link && (
                      <a key={format} href={link} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full text-center bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300">
                          Download .{format}
                      </a>
                  )
              ))}
          </div>
      </div>
    );

    const renderContent = () => {
      switch (modalView) {
          case 'download': return renderDownloadView();
          default: return renderMainView();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
          {renderContent()}
        </div>
      </div>
    );
}

const HomePage = ({ templates, onOpenModal, onLike, onNavigate }) => {
    const topTemplates = useMemo(() => 
        [...templates].sort((a, b) => b.likes - a.likes).slice(0, 3), 
        [templates]
    );

    return (
        <>
            <div className="relative text-center py-16 md:py-24 bg-violet-50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Your Vision, Our Templates</h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        ₹80 me apni shadi ka unique invitation design banao – bas template select karo, details bhejo, aur 1 ghante me design pao.
                    </p>
                     <button onClick={() => onNavigate('Templates')} className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-all text-lg">
                        Explore All Templates
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Top Liked Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topTemplates.map(template => (
                        <TemplateCard key={template.id} template={template} onOpenModal={onOpenModal} onLike={onLike} />
                    ))}
                </div>
            </div>
        </>
    );
};

const TemplatesPage = ({ templates, onOpenModal, onLike }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
          const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, templates]);

    const categories = useMemo(() => ['All', ...new Set(initialTemplatesData.map(t => t.category))], []);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="relative max-w-2xl mx-auto mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search for invitations, cards, menus..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-base transition-all duration-300 shadow-sm ${selectedCategory === category ? 'bg-violet-600 text-white ring-2 ring-offset-2 ring-violet-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                {category}
                </button>
            ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onOpenModal={onOpenModal} onLike={onLike} />
                ))
            ) : (
                <div className="col-span-full text-center text-xl text-gray-500 py-10">
                No templates found. Try a different search or category.
                </div>
            )}
            </div>
        </div>
    );
};

const HowItWorksPage = () => {
    const steps = [
        { icon: <Search size={40} className="text-violet-500" />, title: "1. Choose Template", description: "Browse our collection and select the perfect design for your occasion." },
        { icon: <Send size={40} className="text-violet-500" />, title: "2. Send Details", description: "Click on 'Chat on WhatsApp' and send us your details like names, date, venue, etc." },
        { icon: <Wallet size={40} className="text-violet-500" />, title: "3. Make Payment", description: "We will provide you with our UPI ID on WhatsApp for you to complete the payment." },
        { icon: <Gift size={40} className="text-violet-500" />, title: "4. Get Your Design", description: "Within 1:00 hours, you will receive your beautifully customized design on WhatsApp!" }
    ];

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center text-violet-700">How It Works</h1>
            <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="flex justify-center items-center h-20 w-20 mx-auto bg-violet-100 rounded-full mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        { q: "How much time does it take to get the design?", a: "You will receive your customized design on WhatsApp within 1:00 hours after you provide your details and complete the payment." },
        { q: "In which format will I receive the files?", a: "You will receive a high-quality JPG or PNG file, perfect for sharing on social media or for printing." },
        { q: "How do I make the payment?", a: "After you send us your details on WhatsApp, we will provide our UPI ID for payment. You can pay using any UPI app like Google Pay, PhonePe, or Paytm." },
        { q: "Can I ask for changes after receiving the design?", a: "Yes, one round of minor revisions (like correcting a spelling mistake) is included in the price. Major design changes will be extra." }
    ];

    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center text-violet-700">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                        <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 text-left">
                            <span className="font-semibold text-lg">{faq.q}</span>
                            <ChevronDown className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openFAQ === index && (
                            <div className="p-4 bg-gray-50 text-gray-700">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutUsPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">About Us</h1> <div className="space-y-4 text-lg text-gray-700"> <p>Welcome to WeddingTemplateHub! We are passionate about making your special day even more beautiful with our stunning collection of wedding templates.</p> <p>Our mission is to provide high-quality, easily customizable templates for invitations, save-the-dates, and more, helping you create a cohesive and elegant theme for your wedding without the hassle.</p> <p>Founded by a team of designers and wedding enthusiasts, we understand the importance of details. That's why every template is crafted with love, care, and a keen eye for modern trends and timeless elegance.</p> </div> </div> );
const ContactUsPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Contact Us</h1> <div className="space-y-4 text-lg text-gray-700"> <p>We'd love to hear from you! Whether you have a question about our templates, a suggestion, or need help with a custom order, feel free to reach out.</p> <p><strong>Email:</strong> <a href="mailto:graphifly333@gmail.com" className="text-violet-600 hover:underline">graphifly333@gmail.com</a></p> <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${YOUR_WHATSAPP_NUMBER}`} className="text-violet-600 hover:underline">+{YOUR_WHATSAPP_NUMBER}</a></p> <p><strong>Address:</strong> G-13 First Floor, Dipashri Marigold, Lanja, Ratnagiri, Maharashtra-416701</p> <p>We typically respond within 24 hours.</p> </div> </div> );
const PrivacyPolicyPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Privacy Policy</h1> <div className="space-y-4 text-gray-700"> <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.</p> <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2> <p>We may collect personal information such as your name and email address when you contact us. For payment transactions, you will be redirected to our payment partner, Razorpay, and we do not store your financial details.</p> <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2> <p>We use the information we collect to respond to your inquiries, process your customization orders, and improve our services.</p> </div> </div> );
const DisclaimerPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Disclaimer</h1> <div className="space-y-4 text-gray-700"> <p>The information provided by WeddingTemplateHub is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p> <p>The "Download Open Files" option provides demo files. These files are for personal use only and may not be redistributed or resold. For customized, high-resolution files, please use the "Customise & Pay" service.</p> </div> </div> );


function App() {
  const [templates, setTemplates] = useState(initialTemplatesData);
  const [currentPage, setCurrentPage] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  const handleLikeClick = (templateId) => {
    setTemplates(currentTemplates =>
      currentTemplates.map(t =>
        t.id === templateId ? { ...t, likes: t.likes + 1 } : t
      )
    );
  };

  const handleOpenModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'Home': return <HomePage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} onNavigate={handleNavigate} />;
        case 'Templates': return <TemplatesPage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} />;
        case 'HowItWorks': return <HowItWorksPage />;
        case 'FAQ': return <FAQPage />;
        case 'About': return <AboutUsPage />;
        case 'Contact': return <ContactUsPage />;
        case 'Privacy': return <PrivacyPolicyPage />;
        case 'Disclaimer': return <DisclaimerPage />;
        default: return <HomePage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-gray-200 p-6 mt-10 text-center text-gray-500">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavigate('Home'); }} className="text-gray-600 hover:text-violet-700">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigate('About'); }} className="text-gray-600 hover:text-violet-700">About Us</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('Contact'); }} className="text-gray-600 hover:text-violet-700">Contact Us</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavigate('Privacy'); }} className="text-gray-600 hover:text-violet-700">Privacy Policy</a>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleNavigate('Disclaimer'); }} className="text-gray-600 hover:text-violet-700">Disclaimer</a>
        </div>
        <p>&copy; {new Date().getFullYear()} WeddingTemplateHub. All rights reserved.</p>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        template={selectedTemplate}
      />
    </div>
  );
}

export default App;
