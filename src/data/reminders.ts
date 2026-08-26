import type { ReminderItem } from '../types';

export const initialReminders: ReminderItem[] = [
  {
    id: 'r-1',
    text: 'Send Salawat upon the Messenger of Allah ﷺ today. Increased Salawat on Friday brings divine light and answered prayers.',
    arabic: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
    translation: 'Indeed, Allah and His angels send blessings upon the Prophet. O you who believe, send blessings upon him and salute him with worthy salutations.',
    type: 'Salawat',
    reference: 'Surah Al-Ahzab 33:56',
    active: true
  },
  {
    id: 'r-2',
    text: 'Revive a Sunnah today: Smile at your brother or sister, greet everyone with As-Salamu Alaykum, and speak only good words.',
    arabic: 'فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ',
    translation: 'So by mercy from Allah, [O Muhammad], you were lenient with them.',
    type: 'Sunnah',
    reference: 'Surah Ali Imran 3:159',
    active: true
  }
];
