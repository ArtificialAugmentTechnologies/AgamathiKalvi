// Career interest quiz — first draft (EN + TA + HI), to be reviewed by Agamathi's counsellors.
// Each option nudges one or two career clusters; clusters match Career.cluster values.

type Opt = { label: string; labelTa: string; labelHi: string; weights: Record<string, number> };
type Q = { text: string; textTa: string; textHi: string; options: Opt[] };

const o = (
  label: string,
  labelTa: string,
  labelHi: string,
  weights: Record<string, number>,
): Opt => ({
  label,
  labelTa,
  labelHi,
  weights,
});

export const quizQuestions: Q[] = [
  {
    text: 'Which school subject do you enjoy most?',
    textTa: 'பள்ளியில் உங்களுக்கு மிகவும் பிடித்த பாடம் எது?',
    textHi: 'स्कूल में आपको कौन-सा विषय सबसे ज़्यादा पसंद है?',
    options: [
      o('Maths and computers', 'கணிதம் மற்றும் கணினி', 'गणित और कंप्यूटर', { technology: 2 }),
      o('Biology', 'உயிரியல்', 'जीव विज्ञान', { healthcare: 2, agriculture: 1 }),
      o('Accounts and economics', 'கணக்குப்பதிவியல் மற்றும் பொருளியல்', 'लेखा और अर्थशास्त्र', {
        finance: 2,
      }),
      o('Languages, history and art', 'மொழிகள், வரலாறு மற்றும் கலை', 'भाषाएँ, इतिहास और कला', {
        creative: 1,
        'law-public': 1,
      }),
    ],
  },
  {
    text: 'On a free day, you would rather…',
    textTa: 'ஓய்வு நாளில் நீங்கள் விரும்புவது…',
    textHi: 'छुट्टी के दिन आप क्या करना पसंद करेंगे…',
    options: [
      o(
        'Build or fix gadgets and apps',
        'கருவிகள், செயலிகளை உருவாக்குவது அல்லது சரிசெய்வது',
        'गैजेट और ऐप बनाना या ठीक करना',
        { technology: 2 },
      ),
      o(
        'Care for someone unwell, or for plants and animals',
        'உடல்நலமில்லாதவர்களை, செடிகள் அல்லது விலங்குகளைப் பராமரிப்பது',
        'किसी बीमार की, या पौधों और जानवरों की देखभाल करना',
        { healthcare: 1, agriculture: 1 },
      ),
      o(
        'Plan a trip or an event for friends',
        'நண்பர்களுக்காக ஒரு பயணம் அல்லது நிகழ்ச்சியைத் திட்டமிடுவது',
        'दोस्तों के लिए कोई यात्रा या कार्यक्रम प्लान करना',
        { hospitality: 2 },
      ),
      o(
        'Draw, write or make videos',
        'வரைவது, எழுதுவது அல்லது வீடியோ உருவாக்குவது',
        'चित्र बनाना, लिखना या वीडियो बनाना',
        { creative: 2 },
      ),
    ],
  },
  {
    text: 'Which problem would you most like to solve?',
    textTa: 'எந்தப் பிரச்சினையைத் தீர்க்க நீங்கள் அதிகம் விரும்புகிறீர்கள்?',
    textHi: 'आप कौन-सी समस्या सबसे ज़्यादा हल करना चाहेंगे?',
    options: [
      o(
        'Make technology faster and smarter',
        'தொழில்நுட்பத்தை வேகமாகவும் புத்திசாலித்தனமாகவும் மாற்றுவது',
        'तकनीक को तेज़ और स्मार्ट बनाना',
        { technology: 2 },
      ),
      o('Cure diseases', 'நோய்களைக் குணப்படுத்துவது', 'बीमारियों का इलाज करना', { healthcare: 2 }),
      o('Help businesses grow', 'வணிகங்கள் வளர உதவுவது', 'व्यवसायों को बढ़ने में मदद करना', {
        finance: 2,
      }),
      o('Fight injustice', 'அநீதியை எதிர்த்துப் போராடுவது', 'अन्याय के खिलाफ़ लड़ना', {
        'law-public': 2,
      }),
    ],
  },
  {
    text: 'Your friends usually come to you for…',
    textTa: 'உங்கள் நண்பர்கள் பொதுவாக உங்களிடம் வருவது…',
    textHi: 'आपके दोस्त आमतौर पर आपके पास आते हैं…',
    options: [
      o(
        'Help with phones and computers',
        'கைபேசி, கணினி உதவிக்கு',
        'फ़ोन और कंप्यूटर में मदद के लिए',
        {
          technology: 2,
        },
      ),
      o('Health advice', 'உடல்நல ஆலோசனைக்கு', 'सेहत से जुड़ी सलाह के लिए', { healthcare: 2 }),
      o(
        'Money and planning tips',
        'பணம் மற்றும் திட்டமிடல் யோசனைகளுக்கு',
        'पैसे और योजना से जुड़े सुझावों के लिए',
        { finance: 2 },
      ),
      o(
        'Settling arguments fairly',
        'சண்டைகளை நியாயமாகத் தீர்க்க',
        'झगड़े निष्पक्ष रूप से सुलझाने के लिए',
        {
          'law-public': 2,
        },
      ),
    ],
  },
  {
    text: 'Where would you like to work every day?',
    textTa: 'தினமும் எங்கே பணியாற்ற விரும்புகிறீர்கள்?',
    textHi: 'आप रोज़ कहाँ काम करना चाहेंगे?',
    options: [
      o(
        'A modern office with computers',
        'கணினிகளுடன் கூடிய நவீன அலுவலகம்',
        'कंप्यूटरों वाला आधुनिक दफ़्तर',
        {
          technology: 1,
          finance: 1,
        },
      ),
      o('A hospital or clinic', 'மருத்துவமனை அல்லது கிளினிக்', 'अस्पताल या क्लिनिक', {
        healthcare: 2,
      }),
      o('Outdoors — farms and nature', 'வெளியே — பண்ணைகள், இயற்கை', 'बाहर — खेत और प्रकृति', {
        agriculture: 2,
      }),
      o(
        'Hotels, travel and events',
        'விடுதிகள், பயணம், நிகழ்ச்சிகள்',
        'होटल, यात्रा और कार्यक्रम',
        {
          hospitality: 2,
        },
      ),
    ],
  },
  {
    text: 'Which activity sounds the most fun?',
    textTa: 'எந்தச் செயல் மிகவும் மகிழ்ச்சியாகத் தோன்றுகிறது?',
    textHi: 'कौन-सी गतिविधि सबसे मज़ेदार लगती है?',
    options: [
      o('Coding a game', 'ஒரு விளையாட்டை நிரல் எழுதி உருவாக்குவது', 'कोडिंग करके एक गेम बनाना', {
        technology: 2,
      }),
      o('A debate competition', 'விவாதப் போட்டி', 'वाद-विवाद प्रतियोगिता', { 'law-public': 2 }),
      o(
        'Designing a poster or an outfit',
        'சுவரொட்டி அல்லது உடை வடிவமைப்பது',
        'पोस्टर या पोशाक डिज़ाइन करना',
        { creative: 2 },
      ),
      o('Growing a vegetable garden', 'காய்கறித் தோட்டம் வளர்ப்பது', 'सब्ज़ियों का बगीचा उगाना', {
        agriculture: 2,
      }),
    ],
  },
  {
    text: 'How do you like to work?',
    textTa: 'நீங்கள் எப்படி வேலை செய்ய விரும்புகிறீர்கள்?',
    textHi: 'आप किस तरह काम करना पसंद करते हैं?',
    options: [
      o(
        'On my own, with logic and numbers',
        'தனியாக, தர்க்கம் மற்றும் எண்களுடன்',
        'अकेले, तर्क और संख्याओं के साथ',
        { technology: 1, finance: 1 },
      ),
      o(
        'With people, helping them',
        'மக்களுடன், அவர்களுக்கு உதவியபடி',
        'लोगों के साथ, उनकी मदद करते हुए',
        {
          healthcare: 1,
          hospitality: 1,
        },
      ),
      o(
        'Leading and persuading others',
        'வழிநடத்தி, மற்றவர்களை நம்ப வைப்பது',
        'दूसरों का नेतृत्व करना और उन्हें मनाना',
        { 'law-public': 1, finance: 1 },
      ),
      o('Creating something new', 'புதிதாக ஒன்றை உருவாக்குவது', 'कुछ नया बनाना', { creative: 2 }),
    ],
  },
  {
    text: 'Which news topic catches your eye?',
    textTa: 'எந்தச் செய்தித் தலைப்பு உங்கள் கவனத்தை ஈர்க்கிறது?',
    textHi: 'कौन-सी ख़बर आपका ध्यान खींचती है?',
    options: [
      o(
        'AI and space missions',
        'செயற்கை நுண்ணறிவு மற்றும் விண்வெளிப் பயணங்கள்',
        'AI और अंतरिक्ष मिशन',
        { technology: 2 },
      ),
      o(
        'Health and new medicines',
        'உடல்நலம் மற்றும் புதிய மருந்துகள்',
        'स्वास्थ्य और नई दवाइयाँ',
        {
          healthcare: 2,
        },
      ),
      o('Stock market and business', 'பங்குச் சந்தை மற்றும் வணிகம்', 'शेयर बाज़ार और व्यापार', {
        finance: 2,
      }),
      o('Climate, food and farming', 'காலநிலை, உணவு மற்றும் வேளாண்மை', 'जलवायु, भोजन और खेती', {
        agriculture: 2,
      }),
    ],
  },
  {
    text: 'Which show would you pick tonight?',
    textTa: 'இன்றிரவு எந்த நிகழ்ச்சியைப் பார்ப்பீர்கள்?',
    textHi: 'आज रात आप कौन-सा शो देखेंगे?',
    options: [
      o(
        'A science and technology show',
        'அறிவியல் மற்றும் தொழில்நுட்ப நிகழ்ச்சி',
        'विज्ञान और तकनीक का शो',
        { technology: 2 },
      ),
      o('A courtroom drama', 'நீதிமன்ற நாடகம்', 'अदालत पर आधारित ड्रामा', { 'law-public': 2 }),
      o('A cooking or travel show', 'சமையல் அல்லது பயண நிகழ்ச்சி', 'खाना पकाने या यात्रा का शो', {
        hospitality: 2,
      }),
      o(
        'Behind the scenes of a film',
        'ஒரு திரைப்படத்தின் பின்னணி உருவாக்கம்',
        'किसी फ़िल्म के पर्दे के पीछे',
        { creative: 2 },
      ),
    ],
  },
  {
    text: 'Pick a dream job title:',
    textTa: 'ஒரு கனவு வேலையைத் தேர்ந்தெடுங்கள்:',
    textHi: 'एक सपनों की नौकरी चुनें:',
    options: [
      o('Software engineer', 'மென்பொருள் பொறியாளர்', 'सॉफ़्टवेयर इंजीनियर', { technology: 2 }),
      o('Doctor', 'மருத்துவர்', 'डॉक्टर', { healthcare: 2 }),
      o('Chartered accountant', 'பட்டயக் கணக்காளர்', 'चार्टर्ड अकाउंटेंट', { finance: 2 }),
      o('IAS officer or lawyer', 'IAS அதிகாரி அல்லது வழக்கறிஞர்', 'IAS अधिकारी या वकील', {
        'law-public': 2,
      }),
    ],
  },
  {
    text: 'And one more dream job:',
    textTa: 'இன்னொரு கனவு வேலை:',
    textHi: 'और एक और सपनों की नौकरी:',
    options: [
      o(
        'Fashion or product designer',
        'ஆடை அல்லது பொருள் வடிவமைப்பாளர்',
        'फ़ैशन या प्रोडक्ट डिज़ाइनर',
        { creative: 2 },
      ),
      o('Agricultural scientist', 'வேளாண் விஞ்ஞானி', 'कृषि वैज्ञानिक', { agriculture: 2 }),
      o('Hotel or resort manager', 'விடுதி அல்லது ரிசார்ட் மேலாளர்', 'होटल या रिसॉर्ट मैनेजर', {
        hospitality: 2,
      }),
      o('Data scientist', 'தரவு விஞ்ஞானி', 'डेटा साइंटिस्ट', { technology: 2 }),
    ],
  },
  {
    text: 'In a group project, you usually…',
    textTa: 'குழுத் திட்டத்தில் நீங்கள் பொதுவாக…',
    textHi: 'ग्रुप प्रोजेक्ट में आप आमतौर पर…',
    options: [
      o(
        'Handle the calculations and data',
        'கணக்குகள் மற்றும் தரவைக் கையாள்வீர்கள்',
        'हिसाब-किताब और डेटा संभालते हैं',
        { finance: 1, technology: 1 },
      ),
      o(
        'Present and convince the teacher',
        'ஆசிரியரிடம் விளக்கி நம்ப வைப்பீர்கள்',
        'प्रस्तुति देकर शिक्षक को आश्वस्त करते हैं',
        { 'law-public': 2 },
      ),
      o('Make it look great', 'அழகாகத் தோன்றச் செய்வீர்கள்', 'उसे शानदार दिखाते हैं', {
        creative: 2,
      }),
      o(
        'Organise everyone and the snacks',
        'அனைவரையும், சிற்றுண்டியையும் ஒருங்கிணைப்பீர்கள்',
        'सबको और नाश्ते को व्यवस्थित करते हैं',
        { hospitality: 2 },
      ),
    ],
  },
  {
    text: 'What do you value most in a career?',
    textTa: 'ஒரு தொழிலில் நீங்கள் மிகவும் மதிப்பது எது?',
    textHi: 'करियर में आप किस बात को सबसे ज़्यादा महत्व देते हैं?',
    options: [
      o('Innovation', 'புதுமை', 'नवाचार', { technology: 2 }),
      o('Helping people', 'மக்களுக்கு உதவுவது', 'लोगों की मदद करना', { healthcare: 2 }),
      o('Financial security', 'நிதிப் பாதுகாப்பு', 'आर्थिक सुरक्षा', { finance: 2 }),
      o('Fairness and serving society', 'நியாயமும் சமூக சேவையும்', 'न्याय और समाज सेवा', {
        'law-public': 2,
      }),
    ],
  },
  {
    text: 'Which place excites you most?',
    textTa: 'எந்த இடம் உங்களை அதிகம் உற்சாகப்படுத்துகிறது?',
    textHi: 'कौन-सी जगह आपको सबसे ज़्यादा उत्साहित करती है?',
    options: [
      o('A research laboratory', 'ஆராய்ச்சி ஆய்வகம்', 'एक शोध प्रयोगशाला', {
        healthcare: 1,
        technology: 1,
      }),
      o('A farm or a forest', 'பண்ணை அல்லது காடு', 'खेत या जंगल', { agriculture: 2 }),
      o('An art or design studio', 'கலை அல்லது வடிவமைப்பு ஸ்டுடியோ', 'कला या डिज़ाइन स्टूडियो', {
        creative: 2,
      }),
      o('A luxury resort', 'ஆடம்பர ரிசார்ட்', 'एक लग्ज़री रिसॉर्ट', { hospitality: 2 }),
    ],
  },
  {
    text: 'What is your strongest skill?',
    textTa: 'உங்கள் வலுவான திறன் எது?',
    textHi: 'आपका सबसे मज़बूत कौशल क्या है?',
    options: [
      o(
        'Solving problems with numbers',
        'எண்களால் பிரச்சினைகளைத் தீர்ப்பது',
        'संख्याओं से समस्याएँ हल करना',
        { technology: 1, finance: 1 },
      ),
      o('Patience and care', 'பொறுமையும் அக்கறையும்', 'धैर्य और देखभाल', { healthcare: 2 }),
      o('Speaking and writing', 'பேசுவதும் எழுதுவதும்', 'बोलना और लिखना', {
        'law-public': 1,
        creative: 1,
      }),
      o(
        'Working with my hands, outdoors',
        'வெளியில், கைகளால் வேலை செய்வது',
        'बाहर, अपने हाथों से काम करना',
        { agriculture: 2 },
      ),
    ],
  },
];
