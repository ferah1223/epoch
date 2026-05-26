import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Lang = 'en' | 'id'
interface LangCtx { lang: Lang; toggle: () => void; t: (k: string) => string }
const Ctx = createContext<LangCtx>({ lang: 'en', toggle: () => {}, t: (k) => k })
export const useLang = () => useContext(Ctx)

const T: Record<string, Record<Lang, string>> = {
  'pre.title': { en: 'Case #47 -- Missing Person', id: 'Kasus #47 -- Orang Hilang' },
  'pre.sub': { en: 'Loading case files...', id: 'Memuat berkas kasus...' },

  'tl.prologue': { en: 'Prologue', id: 'Prolog' },
  'tl.call': { en: 'The Call', id: 'Panggilan' },
  'tl.scene': { en: 'The Scene', id: 'TKP' },
  'tl.hunt': { en: 'The Hunt', id: 'Perburuan' },
  'tl.truth': { en: 'The Truth', id: 'Kebenaran' },
  'tl.end': { en: 'The End', id: 'Akhir' },

  'pro.1': { en: 'My name is Kael. I am twenty-eight years old, and I have not slept properly in three years.', id: 'Namaku Kael. Aku berusia dua puluh delapan tahun, dan aku tidak pernah tidur nyenyak tiga tahun terakhir.' },
  'pro.2': { en: 'Three years ago, my sister Lina walked out of our apartment to buy milk. She never came back.', id: 'Tiga tahun lalu, adikku Lina keluar apartemen untuk membeli susu. Dia tidak pernah kembali.' },
  'pro.3': { en: 'The police said she ran away. A nineteen-year-old girl with good grades, no enemies, no reason to run. They closed the case in six months.', id: 'Polisi bilang dia kabur. Gadis sembilan belas tahun dengan nilai bagus, tidak punya musuh, tidak ada alasan untuk kabur. Mereka menutup kasus dalam enam bulan.' },
  'pro.4': { en: 'I became a private detective to find her. I have not found her.', id: 'Aku menjadi detektif swasta untuk menemukannya. Aku belum menemukannya.' },
  'pro.5': { en: 'Until tonight.', id: 'Sampai malam ini.' },
  'pro.6': { en: 'THE VANISHING', id: 'HILANG TANPA JEJAK' },
  'pro.7': { en: 'A story about loss, truth, and the price of knowing.', id: 'Kisah tentang kehilangan, kebenaran, dan harga dari sebuah pengetahuan.' },

  'call.1': { en: 'The phone rang at 11:47 PM. I know the exact time because I was staring at the clock, waiting for nothing.', id: 'Telepon berdering pukul 23:47. Aku tahu persis waktunya karena aku sedang menatap jam, menunggu tanpa alasan.' },
  'call.2': { en: "A woman\u2019s voice. Frantic. The kind of voice that has been crying for hours and has just run out of tears.", id: "Suara wanita. Panik. Jenis suara yang sudah menangis berjam-jam dan air matanya sudah habis." },
  'call.3': { en: "My daughter. Mira. She is gone. She went to meet someone and she did not come back.", id: "Anak saya. Mira. Dia hilang. Dia pergi menemui seseorang dan tidak kembali." },
  'call.4': { en: 'Something in my chest tightened. Nineteen years old. Went to meet someone. Did not come back.', id: 'Ada sesuatu di dadaku menegang. Sembilan belas tahun. Pergi menemui seseorang. Tidak kembali.' },
  'call.5': { en: 'The same age as Lina when she disappeared.', id: 'Seusia Lina saat dia menghilang.' },
  'call.6': { en: "When did you last see her?", id: "Kapan terakhir kali Anda melihatnya?" },
  'call.7': { en: "Thursday. She said she was going to The Blue Note, a jazz bar downtown. She said she was meeting someone important. Someone who had information.", id: "Kamis. Dia bilang mau ke The Blue Note, bar jazz di pusat kota. Dia bilang mau bertemu seseorang penting. Seseorang yang punya informasi." },
  'call.8': { en: "Information about what?", id: "Informasi tentang apa?" },
  'call.9': { en: "About... about another girl. Someone who went missing three years ago.", id: "Tentang... tentang gadis lain. Seseorang yang hilang tiga tahun lalu." },
  'call.10': { en: 'The clock read 11:47 PM. I would remember this moment for the rest of my life.', id: 'Jam menunjukkan pukul 23:47. Aku akan mengingat momen ini selama sisa hidupku.' },

  'scene.1': { en: "I arrived at Mira\u2019s apartment at midnight. The door was unlocked.", id: 'Aku tiba di apartemen Mira tengah malam. Pintunya tidak terkunci.' },
  'scene.2': { en: "The apartment was small but lived-in. Textbooks on the table. A half-eaten sandwich. A jacket still warm from the radiator. Everything waiting for someone to come home.", id: 'Apartemennya kecil tapi terasa hidup. Buku teks di meja. Sandwich setengah dimakan. Jaket masih hangat dari pemanas. Semuanya menunggu seseorang pulang.' },
  'scene.3': { en: "She did not leave voluntarily.", id: 'Dia tidak pergi secara sukarela.' },
  'scene.4': { en: 'I found three things.', id: 'Aku menemukan tiga hal.' },

  'clue.journal': { en: "Mira\u2019s Journal", id: 'Jurnal Mira' },
  'clue.journal.desc': { en: 'A leather-bound journal. The last entry is dated Thursday, 11 PM.', id: 'Jurnal berkulit. Catatan terakhir bertanggal Kamis, jam 11 malam.' },
  'clue.journal.text': { en: "I found her. After three years of searching, I found someone who knows what happened to Lina. She did not run away. She was taken. And the person who took her... I have a name. Meeting him tomorrow at the pier.", id: 'Aku menemukannya. Setelah tiga tahun mencari, aku menemukan seseorang yang tahu apa yang terjadi pada Lina. Dia tidak kabur. Dia diculik. Dan orang yang menculiknya... aku punya namanya. Bertemu dengannya besok di dermaga.' },
  'clue.journal.detail': { en: "Mira had been investigating Lina\u2019s disappearance. For months. On her own. A nineteen-year-old girl doing what the police refused to do.", id: 'Mira menyelidiki hilangnya Lina. Berbulan-bulan. Sendirian. Gadis sembilan belas tahun melakukan apa yang polisi tidak mau lakukan.' },

  'clue.photo': { en: 'Photograph', id: 'Foto' },
  'clue.photo.desc': { en: 'Two girls, arms around each other, laughing. Lina and Mira. They knew each other.', id: 'Dua gadis, saling merangkul, tertawa. Lina dan Mira. Mereka saling kenal.' },
  'clue.photo.detail': { en: "On the back, in Lina\u2019s handwriting: Best friends forever. Do not forget me. The date: three days before she disappeared.", id: 'Di belakang, tulisan tangan Lina: Sahabat selamanya. Jangan lupakan aku. Tanggalnya: tiga hari sebelum dia hilang.' },

  'clue.phone': { en: 'Last Message', id: 'Pesan Terakhir' },
  'clue.phone.desc': { en: "Mira\u2019s phone, left behind. The last text message, sent at 11:52 PM.", id: 'HP Mira, tertinggal. Pesan terakhir, dikirim pukul 23:52.' },
  'clue.phone.text': { en: "Mom. If you are reading this, I am sorry. I had to know the truth about Lina. His name is Viktor. He works at the docks. Please tell Kael.", id: 'Ma. Kalau Mama membaca ini, aku minta maaf. Aku harus tahu kebenaran tentang Lina. Namanya Viktor. Dia kerja di dermaga. Tolong bilang Kael.' },

  'hunt.act': { en: 'Act III', id: 'Babak III' },
  'hunt.title': { en: 'The Hunt', id: 'Perburuan' },

  'loc.bar.name': { en: 'The Blue Note', id: 'The Blue Note' },
  'loc.bar.time': { en: '1:00 AM', id: '01:00' },
  'loc.bar.narration': { en: 'The Blue Note smelled like bourbon and old secrets. The jazz pianist played something slow and sad, the kind of music that knows things about you.', id: 'The Blue Note berbau bourbon dan rahasia lama. Pianis jazz memainkan sesuatu yang lambat dan sedih, jenis musik yang tahu hal-hal tentangmu.' },
  'loc.bar.dialog': { en: "The girl? Yeah, she came in. Sat right there. Nervous. Kept checking the door. Then HE walked in. Gray suit. Cold eyes. Viktor.", id: "Gadis itu? Ya, dia datang. Duduk di sana. Gugup. Terus mengecek pintu. Lalu DIA masuk. Jas abu-abu. Mata dingin. Viktor." },
  'loc.bar.detail': { en: "They talked for twenty minutes. She stood up fast, knocked over her drink. He grabbed her wrist. She pulled free and left. He watched her go. Then he made a phone call.", id: 'Mereka ngomong selama dua puluh menit. Dia berdiri cepat, menjatuhkan minumannya. Dia mencengkeram pergelangan tangannya. Dia melepaskan diri dan pergi. Dia memperhatikannya pergi. Lalu dia menelepon.' },

  'loc.hotel.name': { en: "Viktor\u2019s Office", id: 'Kantor Viktor' },
  'loc.hotel.time': { en: '3:30 AM', id: '03:30' },
  'loc.hotel.narration': { en: 'An office above the fish market. The kind of place where deals are made and secrets are sold. The door was locked. I broke in.', id: 'Kantor di atas pasar ikan. Jenis tempat di mana kesepakatan dibuat dan rahasia dijual. Pintunya terkunci. Aku masuk paksa.' },
  'loc.hotel.dialog': { en: 'Inside: files. Dozens of them. Each one a missing person. Each one a young woman, 18-22, no family connections, no one to ask questions.', id: 'Di dalam: berkas. Puluhan. Masing-masing orang hilang. Masing-masing wanita muda, 18-22 tahun, tidak punya koneksi keluarga, tidak ada yang bertanya.' },
  'loc.hotel.detail': { en: 'File #23: Lina, 19. Last seen: 3 years ago. Status: Transferred. File #47: Mira, 19. Last seen: Thursday. Status: Pending.', id: 'Berkas #23: Lina, 19. Terlihat terakhir: 3 tahun lalu. Status: Dipindahkan. Berkas #47: Mira, 19. Terlihat terakhir: Kamis. Status: Menunggu.' },

  'loc.pier.name': { en: 'The Pier', id: 'Dermaga' },
  'loc.pier.time': { en: '5:45 AM', id: '05:45' },
  'loc.pier.narration': { en: 'Dawn. The harbor smelled like salt and diesel. Fog so thick I could barely see the container ships. And there, at the end of the pier, a figure. Mira. Alive.', id: 'Fajar. Pelabuhan bau garam dan solar. Kabut tebal aku hampir tidak bisa melihat kapal kontainer. Dan di sana, di ujung dermaga, sesosok. Mira. Hidup.' },
  'loc.pier.dialog': { en: "Kael? Are you Kael? Lina\u2019s brother? She was shaking. Cold. Scared. But alive. She told me about you. She said you would come.", id: 'Kael? Apa kamu Kael? Kakak Lina? Dia menggigil. Dingin. Takut. Tapi hidup. Dia cerita tentangmu. Dia bilang kamu akan datang.' },
  'loc.pier.detail': { en: "Viktor was going to move me tonight. Like he moved her. But Lina... Kael, Lina gave me her journal before they took her. She said to find you.", id: 'Viktor mau memindahkan aku malam ini. Seperti dia memindahkan dia. Tapi Lina... Kael, Lina memberiku jurnalnya sebelum mereka membawanya. Dia bilang cari kamu.' },
  'loc.pier.end': { en: 'I found Mira. I saved her. But the next words out of her mouth would break me.', id: 'Aku menemukan Mira. Aku menyelamatkannya. Tapi kata-kata selanjutnya dari mulutnya akan menghancurkanku.' },

  'truth.act': { en: 'Act IV', id: 'Babak IV' },
  'truth.title': { en: 'The Truth', id: 'Kebenaran' },

  'truth.1': { en: 'Mira sat in my car, wrapped in a blanket, holding a cup of coffee she was not drinking. Then she told me.', id: 'Mira duduk di mobilku, terbungkus selimut, memegang kopi yang tidak diminumnya. Lalu dia bercerita.' },
  'truth.2': { en: "Lina found out about Viktor\u2019s operation. He moves girls. Young women with no one to miss them. She was going to the police.", id: 'Lina menemukan operasi Viktor. Dia memindahkan gadis. Gadis muda yang tidak dicari siapa-siapun. Dia mau ke polisi.' },
  'truth.3': { en: 'But he found out first.', id: 'Tapi dia tahu lebih dulu.' },
  'truth.4': { en: 'They took her to the docks. That was three years ago. Kael... she did not make it.', id: 'Mereka membawanya ke dermaga. Itu tiga tahun lalu. Kael... dia tidak berhasil.' },
  'truth.5': { en: 'The world stopped. The rain stopped. The clock stopped. Everything stopped except the sound of my heart breaking into pieces I would never find again.', id: 'Dunia berhenti. Hujan berhenti. Jam berhenti. Semuanya berhenti kecuali suara hatiku yang hancur berkeping-keping yang tidak akan pernah kutemukan lagi.' },
  'truth.6': { en: 'She fought, Kael. She fought so hard. She left her journal with me because she knew. She knew she was not coming back.', id: 'Dia melawan, Kael. Dia melawan sangat keras. Dia meninggalkan jurnalnya padaku karena dia tahu. Dia tahu dia tidak akan kembali.' },
  'truth.7': { en: 'She said: Tell my brother I am sorry. Tell him I tried.', id: 'Dia bilang: Bilang kakakku aku minta maaf. Bilang aku sudah berusaha.' },
  'truth.8': { en: 'I sat in that car until the sun came up. I did not cry. I had no tears left. Three years of searching, and the answer was the one I feared most.', id: 'Aku duduk di mobil itu sampai matahari terbit. Aku tidak menangis. Air mataku sudah habis. Tiga tahun mencari, dan jawabannya adalah yang paling kutakuti.' },

  'end.act': { en: 'The End', id: 'Akhir' },
  'end.title': { en: 'After', id: 'Setelahnya' },

  'end.1': { en: "Viktor was arrested the next day. Mira\u2019s testimony put him away for life. Twelve other girls were found. Twelve families got answers.", id: 'Viktor ditangkap keesokan harinya. Kesaksian Mira memenjarakannya seumur hidup. Dua belas gadis lain ditemukan. Dua belas keluarga mendapat jawaban.' },
  'end.2': { en: 'I did not get my sister back.', id: 'Aku tidak mendapatkan adikku kembali.' },
  'end.3': { en: "But I got something. A journal. Written in Lina\u2019s handwriting, full of her thoughts, her fears, her love. The last page:", id: 'Tapi aku mendapat sesuatu. Jurnal. Ditulis dengan tulisan tangan Lina, penuh pikirannya, ketakutannya, cintanya. Halaman terakhir:' },
  'end.4': { en: 'Dear Kael, if you are reading this, it means I did not make it. But that is okay. Because you are reading it, which means you did not give up. You never give up. That is what I love most about you.', id: 'Kael tersayang, kalau kamu membaca ini, artinya aku tidak berhasil. Tapi tidak apa-apa. Karena kamu membacanya, yang artinya kamu tidak menyerah. Kamu tidak pernah menyerah. Itu yang paling kusuka dari kamu.' },
  'end.5': { en: 'Do not be sad for too long, okay? Go save someone else. That is what you do. That is who you are.', id: 'Jangan sedih terlalu lama, ya? Pergi selamatkan orang lain. Itu yang kamu lakukan. Itu siapa kamu.' },
  'end.6': { en: 'I love you, big brother. Always.', id: 'Aku cinta kamu, Kak. Selalu.' },
  'end.7': { en: 'I closed the journal. I looked at the rain.', id: 'Aku menutup jurnal. Aku menatap hujan.' },
  'end.8': { en: 'And for the first time in three years, I let myself cry.', id: 'Dan untuk pertama kalinya dalam tiga tahun, aku membiarkan diriku menangis.' },

  'end.fin': { en: 'FIN', id: 'FIN' },
  'end.credit1': { en: 'A Noir Story', id: 'Sebuah Cerita Noir' },
  'end.credit2': { en: 'Written in Code, Told in Scroll', id: 'Ditulis dalam Kode, Diceritakan dalam Scroll' },
  'end.credit3': { en: 'Powered by Xiaomi MiMo V2.5', id: 'Didukung oleh Xiaomi MiMo V2.5' },
  'end.rain': { en: 'The rain never stops in this city.', id: 'Hujan tidak pernah berhenti di kota ini.' },

  'ui.mute': { en: 'Mute', id: 'Bisukan' },
  'ui.sound': { en: 'Sound', id: 'Suara' },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((l) => l === 'en' ? 'id' : 'en')
  const t = (k: string): string => T[k]?.[lang] || k
  return <Ctx.Provider value={{ lang, toggle, t }}>{children}</Ctx.Provider>
}
