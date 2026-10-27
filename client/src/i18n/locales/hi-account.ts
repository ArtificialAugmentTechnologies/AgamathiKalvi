// Hindi copy for accounts and the dashboard — first draft, to be reviewed by a fluent Hindi speaker.
import type { enAccount } from './en-account';

type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> };

export const hiAccount: DeepString<typeof enAccount> = {
  auth: {
    loginTitle: 'फिर से स्वागत है',
    loginLead: 'अपने सहेजे गए परिणाम, चॉइस लिस्ट और काउंसलिंग बुकिंग देखने के लिए लॉग इन करें।',
    signupTitle: 'अपना मुफ़्त खाता बनाएँ',
    signupLead:
      'अपना कटऑफ़ और प्रेडिक्शन सहेजें, अपनी चॉइस लिस्ट हर डिवाइस पर रखें, और काउंसलिंग सत्र बुक करें।',
    name: 'पूरा नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    passwordHint: 'कम से कम 8 अक्षर, जिनमें अक्षर और अंक दोनों हों',
    phone: 'मोबाइल नंबर (वैकल्पिक)',
    login: 'लॉग इन करें',
    signup: 'खाता बनाएँ',
    working: 'कृपया प्रतीक्षा करें…',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    showPassword: 'पासवर्ड दिखाएँ',
    hidePassword: 'पासवर्ड छिपाएँ',
    perks: {
      save: 'अपने टूल के परिणाम सहेजें',
      list: 'हर डिवाइस पर आपकी चॉइस लिस्ट',
      book: 'काउंसलिंग सत्र बुक करें',
    },
    otpSoon: 'मोबाइल OTP से लॉग इन जल्द आ रहा है।',
    welcome: 'स्वागत है, {{name}}!',
    loggedOut: 'आप लॉग आउट हो गए हैं।',
    errors: {
      invalid: 'ईमेल या पासवर्ड गलत है।',
      exists: 'इस ईमेल से पहले से एक खाता मौजूद है। लॉग इन करके देखें।',
      password: 'कम से कम 8 अक्षर इस्तेमाल करें, जिनमें अक्षर और अंक दोनों हों।',
    },
  },

  account: {
    dashboard: 'मेरा डैशबोर्ड',
    logout: 'लॉग आउट',
  },

  save: {
    button: 'डैशबोर्ड में सहेजें',
    saved: 'आपके डैशबोर्ड में सहेजा गया',
    login: 'सहेजने के लिए लॉग इन करें',
  },

  dashboard: {
    greeting: 'नमस्ते {{name}}',
    lead: 'आपके सहेजे गए परिणाम, चॉइस लिस्ट और काउंसलिंग सत्र — सब एक जगह।',
    tabs: {
      overview: 'सारांश',
      profile: 'प्रोफ़ाइल',
      choices: 'चॉइस लिस्ट',
      results: 'सहेजे गए परिणाम',
      bookings: 'काउंसलिंग',
      resources: 'संसाधन',
    },
    overview: {
      choices: 'आपकी लिस्ट में विकल्प',
      results: 'सहेजे गए परिणाम',
      sessions: 'आगामी सत्र',
      nextSession: 'आपका अगला सत्र',
      noSession: 'अभी कोई सत्र बुक नहीं है।',
      book: 'सत्र बुक करें',
      profileTitle: 'अपनी प्रोफ़ाइल पूरी करें',
      profileBody:
        'अपनी कक्षा, ज़िला, समुदाय और अंक जोड़ें ताकि काउंसलर आपका बेहतर मार्गदर्शन कर सकें।',
      profileCta: 'प्रोफ़ाइल पूरी करें',
    },
    profile: {
      account: 'खाता',
      study: 'पढ़ाई',
      classLevel: 'कक्षा',
      school: 'स्कूल',
      district: 'ज़िला',
      community: 'समुदाय',
      marks: 'कक्षा 12 के अंक (100 में से)',
      interests: 'रुचियाँ',
      save: 'प्रोफ़ाइल सहेजें',
      saved: 'प्रोफ़ाइल सहेजी गई',
    },
    results: {
      empty: 'अभी कुछ भी सहेजा नहीं गया है। कोई टूल इस्तेमाल करें और “डैशबोर्ड में सहेजें” दबाएँ।',
      delete: 'हटाएँ',
      open: 'टूल खोलें',
      saved: '{{date}} को सहेजा गया',
      tool: {
        cutoff: 'कटऑफ़ कैलकुलेटर',
        predictor: 'कॉलेज प्रेडिक्टर',
        quiz: 'करियर क्विज़',
        scholarship: 'छात्रवृत्ति खोजक',
      },
    },
    choices: {
      synced: 'आपके खाते से सिंक है — इसे किसी भी डिवाइस पर खोलें।',
      open: 'चॉइस लिस्ट बिल्डर खोलें',
    },
    bookings: {
      title: 'काउंसलिंग सत्र बुक करें',
      lead: 'अपनी सुविधा का समय चुनें। सत्र Agamathi काउंसलर के साथ 45 मिनट का होता है।',
      remaining: '{{count}} बाकी',
      full: 'भरा हुआ',
      booked: 'बुक किया गया',
      notes: 'आप किस बारे में बात करना चाहेंगे? (वैकल्पिक)',
      confirm: 'यह समय बुक करें',
      success: 'बुक हो गया! पुष्टि के लिए हमारी टीम आपको कॉल करेगी।',
      mine: 'आपके सत्र',
      none: 'अभी कोई सत्र बुक नहीं है।',
      cancel: 'रद्द करें',
      confirmCancel: 'यह सत्र रद्द करें?',
      cancelled: 'सत्र रद्द कर दिया गया',
      noSlots: 'अभी कोई ख़ाली समय नहीं है — WhatsApp पर संदेश भेजें, हम आपके लिए समय निकालेंगे।',
      conflicts: {
        started: 'यह समय पहले ही शुरू हो चुका है।',
        duplicate: 'आप यह समय पहले ही बुक कर चुके हैं।',
        full: 'यह समय भर चुका है — कृपया कोई और समय चुनें।',
        changed: 'यह समय अभी बदल गया है — कृपया फिर से कोशिश करें।',
        noCancel: 'यह बुकिंग अब रद्द नहीं की जा सकती।',
        sessionStarted: 'यह सत्र पहले ही शुरू हो चुका है।',
      },
      status: {
        pending: 'पुष्टि लंबित',
        confirmed: 'पुष्टि हो गई',
        completed: 'पूरा हुआ',
        cancelled: 'रद्द',
      },
    },
    resources: {
      lead: 'हमारी R&D टीम के गाइड और शोध नोट्स।',
      download: 'PDF डाउनलोड करें',
    },
  },
};
