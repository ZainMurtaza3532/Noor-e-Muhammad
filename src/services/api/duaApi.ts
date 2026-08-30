export interface Dua {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  transliteration: string;
  reference: string;
  category: string;
}

const defaultDuas: Dua[] = [
  {
    id: 'darood_1',
    title: 'Darood-e-Ibrahim',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala aali Muhammadin kamaa sallayta \'ala Ibraaheema wa \'ala aali Ibraaheema innaka Hameedun Majeed. Allahumma baarik \'ala Muhammadin wa \'ala aali Muhammadin kamaa baarakta \'ala Ibraaheema wa \'ala aali Ibraaheema innaka Hameedun Majeed.',
    translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim; You are indeed Praiseworthy and Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim; You are indeed Praiseworthy and Glorious.',
    reference: 'Sahih Al-Bukhari 3370',
    category: 'Salawat (Darood)'
  },
  {
    id: 'darood_2',
    title: 'Short Salawat',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    transliteration: 'Allahumma salli wa sallim \'alaa nabiyyinaa Muhammadin',
    translation: 'O Allah, send prayers and peace upon our Prophet Muhammad.',
    reference: 'At-Tirmidhi',
    category: 'Salawat (Darood)'
  },
  {
    id: '1',
    title: 'When waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    reference: 'Al-Bukhari 11/113, Muslim 4/2083',
    category: 'Morning & Evening'
  },
  {
    id: '2',
    title: 'Invocation when getting dressed',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Alhamdu lillaahil-lathee kasaanee haathaa (aththawba) wa razaqaneehi min ghayri hawlin minnee wa laa quwwatin.',
    translation: 'Praise is to Allah Who has clothed me with this (garment) and provided it for me, though I was powerless myself and incapable.',
    reference: 'Al-Bukhari, Muslim, Abu Dawud, Ibn Majah, At-Tirmidhi',
    category: 'Daily Routine'
  },
  {
    id: '3',
    title: 'Before eating',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillaah',
    translation: 'In the name of Allah.',
    reference: 'Abu Dawud 3/347',
    category: 'Food & Drink'
  },
  {
    id: '4',
    title: 'Upon completing the meal',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Alhamdu lillaahil-lathee at\'amanee haathaa, wa razaqaneehi, min ghayri hawlin minnee wa laa quwwatin.',
    translation: 'Praise is to Allah Who has fed me this and provided it for me, without any might or power on my part.',
    reference: 'Abu Dawud, At-Tirmidhi, Ibn Majah',
    category: 'Food & Drink'
  },
  {
    id: '5',
    title: 'When leaving the home',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillaahi, tawakkaltu \'alal-laahi, wa laa hawla wa laa quwwata illaa billaah.',
    translation: 'In the Name of Allah, I have placed my trust in Allah, there is no might and no power except by Allah.',
    reference: 'Abu Dawud 4/325, At-Tirmidhi 5/490',
    category: 'Travel & Home'
  },
  {
    id: '6',
    title: 'Upon entering the home',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alaaRabbinaa tawakkalnaa',
    translation: 'In the Name of Allah we enter, in the Name of Allah we leave, and upon our Lord we depend.',
    reference: 'Abu Dawud 4/325',
    category: 'Travel & Home'
  },
  {
    id: '7',
    title: 'When going to the mosque',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً',
    transliteration: 'Allaahummaj\'al fee qalbee nooran, wa fee lisaanee nooran, wa fee sam\'ee nooran, wa fee basaree nooran...',
    translation: 'O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light...',
    reference: 'Al-Bukhari 11/116',
    category: 'Prayer (Salah)'
  },
  {
    id: '8',
    title: 'Upon entering the mosque',
    arabic: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'A\'oothu billaahil-\'Atheem, wa bi-wajhihil-Kareem, wa sultaanihil-qadeem, minash-Shaytaanir-rajeem.',
    translation: 'I take refuge with Allah, The Supreme and with His Noble Face, and His eternal authority from the accursed devil.',
    reference: 'Abu Dawud, Sahih Al-Jami',
    category: 'Prayer (Salah)'
  },
  {
    id: '9',
    title: 'For anxiety and sorrow',
    arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ',
    transliteration: 'Allaahumma innee \'abduka, ibnu \'abdika, ibnu amatika, naasiyatee biyadika, maadhin fiyya hukmuka, \'adlun fiyya qadhaa\'uka...',
    translation: 'O Allah, I am Your slave and the son of Your male slave and the son of your female slave. My forehead is in Your Hand. Your judgment upon me is assured and Your decree concerning me is just...',
    reference: 'Ahmad 1/391',
    category: 'Hardship & Protection'
  },
  {
    id: '10',
    title: 'For forgiveness and repentance',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaaha wa atoobu ilayhi.',
    translation: 'I seek the forgiveness of Allah and repent to Him.',
    reference: 'Al-Bukhari, Muslim',
    category: 'Forgiveness'
  },
  {
    id: '11',
    title: 'Before sleeping',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ',
    transliteration: 'Bismika Rabbee wadha\'tu janbee wa bika arfa\'uhu.',
    translation: 'In Your name my Lord, I lie down and in Your name I rise.',
    reference: 'Al-Bukhari 11/126',
    category: 'Morning & Evening'
  },
  {
    id: '12',
    title: 'When boarding a vehicle',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhaanal-lathee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa Rabbinaa lamunqaliboon.',
    translation: 'Glory to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.',
    reference: 'Quran 43:13-14, Abu Dawud 3/34',
    category: 'Travel & Home'
  }
];

export const duaApi = {
  getDuas: async (): Promise<Dua[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultDuas);
      }, 500);
    });
  },

  getCategories: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = Array.from(new Set(defaultDuas.map(d => d.category)));
        resolve(categories);
      }, 300);
    });
  }
};
