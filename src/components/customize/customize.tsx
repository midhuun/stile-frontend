import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './customizeForm.css';
import { clients } from './clients';
import SEO from '../seo/SEO';

const features = [
  { title: 'Premium Fabrics', desc: 'Breathable, durable, and soft on skin. Choose cotton, poly blends, or performance fabrics.', icon: '🧵' },
  { title: 'Pro Printing', desc: 'DTG, screen, vinyl, embroidery – crisp colors and long‑lasting finish.', icon: '🖨️' },
  { title: 'Any Quantity', desc: 'Low MOQs. From 1 piece prototypes to bulk team orders – we scale with you.', icon: '📦' },
  { title: 'Fast Delivery', desc: 'Pan‑India shipping with reliable timelines and proactive updates.', icon: '🚚' },
];

const steps = [
  { n: 1, title: 'Share your idea', desc: 'Tell us colors, sizes, artwork and quantities.' },
  { n: 2, title: 'Get a preview', desc: 'We send a clean mockup for approval.' },
  { n: 3, title: 'We produce', desc: 'High‑quality printing and stitching.' },
  { n: 4, title: 'Deliver & support', desc: 'Doorstep delivery and after‑order support.' },
];

const CustomizeOrder = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <SEO
        title="Customize Apparel | Stile Sagio"
        description="Design custom tees, hoodies and more. Low MOQs, premium fabrics and pro printing. Get a fast quote and mockup."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/customize` : undefined}
        image="/customize.png"
        type="website"
      />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white">
        <div className="absolute inset-0 bg-[url('/custom.gif')] bg-cover bg-center opacity-10" />
        <div className="relative px-6 py-14 md:px-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Create apparel that’s uniquely yours</h1>
            <p className="mt-3 text-sm md:text-base text-indigo-50">From single pieces to team kits – premium fabrics, professional printing, and quick turnarounds.</p>
            <Link to="/customize/quote" className="inline-flex mt-6 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:opacity-90">
              Get a quick quote
            </Link>
          </div>
          <div className="hidden md:block">
            <img src="/customize.png" alt="Customize" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-xl border shadow-sm p-5 flex gap-3">
            <div className="text-2xl">{f.icon}</div>
            <div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-gray-600 mt-0.5">{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-12 bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl md:text-2xl font-semibold">How it works</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border p-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">{s.n}</div>
              <div className="mt-2 font-medium">{s.title}</div>
              <div className="text-sm text-gray-600">{s.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-5">
          <Link to="/customize/quote" className="inline-flex px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm hover:opacity-90">Start your design</Link>
        </div>
      </div>

      {/* Logos scroller */}
      <div className="mt-12">
        <h3 className="text-lg md:text-xl font-semibold text-center">Trusted by teams and brands</h3>
        <div className="mt-4 overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...clients, ...clients].map((client: any, idx) => (
              <div key={idx} className="flex-shrink-0 h-16 w-16 md:h-24 md:w-24 rounded-full border bg-white grid place-items-center">
                <img src={client.logo} alt={client.name} className="max-h-14 max-w-14 md:max-h-20 md:max-w-20 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-xl md:text-3xl font-semibold">Ready to bring your idea to life?</h3>
        <p className="text-sm md:text-base text-gray-600 mt-2">Share a few details and we’ll send a quick mockup and quote.</p>
        <Link to="/customize/quote" className="inline-block mt-5 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:brightness-95">Customize now</Link>
      </div>
    </div>
  );
};

export default CustomizeOrder;
