// Career interest quiz — first draft (EN + TA), to be reviewed by Agamathi's counsellors.
// Each option nudges one or two career clusters; clusters match Career.cluster values.

type Opt = { label: string; labelTa: string; weights: Record<string, number> };
type Q = { text: string; textTa: string; options: Opt[] };

const o = (label: string, labelTa: string, weights: Record<string, number>): Opt => ({
  label,
  labelTa,
  weights,
});

export const quizQuestions: Q[] = [
  {
    text: 'Which school subject do you enjoy most?',
    textTa: 'பள்ளியில் உங்களுக்கு மிகவும் பிடித்த பாடம் எது?',
    options: [
      o('Maths and computers', 'கணிதம் மற்றும் கணினி', { technology: 2 }),
      o('Biology', 'உயிரியல்', { healthcare: 2, agriculture: 1 }),
      o('Accounts and economics', 'கணக்குப்பதிவியல் மற்றும் பொருளியல்', { finance: 2 }),
      o('Languages, history and art', 'மொழிகள், வரலாறு மற்றும் கலை', {
        creative: 1,
        'law-public': 1,
      }),
    ],
  },
  {
    text: 'On a free day, you would rather…',
    textTa: 'ஓய்வு நாளில் நீங்கள் விரும்புவது…',
    options: [
      o('Build or fix gadgets and apps', 'கருவிகள், செயலிகளை உருவாக்குவது அல்லது சரிசெய்வது', {
        technology: 2,
      }),
      o(
        'Care for someone unwell, or for plants and animals',
        'உடல்நலமில்லாதவர்களை, செடிகள் அல்லது விலங்குகளைப் பராமரிப்பது',
        { healthcare: 1, agriculture: 1 },
      ),
      o(
        'Plan a trip or an event for friends',
        'நண்பர்களுக்காக ஒரு பயணம் அல்லது நிகழ்ச்சியைத் திட்டமிடுவது',
        { hospitality: 2 },
      ),
      o('Draw, write or make videos', 'வரைவது, எழுதுவது அல்லது வீடியோ உருவாக்குவது', {
        creative: 2,
      }),
    ],
  },
  {
    text: 'Which problem would you most like to solve?',
    textTa: 'எந்தப் பிரச்சினையைத் தீர்க்க நீங்கள் அதிகம் விரும்புகிறீர்கள்?',
    options: [
      o(
        'Make technology faster and smarter',
        'தொழில்நுட்பத்தை வேகமாகவும் புத்திசாலித்தனமாகவும் மாற்றுவது',
        { technology: 2 },
      ),
      o('Cure diseases', 'நோய்களைக் குணப்படுத்துவது', { healthcare: 2 }),
      o('Help businesses grow', 'வணிகங்கள் வளர உதவுவது', { finance: 2 }),
      o('Fight injustice', 'அநீதியை எதிர்த்துப் போராடுவது', { 'law-public': 2 }),
    ],
  },
  {
    text: 'Your friends usually come to you for…',
    textTa: 'உங்கள் நண்பர்கள் பொதுவாக உங்களிடம் வருவது…',
    options: [
      o('Help with phones and computers', 'கைபேசி, கணினி உதவிக்கு', { technology: 2 }),
      o('Health advice', 'உடல்நல ஆலோசனைக்கு', { healthcare: 2 }),
      o('Money and planning tips', 'பணம் மற்றும் திட்டமிடல் யோசனைகளுக்கு', { finance: 2 }),
      o('Settling arguments fairly', 'சண்டைகளை நியாயமாகத் தீர்க்க', { 'law-public': 2 }),
    ],
  },
  {
    text: 'Where would you like to work every day?',
    textTa: 'தினமும் எங்கே பணியாற்ற விரும்புகிறீர்கள்?',
    options: [
      o('A modern office with computers', 'கணினிகளுடன் கூடிய நவீன அலுவலகம்', {
        technology: 1,
        finance: 1,
      }),
      o('A hospital or clinic', 'மருத்துவமனை அல்லது கிளினிக்', { healthcare: 2 }),
      o('Outdoors — farms and nature', 'வெளியே — பண்ணைகள், இயற்கை', { agriculture: 2 }),
      o('Hotels, travel and events', 'விடுதிகள், பயணம், நிகழ்ச்சிகள்', { hospitality: 2 }),
    ],
  },
  {
    text: 'Which activity sounds the most fun?',
    textTa: 'எந்தச் செயல் மிகவும் மகிழ்ச்சியாகத் தோன்றுகிறது?',
    options: [
      o('Coding a game', 'ஒரு விளையாட்டை நிரல் எழுதி உருவாக்குவது', { technology: 2 }),
      o('A debate competition', 'விவாதப் போட்டி', { 'law-public': 2 }),
      o('Designing a poster or an outfit', 'சுவரொட்டி அல்லது உடை வடிவமைப்பது', { creative: 2 }),
      o('Growing a vegetable garden', 'காய்கறித் தோட்டம் வளர்ப்பது', { agriculture: 2 }),
    ],
  },
  {
    text: 'How do you like to work?',
    textTa: 'நீங்கள் எப்படி வேலை செய்ய விரும்புகிறீர்கள்?',
    options: [
      o('On my own, with logic and numbers', 'தனியாக, தர்க்கம் மற்றும் எண்களுடன்', {
        technology: 1,
        finance: 1,
      }),
      o('With people, helping them', 'மக்களுடன், அவர்களுக்கு உதவியபடி', {
        healthcare: 1,
        hospitality: 1,
      }),
      o('Leading and persuading others', 'வழிநடத்தி, மற்றவர்களை நம்ப வைப்பது', {
        'law-public': 1,
        finance: 1,
      }),
      o('Creating something new', 'புதிதாக ஒன்றை உருவாக்குவது', { creative: 2 }),
    ],
  },
  {
    text: 'Which news topic catches your eye?',
    textTa: 'எந்தச் செய்தித் தலைப்பு உங்கள் கவனத்தை ஈர்க்கிறது?',
    options: [
      o('AI and space missions', 'செயற்கை நுண்ணறிவு மற்றும் விண்வெளிப் பயணங்கள்', {
        technology: 2,
      }),
      o('Health and new medicines', 'உடல்நலம் மற்றும் புதிய மருந்துகள்', { healthcare: 2 }),
      o('Stock market and business', 'பங்குச் சந்தை மற்றும் வணிகம்', { finance: 2 }),
      o('Climate, food and farming', 'காலநிலை, உணவு மற்றும் வேளாண்மை', { agriculture: 2 }),
    ],
  },
  {
    text: 'Which show would you pick tonight?',
    textTa: 'இன்றிரவு எந்த நிகழ்ச்சியைப் பார்ப்பீர்கள்?',
    options: [
      o('A science and technology show', 'அறிவியல் மற்றும் தொழில்நுட்ப நிகழ்ச்சி', {
        technology: 2,
      }),
      o('A courtroom drama', 'நீதிமன்ற நாடகம்', { 'law-public': 2 }),
      o('A cooking or travel show', 'சமையல் அல்லது பயண நிகழ்ச்சி', { hospitality: 2 }),
      o('Behind the scenes of a film', 'ஒரு திரைப்படத்தின் பின்னணி உருவாக்கம்', { creative: 2 }),
    ],
  },
  {
    text: 'Pick a dream job title:',
    textTa: 'ஒரு கனவு வேலையைத் தேர்ந்தெடுங்கள்:',
    options: [
      o('Software engineer', 'மென்பொருள் பொறியாளர்', { technology: 2 }),
      o('Doctor', 'மருத்துவர்', { healthcare: 2 }),
      o('Chartered accountant', 'பட்டயக் கணக்காளர்', { finance: 2 }),
      o('IAS officer or lawyer', 'IAS அதிகாரி அல்லது வழக்கறிஞர்', { 'law-public': 2 }),
    ],
  },
  {
    text: 'And one more dream job:',
    textTa: 'இன்னொரு கனவு வேலை:',
    options: [
      o('Fashion or product designer', 'ஆடை அல்லது பொருள் வடிவமைப்பாளர்', { creative: 2 }),
      o('Agricultural scientist', 'வேளாண் விஞ்ஞானி', { agriculture: 2 }),
      o('Hotel or resort manager', 'விடுதி அல்லது ரிசார்ட் மேலாளர்', { hospitality: 2 }),
      o('Data scientist', 'தரவு விஞ்ஞானி', { technology: 2 }),
    ],
  },
  {
    text: 'In a group project, you usually…',
    textTa: 'குழுத் திட்டத்தில் நீங்கள் பொதுவாக…',
    options: [
      o('Handle the calculations and data', 'கணக்குகள் மற்றும் தரவைக் கையாள்வீர்கள்', {
        finance: 1,
        technology: 1,
      }),
      o('Present and convince the teacher', 'ஆசிரியரிடம் விளக்கி நம்ப வைப்பீர்கள்', {
        'law-public': 2,
      }),
      o('Make it look great', 'அழகாகத் தோன்றச் செய்வீர்கள்', { creative: 2 }),
      o('Organise everyone and the snacks', 'அனைவரையும், சிற்றுண்டியையும் ஒருங்கிணைப்பீர்கள்', {
        hospitality: 2,
      }),
    ],
  },
  {
    text: 'What do you value most in a career?',
    textTa: 'ஒரு தொழிலில் நீங்கள் மிகவும் மதிப்பது எது?',
    options: [
      o('Innovation', 'புதுமை', { technology: 2 }),
      o('Helping people', 'மக்களுக்கு உதவுவது', { healthcare: 2 }),
      o('Financial security', 'நிதிப் பாதுகாப்பு', { finance: 2 }),
      o('Fairness and serving society', 'நியாயமும் சமூக சேவையும்', { 'law-public': 2 }),
    ],
  },
  {
    text: 'Which place excites you most?',
    textTa: 'எந்த இடம் உங்களை அதிகம் உற்சாகப்படுத்துகிறது?',
    options: [
      o('A research laboratory', 'ஆராய்ச்சி ஆய்வகம்', { healthcare: 1, technology: 1 }),
      o('A farm or a forest', 'பண்ணை அல்லது காடு', { agriculture: 2 }),
      o('An art or design studio', 'கலை அல்லது வடிவமைப்பு ஸ்டுடியோ', { creative: 2 }),
      o('A luxury resort', 'ஆடம்பர ரிசார்ட்', { hospitality: 2 }),
    ],
  },
  {
    text: 'What is your strongest skill?',
    textTa: 'உங்கள் வலுவான திறன் எது?',
    options: [
      o('Solving problems with numbers', 'எண்களால் பிரச்சினைகளைத் தீர்ப்பது', {
        technology: 1,
        finance: 1,
      }),
      o('Patience and care', 'பொறுமையும் அக்கறையும்', { healthcare: 2 }),
      o('Speaking and writing', 'பேசுவதும் எழுதுவதும்', { 'law-public': 1, creative: 1 }),
      o('Working with my hands, outdoors', 'வெளியில், கைகளால் வேலை செய்வது', { agriculture: 2 }),
    ],
  },
];
