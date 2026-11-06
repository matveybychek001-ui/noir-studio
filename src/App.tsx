import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Studio from '@/components/Studio';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import Privacy from '@/components/Privacy';
import CookieBanner from '@/components/CookieBanner';
import PageGuide from '@/components/PageGuide';
import { ScrollerContext } from '@/scroller';

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [serviceId, setServiceId] = useState('portrait');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const apply = () => {
      const next = node.clientHeight;
      setHeight((current) => (current === next ? current : next));
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollerContext.Provider value={{ ref, height }}>
      <div className="flex h-dvh flex-col overflow-hidden bg-[#090909] text-[#f3f0ea] md:flex-row">
        <PageGuide />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Navbar />
          <div id="scroller" ref={ref} className="scroller min-h-0 flex-1 overflow-y-auto">
            <main>
              <Hero />
              <Studio />
              <Gallery />
              <Services selectedId={serviceId} onSelect={setServiceId} />
              <Booking serviceId={serviceId} onServiceChange={setServiceId} />
              <Footer />
              <Privacy />
            </main>
          </div>
          <CookieBanner />
        </div>
      </div>
    </ScrollerContext.Provider>
  );
}

export default App;
