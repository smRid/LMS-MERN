// assets/dummyStyles.js

export const bannerStyles = {
  // Layout and container styles - Enhanced with animated gradient + dark mode
  container: "relative md:pt-25 xl:pt-25 pt-21 sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] w-full pt-6 sm:pt-8 lg:pt-25 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-gradient-to-br from-indigo-100 via-purple-50 via-pink-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 animate-gradient-shift rounded-3xl overflow-hidden",

  // Floating icons wrapper - with padding to prevent clipping
  floatingIconsWrapper: "absolute inset-0 pointer-events-none z-0 px-8 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16",

  // Floating icon base styles - Enhanced with better glow
  floatingIcon: "absolute animate-float pointer-events-none drop-shadow-2xl glow-icon transform transition-transform duration-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 hover:scale-125",

  // Main content - Premium glassmorphism with dark mode
  mainContent: "max-w-6xl w-full mx-auto bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 relative z-10 p-6 sm:p-8 lg:p-12 animate-fade-in",

  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",

  // Left content
  leftContent: "space-y-5 sm:space-y-6",

  // Badge - Enhanced with shine effect + dark mode
  badge: "inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-semibold animate-bounce-in font-cursive border border-indigo-200/50 dark:border-indigo-500/30 shine-effect",
  badgeIcon: "w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-spin-slow",

  // Heading - Rainbow shimmer effect
  heading: "text-3xl sm:text-4xl lg:text-5xl font-cursive font-heading uppercase tracking-wider leading-tight",
  headingSpan1: "block text-rainbow-shimmer font-bold",
  headingSpan2: "block text-rainbow-shimmer font-bold animation-delay-300",

  videoModal: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn",
    container: "relative w-[90%] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700",
    iframe: "w-full h-full",
    closeButton: "absolute top-3 cursor-pointer right-3 bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-black dark:text-white font-bold rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110",
    closeIcon: "w-5 h-5"
  },

  // Description - with dark mode
  description: "text-lg sm:text-xl font-body italic font-[pacifico] font-semibold text-gray-700 dark:text-slate-300 leading-relaxed mt-2 sm:mt-4 animate-slide-in-up animation-delay-500",

  // Features - Staggered animation + dark mode
  featuresGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-slide-in-up animation-delay-700",
  featureItem: "flex items-center space-x-3 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300",
  featureIconContainer: "w-6 h-6 flex items-center justify-center shrink-0",
  featureIcon: "text-sm",
  featureText: "text-gray-700 dark:text-slate-300 font-cursive text-sm sm:text-base",

  // Buttons - Premium glow effects + dark mode
  buttonsContainer: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 animate-slide-in-up animation-delay-900",
  buttonGetStarted: "px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform font-cursive text-sm sm:text-base text-center btn-premium animate-glow-pulse",
  buttonViewDemo: "px-6 py-3 sm:px-8 sm:py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm cursor-pointer text-gray-700 dark:text-slate-200 font-semibold rounded-xl border-2 border-indigo-200 dark:border-indigo-500/50 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 font-cursive text-sm sm:text-base text-center",

  // Image - 3D effect with glow
  imageContainer: "flex items-center justify-center animate-slide-in-right",
  image: "w-full max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-sm h-auto rounded-2xl shadow-2xl border-4 border-white/70 dark:border-slate-700/70 animate-float image-shine"
};

// Animation delays
export const animationDelays = {
  delay300: "animation-delay-300",
  delay500: "animation-delay-500",
  delay700: "animation-delay-700",
  delay900: "animation-delay-900"
};

// Custom CSS styles as string (for the style jsx block)
export const customStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap");

  .font-cursive {
    font-family: "Dancing Script", cursive;
  }

  /* Fade in */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(3deg);
    }
  }

  @keyframes float-slow {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }

  @keyframes text-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-fade-in {
    animation: fade-in 0.9s ease-out forwards;
  }
  .animate-text-gradient {
    background-size: 200% 200%;
    animation: text-gradient 4s ease infinite;
  }

  .glow-icon {
    filter: drop-shadow(0 0 10px rgba(100, 100, 255, 0.35));
    transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
    opacity: 0.98;
  }
  .glow-icon:hover {
    transform: scale(1.12);
    filter: drop-shadow(0 0 14px rgba(100, 100, 255, 0.65));
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  .animation-delay-700 {
    animation-delay: 0.7s;
  }
  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  /* Make sure the icon images keep their intrinsic proportions and never get squashed */
  img {
    object-fit: contain;
  }

  /* Small tweak: reduce icon size on very small screens to avoid overlapping essential text */
  @media (max-width: 420px) {
    .glow-icon {
      width: 22px !important;
      height: 22px !important;


    }
  }
    

  .font-cursive {
    font-family: "Dancing Script", cursive;
  }

  /* Fade in */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(3deg);
    }
  }

  @keyframes float-slow {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }

  @keyframes text-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-fade-in {
    animation: fade-in 0.9s ease-out forwards;
  }
  .animate-text-gradient {
    background-size: 200% 200%;
    animation: text-gradient 4s ease infinite;
  }

  .glow-icon {
    filter: drop-shadow(0 0 10px rgba(100, 100, 255, 0.35));
    transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
    opacity: 0.98;
  }
  .glow-icon:hover {
    transform: scale(1.12);
    filter: drop-shadow(0 0 14px rgba(100, 100, 255, 0.65));
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  .animation-delay-700 {
    animation-delay: 0.7s;
  }
  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  /* Make sure the icon images keep their intrinsic proportions and never get squashed */
  img {
    object-fit: contain;
  }

  /* Small tweak: reduce icon size on very small screens to avoid overlapping essential text */
  @media (max-width: 420px) {
    .glow-icon {
      width: 22px !important;
      height: 22px !important;
    }
  }

  /* Add fadeIn animation for modal */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

`;

// src/assets/dummyStyles.js
export const aboutUsStyles = {
  // Layout & Container - dark mode transparent to show global gradient
  container: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-transparent",

  // Hero Section
  heroSection: "relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden",
  heroBackground: "absolute inset-0 z-0",
  heroImageContainer: "absolute inset-0 bg-cover bg-center transform scale-105",
  heroVignette: "absolute inset-0 pointer-events-none",
  heroTint: "absolute inset-0 bg-slate-900/30 mix-blend-multiply pointer-events-none",
  heroContent: "relative z-20 max-w-7xl mx-auto text-center",

  // Trust Badge
  trustBadge: "inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white text-lg mb-8 backdrop-blur-sm border border-white/30 shadow-sm",
  trustIcon: "w-5 h-5 mr-2 fill-current",

  // Typography
  mainHeading: "text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif tracking-tight drop-shadow-lg",
  subHeading: "text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow",
  inlineHighlight: "inline-block ml-2 px-2 py-1 text-blue-100 rounded-full font-semibold",

  // Stats
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto",
  statCard: "text-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20",
  statNumber: "text-2xl font-bold text-white drop-shadow-sm",
  statLabel: "text-blue-100 text-sm",

  // Mission/Vision Sections - with dark mode card backgrounds
  sectionContainer: "py-20 px-4 sm:px-6 lg:px-8",
  sectionGrid: "max-w-7xl mx-auto",
  sectionContentGrid: "grid lg:grid-cols-2 md:grid-cols-2 gap-16 items-center",
  sectionImageContainer: "relative",
  sectionImage: "relative group",
  sectionContent: "",
  sectionBadge: "inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-slate-800/80 shadow-lg dark:shadow-indigo-500/10 mb-6 border dark:border-slate-700",
  sectionIcon: "w-5 h-5 mr-2 text-gradient bg-gradient-to-r",
  sectionBadgeText: "font-semibold text-gray-700 dark:text-slate-200",
  sectionTitle: "text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif",
  sectionDescription: "text-xl text-gray-600 dark:text-slate-300 mb-8 leading-relaxed",
  featuresContainer: "space-y-4 mb-8",
  featureItem: "flex items-center gap-4 group",
  featureIcon: "w-8 h-8 bg-gradient-to-r rounded-full flex items-center justify-center flex-shrink-0 transition-transform",
  featureIconSvg: "w-5 h-5 text-white",
  featureText: "text-lg text-gray-700 dark:text-slate-300 font-medium",

  // Values Section - with dark mode
  valuesSection: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:bg-transparent",
  valuesHeader: "text-center mb-16",
  valuesBadge: "inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-slate-800/80 shadow-lg dark:shadow-indigo-500/10 mb-6 border dark:border-slate-700",
  valuesBadgeIcon: "w-6 h-6 text-blue-600 dark:text-indigo-400 mr-2",
  valuesBadgeText: "font-semibold text-gray-700 dark:text-slate-200",
  valuesTitle: "text-2xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-serif",
  valuesSubtitle: "text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto",
  valuesGrid: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
  valueCard: "bg-white dark:bg-slate-800/70 p-8 rounded-3xl shadow-2xl dark:shadow-indigo-500/5 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group border border-gray-100 dark:border-slate-700/60 relative overflow-hidden backdrop-blur-sm",
  valueGradient: "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500",
  valueCardTitle: "text-2xl font-bold font-[pacifico] text-gray-900 dark:text-white mb-4 relative z-10 truncate",
  valueCardDescription: "text-gray-600 dark:text-slate-400 leading-relaxed mb-6 relative z-10",
  valueFeatures: "space-y-3 relative z-10",
  valueFeatureItem: "flex items-center gap-3 text-gray-700 dark:text-slate-300",
  valueFeatureDot: "w-2 h-2 bg-gradient-to-r rounded-full",
  valueUnderline: "absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r transition-all duration-500",

  // Team Section - with dark mode
  teamSection: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-transparent",
  teamHeader: "text-center mb-16",
  teamTitle: "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif",
  teamSubtitle: "text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto",
  teamGrid: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
  teamMember: "text-center font-[pacifico] group cursor-pointer bg-white/50 dark:bg-slate-800/50 p-6 rounded-3xl backdrop-blur-sm border border-white/60 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300",
  teamImageContainer: "relative mb-6",
  teamImage: "w-48 h-48 mx-auto rounded-full transform transition-all duration-500 border-4 border-white dark:border-slate-700 shadow-lg",
  teamName: "text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors",
  teamRole: "text-blue-600 dark:text-indigo-400 italic font-semibold mb-2",
  teamBio: "text-gray-600 dark:text-slate-400 mb-4",

  // Testimonials Section - with dark mode
  testimonialsSection: "py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-transparent",
  testimonialsHeader: "text-center mb-16",
  testimonialsTitle: "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif",
  testimonialsSubtitle: "text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto",
  testimonialsGrid: "grid md:grid-cols-3 gap-8",
  testimonialCard: "bg-gray-50 dark:bg-slate-800/70 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-slate-700/60 backdrop-blur-sm",
  testimonialStars: "flex items-center gap-2 mb-4",
  testimonialStar: "w-5 h-5 text-yellow-400 fill-current",
  testimonialText: "text-gray-700 dark:text-slate-300 mb-6 leading-relaxed italic",
  testimonialAuthor: "flex items-center gap-4",
  testimonialAvatar: "w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600",
  testimonialAuthorName: "font-semibold text-gray-900 dark:text-white",
  testimonialAuthorRole: "text-gray-600 dark:text-slate-400 text-sm",

  // CTA Section - enhanced for dark mode
  ctaSection: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-200 via-purple-500 to-indigo-300 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden",
  ctaOrb1: "absolute top-0 left-0 w-72 h-72 bg-white/50 dark:bg-indigo-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse",
  ctaOrb2: "absolute bottom-0 right-0 w-96 h-96 bg-white/50 dark:bg-purple-500/30 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse animation-delay-2000",
  ctaContent: "relative max-w-4xl mx-auto text-center",
  ctaTitle: "text-5xl md:text-6xl font-bold text-white mb-6 font-serif",
  ctaDescription: "text-xl text-blue-100 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed",
  ctaButtons: "flex flex-col sm:flex-row gap-6 justify-center items-center mb-8",
  ctaButton: "group bg-transparent cursor-pointer border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm hover:shadow-2xl",
  ctaButtonIcon: "w-5 h-5 group-hover:scale-110 transition-transform"
};

// CSS animations (for style jsx)
export const aboutUsAnimations = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-3000 {
    animation-delay: 3s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Add these to the existing dummyStyles.js file
export const contactStyles = {
  // Layout & Container - dark mode transparent
  container: "min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-transparent dark:via-transparent dark:to-transparent dark:bg-none py-10 px-4 sm:px-6 md:px-10 lg:px-12 overflow-x-hidden",
  mainContainer: "max-w-7xl mx-auto",

  // Header - with dark mode
  header: "text-center mb-12 sm:mb-16",
  title: "text-3xl sm:text-4xl md:text-5xl inline-flex items-center space-x-2 mt-15 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-purple-100 dark:border-indigo-500/50 font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-['Poppins'] dark:shadow-lg dark:shadow-indigo-500/20",

  // Main Section
  mainSection: "grid grid-cols-1 font-serif lg:grid-cols-2 md:grid-cols-2 md:gap-2 gap-10 lg:gap-12 items-center",

  // Contact Form - with dark mode glassmorphism
  formContainer: "relative order-2 lg:order-1",
  formGlow1: "absolute -inset-1 bg-gradient-to-r from-purple-300 to-blue-500 dark:from-indigo-600 dark:to-purple-600 rounded-2xl opacity-75 dark:opacity-40 blur-sm animate-pulse",
  formGlow2: "absolute -inset-1 bg-gradient-to-r from-purple-300 to-blue-500 dark:from-indigo-600 dark:to-purple-600 rounded-2xl opacity-50 dark:opacity-25 animate-pulse delay-75",
  formGlow3: "absolute -inset-1 bg-gradient-to-r from-purple-300 to-blue-500 dark:from-indigo-600 dark:to-purple-600 rounded-2xl opacity-25 dark:opacity-15 animate-pulse delay-150",
  form: "relative bg-white dark:bg-slate-800/80 rounded-2xl shadow-lg dark:shadow-indigo-500/10 p-6 sm:p-8 border border-gray-100 dark:border-slate-700/60 dark:backdrop-blur-sm",
  formElements: "space-y-6",

  // Form Grid
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",

  // Form Groups - with dark mode
  formGroup: "group",
  label: "block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2 flex items-center",
  labelIcon: "w-4 h-4 mr-2",
  input: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white dark:bg-slate-700/50 dark:text-white dark:placeholder-slate-400",
  inputError: "border-red-500 dark:border-red-400",
  errorText: "mt-2 text-sm text-red-600 dark:text-red-400",
  textarea: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white dark:bg-slate-700/50 dark:text-white dark:placeholder-slate-400 group-hover:border-blue-400 dark:group-hover:border-indigo-500 resize-none",
  select: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white dark:bg-slate-700/50 dark:text-white group-hover:border-purple-400 dark:group-hover:border-purple-500",

  // Colors for different form fields - with dark variants
  colors: {
    purple: {
      icon: "text-purple-600 dark:text-purple-400",
      focus: "focus:ring-purple-500 dark:focus:ring-purple-400",
      hover: "group-hover:border-purple-400 dark:group-hover:border-purple-500"
    },
    blue: {
      icon: "text-blue-600 dark:text-blue-400",
      focus: "focus:ring-blue-500 dark:focus:ring-blue-400",
      hover: "group-hover:border-blue-400 dark:group-hover:border-blue-500"
    },
    green: {
      icon: "text-green-600 dark:text-green-400",
      focus: "focus:ring-green-500 dark:focus:ring-green-400",
      hover: "group-hover:border-green-400 dark:group-hover:border-green-500"
    }
  },

  // Submit Button - with dark mode
  submitButton: "w-full py-4 px-6 rounded-full font-bold text-white transition-all duration-300 flex items-center justify-center",
  submitButtonEnabled: "bg-gradient-to-r from-green-500 to-green-600 dark:from-emerald-500 dark:to-teal-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl",
  submitButtonDisabled: "bg-gray-400 dark:bg-slate-600 cursor-not-allowed",
  spinner: "w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2",
  submitIcon: "w-5 h-5 mr-2",

  // Animation Section
  animationContainer: "relative order-1 xl:order-2 lg:order-2 w-full flex justify-center items-center",
  animationWrapper: "relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full xl:max-w-full rounded-2xl overflow-hidden",

  // Footer Info - with dark mode
  footer: "mt-12 sm:mt-16 text-center",
  footerBadge: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800/80 dark:to-indigo-900/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-purple-100 dark:border-indigo-500/30",
  footerIcon: "w-5 h-5 text-purple-600 dark:text-indigo-400",
  footerText: "text-gray-700 dark:text-slate-300 text-sm sm:text-base"
};

// Add these to your existing assets/dummyStyles.js

export const coursePageStyles = {
  // Layout and container styles - with dark mode
  pageContainer: "min-h-screen pt-24 md:pt-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 py-8 px-4 relative overflow-hidden",
  headerContainer: "text-center mb-12 md:mb-16 relative z-10",
  headerTransform: "transform perspective-1000 mb-6",
  headerTitle: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 tracking-tight font-[pacifico]",
  headerSubtitle: "text-base sm:text-lg md:text-2xl text-gray-700 dark:text-slate-300 font-light mb-6 md:mb-8 tracking-wide",

  // Search bar - with dark mode
  searchContainer: "max-w-2xl mx-auto mb-8 md:mb-12 relative group px-2 sm:px-0",
  searchGradient: "absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 dark:from-cyan-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-700 animate-gradient-x",
  searchInputContainer: "relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-transparent dark:border-slate-700 group-hover:border-blue-400 dark:group-hover:border-indigo-500 rounded-3xl shadow-xl dark:shadow-indigo-500/10 transition-all duration-500",
  searchIconContainer: "absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none",
  searchIcon: "w-5 h-5 text-blue-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-500",
  searchInput: "w-full pl-12 pr-10 py-3 rounded-3xl bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-0 font-medium text-sm sm:text-base",
  clearButton: "absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300",

  // Results count - with dark mode
  resultsCount: "text-gray-600 dark:text-slate-400 text-sm sm:text-base",

  // No courses found - with dark mode
  noCoursesContainer: "text-center py-12",
  noCoursesIcon: "w-16 h-16 mx-auto text-gray-400 dark:text-slate-500",
  noCoursesTitle: "text-xl font-semibold text-gray-600 dark:text-slate-300 mb-2",
  noCoursesButton: "mt-4 px-6 py-3 bg-blue-500 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-indigo-500 transition-colors w-full sm:w-auto",

  // Courses grid
  coursesGrid: "max-w-7xl font-[pacifico] mx-auto relative z-10",
  coursesGridContainer: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10",

  // Course card - with dark mode glassmorphism
  courseCard: "group perspective-1000 transform-style-3d transition-all duration-500 ease-out cursor-pointer",
  courseCardInner: "relative transform-style-3d group-hover:rotate-y-5 group-hover:rotate-x-5 transition-transform duration-500 ease-out h-full",
  courseCardContent: "backdrop-blur-lg rounded-3xl shadow-2xl dark:shadow-indigo-500/10 border border-white/40 dark:border-slate-700/60 transform translate-z-0 h-full flex flex-col bg-white/60 dark:bg-slate-800/70 overflow-hidden hover:shadow-3xl dark:hover:shadow-purple-500/20 transition-shadow duration-300",

  // Course image
  courseImageContainer: "relative overflow-hidden rounded-t-3xl h-48 pb-6 sm:h-44 md:h-48",
  courseImage: "w-full h-full object-cover object-center transform transition-transform duration-700",

  // Course info - with dark mode
  courseInfo: "p-4 sm:p-6 flex-1 flex flex-col",
  courseName: "text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2",
  teacherContainer: "flex items-center space-x-2 mb-3 text-sm sm:text-sm",
  teacherIcon: "w-4 h-4 text-blue-500 dark:text-indigo-400",
  teacherName: "text-gray-600 dark:text-slate-400 font-medium truncate",

  // Rating - with dark mode
  ratingContainer: "mb-3",
  ratingStars: "flex items-center space-x-2 mb-2",
  ratingStarsInner: "flex space-x-1",
  ratingStarButton: "p-2 sm:p-0.5 rounded-full focus:outline-none",

  // Price - with dark mode
  priceContainer: "mt-auto flex items-center justify-between",
  priceFree: "text-2xl font-bold text-green-600 dark:text-green-400",
  priceCurrent: "text-2xl font-bold text-green-600 dark:text-green-400",
  priceOriginal: "text-lg text-gray-500 dark:text-slate-500 line-through",

  // Show more button - with dark mode
  showMoreContainer: "mt-8 flex justify-center px-2 sm:px-0",
  showMoreButton: "px-5 py-3 rounded-full cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-700 shadow dark:shadow-indigo-500/10 hover:shadow-md dark:hover:shadow-purple-500/20 transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center",
  showMoreText: "text-sm font-medium text-gray-800 dark:text-slate-200"
};

// Add these to your existing assets/dummyStyles.js

export const myCoursesStyles = {
  // Layout and container styles - with dark mode animated gradient
  pageContainer: "min-h-screen pt-25 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 py-8 font-[pacifico]",
  mainContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

  // Header - with beautiful gradient text in dark mode
  header: "text-4xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 mb-12 text-center",
  emptyHeader: "text-4xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 mb-6",
  emptyText: "text-gray-600 dark:text-slate-300 text-lg",

  // Grid layout
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-8",

  // Course card - with dark mode glassmorphism
  courseCard: "group bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-indigo-500/10 overflow-hidden hover:shadow-2xl dark:hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/50 dark:border-slate-700/60 cursor-pointer",
  imageContainer: "relative overflow-hidden",
  courseImage: "w-full h-48 object-contain pb-7.5 lg:pb-6 xl:pb-8.5 md:object-cover transition-transform duration-700",
  courseContent: "p-5",

  // Course info - with dark mode text colors
  courseName: "text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 transition-colors duration-300",
  infoContainer: "flex flex flex-col gap-2 justify-between mb-4",

  // Rating - with dark mode styling
  ratingContainer: "flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-full px-3 py-1 border border-yellow-100 dark:border-yellow-700/50",
  ratingIcon: "w-4 h-4 text-yellow-500 fill-current",
  ratingText: "text-sm font-semibold text-gray-800 dark:text-yellow-200",

  // Teacher - with dark mode colors
  teacherContainer: "flex items-center space-x-1 px-3 py-1",
  teacherIcon: "w-4 h-4 text-blue-600 dark:text-indigo-400",
  teacherText: "text-sm font-medium text-gray-800 dark:text-slate-300 truncate max-w-[80px]",

  // Button - enhanced for dark mode
  viewButton: "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-xl dark:shadow-indigo-500/25 flex items-center justify-center space-x-2 cursor-pointer group/btn",
  buttonIcon: "w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110",
  buttonText: ""
};

// Custom styles for MyCourses
export const myCoursesCustomStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Custom styles for CoursePage
export const coursePageCustomStyles = `
  .perspective-1000 { perspective: 1000px; }
  .transform-style-3d { transform-style: preserve-3d; }
  .translate-z-0 { transform: translateZ(0px); }
  .translate-z-5 { transform: translateZ(5px); }
  .translate-z-10 { transform: translateZ(10px); }
  .translate-z-[-20px] { transform: translateZ(-20px); }
  .translate-z-[-30px] { transform: translateZ(-30px); }
  .rotate-x-12 { transform: rotateX(12deg); }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .group:hover .group-hover\\:rotate-y-5 { transform: rotateY(5deg); }
  .group:hover .group-hover\\:rotate-x-2 { transform: rotateX(2deg); }

  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
  }

  /* reduce heavy transforms on small screens for performance */
  @media (max-width: 640px) {
    .group:hover .group-hover\\:rotate-y-5,
    .group:hover .group-hover\\:rotate-x-5 {
      transform: none !important;
    }
  }
`;

// Add these to the existing dummyStyles.js file
export const facultyStyles = {
  // Layout & Container - dark mode transparent (no gradient)
  container: "min-h-screen pt-12 sm:pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-transparent dark:via-transparent dark:to-transparent dark:bg-none",

  // Header Section - with dark mode colors (no gradient)
  header: "relative py-12 sm:py-16 px-4 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-transparent dark:via-transparent dark:to-transparent dark:bg-none",
  headerContent: "relative z-10 max-w-4xl mx-auto",
  title: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 dark:bg-gradient-to-r dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 dark:bg-clip-text dark:text-transparent mb-3 sm:mb-4 font-cinematic tracking-wide",
  titleDivider: "w-20 sm:w-28 h-1 bg-gradient-to-r from-blue-400 to-sky-500 dark:from-indigo-400 dark:to-purple-400 mx-auto mb-4 rounded-full",
  subtitle: "text-base sm:text-lg md:text-xl text-blue-600 dark:text-indigo-200 max-w-2xl mx-auto leading-relaxed",

  // Faculty Grid
  facultySection: "py-8 px-4 sm:px-6 lg:px-8",
  facultyContainer: "max-w-7xl mx-auto",
  facultyGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10",

  // Teacher Card - with dark mode glassmorphism
  card: "group",
  teacherCard: "bg-white dark:bg-slate-800/70 rounded-3xl shadow-xl dark:shadow-indigo-500/10 hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 border border-gray-100 dark:border-slate-700/60 hover:border-purple-300 dark:hover:border-indigo-500/50 backdrop-blur-sm",

  // Image Section - with dark mode backgrounds
  imageContainer: "relative mb-4 sm:mb-6",
  imageWrapper: "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden bg-blue-100 dark:bg-slate-700",
  image: "w-full h-full rounded-full object-cover border-4 border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-700",

  // Experience Badge
  experienceBadge: "absolute -bottom-3 left-1/2 transform -translate-x-1/2",
  experienceBadgeContent: "bg-gradient-to-r from-green-500 to-emerald-600 dark:from-emerald-500 dark:to-teal-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg",

  // Teacher Info - with dark mode text colors
  teacherInfo: "text-center mb-3 sm:mb-4 px-1",
  teacherName: "text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 font-cinematic truncate",
  teacherQualification: "text-sm sm:text-sm text-purple-600 dark:text-indigo-400 font-semibold mb-2 truncate",
  teacherBio: "text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-3",

  // Rating Section (fixed for row layout)
  ratingContainer: "mb-4 flex justify-center",
  starRating: "flex flex-row items-center space-x-2",
  starsContainer: "flex flex-row items-center space-x-1",
  starButton: "transition-all duration-200 transform hover:scale-125 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500",
  starButtonActive: "text-yellow-400 fill-current",
  starButtonInactive: "text-gray-300 dark:text-slate-600",
  starIcon: "w-5 h-5",


  // Social Icons - with dark mode variants
  socialContainer: "flex justify-center gap-3 sm:gap-4 mt-2",
  socialIcon: "transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 p-3 sm:p-3.5 rounded-2xl shadow-lg hover:shadow-xl",
  socialIconEmail: "bg-gradient-to-br from-green-100 to-green-300 dark:from-emerald-900/50 dark:to-green-800/50 dark:border dark:border-emerald-700/50",
  socialIconLinkedin: "bg-gradient-to-br from-sky-100 to-blue-300 dark:from-blue-900/50 dark:to-sky-800/50 dark:border dark:border-blue-700/50",
  socialIconInstagram: "bg-gradient-to-br from-purple-200 to-pink-600 dark:from-purple-900/50 dark:to-pink-800/50 dark:border dark:border-purple-700/50",
  socialIconSvg: "w-4 h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-white",

  // CSS Animations and Utilities
  animations: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
    .font-cinematic {
      font-family: 'Cinzel', 'Playfair Display', serif;
    }
    .line-clamp-3 { 
      display: -webkit-box; 
      -webkit-line-clamp: 3; 
      -webkit-box-orient: vertical; 
      overflow: hidden; 
    }
    .truncate { 
      overflow: hidden; 
      text-overflow: ellipsis; 
      white-space: nowrap; 
    }
    @media (max-width: 640px) {
      .group:hover { transform: none; }
    }
  `
};

// Add these to your existing assets/dummyStyles.js

export const footerStyles = {
  // Layout and container styles - with dark mode
  footer: "relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 text-slate-800 dark:text-slate-200 overflow-hidden border-t border-slate-200/60 dark:border-slate-700",
  container: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",

  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16",
  brandSection: "lg:col-span-1",
  brandTransform: "transform transition-transform duration-500",
  brandContainer: "relative mb-4 sm:mb-6 group",
  brandGradient: "absolute -inset-3 bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-500 dark:to-purple-500 rounded-2xl blur-lg opacity-12 sm:opacity-20 transition-all duration-500 pointer-events-none",
  brandTitle: "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 py-1",
  brandDescription: "text-slate-600 dark:text-slate-400 leading-relaxed mb-4 text-sm sm:text-sm",

  // Section headers
  sectionHeader: "text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200 flex items-center gap-2",
  sectionIcon: "w-5 h-5",

  // Links
  linksList: "space-y-2",
  linkItem: "text-slate-600 dark:text-slate-400 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 min-w-0",
  linkIcon: "w-4 h-4 flex-shrink-0",

  // Contact info
  contactSpace: "space-y-3 text-slate-600 dark:text-slate-400",
  contactItem: "flex items-center group transform transition-all duration-300 p-3 rounded-xl",
  contactIconContainer: "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 transform transition-transform duration-300 shadow-lg border border-white dark:border-slate-600 overflow-hidden",
  contactIcon: "w-4 h-4",
  contactTextContainer: "min-w-0",
  contactTextPrimary: "font-medium text-sm break-words xl:text-xs dark:text-slate-300",
  contactTextSecondary: "text-xs text-slate-500 dark:text-slate-500",

  // Social section
  socialSection: "border-t border-slate-200/60 dark:border-slate-700 pt-8",
  socialContainer: "flex flex-col lg:flex-row items-center justify-between gap-6",
  socialIconsContainer: "flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start",
  socialIconLink: "relative group transform transition-all duration-300 hover:scale-105",
  socialIconContainer: "relative w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border border-white/80 dark:border-slate-600 shadow-md backdrop-blur-sm overflow-hidden",
  socialIconInner: "absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
  socialIcon: "w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300",
  socialTooltip: "absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden md:block",
  socialTooltipArrow: "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45",

  // Design credit
  designCredit: "text-center lg:text-right",
  designCreditContainer: "relative inline-block group",
  designCreditGradient: "absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur-lg opacity-10 group-hover:opacity-30 transition-all duration-500 pointer-events-none",
  designCreditText: "relative font-[pacifico] text-slate-600 dark:text-slate-300 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/80 dark:border-slate-600 shadow-sm inline-flex items-center gap-2",
  designCreditLink: "ml-1 font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
};

// Background elements styles
export const footerBackgroundStyles = {
  backgroundContainer: "absolute inset-0 pointer-events-none",
  floatingOrb1: "hidden sm:block absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-blue-300/30 rounded-full blur-xl animate-float-1",
  floatingOrb2: "hidden sm:block absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-pink-300/20 rounded-full blur-xl animate-float-2",
  floatingOrb3: "hidden sm:block absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-emerald-200/20 to-teal-300/20 rounded-full blur-xl animate-float-3",
  floatingOrb4: "hidden sm:block absolute bottom-32 right-32 w-20 h-20 bg-gradient-to-r from-amber-200/30 to-orange-300/20 rounded-full blur-xl animate-float-4",
  gridOverlay: "absolute inset-0 opacity-[0.02] pointer-events-none"
};

// Contact icon background gradients
export const contactIconGradients = {
  address: "bg-gradient-to-br from-cyan-100 to-blue-100",
  phone: "bg-gradient-to-br from-purple-100 to-pink-100",
  email: "bg-gradient-to-br from-emerald-100 to-teal-100"
};

// Icon colors
export const iconColors = {
  cyan: "text-cyan-500",
  purple: "text-purple-500",
  emerald: "text-emerald-500",
  cyan600: "text-cyan-600",
  purple600: "text-purple-600",
  emerald600: "text-emerald-600"
};

// Custom styles for Footer
export const footerCustomStyles = `
@keyframes float - 1 {
  0 %, 100 % { transform: translateY(0px) rotate(0deg) scale(1); }
  33 % { transform: translateY(-12px) rotate(3deg) scale(1.03); }
  66 % { transform: translateY(-6px) rotate(- 2deg) scale(0.98);
}
  }
@keyframes float - 2 {
  0 %, 100 % { transform: translateY(0px) rotate(0deg) scale(1); }
  25 % { transform: translateY(-18px) rotate(- 4deg) scale(1.06);
}
75 % { transform: translateY(-4px) rotate(2deg) scale(0.96); }
  }
@keyframes float - 3 {
  0 %, 100 % { transform: translateY(0px) rotate(0deg) scale(1); }
  50 % { transform: translateY(-10px) rotate(5deg) scale(1.02); }
}
@keyframes float - 4 {
  0 %, 100 % { transform: translateY(0px) rotate(0deg) scale(1); }
  40 % { transform: translateY(-14px) rotate(- 3deg) scale(1.05);
}
80 % { transform: translateY(-5px) rotate(4deg) scale(0.98); }
  }
  .animate - float - 1 { animation: float - 1 9s ease -in -out infinite; }
  .animate - float - 2 { animation: float - 2 11s ease -in -out infinite; }
  .animate - float - 3 { animation: float - 3 13s ease -in -out infinite; }
  .animate - float - 4 { animation: float - 4 10s ease -in -out infinite; }

/* Keep transitions snappy but avoid heavy layout work on small screens */
@media(max - width: 640px) {
    * { transition- duration: 180ms!important;
}
  }

/* Reduce motion for users who prefer it */
@media(prefers - reduced - motion: reduce) {
    .animate - float - 1, .animate - float - 2, .animate - float - 3, .animate - float - 4 { animation: none!important; }
    * { transition: none!important; }
}
`;

// Add these to the existing dummyStyles.js file
export const homeCoursesStyles = {
  // Layout & Container - Enhanced animated gradient + dark mode
  container: "bg-gradient-to-br from-indigo-100 via-purple-50 via-pink-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 animate-gradient-shift min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12",
  mainContainer: "max-w-7xl mx-auto",

  // Header Section - Enhanced with animations
  header: "flex flex-col items-center gap-6 animate-slide-in-up",
  title: "text-3xl sm:text-4xl md:text-5xl mb-0 text-center text-rainbow-shimmer drop-shadow-lg flex items-center justify-center gap-3 font-bold",
  titleIcon: "w-7 h-7 md:w-8 md:h-8 animate-spin-slow text-indigo-500 dark:text-indigo-400",

  // Courses Grid
  coursesGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10",

  // Course Card - Clean styling with dark mode
  coursesCard: "group relative bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/60 dark:border-slate-700/60 hover:border-indigo-200/60 dark:hover:border-indigo-500/40 overflow-hidden",
  imageContainer: "relative rounded-t-2xl overflow-hidden image-shine",
  courseImage: "w-full object-cover transition-all duration-700 group-hover:scale-110 h-48 sm:h-48 md:h-44 lg:h-48",

  // Course Info - Enhanced styling + dark mode
  courseInfo: "p-4 bg-gradient-to-b from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-950/30 space-y-3",
  courseName: "text-base sm:text-lg font-bold text-gray-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300",
  teacherInfo: "flex items-center text-gray-500 dark:text-slate-400 text-sm",
  teacherIcon: "mr-1.5 text-indigo-500 dark:text-indigo-400",
  teacherName: "font-medium text-gray-600 dark:text-slate-400 truncate",

  // Rating Section - Enhanced styling
  ratingContainer: "flex items-center",
  starsContainer: "flex items-center gap-2",
  interactiveStars: "flex",
  starButton: "p-0.5 focus:outline-none transform transition-all duration-200 hover:scale-150",
  starButtonActive: "text-yellow-400 drop-shadow-lg",
  starButtonInactive: "text-gray-300 dark:text-slate-600 hover:text-yellow-400",
  starIcon: "size-4",

  // Pricing Section - Enhanced with gradient + dark mode
  pricingContainer: "flex items-center mt-1 space-x-3 pt-2 border-t border-indigo-100 dark:border-slate-700",
  freePrice: "text-lg sm:text-xl font-bold text-emerald-500 dark:text-emerald-400 animate-bounce-in",
  salePrice: "text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent",
  originalPrice: "line-through text-gray-400 dark:text-slate-500 text-sm font-medium",

  // CTA Button - Premium glow effects
  ctaContainer: "flex justify-center mt-12",
  ctaWrapper: "relative inline-block group",
  ctaGlow: "absolute -inset-1 rounded-full border-0 pointer-events-none animate-glow-pulse",
  ctaButton: "relative z-10 inline-flex items-center gap-4 px-12 py-4 text-xl font-bold rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-md text-white shadow-2xl transform transition duration-300 cursor-pointer active:scale-95 focus:outline-none btn-premium",
  ctaButtonContent: "relative flex items-center gap-3",
  ctaText: "relative z-10",
  ctaIcon: "w-5 h-5 z-10 transition-transform duration-300 group-hover:translate-x-2",

  // Font Classes
  fonts: {
    title: "font-[Montserrat] font-bold tracking-wider",
    course: "font-[Poppins] font-semibold tracking-wide",
    detail: "font-[Poppins]"
  },

  // Animations - now handled in global CSS
  animations: ``
};

// Add these to the existing dummyStyles.js file
export const navbarStyles = {
  // Main Navbar - with dark mode
  navbar: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
  navbarVisible: "translate-y-0 opacity-100",
  navbarHidden: "-translate-y-full opacity-0",
  navbarScrolled: "bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-sm py-2 border-b border-gray-100 dark:border-slate-700",
  navbarDefault: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 py-3 border-b border-blue-100 dark:border-slate-700",

  // Container
  container: "max-w-6xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8",
  innerContainer: "flex items-center justify-between h-12",

  // Logo
  logo: "flex items-center space-x-3 group cursor-pointer flex-shrink-0",
  logoIconContainer: "relative",
  logoIcon: "w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center transform transition-all duration-300 shadow-sm",
  logoIconGlow: "absolute -inset-1 bg-blue-200 dark:bg-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300",
  logoText: "font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent",

  // Desktop Navigation - with dark mode
  desktopNav: "hidden lg:flex items-center justify-center flex-1 max-w-2xl",
  desktopNavContainer: "flex items-center space-x-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-gray-200 dark:border-slate-600",
  desktopNavItem: "group relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2",
  desktopNavItemActive: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-blue-600 dark:text-indigo-300 shadow-md",
  desktopNavIcon: "text-gray-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-indigo-400",
  desktopNavText: "text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-indigo-400",

  // Auth Buttons - with dark mode
  authContainer: "flex items-center space-x-3 flex-shrink-0",
  loginButton: "hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-indigo-500 dark:to-purple-500 text-white text-sm font-semibold shadow-sm hover:shadow-md transform transition-all duration-300 group",
  logoutButton: "hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 text-sm font-semibold shadow-sm hover:shadow-md transform transition-all duration-300 group border border-gray-200 dark:border-slate-600 dark:text-slate-200",

  // Mobile Menu Button - with dark mode
  mobileMenuButton: "lg:hidden p-2 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:shadow-md transition-all duration-300",

  // Mobile Menu - with dark mode
  mobileMenu: "lg:hidden transition-all duration-500 overflow-hidden",
  mobileMenuOpen: "max-h-[500px] opacity-100 mt-3",
  mobileMenuClosed: "max-h-0 opacity-0",
  mobileMenuContainer: "bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-slate-600",
  mobileMenuItems: "space-y-2",
  mobileMenuItem: "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300",
  mobileMenuItemActive: "bg-blue-50 dark:bg-indigo-900/40",
  mobileMenuItemHover: "hover:bg-blue-50 dark:hover:bg-slate-700",
  mobileMenuIconContainer: "p-2 rounded-lg bg-blue-50 dark:bg-indigo-900/50 transition-colors duration-300",
  mobileMenuIcon: "text-blue-600 dark:text-indigo-400",
  mobileMenuText: "font-medium text-gray-700 dark:text-slate-200",

  // Mobile Auth Buttons - with dark mode
  mobileLoginButton: "w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-indigo-500 dark:to-purple-500 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 mt-2",
  mobileLogoutButton: "w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 font-semibold shadow-sm border border-gray-200 dark:border-slate-600 hover:shadow-md transition-all duration-300 mt-2",

  // Background Pattern
  backgroundPattern: "absolute inset-0 -z-10 opacity-20 dark:opacity-10",
  pattern: "absolute inset-0 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] dark:bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"
};


// Add these to your existing assets/dummyStyles.js

export const signUpPageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-4 relative overflow-hidden",

  // Back button
  backButton: "absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 transition-all hover:bg-white hover:shadow-lg",
  backButtonIcon: "w-5 h-5",

  // Main layout
  mainLayout: "w-full pt-20 max-w-6xl flex flex-col md:flex-row lg:flex-row items-center justify-center gap-12",

  // Animation section
  animationContainer: "flex items-center justify-center w-full order-1 md:order-none lg:order-none",
  animationWrapper: "w-full flex justify-center",

  // Form section
  formContainer: "flex items-center justify-center w-full",
  formWrapper: "relative w-full max-w-md",
  formCard: "relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 p-8 shadow-2xl transition-all duration-500",

  // Header
  header: "text-center mb-8 font-[pacifico]",
  title: "text-2xl font-bold text-slate-800 mb-1",
  subtitle: "text-slate-600 text-sm",

  // Form
  form: "space-y-2",
  submitButton: "w-full mt-6 py-3 px-6 bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 relative overflow-hidden",
  buttonContent: "relative flex items-center justify-center gap-2",
  buttonIcon: "w-5 h-5",

  // Sign in link
  signinContainer: "mt-6 text-center",
  signinText: "text-slate-600 text-sm font-[pacifico]",
  signinLink: "text-blue-600 font-semibold hover:text-blue-700"
};

// Floating Input styles
export const floatingInputStyles = {
  container: "relative mb-6 group",
  inputWrapper: "relative",
  input: "w-full bg-white/80 backdrop-blur-sm border-0 rounded-2xl pt-6 pb-4 px-4 text-slate-700 placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-300 shadow-lg",
  inputError: "focus:ring-red-400 border-l-4 border-red-400",
  inputNormal: "focus:ring-indigo-300 focus:border-l-4 focus:border-indigo-400",
  label: "absolute left-4 transition-all duration-300 cursor-text font-medium",
  labelFocused: "top-2 text-xs text-indigo-600",
  labelNormal: "top-5 text-sm text-slate-500",
  labelError: "text-red-400",
  iconsContainer: "absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2",
  emailIcon: "w-5 h-5 text-indigo-400",
  passwordToggle: "focus:outline-none cursor-pointer",
  passwordToggleIcon: "w-5 h-5 text-indigo-400",
  dotsContainer: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1",
  dot: "w-1 h-1 bg-indigo-400 rounded-full animate-bounce",
  errorContainer: "flex items-center mt-2 text-red-500 text-sm ml-1",
  errorIcon: "w-4 h-4 mr-1 text-yellow-500"
};

// Custom styles for SignUpPage
export const signUpPageCustomStyles = `
@keyframes float {
  0 %, 100 % { transform: translateY(0px); }
  50 % { transform: translateY(-15px); }
}
  .animate - float { animation: float 6s ease -in -out infinite; }
`;

// Add these to the existing dummyStyles.js file
export const testimonialStyles = {
  // Main Section - with dark mode
  section: "py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950",
  container: "max-w-6xl mx-auto text-center mb-12 sm:mb-16",

  // Header
  badge: "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-indigo-100 dark:border-slate-600 mb-4 sm:mb-6",
  badgeDot: "w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse",
  badgeText: "text-sm font-medium text-indigo-700 dark:text-indigo-300",
  title: "text-3xl sm:text-4xl md:text-5xl font-bold font-[Montserrat] mb-3 sm:mb-6",
  titleGradient: "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400",
  subtitle: "text-base sm:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed",

  // Testimonials Grid
  grid: "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-2 sm:px-0",

  // Testimonial Card
  cardWrapper: "relative group",
  glowBorder: "absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-400/30 via-pink-400/20 to-purple-400/30 dark:from-indigo-500/20 dark:via-pink-500/15 dark:to-purple-500/20 blur-xl opacity-60 transition-all duration-700 pointer-events-none",
  backgroundPattern: "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/85 to-indigo-50/30 dark:from-slate-800/85 dark:to-indigo-950/30 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 pointer-events-none",

  // Floating Elements
  floatingElement1: "absolute -left-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-200/40 to-purple-200/40 dark:from-pink-500/20 dark:to-purple-500/20 blur-xl animate-float-slow pointer-events-none hidden sm:block",
  floatingElement2: "absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-200/40 to-blue-200/40 dark:from-indigo-500/20 dark:to-blue-500/20 blur-xl animate-float pointer-events-none hidden sm:block",

  // Main Card - with dark mode
  card: "relative z-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 transform transition-all duration-300 card-init hover:shadow-2xl will-change-transform border border-white/60 dark:border-slate-700/60 overflow-hidden",
  cardShadow: "0 20px 60px rgba(16,24,40,0.08), 0 0 0 1px rgba(255,255,255,0.4)",

  // Course Badge
  courseBadge: "course-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200/50 dark:border-indigo-500/30 mb-4 sm:mb-6",
  courseBadgeDot: "w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full",
  courseBadgeText: "text-sm font-medium text-indigo-700 dark:text-indigo-300 truncate",

  // Quote Icon
  quoteIcon: "quote-icon absolute top-4 right-4 text-indigo-200/60 dark:text-indigo-500/30 transform transition-transform duration-500 hidden sm:block",
  quoteIconSvg: "w-10 h-10 sm:w-12 sm:h-12",

  // Content Layout
  content: "flex items-start gap-4 mb-4 sm:mb-6",
  avatarContainer: "avatar-container relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 transform transition-transform duration-500",
  avatarWrapper: "relative w-full h-full rounded-2xl overflow-hidden",
  avatarImage: "avatar-img w-full h-full object-cover object-center",
  avatarGlow: "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-pink-400/20 blur-md -z-10 animate-pulse-slow",

  // User Info - with dark mode
  userInfo: "flex-1 min-w-0",
  userHeader: "flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-2",
  userName: "font-[Poppins] font-bold text-gray-900 dark:text-slate-100 text-base sm:text-lg md:text-lg leading-tight truncate",
  userRole: "text-sm sm:text-sm text-purple-600 dark:text-purple-400 font-medium truncate",
  ratingContainer: "flex flex-col items-start md:items-end gap-1 mt-2 md:mt-0",
  starsContainer: "flex items-center gap-1 whitespace-nowrap",
  star: "w-4 h-4",
  starActive: "text-yellow-400 fill-current",
  starInactive: "text-gray-300 dark:text-slate-600",

  // Message
  message: "text-gray-700 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 relative z-10 text-sm sm:text-base",
  quoteMark: "text-indigo-400 dark:text-indigo-500 font-serif text-xl leading-none",

  // Footer
  footer: "flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-slate-700 text-xs sm:text-sm",
  verified: "flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400",
  verifiedIcon: "w-4 h-4 text-green-400",
  date: "flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400",
  dateIcon: "w-4 h-4 text-indigo-400",

  // Animations
  animations: `
@keyframes rotateGlow {
  0 % { transform: rotate(0deg) scale(1); opacity: 0.6; }
  50 % { transform: rotate(180deg) scale(1.05); opacity: 0.8; }
  100 % { transform: rotate(360deg) scale(1); opacity: 0.6; }
}
@keyframes float {
  0 %, 100 % { transform: translateY(0) rotate(0deg); }
  50 % { transform: translateY(-12px) rotate(5deg); }
}
@keyframes float - slow {
  0 %, 100 % { transform: translateY(0) rotate(0deg); }
  50 % { transform: translateY(-8px) rotate(- 3deg);
} 
    }
@keyframes pulseSlow {
  0 % { box- shadow: 0 0 0 0 rgba(99, 102, 241, 0.15);
}
70 % { box- shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
100 % { box- shadow: 0 0 0 0 rgba(99, 102, 241, 0); } 
    }
    .animate - float { animation: float 6s ease -in -out infinite; }
    .animate - float - slow { animation: float - slow 8s ease -in -out infinite; }
    .animate - pulse - slow { animation: pulseSlow 3s ease - out infinite; }
    .card - init {
  opacity: 0;
  transform: translateY(18px) scale(0.98) rotateX(2deg);
  filter: blur(3px);
} 
    .card - visible {
  opacity: 1;
  transform: translateY(0) scale(1) rotateX(0);
  filter: blur(0);
  transition: all 700ms cubic - bezier(0.22, 1, 0.36, 1);
} 
    .will - change - transform { will - change: transform; }

    /* ensure avatar images cover their container and never stretch */
    .avatar - img { object - fit: cover; object - position: center; display: block; }

/* on very small screens reduce some spacing to keep cards compact */
@media(max - width: 420px) {
      .card - init { transform: translateY(10px) scale(0.99) rotateX(0deg); }
}

/* small performance hint - don't animate heavy shadows on mobile */
@media(max - width: 640px) {
      .group: hover.card - init { box - shadow: none; }
}
`
};

// Add these to the existing dummyStyles.js file
export const courseDetailStyles = {
  // Layout & Container - with dark mode
  container: "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 py-8 px-4 relative overflow-hidden",
  mainContainer: "max-w-7xl mx-auto space-y-8 relative z-10 transition-all duration-1000",
  containerVisible: "opacity-100 translate-y-0",
  containerHidden: "opacity-0 translate-y-8",

  // Back Button - with dark mode
  backButton: "inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 animate-slideInLeft",
  backIcon: "w-5 h-5 dark:text-slate-300",
  backText: "font-medium dark:text-slate-200",

  // Course Header - with dark mode
  header: "text-center space-y-6 relative",
  badge: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg border border-white/50 dark:border-slate-700 animate-bounceIn",
  badgeIcon: "w-5 h-5 dark:text-purple-400",
  badgeText: "text-sm font-medium bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent",
  title: "text-4xl md:text-6xl font-[Montserrat] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 leading-tight animate-fadeInUp",

  // Course Overview - with dark mode
  overviewContainer: "max-w-4xl mx-auto",
  overview: "p-6 font-serif rounded-3xl bg-white/40 dark:bg-slate-800/60 backdrop-blur-md shadow-xl dark:shadow-indigo-500/10 border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 animate-slideInUp",
  overviewHeader: "flex items-center gap-3 mb-3",
  overviewIcon: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
  overviewTitle: "text-lg font-semibold text-gray-800 dark:text-white",
  overviewText: "text-gray-700 dark:text-slate-300 text-base leading-relaxed text-left",

  // Course Stats - with dark mode
  statsContainer: "flex items-center justify-center gap-8 flex-wrap animate-fadeInUp",
  statItem: "flex items-center gap-3 text-gray-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 dark:border-slate-700",
  statIcon: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
  statText: "font-medium dark:text-slate-200",
  teacherStat: "flex items-center gap-3 text-gray-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 dark:border-slate-700 transition-all duration-1000",
  teacherAnimating: "scale-110 bg-indigo-100/50 dark:bg-indigo-900/50",

  // Main Grid
  mainGrid: "grid font-[pacifico] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8",

  // Video Player - with dark mode
  videoSection: "xl:col-span-2 space-y-6",
  videoContainer: "rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl dark:shadow-indigo-500/10 overflow-hidden border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 animate-slideInRight",
  video: "w-full h-[500px] object-cover bg-black rounded-t-3xl",
  iframe: "w-full h-[500px] rounded-t-3xl",
  videoPlaceholder: "w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden rounded-t-3xl",
  videoPlaceholderBg: "absolute inset-0 opacity-20",
  videoPlaceholderOrb1: "absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-overlay filter blur-xl",
  videoPlaceholderOrb2: "absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-overlay filter blur-xl",
  videoPlaceholderContent: "text-center relative z-10",
  videoPlaceholderIcon: "w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm",
  videoPlaceholderPlayIcon: "w-8 h-8 opacity-70",
  videoPlaceholderText: "text-xl mb-2",
  videoPlaceholderSubtext: "text-lg text-gray-300",

  // Video Info - with dark mode
  videoInfo: "p-6",
  videoTitle: "text-2xl font-bold text-gray-800 dark:text-white mb-3",
  videoDescription: "text-gray-600 dark:text-slate-400 leading-relaxed",
  videoMeta: "flex items-center gap-3 mt-4",
  durationBadge: "flex items-center gap-2 text-gray-500 dark:text-slate-400 bg-gray-100/50 dark:bg-slate-700/50 px-3 py-1 rounded-full",
  durationIcon: "w-4 h-4",
  chapterBadge: "text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-700/50",

  // Completion Button - with dark mode
  completionSection: "mt-6 pt-6 border-t border-gray-200/50 dark:border-slate-700",
  completionButton: "inline-flex cursor-pointer items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm",
  completionButtonCompleted: "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30 border border-green-300/50 dark:border-green-700/50 hover:border-green-400/50",
  completionButtonIncomplete: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/30 border border-indigo-300/50 dark:border-indigo-700/50 hover:border-indigo-400/50",
  completionIcon: "w-5 h-5",
  completionText: "text-sm text-gray-500 dark:text-slate-400 mt-2",

  // Sidebar
  sidebar: "space-y-6",

  // Course Content - with dark mode
  contentCard: "p-6 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl dark:shadow-indigo-500/10 border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 animate-slideInLeft",
  contentHeader: "flex items-center justify-between mb-6",
  contentTitle: "text-xl font-bold text-gray-800 dark:text-white",
  freeBadge: "text-sm text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full flex items-center gap-2",
  freeBadgeIcon: "w-4 h-4",
  contentList: "space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar",

  // Lecture Item - with dark mode
  lectureItem: "rounded-2xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm shadow-lg dark:shadow-indigo-500/5 border border-white/50 dark:border-slate-600 hover:border-white/80 dark:hover:border-slate-500 transition-all duration-300 animate-fadeInUp",
  lectureHeader: "p-4 cursor-pointer transition-all duration-300",
  lectureHeaderExpanded: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-white/50 dark:border-slate-600",
  lectureHeaderCollapsed: "hover:bg-white/70 dark:hover:bg-slate-600/50",
  lectureHeaderContent: "flex items-center justify-between",
  lectureLeftSection: "flex items-center gap-3",
  lectureChevron: "transform transition-transform duration-300",
  lectureChevronExpanded: "rotate-180 text-indigo-600 dark:text-indigo-400",
  lectureChevronCollapsed: "text-gray-500 dark:text-slate-400",
  lectureInfo: "",
  lectureTitle: "font-semibold text-gray-800 dark:text-white",
  lectureMeta: "text-sm text-gray-500 dark:text-slate-400 flex items-center gap-3 mt-1",
  lectureDuration: "flex items-center gap-1",
  lectureChapterCount: "text-xs bg-gray-100/50 dark:bg-slate-600/50 px-2 py-1 rounded-full border border-gray-200/50 dark:border-slate-500",

  // Chapter List - with dark mode
  chapterList: "p-4 pt-0 space-y-2 animate-fadeIn",
  chapterItem: "p-3 rounded-xl cursor-pointer transition-all duration-300 group",
  chapterSelected: "bg-gradient-to-r from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/50 dark:to-purple-900/50 border-2 border-indigo-200/50 dark:border-indigo-600/50 shadow-md",
  chapterNotSelected: "bg-white/30 dark:bg-slate-700/30 hover:bg-white/50 dark:hover:bg-slate-600/50 border border-transparent hover:border-white/50 dark:hover:border-slate-500",
  chapterDisabled: "opacity-60",
  chapterContent: "flex items-center justify-between",
  chapterLeftSection: "flex items-center gap-3 flex-1",
  completionToggle: "flex-shrink-0 transition-all duration-300 hover:scale-110",
  completionToggleCompleted: "text-green-500 dark:text-green-400",
  completionToggleIncomplete: "text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-400",
  completionIconSmall: "w-5 h-5",
  chapterText: "flex-1",
  chapterName: "font-medium transition-colors duration-300",
  chapterNameSelected: "text-indigo-700 dark:text-indigo-300",
  chapterNameNotSelected: "text-gray-800 dark:text-slate-200",
  chapterTopic: "text-sm text-gray-500 dark:text-slate-400",
  chapterDuration: "text-sm text-gray-500 dark:text-slate-400 bg-white/50 dark:bg-slate-700/50 px-2 py-1 rounded-full border border-white/50 dark:border-slate-600",

  // Pricing Card - with dark mode
  pricingCard: "p-6 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl dark:shadow-indigo-500/10 border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 animate-slideInLeft",
  pricingHeader: "flex items-center gap-2 mb-4",
  pricingTitle: "font-bold text-lg text-gray-800 dark:text-white",
  pricingAmount: "flex items-baseline gap-3 mb-2",
  price: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent",
  originalPrice: "text-sm text-gray-500 dark:text-slate-400 line-through",
  discountBadge: "ml-auto text-sm bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-200/50 dark:border-green-700/50",
  pricingDescription: "text-sm text-gray-600 dark:text-slate-400 mb-6",

  // Enrollment Buttons - with dark mode
  enrollButton: "w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full cursor-pointer font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed",
  freeEnrolledButton: "bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-default",
  enrollPaidButton: "bg-gradient-to-r from-indigo-400 to-pink-600 dark:from-indigo-500 dark:to-purple-500 text-white",
  enrolledButton: "bg-white dark:bg-slate-700 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 shadow-sm cursor-default",
  enrollSpinner: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin",
  enrollIcon: "w-5 h-5 transition-transform",
  enrollArrow: "ml-auto opacity-80 group-hover:opacity-100",

  // Progress Card - with dark mode
  progressCard: "p-6 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl dark:shadow-indigo-500/10 border border-white/50 dark:border-slate-700 hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 animate-slideInLeft",
  progressHeader: "flex items-center gap-2 mb-4",
  progressIcon: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
  progressTitle: "font-semibold text-gray-800 dark:text-white",
  progressContent: "space-y-4",
  progressBar: "w-full bg-gray-200/50 dark:bg-slate-700/50 rounded-full h-3 backdrop-blur-sm",
  progressFill: "bg-gradient-to-r from-indigo-500 to-pink-500 dark:from-cyan-500 dark:to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner",
  progressStats: "grid grid-cols-2 gap-4 text-center",
  progressStat: "p-4 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/50 dark:border-slate-600 hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-300",
  progressStatValue: "text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent",
  progressStatLabel: "text-sm text-gray-600 dark:text-slate-400 mt-1",

  // Toast - with dark mode
  toast: "fixed top-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 z-50 animate-slideInRight",
  toastError: "bg-red-500/90 text-white",
  toastInfo: "bg-indigo-500/90 text-white",
  toastContent: "flex items-center gap-3",
  toastClose: "hover:scale-110 transition-transform",
  toastCloseIcon: "w-4 h-4",

  // Not Found State - with dark mode
  notFoundContainer: "min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 relative overflow-hidden",
  notFoundContent: "text-center relative z-10",
  notFoundTitle: "text-2xl font-bold dark:text-white",
  notFoundText: "mt-2 text-gray-500 dark:text-slate-400",
  notFoundButton: "mt-4 cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg bg-white/10 dark:bg-slate-800/70 backdrop-blur-md dark:text-white dark:border dark:border-slate-700",

  // Animations
  animations: `
@keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
}
@keyframes bounceIn {
  0 % { transform: scale(0.3); opacity: 0; }
  50 % { transform: scale(1.05); }
  70 % { transform: scale(0.9); }
  100 % { transform: scale(1); opacity: 1; }
}
    .animate - fadeIn {
  animation: fadeIn 0.5s ease - out;
}
    .animate - slideInUp {
  animation: slideInUp 0.8s ease - out;
}
    .animate - slideInLeft {
  animation: slideInLeft 0.8s ease - out;
}
    .animate - slideInRight {
  animation: slideInRight 0.8s ease - out;
}
    .animate - bounceIn {
  animation: bounceIn 0.8s ease - out;
}
    .animate - fadeInUp {
  animation: fadeInUp 0.8s ease - out;
}
    .animation - delay - 200 {
  animation - delay: 0.2s;
}
    .animation - delay - 400 {
  animation - delay: 0.4s;
}
    .animation - delay - 300 {
  animation - delay: 0.3s;
}
    .animation - delay - 1000 {
  animation - delay: 1s;
}
    .animation - delay - 2000 {
  animation - delay: 2s;
}
    .animation - delay - 3000 {
  animation - delay: 3s;
}
    .animation - delay - 4000 {
  animation - delay: 4s;
}
    .custom - scrollbar:: -webkit - scrollbar {
  width: 6px;
}
    .custom - scrollbar:: -webkit - scrollbar - track {
  background: rgba(255, 255, 255, 0.3);
  border - radius: 10px;
}
    .custom - scrollbar:: -webkit - scrollbar - thumb {
  background: rgba(99, 102, 241, 0.4);
  border - radius: 10px;
}
    .custom - scrollbar:: -webkit - scrollbar - thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}
`
};

// Add these to your existing assets/dummyStyles.js

export const courseDetailStylesH = {
  // Layout and container styles
  pageContainer: "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 relative overflow-x-hidden",
  mainContainer: "max-w-7xl mx-auto space-y-8 relative z-10 transition-all duration-1000",

  // Back button
  backButton: "inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-white/80 animate-slideInLeft",
  backButtonIcon: "w-5 h-5",
  backButtonText: "font-medium",

  // Course header
  headerContainer: "text-center space-y-6 relative",
  courseBadge: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm shadow-lg border border-white/50 animate-bounceIn",
  badgeIcon: "w-5 h-5",
  badgeText: "text-sm font-medium bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent",
  courseTitle: "text-3xl sm:text-4xl md:text-6xl font-[Montserrat] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 leading-tight animate-fadeInUp",

  // Overview section
  overviewContainer: "max-w-4xl mx-auto",
  overviewCard: "p-6 font-serif rounded-3xl bg-white/40 backdrop-blur-md shadow-xl border border-white/50 hover:border-white/80 transition-all duration-500 animate-slideInUp",
  overviewHeader: "flex items-center gap-3 mb-3",
  overviewIcon: "w-5 h-5 text-indigo-600",
  overviewTitle: "text-lg font-semibold text-gray-800",
  overviewText: "text-gray-700 text-base leading-relaxed text-left",

  // Course stats
  statsContainer: "flex items-center justify-center gap-8 flex-wrap animate-fadeInUp",
  statItem: "flex items-center gap-3 text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50",
  statIcon: "w-5 h-5 text-indigo-600",
  statText: "font-medium",
  teacherStat: "flex items-center gap-3 text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 transition-all duration-1000",
  teacherIcon: "w-5 h-5 text-indigo-600",
  teacherText: "font-medium font-[pacifico]",

  // Main grid
  mainGrid: "grid font-[pacifico] grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",

  // Video player section
  videoSection: "md:col-span-1 xl:col-span-2 space-y-6",
  videoContainer: "rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden border border-white/50 hover:border-white/80 transition-all duration-500 animate-slideInRight",
  videoWrapper: "w-full bg-black relative",
  videoFrame: "w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-t-3xl",
  videoPlaceholder: "w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden rounded-t-3xl",
  videoPlaceholderPattern: "absolute inset-0 opacity-20",
  videoPlaceholderBlob: "absolute w-32 h-32 rounded-full mix-blend-overlay filter blur-xl",
  videoPlaceholderContent: "text-center relative z-10 px-4",
  videoPlaceholderIcon: "w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm",
  videoPlaceholderPlayIcon: "w-8 h-8 opacity-70",
  videoPlaceholderText: "text-xl mb-2",
  videoPlaceholderSubtext: "text-lg text-gray-300",

  // Video info
  videoInfo: "p-6",
  videoTitle: "text-2xl font-bold text-gray-800 mb-3",
  videoDescription: "text-gray-600 leading-relaxed",
  videoMeta: "flex items-center gap-3 mt-4",
  durationBadge: "flex items-center gap-2 text-gray-500 bg-gray-100/50 px-3 py-1 rounded-full",
  durationIcon: "w-4 h-4",
  chapterBadge: "text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200",

  // Completion button
  completionSection: "mt-6 pt-6 border-t border-gray-200/50",
  completionButton: "inline-flex cursor-pointer items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105",
  completionButtonCompleted: "bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-300/50 hover:border-green-400/50",
  completionButtonIncomplete: "bg-indigo-500/20 text-indigo-700 hover:bg-indigo-500/30 border border-indigo-300/50 hover:border-indigo-400/50",
  completionIcon: "w-5 h-5",
  completionText: "text-sm text-gray-500 mt-2",

  // Sidebar sections
  sidebar: "space-y-6",
  sidebarCard: "p-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/50 hover:border-white/80 transition-all duration-500",

  // Course content
  contentHeader: "flex items-center justify-between mb-6",
  contentTitle: "text-xl font-bold text-gray-800",
  freeAccessBadge: "text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full flex items-center gap-2",
  freeAccessIcon: "w-4 h-4",
  contentList: "space-y-3 max-h-[320px] sm:max-h-[420px] md:max-h-[600px] overflow-y-auto custom-scrollbar",

  // Lecture item
  lectureItem: "rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg border border-white/50 hover:border-white/80 transition-all duration-300 animate-fadeInUp",
  lectureHeader: "p-4 cursor-pointer transition-all duration-300",
  lectureHeaderExpanded: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-white/50",
  lectureHeaderNormal: "hover:bg-white/70",
  lectureContent: "flex items-center justify-between",
  lectureLeft: "flex items-center gap-3",
  lectureChevron: "transform transition-transform duration-300",
  lectureChevronExpanded: "rotate-180 text-indigo-600",
  lectureChevronNormal: "text-gray-500",
  lectureInfo: "",
  lectureTitle: "font-semibold text-gray-800",
  lectureMeta: "text-sm text-gray-500 flex items-center gap-3 mt-1",
  lectureDuration: "flex items-center gap-1",
  lectureDurationIcon: "w-4 h-4",
  lectureChaptersCount: "text-xs bg-gray-100/50 px-2 py-1 rounded-full border border-gray-200/50",

  // Chapters list
  chaptersList: "p-4 pt-0 space-y-2 animate-fadeIn",
  chapterItem: "p-3 rounded-xl cursor-pointer transition-all duration-300 group",
  chapterItemSelected: "bg-gradient-to-r from-indigo-100/50 to-purple-100/50 border-2 border-indigo-200/50 shadow-md",
  chapterItemNormal: "bg-white/30 hover:bg-white/50 border border-transparent hover:border-white/50",
  chapterContent: "flex items-center justify-between",
  chapterLeft: "flex items-center gap-3 flex-1",
  chapterCompletionButton: "flex-shrink-0 transition-all duration-300 hover:scale-110",
  chapterCompletionCompleted: "text-green-500",
  chapterCompletionNormal: "text-gray-400 group-hover:text-gray-600",
  chapterInfo: "flex-1",
  chapterName: "font-medium transition-colors duration-300",
  chapterNameSelected: "text-indigo-700",
  chapterNameNormal: "text-gray-800",
  chapterTopic: "text-sm text-gray-500",
  chapterDuration: "text-sm text-gray-500 bg-white/50 px-2 py-1 rounded-full border border-white/50",

  // Pricing card
  pricingHeader: "flex items-center gap-2 mb-4",
  pricingTitle: "font-bold text-lg text-gray-800",
  pricingAmount: "flex items-baseline gap-3 mb-2",
  pricingCurrent: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent",
  pricingOriginal: "text-sm text-gray-500 line-through",
  pricingDiscount: "ml-auto text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full border border-green-200/50",
  pricingDescription: "text-sm text-gray-600 mb-6",

  // Enroll button
  enrollButton: "w-full inline-flex cursor-pointer items-center justify-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed",
  enrollButtonFree: "w-full inline-flex items-center justify-center gap-3 px-6 py-2 sm:py-4 md:py-4 lg:py-4 xl:py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-sm cursor-default group",
  enrollButtonEnrolled: "w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white border border-green-300 text-green-700 font-semibold shadow-sm cursor-default group",
  enrollButtonIcon: "w-5 h-5 transition-transform",
  enrollSpinner: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin",

  // Progress card
  progressHeader: "flex items-center gap-2 mb-4",
  progressIcon: "w-5 h-5 text-indigo-600",
  progressTitle: "font-semibold text-gray-800",
  progressSection: "space-y-4",
  progressBarContainer: "w-full bg-gray-200/50 rounded-full h-3 backdrop-blur-sm",
  progressBar: "bg-gradient-to-r from-indigo-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner",
  progressStats: "grid grid-cols-2 gap-4 text-center",
  progressStat: "p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/50 hover:bg-white/70 transition-all duration-300",
  progressStatValue: "text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent",
  progressStatLabel: "text-sm text-gray-600 mt-1",

  // Not found page
  notFoundContainer: "min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden",
  notFoundPattern: "absolute inset-0 opacity-10",
  notFoundBlob: "absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob",
  notFoundContent: "text-center relative z-10",
  notFoundTitle: "text-2xl font-bold",
  notFoundText: "mt-2 text-gray-500",
  notFoundButton: "mt-4 cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg bg-white/10 backdrop-blur-md"
};

// Toast styles
export const toastStyles = {
  toast: "fixed top-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 z-50 animate-slideInRight",
  toastError: "bg-red-500/90 text-white",
  toastInfo: "bg-indigo-500/90 text-white",
  toastContent: "flex items-center gap-3",
  toastClose: "hover:scale-110 transition-transform",
  toastCloseIcon: "w-4 h-4"
};

// Animation delays
export const animationDelaysH = {
  delay200: "animation-delay-200",
  delay300: "animation-delay-300",
  delay400: "animation-delay-400",
  delay1000: "animation-delay-1000",
  delay2000: "animation-delay-2000",
  delay4000: "animation-delay-4000"
};

// Custom styles for CourseDetail
export const courseDetailCustomStyles = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes blob {
  0 % { transform: translate(0px, 0px) scale(1); }
  33 % { transform: translate(30px, -50px) scale(1.1); }
  66 % { transform: translate(-20px, 20px) scale(0.9); }
  100 % { transform: translate(0px, 0px) scale(1); }
}

  .animate - fadeIn {
  animation: fadeIn 0.5s ease - out;
}
  .animate - slideInUp {
  animation: slideInUp 0.8s ease - out;
}
  .animate - slideInLeft {
  animation: slideInLeft 0.8s ease - out;
}
  .animate - slideInRight {
  animation: slideInRight 0.8s ease - out;
}
  .animate - fadeInUp {
  animation: fadeInUp 0.8s ease - out;
}
  .animate - blob {
  animation: blob 7s infinite;
}
  .animation - delay - 200 {
  animation - delay: 0.2s;
}
  .animation - delay - 300 {
  animation - delay: 0.3s;
}
  .animation - delay - 400 {
  animation - delay: 0.4s;
}
  .animation - delay - 1000 {
  animation - delay: 1s;
}
  .animation - delay - 2000 {
  animation - delay: 2s;
}
  .animation - delay - 4000 {
  animation - delay: 4s;
}
  .custom - scrollbar:: -webkit - scrollbar {
  width: 6px;
}
  .custom - scrollbar:: -webkit - scrollbar - track {
  background: rgba(255, 255, 255, 0.3);
  border - radius: 10px;
}
  .custom - scrollbar:: -webkit - scrollbar - thumb {
  background: rgba(99, 102, 241, 0.4);
  border - radius: 10px;
}
  .custom - scrollbar:: -webkit - scrollbar - thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}
`;


// Add these to your existing assets/dummyStyles.js

export const loginPageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100 relative overflow-hidden",

  // Back button
  backButton: "absolute top-6 left-6 z-10 group",
  backButtonContainer: "flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-all duration-300 transform hover:translate-x-1",
  backButtonIcon: "p-2 bg-white/70 rounded-full backdrop-blur-sm group-hover:bg-white/90 transition-all duration-300 shadow-sm",
  backButtonArrow: "w-5 h-5",
  backButtonText: "font-semibold",

  // Main content
  mainContent: "relative min-h-screen font-serif flex items-center justify-center p-4",
  contentContainer: "w-full max-w-6xl flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10",

  // Animation section
  animationContainer: "flex flex-1 items-center justify-center w-full mb-8 lg:mb-0",

  // Login card
  cardContainer: "flex-1 flex justify-center w-full",
  cardWrapper: "relative w-full max-w-md",
  cardGlow: "absolute -inset-4 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-1000 group-hover:duration-200",
  mainCard: "relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-2xl transform transition-all duration-500",
  cardTopLine: "absolute -top-1 left-8 right-8 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-t-2xl blur-sm",
  cardContent: "p-8",

  // Header
  header: "text-center mb-8",
  title: "text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2 transform hover:scale-110 transition-transform duration-300",
  subtitle: "text-slate-600",

  // Form
  form: "space-y-6",
  formGroup: "group",
  label: "flex items-center space-x-3 text-slate-700 mb-2",
  labelIcon: "w-5 h-5",
  inputContainer: "relative",
  input: "w-full px-4 py-3 pl-12 bg-white/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/80 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 backdrop-blur-sm",
  passwordInput: "w-full px-4 py-3 pl-12 pr-12 bg-white/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:bg-white/80 focus:ring-2 focus:ring-purple-200 transition-all duration-300 backdrop-blur-sm",
  inputIcon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4",
  passwordToggle: "absolute right-4 cursor-pointer top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors duration-200",
  passwordToggleIcon: "w-4 h-4",

  // Submit button
  submitButton: "w-full py-4 px-6 bg-gradient-to-br from-cyan-100 via-blue-100 text-white font-semibold rounded-full cursor-pointer hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 relative overflow-hidden group shadow-lg",
  buttonContent: "flex items-center justify-center space-x-2",
  buttonIcon: "w-5 h-5 text-cyan-500",
  buttonText: "relative text-cyan-500 z-10",

  // Sign up link
  signupContainer: "text-center mt-6 relative z-10",
  signupText: "text-slate-600",
  signupLink: "text-cyan-600 hover:text-cyan-700 font-semibold transition-colors duration-200",

  // Toast notification
  toast: "fixed bottom-6 right-6 bg-white/90 backdrop-blur-xl border border-green-300 shadow-2xl rounded-xl px-6 py-2 flex items-center space-x-3 animate-fade-in-up",
  toastIcon: "text-green-500 w-6 h-6",
  toastContent: "",
  toastTitle: "font-semibold text-green-700",
  toastMessage: "text-sm text-gray-600"
};

// Icon colors
export const loginIconColors = {
  cyan: "text-cyan-500",
  purple: "text-purple-500",
  cyan600: "text-cyan-600",
  purple600: "text-purple-600"
};

// Custom styles for LoginPage
export const loginPageCustomStyles = `
@keyframes fade -in -up {
  0 % { opacity: 0; transform: translateY(20px); }
  100 % { opacity: 1; transform: translateY(0); }
}
  .animate - fade -in -up {
  animation: fade -in -up 0.5s ease - out;
}
`;