import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  newsletter?: boolean
  message?: string
}

// Organic shape component
const OrganicShape = ({ className, children }: { className: string; children?: React.ReactNode }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.3,15.3,84,30.6,76.1,43.9C68.2,57.2,56.7,68.5,43.2,75.8C29.7,83.1,14.8,86.4,-0.5,87.2C-15.9,88,-31.8,86.3,-45.3,79.1C-58.8,71.9,-69.9,59.2,-77.7,44.9C-85.5,30.6,-90,14.8,-89.8,-1.2C-89.6,-17.2,-84.7,-34.4,-76.9,-48.7C-69.1,-63,-58.4,-74.4,-45.8,-82.1C-33.2,-89.8,-16.6,-93.8,-0.8,-92.5C14.9,-91.2,29.8,-84.6,44.7,-76.4Z"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
    {children}
  </div>
)

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Using Formspree for form handling
      const response = await fetch('https://formspree.io/f/xdkovpqy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for your message! I\'ll get back to you soon. ✨')
        reset()
      } else {
        setSubmitMessage('Something went wrong. Please try again or email me directly.')
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative shapes */}
      <OrganicShape className="top-10 -right-20 w-96 h-96 text-pink-200 rotate-12" />
      <OrganicShape className="top-1/3 -left-32 w-80 h-80 text-orange-200 -rotate-12" />
      <OrganicShape className="bottom-1/4 right-10 w-72 h-72 text-purple-200 rotate-45" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="https://ext.same-assets.com/2008172650/2719901219.png"
                alt="Draw to Grow"
                className="h-8 lg:h-10 cursor-pointer"
                onClick={() => smoothScrollTo('home')}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'One-to-One', id: 'about' },
                { name: 'Team Building', id: 'services' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'About', id: 'about' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => smoothScrollTo(item.id)}
                  className="text-gray-700 hover:text-pink-500 transition-colors font-medium relative group"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </nav>

            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href="https://www.youtube.com/@drawtogrow.studio"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/drawtogrow.studio"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"/>
                </svg>
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                className="text-gray-400 hover:text-gray-500 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.svg
                      key="close"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      exit={{ rotate: 0 }}
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="menu"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 180 }}
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'One-to-One', id: 'about' },
                  { name: 'Team Building', id: 'services' },
                  { name: 'Testimonials', id: 'testimonials' },
                  { name: 'About', id: 'about' },
                  { name: 'Contact', id: 'contact' }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => smoothScrollTo(item.id)}
                    className="block w-full text-left text-gray-700 hover:text-pink-500 transition-colors font-medium py-2"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    href="https://www.youtube.com/@drawtogrow.studio"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/drawtogrow.studio"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-pink-50 to-orange-50 py-20 lg:py-32 overflow-hidden">
          <OrganicShape className="top-20 right-10 w-64 h-64 text-pink-300/30 animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Release Emotions, Find Clarity, and Feel Lighter{' '}
                  <motion.span
                    className="text-pink-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Using Art
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Draw it out, let it go, and feel seen in a safe, creative space. Let your everyday
                  challenges take shape outside your mind through the process of therapeutic art making—no art skills needed.
                </motion.p>
                <motion.button
                  onClick={() => smoothScrollTo('contact')}
                  className="inline-flex items-center px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 text-lg group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:animate-pulse">✦</span>
                  <span className="mx-2">Book Your First Session</span>
                  <span className="group-hover:animate-pulse">✦</span>
                </motion.button>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.img
                  src="https://ext.same-assets.com/2008172650/437042400.jpeg"
                  alt="Therapeutic art session"
                  className="rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-80"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Does this sound familiar section */}
        <motion.section
          className="py-20 bg-white relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren}
        >
          <OrganicShape className="top-10 left-20 w-48 h-48 text-orange-200/50" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12"
              variants={fadeInUp}
            >
              Does this sound familiar?
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                  text: "You have an emotional block, mental fog, or heaviness in your heart and looking for clarity",
                  color: "pink"
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  text: "You crave a dedicated space and time to slow down, reflect, recharge and get creative",
                  color: "orange"
                },
                {
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                  text: "You sense untapped potential within you and are searching for an intuitive way to access it",
                  color: "purple"
                }
              ].map((item, index) => (
                <motion.div
                  key={`pain-point-${item.color}`}
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${item.color}-200 transition-colors`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className={`w-8 h-8 text-${item.color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </motion.div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Rest of sections with similar animation enhancements... */}
        {/* About Section */}
        <motion.section
          id="about"
          className="py-20 bg-gray-50 relative overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren}
        >
          <OrganicShape className="bottom-20 right-10 w-72 h-72 text-purple-200/40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="relative"
                variants={fadeInUp}
              >
                <motion.img
                  src="https://ext.same-assets.com/2008172650/2157720476.jpeg"
                  alt="Ksenia, therapeutic art facilitator"
                  className="rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-50"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-200 rounded-full opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <motion.h2
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                  variants={fadeInUp}
                >
                  Hey, I'm Ksenia, your guide to self-discovery through art
                </motion.h2>
                <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                  <motion.p variants={fadeInUp}>
                    I'm a therapeutic art facilitator, certified neurographic art specialist, illustrator
                    (TooFaced Cosmetics, Marie-Chantal) and a mum. I'm also a highly sensitive person, so
                    if you are too—<em>I see you.</em> I know what it's like to feel deeply, juggle
                    responsibilities, and carry big ambitions. But I've discovered that mindful art is a
                    powerful tool to find clarity, joy and even strength to move forward.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    I create a safe space for you to slow down, release emotions, get creative and access
                    your inner wisdom. No art skills needed—I will guide you with art prompts and you'll
                    find the answers within. And whatever you share stays in the room—no judgment, just a
                    space to be.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    These sessions aren't art therapy, but they're rooted in mindfulness techniques I've
                    learned through years of personal therapy, yoga, and spiritual exploration. You're in
                    safe hands—my sessions are designed to leave you feeling grounded, light, and resourceful.
                  </motion.p>
                </div>
                <motion.button
                  onClick={() => smoothScrollTo('contact')}
                  className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 mt-8 group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(236, 72, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:mr-2 transition-all duration-300">Book a session with me</span>
                  <motion.span
                    className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          className="py-20 bg-white relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <OrganicShape className="top-32 left-10 w-56 h-56 text-pink-200/30 -rotate-12" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What I offer:
              </h2>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  image: "https://ext.same-assets.com/2008172650/4014281557.png",
                  title: "One-to One Therapeutic Art Sessions (Online)",
                  tags: ["🏠 Online", "👤 1-on-1", "🎨 Creative"],
                  description: "Discover the therapeutic power of art with one-on-one sessions designed to support your personal journey, all from the comfort of your home.",
                  link: "Learn More →",
                  color: "pink"
                },
                {
                  image: "https://ext.same-assets.com/2008172650/3218310030.png",
                  title: "Mindful Art Team Building & Private Events (UK)",
                  tags: ["👥 Groups", "🇬🇧 UK", "🎉 Events"],
                  description: "Try a unique, art-based team-building activity to release stress, relax, and reconnect with one another on a deeper level. Also perfect for special gatherings.",
                  link: "Learn more →",
                  color: "orange"
                },
                {
                  image: "https://ext.same-assets.com/2008172650/1997344525.png",
                  title: "Women Circles (Crouch End)",
                  tags: ["👩‍👩‍👧‍👧 Women", "📍 Local", "🤱 Mum & Baby"],
                  description: "Join a welcoming group of women for creative workshops that inspire self-care and connection. I offer Mum and Baby classes, with new workshops coming soon.",
                  link: "Follow our Instagram →",
                  color: "purple"
                }
              ].map((service, index) => (
                <motion.div
                  key={`service-${service.title}`}
                  className={`bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 rounded-3xl p-8 text-center group hover:shadow-xl transition-shadow duration-300`}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:shadow-lg transition-shadow duration-300"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <div className="flex justify-center gap-4 mb-4 flex-wrap">
                    {service.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={`tag-${service.title}-${tagIndex}`}
                        className={`inline-flex items-center px-3 py-1 bg-${service.color}-200 text-${service.color}-800 rounded-full text-sm font-medium`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <motion.a
                    href="#learn-more"
                    className={`inline-flex items-center text-${service.color}-600 hover:text-${service.color}-700 font-semibold group-hover:translate-x-1 transition-transform duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    {service.link}
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="py-20 bg-gray-50 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <OrganicShape className="top-40 right-20 w-80 h-80 text-orange-200/40 rotate-45" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                The Benefits Of Mindful Drawing
              </h2>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-3 gap-12"
              variants={staggerChildren}
            >
              {[
                {
                  image: "https://ext.same-assets.com/2008172650/770990481.jpeg",
                  title: "Feel Good, Inside and Out",
                  description: "Mindful art making soothes your nervous system—lowering stress (cortisol) and boosting joy (dopamine). Your mind and body will thank you."
                },
                {
                  image: "https://ext.same-assets.com/2008172650/556056855.jpeg",
                  title: "See Clearly, Move Forward",
                  description: "Turn worries into art and give them shape outside your mind. With a fresh perspective, creative solutions emerge naturally."
                },
                {
                  image: "https://ext.same-assets.com/2008172650/1254509520.jpeg",
                  title: "Nurture Your True Self",
                  description: "Step away from overthinking and give your soul the care it craves. Through mindful drawing, connect with your higher self and feel compassion, creativity, and inspiration."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={`benefit-${benefit.title}`}
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => smoothScrollTo('contact')}
                className="inline-flex items-center px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 text-lg group"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:animate-bounce">🌟</span>
                <span className="mx-2">Book Your Session</span>
                <span className="group-hover:animate-bounce">🌟</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="py-20 bg-white relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <OrganicShape className="bottom-40 left-10 w-64 h-64 text-purple-200/30 -rotate-45" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Testimonials
              </h2>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-2 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  image: "https://ext.same-assets.com/2008172650/3169070644.png",
                  name: "Esme",
                  role: "Musician and Mum",
                  testimonial: "Ksenia is relaxing, attuned, informed and passionate guide. Drawing feelings as shapes was helpful to me and discussing things as we go along is nice, Ksenia's insights are often surprising in a good way, and helpful. I love the card bit at the end, it's a nice witchy touch hehe, and brings a sense of destiny or like cosmic provision on your journey - like someone/something is looking out for you. Also, I wrote a song after our session! That hasn't happened in so long. Thank you ✨",
                  color: "pink"
                },
                {
                  image: "https://ext.same-assets.com/2008172650/2217798346.png",
                  name: "Vic",
                  role: "Product Designer at Monzo Bank",
                  testimonial: "As someone who works full-time, I rarely find time for myself. The therapeutic drawing sessions have been a game-changer—allowing me to switch off from work, destress, and focus on what really matters. I feel more balanced and centered after every session.",
                  color: "orange"
                },
                {
                  image: "https://ext.same-assets.com/2008172650/1654505684.png",
                  name: "Kate",
                  role: "Career Coach and Mum of 2",
                  testimonial: "I've had multiple Neurographic Art sessions with Kseniya, and each time it has been an incredible experience. Not only do I enjoy the drawing process immensely, but I'm also amazed at how my intentions unfold during the sessions. I always leave feeling emotionally uplifted, with a newfound calm and clarity about the future.",
                  color: "purple"
                },
                {
                  name: "Holly",
                  role: "Writer, Performer and Mum",
                  testimonial: "During my session with Kseniya, I was able to release something that had been weighing on me for a long time. I gained insights I never thought possible, and for the first time, I could imagine real change in an area I had felt stuck in. It was a truly transformative experience.",
                  color: "pink",
                  initials: "H"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={`testimonial-${testimonial.name}`}
                  className={`bg-${testimonial.color}-50 rounded-2xl p-8 group hover:shadow-lg transition-all duration-300`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center mb-4">
                    {testimonial.image ? (
                      <motion.img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                        whileHover={{ scale: 1.1 }}
                      />
                    ) : (
                      <motion.div
                        className={`w-12 h-12 bg-${testimonial.color}-200 rounded-full flex items-center justify-center mr-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className={`text-${testimonial.color}-600 font-semibold`}>
                          {testimonial.initials}
                        </span>
                      </motion.div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic group-hover:text-gray-800 transition-colors duration-300">
                    "{testimonial.testimonial}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          className="py-20 bg-gray-50 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <OrganicShape className="top-20 right-32 w-72 h-72 text-pink-200/40 rotate-12" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Gallery
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={staggerChildren}
            >
              {[
                "https://ext.same-assets.com/2008172650/4271719673.png",
                "https://ext.same-assets.com/2008172650/4187470022.gif",
                "https://ext.same-assets.com/2008172650/697814627.png",
                "https://ext.same-assets.com/2008172650/3181202917.png"
              ].map((image, index) => (
                <motion.div
                  key={image}
                  className="aspect-square group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <img
                    src={image}
                    alt={`Mindful art creation ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              variants={fadeInUp}
            >
              <motion.blockquote
                className="text-xl lg:text-2xl text-gray-700 italic font-light mb-6"
                whileHover={{ scale: 1.02 }}
              >
                "Mindful Art is a key—I hand it to you so you can open the inner door that holds everything you need."
              </motion.blockquote>
              <p className="text-gray-600 mb-8">— Ksenia, Draw To Grow</p>

              <motion.button
                onClick={() => smoothScrollTo('contact')}
                className="inline-flex items-center px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 text-lg group"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:animate-spin">🎨</span>
                <span className="mx-2">Book Your Creative Self-Care</span>
                <span className="group-hover:animate-spin">🎨</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-20 bg-white relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren}
        >
          <OrganicShape className="bottom-20 left-20 w-56 h-56 text-orange-200/30 -rotate-12" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Happy to answer your questions
              </h2>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="grid md:grid-cols-2 gap-6"
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name (required)
                </label>
                <motion.input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.name && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name.message as string}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (required)
                </label>
                <motion.input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message as string}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="md:col-span-2"
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <motion.input
                    type="checkbox"
                    id="newsletter"
                    {...register('newsletter')}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    whileHover={{ scale: 1.1 }}
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                    Sign up for news and updates
                  </label>
                </div>
              </motion.div>

              <motion.div
                className="md:col-span-2"
                variants={fadeInUp}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                className="md:col-span-2"
                variants={fadeInUp}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 8px 20px rgba(236, 72, 153, 0.3)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <motion.span
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.div>

              {submitMessage && (
                <motion.div
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`p-4 rounded-lg ${
                    submitMessage.includes('Thank you')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <OrganicShape className="top-10 right-10 w-48 h-48 text-white opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="https://ext.same-assets.com/2008172650/4092612351.png"
                  alt="Draw to Grow"
                  className="h-12 mr-4"
                />
              </motion.div>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.youtube.com/@drawtogrow.studio"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/drawtogrow.studio"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400">
                Draw to Grow. 2024. All rights reserved (c)
              </p>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
