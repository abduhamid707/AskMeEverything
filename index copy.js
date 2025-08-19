// import 'dotenv/config';
// import { Telegraf, Markup } from 'telegraf';
// import fs from 'fs/promises';
// import path from 'path';

// const BOT_TOKEN = process.env.BOT_TOKEN;
// const OWNER_ID = Number(process.env.OWNER_ID);

// if (!BOT_TOKEN || !OWNER_ID) {
//     console.error('❌ Missing BOT_TOKEN or OWNER_ID in .env');
//     process.exit(1);
// }

// const bot = new Telegraf(BOT_TOKEN);

// // Ma'lumotlar fayli
// const DATA_FILE = 'data.json';

// // Tillar
// const languages = {
//     uz: {
//         welcome: "Salom 👋 Men haqimda hamma narsani so'rashingiz mumkin!\n\nSavolingizni yozib yuboring. ❓ Siz istasangiz anonim bo'lasiz.\n\nPastdagi tugmalardan birini tanlang:",
//         ask_question: "📝 Savol berish",
//         about_me: "ℹ️ Men haqimda",
//         top_questions: "⭐ Eng ko'p berilgan savollar",
//         anonymous_choice: "Xohlaysizmi savolingiz **anonim** bo'lishini?",
//         yes_anonymous: "✅ Ha, anonim",
//         no_show_name: "❌ Yo'q, ismim ko'rinsin",
//         question_will_be_anonymous: "✅ Savolingiz anonim bo'ladi. Endi savolingizni yozing:",
//         question_will_show_name: "✅ Savolingizda ismingiz ko'rinadi. Endi savolingizni yozing:",
//         question_sent: "✅ Savolingiz yuborildi! Javobini tez orada ko'rasiz 📱",
//         use_menu: "Menyu orqali foydalaning 👇",
//         new_question_admin: "🔔 **Yangi savol keldi!**",
//         anonymous: "👤 Anonim",
//         question_label: "**Savol:**",
//         answer_button: "📝 Javob berish",
//         delete_button: "🗑️ O'chirish",
//         stats_button: "📊 Statistika",
//         no_permission: "❌ Ruxsat yo'q",
//         question_not_found: "❌ Savol topilmadi",
//         write_answer: "Javobingizni yozing:",
//         question_deleted: "🗑️ Savol o'chirildi",
//         stats_title: "📊 **Statistika:**",
//         total_questions: "📝 Jami savollar:",
//         anonymous_questions: "👤 Anonim savollar:",
//         named_questions: "🏷️ Ismli savollar:",
//         last_question: "⏰ So'nggi savol:",
//         never: "Hali yo'q",
//         admin_answered: "💬 **{name} javob berdi:**",
//         answer_sent: "✅ Javob yuborildi!",
//         answer_error: "❌ Javob yuborishda xato. Foydalanuvchi botni to'xtatgan bo'lishi mumkin.",
//         no_questions: "📭 Hozircha savollar yo'q",
//         answered: "✅ Javob berilgan",
//         waiting: "⏳ Kutmoqda",
//         time_label: "**Vaqt:**",
//         status_label: "**Holat:**",
//         choose_language: "🌐 Tilni tanlang / Выберите язык / Choose language:",
//         language_set: "✅ Til o'rnatildi!",
//         profile_name: "👤 **Ism:**",
//         profile_interests: "📍 **Qiziqishlarim:**",
//         profile_goals: "🎯 **Maqsadlarim:**",
//         profile_social: "🔗 **Ijtimoiy tarmoqlar:**",
//         top_questions_title: "⭐ **Eng ko'p berilgan savollar:**"
//     },
//     ru: {
//         welcome: "Привет 👋 Можете спрашивать обо мне всё что угодно!\n\nНапишите свой вопрос. ❓ При желании можете остаться анонимным.\n\nВыберите одну из кнопок ниже:",
//         ask_question: "📝 Задать вопрос",
//         about_me: "ℹ️ Обо мне",
//         top_questions: "⭐ Частые вопросы",
//         anonymous_choice: "Хотите, чтобы ваш вопрос был **анонимным**?",
//         yes_anonymous: "✅ Да, анонимно",
//         no_show_name: "❌ Нет, показать имя",
//         question_will_be_anonymous: "✅ Ваш вопрос будет анонимным. Теперь напишите свой вопрос:",
//         question_will_show_name: "✅ В вашем вопросе будет показано имя. Теперь напишите свой вопрос:",
//         question_sent: "✅ Ваш вопрос отправлен! Скоро получите ответ 📱",
//         use_menu: "Используйте меню 👇",
//         new_question_admin: "🔔 **Новый вопрос!**",
//         anonymous: "👤 Анонимно",
//         question_label: "**Вопрос:**",
//         answer_button: "📝 Ответить",
//         delete_button: "🗑️ Удалить",
//         stats_button: "📊 Статистика",
//         no_permission: "❌ Нет прав",
//         question_not_found: "❌ Вопрос не найден",
//         write_answer: "Напишите ваш ответ:",
//         question_deleted: "🗑️ Вопрос удален",
//         stats_title: "📊 **Статистика:**",
//         total_questions: "📝 Всего вопросов:",
//         anonymous_questions: "👤 Анонимных вопросов:",
//         named_questions: "🏷️ Именных вопросов:",
//         last_question: "⏰ Последний вопрос:",
//         never: "Пока нет",
//         admin_answered: "💬 **{name} ответил:**",
//         answer_sent: "✅ Ответ отправлен!",
//         answer_error: "❌ Ошибка при отправке ответа. Пользователь мог заблокировать бота.",
//         no_questions: "📭 Пока вопросов нет",
//         answered: "✅ Отвечено",
//         waiting: "⏳ Ожидает",
//         time_label: "**Время:**",
//         status_label: "**Статус:**",
//         choose_language: "🌐 Tilni tanlang / Выберите язык / Choose language:",
//         language_set: "✅ Язык установлен!",
//         profile_name: "👤 **Имя:**",
//         profile_interests: "📍 **Интересы:**",
//         profile_goals: "🎯 **Цели:**",
//         profile_social: "🔗 **Социальные сети:**",
//         top_questions_title: "⭐ **Частые вопросы:**"
//     },
//     en: {
//         welcome: "Hello 👋 You can ask me anything!\n\nWrite your question. ❓ You can remain anonymous if you want.\n\nChoose one of the buttons below:",
//         ask_question: "📝 Ask question",
//         about_me: "ℹ️ About me",
//         top_questions: "⭐ Top questions",
//         anonymous_choice: "Do you want your question to be **anonymous**?",
//         yes_anonymous: "✅ Yes, anonymous",
//         no_show_name: "❌ No, show my name",
//         question_will_be_anonymous: "✅ Your question will be anonymous. Now write your question:",
//         question_will_show_name: "✅ Your name will be shown in the question. Now write your question:",
//         question_sent: "✅ Your question has been sent! You'll get an answer soon 📱",
//         use_menu: "Use the menu 👇",
//         new_question_admin: "🔔 **New question received!**",
//         anonymous: "👤 Anonymous",
//         question_label: "**Question:**",
//         answer_button: "📝 Answer",
//         delete_button: "🗑️ Delete",
//         stats_button: "📊 Statistics",
//         no_permission: "❌ No permission",
//         question_not_found: "❌ Question not found",
//         write_answer: "Write your answer:",
//         question_deleted: "🗑️ Question deleted",
//         stats_title: "📊 **Statistics:**",
//         total_questions: "📝 Total questions:",
//         anonymous_questions: "👤 Anonymous questions:",
//         named_questions: "🏷️ Named questions:",
//         last_question: "⏰ Last question:",
//         never: "Never",
//         admin_answered: "💬 **{name} answered:**",
//         answer_sent: "✅ Answer sent!",
//         answer_error: "❌ Error sending answer. User might have blocked the bot.",
//         no_questions: "📭 No questions yet",
//         answered: "✅ Answered",
//         waiting: "⏳ Waiting",
//         time_label: "**Time:**",
//         status_label: "**Status:**",
//         choose_language: "🌐 Tilni tanlang / Выберите язык / Choose language:",
//         language_set: "✅ Language set!",
//         profile_name: "👤 **Name:**",
//         profile_interests: "📍 **Interests:**",
//         profile_goals: "🎯 **Goals:**",
//         profile_social: "🔗 **Social media:**",
//         top_questions_title: "⭐ **Top questions:**"
//     }
// };

// // Default ma'lumotlar strukturasi
// const defaultData = {
//     questions: [],
//     stats: {
//         total: 0,
//         anonymous: 0,
//         named: 0
//     },
//     profile: {
//         name: "Abduhamid",
//         interests: {
//             uz: "Dasturlash, texnologiya, kitob o'qish",
//             ru: "Программирование, технологии, чтение книг",
//             en: "Programming, technology, reading books"
//         },
//         goals: {
//             uz: "Texnologiya sohasida rivojlanish",
//             ru: "Развитие в сфере технологий",
//             en: "Development in technology field"
//         },
//         social: {
//             telegram: "@your_username",
//             instagram: "@your_instagram"
//         }
//     },
//     frequentQuestions: {
//         uz: [
//             "Sizning hobbiyingiz nima?",
//             "Qaysi dasturlash tillarini bilasiz?",
//             "Eng sevimli kitobingiz?",
//             "Kelajak rejalari qanday?",
//             "Qaysi shaharda yashaysiz?"
//         ],
//         ru: [
//             "Какое у вас хобби?",
//             "Какие языки программирования знаете?",
//             "Ваша любимая книга?",
//             "Какие планы на будущее?",
//             "В каком городе живете?"
//         ],
//         en: [
//             "What's your hobby?",
//             "Which programming languages do you know?",
//             "What's your favorite book?",
//             "What are your future plans?",
//             "Which city do you live in?"
//         ]
//     },
//     userLanguages: {} // userId: language
// };

// // Ma'lumotlarni yuklash
// async function loadData() {
//     try {
//         const data = await fs.readFile(DATA_FILE, 'utf8');
//         return { ...defaultData, ...JSON.parse(data) };
//     } catch (error) {
//         console.log('📁 Yangi data.json fayli yaratiladi...');
//         await saveData(defaultData);
//         return defaultData;
//     }
// }

// // Ma'lumotlarni saqlash
// async function saveData(data) {
//     try {
//         await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
//     } catch (error) {
//         console.error('❌ Ma\'lumotlarni saqlashda xato:', error);
//     }
// }

// // Global o'zgaruvchi
// let data = await loadData();

// // Foydalanuvchi holatini saqlash
// const userStates = new Map();

// // Foydalanuvchi tilini olish
// function getUserLanguage(userId) {
//     return data.userLanguages[userId] || 'uz';
// }

// // Matnni tilga qarab olish
// function getText(userId, key, replacements = {}) {
//     const lang = getUserLanguage(userId);
//     let text = languages[lang][key] || languages['uz'][key] || key;
    
//     // Replacement larni almashtirish
//     for (const [placeholder, value] of Object.entries(replacements)) {
//         text = text.replace(`{${placeholder}}`, value);
//     }
    
//     return text;
// }

// // Til tanlash tugmalari
// function getLanguageButtons() {
//     return Markup.inlineKeyboard([
//         [Markup.button.callback('🇺🇿 O\'zbekcha', 'lang_uz')],
//         [Markup.button.callback('🇷🇺 Русский', 'lang_ru')],
//         [Markup.button.callback('🇺🇸 English', 'lang_en')]
//     ]);
// }

// // Asosiy menyuni yaratish
// function getMainMenu(userId) {
//     return Markup.keyboard([
//         [getText(userId, 'ask_question')],
//         [getText(userId, 'about_me'), getText(userId, 'top_questions')],
//         ['🌐 Til / Язык / Lang']
//     ]).resize();
// }

// // Anonim savol tugmalarini yaratish
// function getAnonymousButtons(userId) {
//     return Markup.inlineKeyboard([
//         [Markup.button.callback(getText(userId, 'yes_anonymous'), 'anonymous_yes')],
//         [Markup.button.callback(getText(userId, 'no_show_name'), 'anonymous_no')]
//     ]);
// }

// // Admin tugmalari
// function getAdminButtons(questionId, userId = OWNER_ID) {
//     return Markup.inlineKeyboard([
//         [Markup.button.callback(getText(userId, 'answer_button'), `answer_${questionId}`)],
//         [Markup.button.callback(getText(userId, 'delete_button'), `delete_${questionId}`)],
//         [Markup.button.callback(getText(userId, 'stats_button'), 'stats')]
//     ]);
// }

// // Bot ishga tushganda
// bot.start(async (ctx) => {
//     const userId = ctx.from.id;
    
//     // Agar til tanlanmagan bo'lsa
//     if (!data.userLanguages[userId]) {
//         await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
//         return;
//     }
    
//     const welcomeText = getText(userId, 'welcome');
//     await ctx.reply(welcomeText, getMainMenu(userId));
// });

// // Til tanlash callback
// bot.action(/lang_(.+)/, async (ctx) => {
//     const selectedLang = ctx.match[1];
//     const userId = ctx.from.id;
    
//     data.userLanguages[userId] = selectedLang;
//     await saveData(data);
    
//     await ctx.editMessageText(getText(userId, 'language_set'));
    
//     // Asosiy menyuni ko'rsatish
//     setTimeout(async () => {
//         const welcomeText = getText(userId, 'welcome');
//         await ctx.reply(welcomeText, getMainMenu(userId));
//     }, 1000);
    
//     await ctx.answerCbQuery();
// });

// // Til o'zgartirish
// bot.hears(['🌐 Til / Язык / Lang'], async (ctx) => {
//     const userId = ctx.from.id;
//     await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
// });

// // Oddiy matnli xabarlarni qayta ishlash
// bot.on('text', async (ctx) => {
//     const userId = ctx.from.id;
//     const userState = userStates.get(userId);
//     const messageText = ctx.message.text;
    
//     // Agar til tanlanmagan bo'lsa
//     if (!data.userLanguages[userId]) {
//         await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
//         return;
//     }
    
//     // Admin javob berish jarayoni (ENG BIRINCHI TEKSHIRISH!)
//     if (userId === OWNER_ID && userState && userState.stage === 'answering') {
//         const answerText = messageText;
//         const questionId = userState.questionId;
//         const originalUserId = userState.originalUserId;
        
//         console.log('📝 Admin javob bermoqda:', {
//             questionId,
//             originalUserId,
//             answerText
//         });
        
//         // Savolni answered qilish
//         const question = data.questions.find(q => q.id === questionId);
//         if (question) {
//             question.answered = true;
//             question.answer = answerText;
//             question.answeredAt = new Date().toISOString();
//         }
        
//         await saveData(data);
        
//         // Foydalanuvchiga javob yuborish
//         try {
//             const responseText = getText(originalUserId, 'admin_answered', { name: data.profile.name }) + '\n\n' + answerText + ' 📚';
            
//             console.log('📤 Javob yuborilmoqda foydalanuvchiga:', originalUserId);
            
//             await ctx.telegram.sendMessage(originalUserId, responseText, { parse_mode: 'Markdown' });
            
//             await ctx.reply(getText(userId, 'answer_sent'));
//             console.log('✅ Javob muvaffaqiyatli yuborildi');
            
//         } catch (error) {
//             await ctx.reply(getText(userId, 'answer_error'));
//             console.error('❌ Javob yuborishda xato:', error);
//         }
        
//         userStates.delete(OWNER_ID);
//         return;
//     }
    
//     // Savol berish jarayoni
//     if (userState && userState.stage === 'asking_question') {
//         const questionText = messageText;
        
//         // Savolni saqlash
//         const question = {
//             id: Date.now(),
//             text: questionText,
//             userId: userId,
//             userName: ctx.from.first_name + (ctx.from.last_name ? ' ' + ctx.from.last_name : ''),
//             userUsername: ctx.from.username,
//             isAnonymous: userState.isAnonymous,
//             timestamp: new Date().toISOString(),
//             answered: false
//         };
        
//         data.questions.push(question);
//         data.stats.total++;
        
//         if (userState.isAnonymous) {
//             data.stats.anonymous++;
//         } else {
//             data.stats.named++;
//         }
        
//         await saveData(data);
        
//         // Foydalanuvchiga tasdiqlash
//         await ctx.reply(getText(userId, 'question_sent'), getMainMenu(userId));
        
//         // Adminga xabar berish
//         const adminLang = getUserLanguage(OWNER_ID);
//         const adminNotification = `${getText(OWNER_ID, 'new_question_admin')}

// ❓ **Savol #${question.id}**

// ${question.isAnonymous ? getText(OWNER_ID, 'anonymous') : `👤 ${question.userName} (@${question.userUsername || 'username_yoq'})`}

// ${getText(OWNER_ID, 'question_label')} ${questionText}`;
        
//         try {
//             await ctx.telegram.sendMessage(OWNER_ID, adminNotification, {
//                 parse_mode: 'Markdown',
//                 ...getAdminButtons(question.id, OWNER_ID)
//             });
//         } catch (error) {
//             console.error('❌ Adminga xabar yuborishda xato:', error);
//         }
        
//         // Foydalanuvchi holatini tozalash
//         userStates.delete(userId);
//         return;
//     }
    
//     // Savol berish tugmasi
//     if (messageText === getText(userId, 'ask_question')) {
//         const askText = getText(userId, 'anonymous_choice');
        
//         await ctx.reply(askText, {
//             parse_mode: 'Markdown',
//             ...getAnonymousButtons(userId)
//         });
        
//         userStates.set(userId, { stage: 'choosing_anonymity' });
//         return;
//     }
    
//     // Men haqimda tugmasi
//     if (messageText === getText(userId, 'about_me')) {
//         const profile = data.profile;
//         const lang = getUserLanguage(userId);
        
//         const aboutText = `${getText(userId, 'profile_name')} ${profile.name}

// ${getText(userId, 'profile_interests')} ${profile.interests[lang] || profile.interests.uz}

// ${getText(userId, 'profile_goals')} ${profile.goals[lang] || profile.goals.uz}

// ${getText(userId, 'profile_social')}
// • Telegram: ${profile.social.telegram}
// • Instagram: ${profile.social.instagram}`;

//         await ctx.reply(aboutText, { parse_mode: 'Markdown' });
//         return;
//     }
    
//     // Eng ko'p berilgan savollar
//     if (messageText === getText(userId, 'top_questions')) {
//         const lang = getUserLanguage(userId);
//         const frequentQuestions = data.frequentQuestions[lang] || data.frequentQuestions.uz;
        
//         let text = getText(userId, 'top_questions_title') + '\n\n';
        
//         frequentQuestions.forEach((question, index) => {
//             text += `${index + 1}. ${question}\n`;
//         });
        
//         await ctx.reply(text, { parse_mode: 'Markdown' });
//         return;
//     }
    
//     // Admin uchun maxsus komandalar
//     if (userId === OWNER_ID) {
//         if (messageText === '/stats') {
//             const statsText = `${getText(userId, 'stats_title')}

// ${getText(userId, 'total_questions')} ${data.stats.total}
// ${getText(userId, 'anonymous_questions')} ${data.stats.anonymous}
// ${getText(userId, 'named_questions')} ${data.stats.named}`;
            
//             await ctx.reply(statsText, { parse_mode: 'Markdown' });
//             return;
//         }
        
//         if (messageText === '/questions') {
//             if (data.questions.length === 0) {
//                 await ctx.reply(getText(userId, 'no_questions'));
//                 return;
//             }
            
//             for (const question of data.questions.slice(-5)) {
//                 const questionText = `❓ **Savol #${question.id}**
                
// ${question.isAnonymous ? getText(userId, 'anonymous') : `👤 ${question.userName} (@${question.userUsername || 'username_yoq'})`}

// ${getText(userId, 'question_label')} ${question.text}
// ${getText(userId, 'status_label')} ${question.answered ? getText(userId, 'answered') : getText(userId, 'waiting')}
// ${getText(userId, 'time_label')} ${new Date(question.timestamp).toLocaleString()}`;
                
//                 await ctx.reply(questionText, {
//                     parse_mode: 'Markdown',
//                     ...(question.answered ? {} : getAdminButtons(question.id, userId))
//                 });
//             }
//             return;
//         }
//     }
    
//     // Noma'lum matn uchun
//     if (userId !== OWNER_ID) {
//         await ctx.reply(getText(userId, 'use_menu'), getMainMenu(userId));
//     }
// });

// // Anonim tugmalar callback
// bot.action('anonymous_yes', async (ctx) => {
//     const userId = ctx.from.id;
//     userStates.set(userId, { stage: 'asking_question', isAnonymous: true });
    
//     await ctx.editMessageText(getText(userId, 'question_will_be_anonymous'));
//     await ctx.answerCbQuery();
// });

// bot.action('anonymous_no', async (ctx) => {
//     const userId = ctx.from.id;
//     userStates.set(userId, { stage: 'asking_question', isAnonymous: false });
    
//     await ctx.editMessageText(getText(userId, 'question_will_show_name'));
//     await ctx.answerCbQuery();
// });

// // Admin callback tugmalari
// bot.action(/answer_(\d+)/, async (ctx) => {
//     if (ctx.from.id !== OWNER_ID) {
//         return await ctx.answerCbQuery(getText(ctx.from.id, 'no_permission'));
//     }
    
//     const questionId = Number(ctx.match[1]);
//     const question = data.questions.find(q => q.id === questionId);
    
//     if (!question) {
//         return await ctx.answerCbQuery(getText(ctx.from.id, 'question_not_found'));
//     }
    
//     userStates.set(OWNER_ID, {
//         stage: 'answering',
//         questionId,
//         originalUserId: question.userId
//     });
    
//     await ctx.editMessageText(`${getText(OWNER_ID, 'question_label')} ${question.text}\n\n${getText(OWNER_ID, 'write_answer')}`);
    
//     await ctx.answerCbQuery('✅ Javob yozishingiz mumkin');
// });

// bot.action(/delete_(\d+)/, async (ctx) => {
//     if (ctx.from.id !== OWNER_ID) {
//         return await ctx.answerCbQuery(getText(ctx.from.id, 'no_permission'));
//     }
    
//     const questionId = Number(ctx.match[1]);
//     const questionIndex = data.questions.findIndex(q => q.id === questionId);
    
//     if (questionIndex === -1) {
//         return await ctx.answerCbQuery(getText(ctx.from.id, 'question_not_found'));
//     }
    
//     data.questions.splice(questionIndex, 1);
//     await saveData(data);
    
//     await ctx.editMessageText(getText(ctx.from.id, 'question_deleted'));
//     await ctx.answerCbQuery('✅ Savol o\'chirildi');
// });

// bot.action('stats', async (ctx) => {
//     if (ctx.from.id !== OWNER_ID) {
//         return await ctx.answerCbQuery(getText(ctx.from.id, 'no_permission'));
//     }
    
//     const statsText = `${getText(ctx.from.id, 'stats_title')}

// ${getText(ctx.from.id, 'total_questions')} ${data.stats.total}
// ${getText(ctx.from.id, 'anonymous_questions')} ${data.stats.anonymous}
// ${getText(ctx.from.id, 'named_questions')} ${data.stats.named}
// ${getText(ctx.from.id, 'last_question')} ${data.questions.length > 0 ? new Date(data.questions[data.questions.length - 1].timestamp).toLocaleString() : getText(ctx.from.id, 'never')}`;
    
//     await ctx.editMessageText(statsText, { parse_mode: 'Markdown' });
//     await ctx.answerCbQuery();
// });

// // Admin komandalar
// bot.command('questions', async (ctx) => {
//     if (ctx.from.id !== OWNER_ID) return;
    
//     const userId = ctx.from.id;
    
//     if (data.questions.length === 0) {
//         return await ctx.reply(getText(userId, 'no_questions'));
//     }
    
//     for (const question of data.questions.slice(-5)) {
//         const questionText = `❓ **Savol #${question.id}**
        
// ${question.isAnonymous ? getText(userId, 'anonymous') : `👤 ${question.userName} (@${question.userUsername || 'username_yoq'})`}

// ${getText(userId, 'question_label')} ${question.text}
// ${getText(userId, 'status_label')} ${question.answered ? getText(userId, 'answered') : getText(userId, 'waiting')}
// ${getText(userId, 'time_label')} ${new Date(question.timestamp).toLocaleString()}`;
        
//         await ctx.reply(questionText, {
//             parse_mode: 'Markdown',
//             ...(question.answered ? {} : getAdminButtons(question.id, userId))
//         });
//     }
// });

// // Xato handler
// bot.catch((err, ctx) => {
//     console.error('❌ Bot xatosi:', err);
//     if (ctx) {
//         ctx.reply('❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
//     }
// });

// // Botni ishga tushirish
// bot.launch()
//     .then(() => {
//         console.log('🚀 Bot ishga tushdi!');
//         console.log(`👤 Owner ID: ${OWNER_ID}`);
//         console.log(`📱 Bot username: @${bot.botInfo.username}`);
//     })
//     .catch(err => {
//         console.error('❌ Bot ishga tushmadi:', err);
//         process.exit(1);
//     });

// // Graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// console.log('⏳ Bot ishga tushmoqda...');


import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';
import fs from 'fs/promises';

const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_ID = Number(process.env.OWNER_ID);

if (!BOT_TOKEN || !OWNER_ID) {
    console.error('❌ Missing BOT_TOKEN or OWNER_ID in .env');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const DATA_FILE = 'questions.json';

// Ma'lumotlarni yuklash/saqlash
async function loadData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { questions: [] };
    }
}

async function saveData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

let data = await loadData();
const userStates = new Map();

// Start - hamma uchun oddiy xabar
bot.start(async (ctx) => {
    await ctx.reply("🔔 Anonim savol yuboring!\n\nSavolingizni yozib yuboring:");
});

// Matn xabarlarni qayta ishlash
bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const messageText = ctx.message.text;
    
    // Admin javob berish
    if (userId === OWNER_ID && userStates.has(userId)) {
        const state = userStates.get(userId);
        if (state.stage === 'answering') {
            const question = data.questions.find(q => q.id === state.questionId);
            
            if (question) {
                question.answer = messageText;
                question.answered = true;
                await saveData(data);
                
                try {
                    await ctx.telegram.sendMessage(question.userId, `💬 Javob keldi:\n\n${messageText}`);
                    await ctx.reply("✅ Javob yuborildi!");
                } catch (error) {
                    await ctx.reply("❌ Javob yuborilmadi");
                }
            }
            
            userStates.delete(userId);
            return;
        }
    }
    
    // Oddiy foydalanuvchi savol berish
    if (userId !== OWNER_ID) {
        const question = {
            id: Date.now(),
            text: messageText,
            userId: userId,
            timestamp: new Date().toISOString(),
            answered: false
        };
        
        data.questions.push(question);
        await saveData(data);
        
        await ctx.reply("✅ Savolingiz yuborildi! Javobni kutib turing.");
        
        // Adminga xabar
        const adminMessage = `🔔 Yangi savol #${question.id}:\n\n${messageText}`;
        const adminKeyboard = Markup.inlineKeyboard([
            Markup.button.callback("📝 Javob berish", `answer_${question.id}`)
        ]);
        
        try {
            await ctx.telegram.sendMessage(OWNER_ID, adminMessage, adminKeyboard);
        } catch (error) {
            console.error('Admin xabar xatosi:', error);
        }
        
        return;
    }
    
    // Admin uchun /questions kommandasi
    if (userId === OWNER_ID && messageText === '/questions') {
        const unanswered = data.questions.filter(q => !q.answered);
        
        if (unanswered.length === 0) {
            await ctx.reply("📭 Javobsiz savollar yo'q");
            return;
        }
        
        for (const question of unanswered.slice(-5)) {
            const questionText = `❓ Savol #${question.id}\n\n${question.text}\n\n📅 ${new Date(question.timestamp).toLocaleString()}`;
            const keyboard = Markup.inlineKeyboard([
                Markup.button.callback("📝 Javob berish", `answer_${question.id}`)
            ]);
            
            await ctx.reply(questionText, keyboard);
        }
    }
});

// Javob berish callback
bot.action(/answer_(\d+)/, async (ctx) => {
    if (ctx.from.id !== OWNER_ID) {
        return await ctx.answerCbQuery("❌ Ruxsat yo'q");
    }
    
    const questionId = Number(ctx.match[1]);
    const question = data.questions.find(q => q.id === questionId);
    
    if (!question) {
        return await ctx.answerCbQuery("❌ Savol topilmadi");
    }
    
    userStates.set(OWNER_ID, { stage: 'answering', questionId });
    
    await ctx.editMessageText(`❓ ${question.text}\n\n📝 Javobingizni yozing:`);
    await ctx.answerCbQuery();
});

// Error handler
bot.catch((err) => {
    console.error('Bot xatosi:', err);
});

// Bot ishga tushirish
bot.launch()
    .then(() => {
        console.log('🚀 Bot ishga tushdi!');
        console.log(`👤 Owner: ${OWNER_ID}`);
    })
    .catch(err => {
        console.error('❌ Xato:', err);
        process.exit(1);
    });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));