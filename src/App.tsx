import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { Automation } from './components/Automation';
import { WhyMaHris } from './components/WhyMaHris';
import { Process } from './components/Process';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Header & Navigation */}
      <Navbar />

      {/* Main Sections: Hero + About + Services + Work + Automation + WhyMaHris + Process + CTA */}
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Services />
        <Work />
        <Automation />
        <WhyMaHris />
        <Process />
        <CTA />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
