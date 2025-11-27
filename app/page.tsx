"use client"; // <--- THIS LINE IS CRITICAL FOR USING useState AND EVENT HANDLERS
import React, { useState, useCallback } from 'react';

// === Type Definitions (CRITICAL for .tsx files) ===

// 1. Define types for the Icon component props
interface IconProps {
    iconName: 'target' | 'code' | 'database' | 'bolt';
    className?: string; // className is optional
}

// 2. Define types for the Feature Card component props
interface FeatureCardProps {
    iconName: IconProps['iconName']; // Reusing the icon type
    title: string;
    description: string;
}

// === Reusable Components ===

// Icon Component
// FIX 1: Removed React.FC and explicitly defined return type for stricter TS compilation
const Icon = ({ iconName, className = 'w-6 h-6' }: IconProps): React.JSX.Element => {
    // FIX 2: Internal paths variable now uses the simpler React.ReactNode type 
    // to avoid strict compiler issues with React.JSX.Element array.
    let paths: React.ReactNode | null;
    
    // Using a switch statement for cleaner rendering logic
    switch (iconName) {
        case 'target':
            paths = (
                <>
                    <circle key="c1" cx="12" cy="12" r="10" />
                    <circle key="c2" cx="12" cy="12" r="6" />
                    <circle key="c3" cx="12" cy="12" r="2" />
                </>
            );
            break;
        case 'code':
            paths = (
                <>
                    <polyline key="p1" points="16 18 22 12 16 6" />
                    <polyline key="p2" points="8 6 2 12 8 18" />
                </>
            );
            break;
        case 'database':
            paths = (
                <>
                    <ellipse key="e1" cx="12" cy="5" rx="9" ry="3" />
                    <path key="p3" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path key="p4" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </>
            );
            break;
        case 'bolt':
            paths = <path key="p5" d="M15 13L9 13L11 22L19 10L13 10L15 2Z" />;
            break;
        default:
            paths = null;
    }
    
    return (
        <svg 
            className={className} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            {paths}
        </svg>
    );
};

// Feature Card Component
// FIX 3: Removed React.FC for stricter typing
const FeatureCard = ({ iconName, title, description }: FeatureCardProps): React.JSX.Element => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
        <div className="text-indigo-600 mb-4 bg-indigo-100 p-3 inline-flex rounded-full">
            <Icon iconName={iconName} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 font-secondary text-base">{description}</p>
    </div>
);


// === Main Application Component (Exported Default Function for Next.js) ===
const App = (): React.JSX.Element => {
    // State: Simple state management for mobile navigation toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to handle smooth scrolling to sections
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Smoothly scroll to the element, adding a small offset (80px) 
            // to account for the sticky header that covers the top of the section.
            window.scrollTo({
                top: element.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false); // Close mobile menu after clicking
    }, []);

    const featureData: FeatureCardProps[] = [
        { 
            iconName: 'database', 
            title: 'Scalable Data Pipelines', 
            description: 'Engineering robust, efficient data ingestion and processing systems for continuous model training and inference.' 
        },
        { 
            iconName: 'target', 
            title: 'Precision AI Models', 
            description: 'Developing highly optimized Machine Learning models (TensorFlow, PyTorch) tailored for high-accuracy enterprise deployment.' 
        },
        { 
            iconName: 'code', 
            title: 'Modern Frontend Architecture', 
            description: 'Building reusable, performant React/NextJS components that seamlessly integrate complex backend services and APIs.' 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-secondary">
            
            {/* Header / Navigation */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <a href="#" onClick={() => scrollToSection('top')} className="flex-shrink-0 text-2xl font-bold text-indigo-700">
                            AIOTA.Solutions
                        </a>
                        
                        {/* Desktop Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-150">Services</button>
                            <button onClick={() => scrollToSection('data')} className="text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-150">Data Science</button>
                            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-150">Contact Us</button>
                        </div>
                        
                        {/* CTA Button */}
                        <button onClick={() => scrollToSection('contact')} className="hidden sm:block px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition duration-300">
                            Start Project
                        </button>
                        
                        {/* Mobile Menu Button (using state) */}
                        <button
                            type="button"
                            className="sm:hidden text-gray-500 hover:text-indigo-600 focus:outline-none p-2 rounded-md"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {isMenuOpen && (
                    <div className="sm:hidden border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-50 rounded-md">Services</button>
                            <button onClick={() => scrollToSection('data')} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-50 rounded-md">Data Science</button>
                            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-50 rounded-md">Contact Us</button>
                            <button onClick={() => scrollToSection('contact')} className="block w-full mt-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md">
                                Start Project
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                {/* Added 'top' ID here for the logo's scroll target */}
                <section id="top" className="text-center py-16 sm:py-24 bg-white rounded-2xl shadow-xl mb-16">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                        Bridging <span className="text-indigo-600">AI Logic</span> and <br className="hidden sm:block" /> Seamless Frontends
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        We transform complex data models into intuitive, fast, and responsive user interfaces using React and NextJS.
                    </p>
                    <div className="mt-10 flex justify-center space-x-4">
                        <button onClick={() => scrollToSection('features')} className="px-8 py-3 text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-300 transform hover:scale-105">
                            Explore Capabilities
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="px-8 py-3 text-lg font-medium rounded-lg text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-50 transition duration-300">
                            Get in Touch
                        </button>
                    </div>
                </section>

                {/* Features Section - Demonstrates Reusable Cards */}
                <section id="features" className="py-12 mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Technical Focus</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featureData.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </section>
                
                {/* Data Science / Backend Integration Section */}
                <section id="data" className="py-12 mb-16 bg-indigo-50 p-8 rounded-2xl shadow-inner border border-indigo-100">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="text-sm font-semibold uppercase text-indigo-600">The AI Edge</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">From Python Script to User Experience</h2>
                            <p className="text-gray-600 text-lg">
                                We specialize in the full-stack visualization of data science outcomes. Leveraging my background in Python, PyTorch, and ML modeling, I understand the backend data structures required to build performant, API-driven frontends. This ensures tight integration and superior performance, minimizing latency for real-time model results.
                            </p>
                            <ul className="mt-4 space-y-2 text-gray-600">
                                <li className="flex items-center"><Icon iconName="bolt" className="w-5 h-5 mr-2 text-indigo-500" /> API Experience: RESTful and ready for GraphQL integration.</li>
                                <li className="flex items-center"><Icon iconName="bolt" className="w-5 h-5 mr-2 text-indigo-500" /> Performance Optimization: Focused on speed and minimal CLS.</li>
                                <li className="flex items-center"><Icon iconName="bolt" className="w-5 h-5 mr-2 text-indigo-500" /> State Management: Familiar with Context API and modern tools.</li>
                            </ul>
                        </div>
                         {/* Placeholder Image */}
                        <div className="flex justify-center">
                            <img 
                                src="https://placehold.co/500x350/e0e7ff/4338ca?text=Data+Visualization+Mockup" 
                                alt="Abstract data science visualization" 
                                className="w-full rounded-xl shadow-2xl"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Section / Simple Form */}
                <section id="contact" className="py-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Let's Build Together</h2>
                    
                    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-indigo-600">
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log("Contact form submitted (In a Next.js app, this would be an API route)"); }}>
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
                                required 
                            />
                            <input 
                                type="email" 
                                placeholder="Work Email" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
                                required 
                            />
                            <textarea 
                                placeholder="Tell us about your project..." 
                                rows={4} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
                                required 
                            ></textarea>
                            <button 
                                type="submit" 
                                className="w-full px-4 py-3 text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-[1.01]"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xl font-light mb-2">AIOTA.Solutions</p>
                    <p className="text-sm text-gray-400">&copy; 2025. All Rights Reserved. Built with React and TypeScript.</p>
                </div>
            </footer>

        </div>
    );
};

// Export the main function as the default export for the Next.js page
export default App;
