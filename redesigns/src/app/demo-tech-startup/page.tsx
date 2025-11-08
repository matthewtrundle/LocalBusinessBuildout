'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function TechStartupPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950">

      {/* Hero - Clean Tech Startup */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Mesh Background */}
        <motion.div
          style={{ y: ySpring }}
          className="absolute inset-0"
        >
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950"></div>

          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-40"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-600 to-purple-600 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-500 to-rose-500 rounded-full blur-3xl opacity-20"
          />

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tech-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tech-grid)" />
            </svg>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          {/* Logo/Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 p-0.5"
              >
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  <div className="text-4xl">⚡</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Name - Modern Typography */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 mb-6 tracking-tight"
          >
            VelocityAI
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-3xl md:text-4xl text-slate-300 mb-16 font-light max-w-4xl mx-auto"
          >
            Accelerate your business with intelligent automation
            <br />
            <span className="text-xl text-blue-400 mt-4 block">AI-Powered Solutions • Real-Time Analytics • Seamless Integration</span>
          </motion.p>

          {/* Stats - Modern Cards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
              { value: '99.9%', label: 'Uptime', color: 'from-violet-500 to-purple-500' },
              { value: '2.4M', label: 'API Calls/Day', color: 'from-pink-500 to-rose-500' },
              { value: '24/7', label: 'Support', color: 'from-cyan-500 to-blue-500' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-40 rounded-2xl blur-xl transition-opacity duration-300`}
                ></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs - Modern Gradient Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button
              aria-label="Start free trial"
              className="group relative bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg px-12 py-5 rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              aria-label="View documentation"
              className="backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              View Docs
            </button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-slate-400 text-sm"
          >
            <p className="mb-3 uppercase tracking-widest text-xs">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
              {['TechCorp', 'DataFlow', 'CloudNine', 'NetScale', 'ByteWave'].map((company, i) => (
                <div key={i} className="text-lg font-bold text-slate-500">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-slate-400"
          >
            <svg className="w-6 h-10 border-2 border-slate-500 rounded-full p-1" fill="none" viewBox="0 0 24 24">
              <motion.path
                d="M12 5v7m0 0l-3-3m3 3l3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-white mb-6">
              Built for Scale
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Enterprise-grade infrastructure meets developer-friendly APIs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Lightning Fast',
                desc: 'Sub-100ms response times with global edge deployment',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🔒',
                title: 'Bank-Level Security',
                desc: 'SOC 2 Type II certified with end-to-end encryption',
                gradient: 'from-violet-500 to-purple-500'
              },
              {
                icon: '📊',
                title: 'Real-Time Analytics',
                desc: 'Advanced dashboards with predictive insights',
                gradient: 'from-pink-500 to-rose-500'
              },
              {
                icon: '🔌',
                title: 'Easy Integration',
                desc: 'RESTful APIs, SDKs for 10+ languages, webhooks',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: '♾️',
                title: 'Auto-Scaling',
                desc: 'Handle traffic spikes without breaking a sweat',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🤖',
                title: 'AI-Powered',
                desc: 'Machine learning models that improve over time',
                gradient: 'from-rose-500 to-orange-500'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all duration-500">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400">
              Start free, scale as you grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                desc: 'Perfect for side projects',
                features: ['10K API calls/mo', '5 team members', 'Email support', 'Basic analytics'],
                gradient: 'from-slate-600 to-slate-700',
                popular: false
              },
              {
                name: 'Pro',
                price: '$99',
                desc: 'For growing businesses',
                features: ['1M API calls/mo', 'Unlimited team members', 'Priority support', 'Advanced analytics', 'Custom integrations'],
                gradient: 'from-blue-600 to-violet-600',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'For large organizations',
                features: ['Unlimited API calls', 'Dedicated support', 'SLA guarantee', 'Custom deployment', 'Advanced security'],
                gradient: 'from-violet-600 to-purple-600',
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-0' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`h-full backdrop-blur-xl bg-white/5 border-2 ${plan.popular ? 'border-violet-500' : 'border-white/10'} p-10 rounded-3xl ${plan.popular ? 'shadow-2xl shadow-violet-500/20' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                  <div className="mb-6">
                    <span className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && plan.price !== 'Free' && (
                      <span className="text-slate-400 text-lg">/month</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 rounded-full font-bold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:shadow-violet-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            Ready to accelerate?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-12 text-blue-100"
          >
            Join 10,000+ developers building the future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              aria-label="Start building now"
              className="bg-white text-violet-600 font-black text-xl px-16 py-6 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              Start Building
            </button>
            <button
              aria-label="Talk to sales team"
              className="border-2 border-white text-white font-bold text-xl px-16 py-6 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Talk to Sales
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-blue-100 text-sm"
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </div>
      </section>

    </div>
  );
}
