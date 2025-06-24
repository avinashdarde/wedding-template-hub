import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Heart, WandSparkles, X, Copy } from 'lucide-react';

// टेम्पलेट का डेटा अब सिर्फ 3 श्रेणियों के लिए है
const templatesData = [
    // Invitations
    { id: 1, name: 'Classic Floral Invitation', previewImages: ['https://images.unsplash.com/photo-1593563919199-35f6f477a3ce?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PSD: '#', JPG: '#', PNG: '#' }, category: 'Invitations', aiPrompt: `Draft a formal wedding invitation for [FEMALE_NAME] and [MALE_NAME], who are getting married on [WEDDING_DATE] at [ADDRESS]. Request guests' presence to celebrate their union. Ensure the tone is elegant and traditional.` },
    { id: 7, name: 'Watercolor Invitation Suite', previewImages: ['https://images.unsplash.com/photo-1494809610214-f42a22be22b5?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', aiPrompt: `Draft a modern, watercolor-themed wedding invitation for [FEMALE_NAME] and [MALE_NAME]'s wedding on [WEDDING_DATE] at [ADDRESS]. Emphasize an artistic and fluid style in the wording.` },

    // Save the Date
    { id: 2, name: 'Modern Geometric Save-the-Date', previewImages: ['https://images.unsplash.com/photo-1560962827-2a68f4e20557?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { EPS: '#', PNG: '#' }, category: 'Save-the-Date', aiPrompt: `Create a concise and modern save-the-date message for [FEMALE_NAME] and [MALE_NAME]'s wedding. The date is [WEDDING_DATE]. Mention that formal invitations will follow. Keep it short and chic.` },
    { id: 8, name: 'Vintage Save-the-Date Postcard', previewImages: ['https://images.unsplash.com/photo-1530053335839-a35af3d7a8d5?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', aiPrompt: `Write a charming, vintage-style save-the-date postcard message for [FEMALE_NAME] and [MALE_NAME]'s wedding on [WEDDING_DATE]. Keep it sweet and nostalgic.` },

    // Clipart
    { id: 9, name: 'Wedding Rings Clipart', previewImages: ['https://images.unsplash.com/photo-1598818382438-654f024e0b82?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', EPS: '#' }, category: 'Clipart', aiPrompt: `Generate a short, cheerful caption for a wedding clipart featuring two interlocking rings.` },
    { id: 10, name: 'Just Married Car Clipart', previewImages: ['https://images.unsplash.com/photo-1541334823339-3837130a1f59?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', SVG: '#' }, category: 'Clipart', aiPrompt: `Create a fun and celebratory message for a clipart showing a "Just Married" car.` },
    { id: 11, name: 'Flower Bouquets Clipart', previewImages: ['https://images.unsplash.com/photo-1565982120808-41270b15b5a2?q=80&w=1887&auto=format&fit=crop'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', aiPrompt: `Write a simple, elegant description for a beautiful floral bouquet clipart.` }
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
  // यहाँ बदलाव किया गया है: py-20 md:py-32 को py-12 md:py-16 कर दिया है
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden group relative transform transition-transform duration-300 hover:-translate-y-2">
      <div className="aspect-square">
        <img
          src={template.previewImages[0]}
          alt={`${template.name} Preview`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found`; }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white text-lg font-bold mb-2">{template.name}</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => onOpenModal(template, 'download')} className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
              <Download size={20} />
            </button>
            <button onClick={() => onOpenModal(template, 'ai')} className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
              <WandSparkles size={20} />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors ml-auto">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, template, mode, setToastMessage }) {
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [address, setAddress] = useState('');
  const [aiGeneratedText, setAiGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setMaleName('');
      setFemaleName('');
      setWeddingDate('');
      setAddress('');
      setAiGeneratedText('');
      setAiError('');
      setIsGenerating(false);
    }
  }, [isOpen]);

  if (!isOpen || !template) return null;

  const handleGenerateWithAI = async () => {
    if (!maleName.trim() || !femaleName.trim() || !weddingDate.trim() || !address.trim()) {
      setAiError('Please fill in all details.');
      return;
    }
    if (!template.aiPrompt) {
      setAiError('This template does not have an AI prompt configured.');
      return;
    }
    setAiGeneratedText('');
    setAiError('');
    setIsGenerating(true);
    try {
      let personalizedPrompt = template.aiPrompt.replace(/\[MALE_NAME\]/g, maleName).replace(/\[FEMALE_NAME\]/g, femaleName).replace(/\[WEDDING_DATE\]/g, weddingDate).replace(/\[ADDRESS\]/g, address);
      const payload = { contents: [{ role: "user", parts: [{ text: personalizedPrompt }] }] };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        setAiGeneratedText(result.candidates[0].content.parts[0].text);
      } else {
        setAiError('Could not generate text. Please try again.');
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiError(`Failed to generate content: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (aiGeneratedText) {
      const textarea = document.createElement('textarea');
      textarea.value = aiGeneratedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setToastMessage('Copied to clipboard!');
    }
  };

  const renderContent = () => {
    if (mode === 'download') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Download {template.name}</h3>
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
    }
    if (mode === 'ai') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Personalize with AI</h3>
          <p className="text-gray-500 text-sm mb-4">Enter details to generate content for '{template.name}'</p>
          <div className="space-y-3">
            <input type="text" placeholder="Male's Name" value={maleName} onChange={(e) => setMaleName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500" />
            <input type="text" placeholder="Female's Name" value={femaleName} onChange={(e) => setFemaleName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500" />
            <input type="text" placeholder="Wedding Date (e.g., June 20, 2026)" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500" />
            <input type="text" placeholder="Address / Venue" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500" />
          </div>
          <button onClick={handleGenerateWithAI} disabled={isGenerating} className="w-full mt-4 bg-violet-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <WandSparkles size={20} /> {isGenerating ? 'Generating...' : 'Generate Text'}
          </button>
          {aiError && <p className="text-red-600 text-xs mt-2 text-center">{aiError}</p>}
          {aiGeneratedText && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="whitespace-pre-wrap text-gray-700 mb-3 text-sm">{aiGeneratedText}</p>
              <button onClick={copyToClipboard} className="w-full bg-gray-600 text-white text-xs py-2 rounded-full hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2">
                <Copy size={14} /> Copy Text
              </button>
            </div>
          )}
        </div>
      );
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

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fadeIn">
      {message}
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalMode, setModalMode] = useState('download');
  const [toastMessage, setToastMessage] = useState('');

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = useMemo(() => ['All', ...new Set(templatesData.map(t => t.category))], []);

  const handleOpenModal = (template, mode) => {
    setSelectedTemplate(template);
    setModalMode(mode);
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
        mode={modalMode}
        setToastMessage={setToastMessage}
      />
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
}

export default App;
