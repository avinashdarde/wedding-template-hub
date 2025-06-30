import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Heart, X, ShoppingCart } from 'lucide-react';

const templatesData = [
    { id: 1, name: 'Classic Floral Invitation', price: '80', paymentLink: 'https://rzp.io/rzp/D4GOvlKM', previewImages: ['https://i.ibb.co/mrMFDSyT/wedding-tamplate.jpg'], downloadFormats: { PSD: '#', JPG: '#', PNG: '#' }, category: 'Invitations' },
    { id: 7, name: 'Watercolor Invitation Suite', price: '249', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1494809610214-f42a22be22b5?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations' },
    { id: 2, name: 'Modern Geometric Save-the-Date', price: '99', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1560962827-2a68f4e20557?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { EPS: '#', PNG: '#' }, category: 'Save-the-Date' },
    { id: 8, name: 'Vintage Save-the-Date Postcard', price: '149', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1530053335839-a35af3d7a8d5?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date' },
    { id: 9, name: 'Wedding Rings Clipart', price: '49', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1598818382438-654f024e0b82?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', EPS: '#' }, category: 'Clipart' },
    { id: 10, name: 'Just Married Car Clipart', price: '49', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1541334823339-3837130a1f59?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', SVG: '#' }, category: 'Clipart' },
    { id: 11, name: 'Flower Bouquets Clipart', price: '49', paymentLink: '#', previewImages: ['https://images.unsplash.com/photo-1565982120808-41270b15b5a2?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart' }
];

const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="https://placehold.co/40x40/6d28d9/ffffff?text=W" alt="Logo" className="h-10 w-10 rounded-lg"/>
        <span className="text-xl font-bold text-violet-700">WeddingTemplateHub</span>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-gray-600 hover:text-violet-700 transition-colors">Templates</a>
        <a href="/" className="text-gray-600 hover:text-violet-700 transition-colors">AI Tools</a>
        <a href="/" className="text-gray-600 hover:text-violet-700 transition-colors">Pricing</a>
        <a href="/" className="bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-700 transition-all">Sign Up</a>
      </nav>
    </div>
  </header>
);

const HeroSection = ({ searchTerm, setSearchTerm }) => (
  <section className="relative text-center py-12 md:py-16 bg-violet-50 overflow-hidden">
    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
    <div className="container mx-auto px-6 relative z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Your Vision, Our Templates</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Discover millions of stunning, ready-to-use wedding templates.
      </p>
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        <input
          type="text"
          placeholder="Search for invitations, cards, menus..."
          className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </section>
);

function TemplateCard({ template, onOpenModal }) {
  return (
    <div onClick={() => onOpenModal(template)} className="bg-white rounded-xl shadow-md overflow-hidden group relative transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
      <div className="aspect-square">
        <img
          src={template.previewImages[0]}
          alt={`${template.name} Preview`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found`; }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">{template.name}</h3>
          <div className="flex items-center gap-2">
             <span className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full">
                <Heart size={20} />
             </span>
          </div>
        </div>
      </div>
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

    const renderMainView = () => (
        <>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{template.name}</h3>
            <div className="space-y-4">
                <a href={template.paymentLink === '#' ? null : template.paymentLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 ${template.paymentLink === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                   onClick={(e) => template.paymentLink === '#' && e.preventDefault()}
                >
                    <ShoppingCart size={20}/> Customise & Pay ₹{template.price}
                </a>
                <button onClick={() => setModalView('download')} className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300">
                    <Download size={20}/> Download Open Files
                </button>
            </div>
        </>
    );

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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = useMemo(() => ['All', ...new Set(templatesData.map(t => t.category))], []);

  const handleOpenModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main>
        <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="container mx-auto px-6 py-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onOpenModal={handleOpenModal} />
              ))
            ) : (
              <div className="col-span-full text-center text-xl text-gray-500 py-10">
                No templates found. Try a different search or category.
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 p-6 mt-10 text-center text-gray-500">
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
