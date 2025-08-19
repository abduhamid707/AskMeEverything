import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';
import fs from 'fs/promises';
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const OWNER_ID = Number(process.env.OWNER_ID);

if (!BOT_TOKEN || !OWNER_ID) {
    console.error('❌ Missing BOT_TOKEN or OWNER_ID in .env');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const DATA_FILE = 'data.json';

// Tillar
const languages = {
    uz: {
        welcome: "Salom! 👋\n\nMenga anonim yoki ochiq savol berishingiz mumkin. Pastdagi tugmalardan foydalaning:",
        ask_question: "❓ Savol berish",
        about_me: "👤 Men haqimda", 
        top_questions: "⭐ Ko'p beriladigan savollar",
        settings: "⚙️ Sozlamalar",
        choose_type: "Savolingiz qanday bo'lsin?",
        anonymous: "🕶️ Anonim",
        open: "👤 Ochiq (ismim bilan)",
        write_question: "Savolingizni yozing:",
        question_sent: "✅ Savolingiz yuborildi!",
        new_question: "🔔 Yangi savol",
        answer_btn: "💬 Javob berish",
        delete_btn: "🗑️ O'chirish",
        stats_btn: "📊 Statistika",
        back_btn: "🔙 Orqaga",
        choose_language: "Tilni tanlang:",
        language_set: "✅ Til o'rnatildi!",
        profile_title: "👤 **PROFIL**",
        interests: "📍 **Qiziqishlarim:**",
        goals: "🎯 **Maqsadlarim:**",
        social: "🔗 **Ijtimoiy tarmoqlar:**",
        top_questions_title: "⭐ **ENG KO'P BERILADIGAN SAVOLLAR:**",
        write_answer: "Javobingizni yozing:",
        answer_sent: "✅ Javob yuborildi!",
        question_deleted: "🗑️ Savol o'chirildi",
        stats_title: "📊 **STATISTIKA**",
        total_questions: "Jami savollar:",
        anonymous_questions: "Anonim savollar:",
        open_questions: "Ochiq savollar:",
        answered_questions: "Javob berilgan:",
        waiting_questions: "Kutayotgan:",
        admin_answer: "💬 **Javob keldi:**"
    },
    ru: {
        welcome: "Привет! 👋\n\nВы можете задать мне анонимный или открытый вопрос. Используйте кнопки ниже:",
        ask_question: "❓ Задать вопрос",
        about_me: "👤 Обо мне",
        top_questions: "⭐ Частые вопросы", 
        settings: "⚙️ Настройки",
        choose_type: "Каким должен быть ваш вопрос?",
        anonymous: "🕶️ Анонимно",
        open: "👤 Открыто (с именем)",
        write_question: "Напишите ваш вопрос:",
        question_sent: "✅ Ваш вопрос отправлен!",
        new_question: "🔔 Новый вопрос",
        answer_btn: "💬 Ответить",
        delete_btn: "🗑️ Удалить", 
        stats_btn: "📊 Статистика",
        back_btn: "🔙 Назад",
        choose_language: "Выберите язык:",
        language_set: "✅ Язык установлен!",
        profile_title: "👤 **ПРОФИЛЬ**",
        interests: "📍 **Интересы:**",
        goals: "🎯 **Цели:**", 
        social: "🔗 **Социальные сети:**",
        top_questions_title: "⭐ **ЧАСТЫЕ ВОПРОСЫ:**",
        write_answer: "Напишите ваш ответ:",
        answer_sent: "✅ Ответ отправлен!",
        question_deleted: "🗑️ Вопрос удален",
        stats_title: "📊 **СТАТИСТИКА**",
        total_questions: "Всего вопросов:",
        anonymous_questions: "Анонимных вопросов:",
        open_questions: "Открытых вопросов:",
        answered_questions: "Отвечено:",
        waiting_questions: "Ожидают:",
        admin_answer: "💬 **Ответ получен:**"
    },
    en: {
        welcome: "Hello! 👋\n\nYou can ask me anonymous or open questions. Use the buttons below:",
        ask_question: "❓ Ask question",
        about_me: "👤 About me",
        top_questions: "⭐ Popular questions",
        settings: "⚙️ Settings", 
        choose_type: "What type should your question be?",
        anonymous: "🕶️ Anonymous",
        open: "👤 Open (with name)",
        write_question: "Write your question:",
        question_sent: "✅ Your question has been sent!",
        new_question: "🔔 New question",
        answer_btn: "💬 Answer",
        delete_btn: "🗑️ Delete",
        stats_btn: "📊 Statistics", 
        back_btn: "🔙 Back",
        choose_language: "Choose language:",
        language_set: "✅ Language set!",
        profile_title: "👤 **PROFILE**", 
        interests: "📍 **Interests:**",
        goals: "🎯 **Goals:**",
        social: "🔗 **Social media:**",
        top_questions_title: "⭐ **POPULAR QUESTIONS:**",
        write_answer: "Write your answer:",
        answer_sent: "✅ Answer sent!",
        question_deleted: "🗑️ Question deleted",
        stats_title: "📊 **STATISTICS**",
        total_questions: "Total questions:",
        anonymous_questions: "Anonymous questions:",
        open_questions: "Open questions:",
        answered_questions: "Answered:",
        waiting_questions: "Waiting:",
        admin_answer: "💬 **Answer received:**"
    }
};

// Default ma'lumotlar
const defaultData = {
    questions: [],
    userLanguages: {},
    profile: {
        name: "Abduhamid",
        interests: {
            uz: "Dasturlash, texnologiya, startup loyihalar",
            ru: "Программирование, технологии, стартап проекты", 
            en: "Programming, technology, startup projects"
        },
        goals: {
            uz: "Texnologiya sohasida yangi imkoniyatlar yaratish",
            ru: "Создание новых возможностей в сфере технологий",
            en: "Creating new opportunities in technology"
        },
        social: {
            telegram: "@abduhamid_dev",
            instagram: "@abduhamid.uz",
            github: "github.com/abduhamid"
        }
    },
    popularQuestions: {
        uz: [
            "Qanday dasturlash tillarini bilasiz?",
            "Texnologiya sohasida qanday tajribangiz bor?", 
            "Kelajakda qanday loyihalar ustida ishlashni rejalashtirmoqdasiz?",
            "Yoshlarga qanday maslahat berasiz?",
            "Eng sevimli texnologiyangiz qaysi?"
        ],
        ru: [
            "Какие языки программирования вы знаете?",
            "Какой у вас опыт в сфере технологий?",
            "Над какими проектами планируете работать в будущем?",
            "Какой совет дали бы молодежи?", 
            "Какая ваша любимая технология?"
        ],
        en: [
            "What programming languages do you know?",
            "What experience do you have in technology?",
            "What projects do you plan to work on in the future?", 
            "What advice would you give to young people?",
            "What's your favorite technology?"
        ]
    }
};

// Ma'lumotlarni yuklash/saqlash
async function loadData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return { ...defaultData, ...JSON.parse(data) };
    } catch (error) {
        console.log('📁 Yangi data.json fayli yaratildi');
        await saveData(defaultData);
        return defaultData;
    }
}

async function saveData(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Ma\'lumotlarni saqlashda xato:', error);
    }
}

let data = await loadData();
const userStates = new Map();

// Yordamchi funksiyalar
function getUserLang(userId) {
    return data.userLanguages[userId] || 'uz';
}

function getText(userId, key) {
    const lang = getUserLang(userId);
    return languages[lang][key] || languages['uz'][key];
}

// Tugmalar
function getMainMenu(userId) {
    return Markup.keyboard([
        [getText(userId, 'ask_question')],
        [getText(userId, 'about_me'), getText(userId, 'top_questions')],
        [getText(userId, 'settings')]
    ]).resize();
}

function getLanguageButtons() {
    return Markup.inlineKeyboard([
        [Markup.button.callback('🇺🇿 O\'zbekcha', 'lang_uz')],
        [Markup.button.callback('🇷🇺 Русский', 'lang_ru')], 
        [Markup.button.callback('🇺🇸 English', 'lang_en')]
    ]);
}

function getQuestionTypeButtons(userId) {
    return Markup.inlineKeyboard([
        [Markup.button.callback(getText(userId, 'anonymous'), 'type_anonymous')],
        [Markup.button.callback(getText(userId, 'open'), 'type_open')]
    ]);
}

function getAdminButtons(questionId, userId) {
    return Markup.inlineKeyboard([
        [Markup.button.callback(getText(userId, 'answer_btn'), `answer_${questionId}`)],
        [Markup.button.callback(getText(userId, 'delete_btn'), `delete_${questionId}`)],
        [Markup.button.callback(getText(userId, 'stats_btn'), 'admin_stats')]
    ]);
}

// Bot start
bot.start(async (ctx) => {
    const userId = ctx.from.id;
    
    if (!data.userLanguages[userId]) {
        await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
        return;
    }
    
    await ctx.reply(getText(userId, 'welcome'), getMainMenu(userId));
});

// Til tanlash
bot.action(/lang_(.+)/, async (ctx) => {
    const lang = ctx.match[1];
    const userId = ctx.from.id;
    
    data.userLanguages[userId] = lang;
    await saveData(data);
    
    await ctx.editMessageText(getText(userId, 'language_set'));
    
    setTimeout(async () => {
        await ctx.reply(getText(userId, 'welcome'), getMainMenu(userId));
    }, 1000);
    
    await ctx.answerCbQuery();
});

// Savol turi tanlash
bot.action('type_anonymous', async (ctx) => {
    const userId = ctx.from.id;
    userStates.set(userId, { stage: 'writing_question', isAnonymous: true });
    
    await ctx.editMessageText(getText(userId, 'write_question'));
    await ctx.answerCbQuery();
});

bot.action('type_open', async (ctx) => {
    const userId = ctx.from.id;
    userStates.set(userId, { stage: 'writing_question', isAnonymous: false });
    
    await ctx.editMessageText(getText(userId, 'write_question'));
    await ctx.answerCbQuery();
});

// Admin tugmalar
bot.action(/answer_(\d+)/, async (ctx) => {
    if (ctx.from.id !== OWNER_ID) return await ctx.answerCbQuery('❌');
    
    const questionId = Number(ctx.match[1]);
    const question = data.questions.find(q => q.id === questionId);
    
    if (!question) return await ctx.answerCbQuery('❌');
    
    userStates.set(OWNER_ID, { stage: 'answering', questionId });
    
    await ctx.editMessageText(`❓ **Savol:** ${question.text}\n\n${getText(OWNER_ID, 'write_answer')}`);
    await ctx.answerCbQuery();
});

bot.action(/delete_(\d+)/, async (ctx) => {
    if (ctx.from.id !== OWNER_ID) return await ctx.answerCbQuery('❌');
    
    const questionId = Number(ctx.match[1]);
    data.questions = data.questions.filter(q => q.id !== questionId);
    await saveData(data);
    
    await ctx.editMessageText(getText(OWNER_ID, 'question_deleted'));
    await ctx.answerCbQuery();
});

bot.action('admin_stats', async (ctx) => {
    if (ctx.from.id !== OWNER_ID) return await ctx.answerCbQuery('❌');
    
    const total = data.questions.length;
    const anonymous = data.questions.filter(q => q.isAnonymous).length;
    const open = total - anonymous;
    const answered = data.questions.filter(q => q.answered).length;
    const waiting = total - answered;
    
    const statsText = `${getText(OWNER_ID, 'stats_title')}

${getText(OWNER_ID, 'total_questions')} ${total}
${getText(OWNER_ID, 'anonymous_questions')} ${anonymous}
${getText(OWNER_ID, 'open_questions')} ${open}
${getText(OWNER_ID, 'answered_questions')} ${answered}
${getText(OWNER_ID, 'waiting_questions')} ${waiting}`;
    
    await ctx.editMessageText(statsText, { parse_mode: 'Markdown' });
    await ctx.answerCbQuery();
});

// Matn xabarlar
bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const messageText = ctx.message.text;
    const userState = userStates.get(userId);
    
    // Til tanlanmagan bo'lsa
    if (!data.userLanguages[userId]) {
        await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
        return;
    }
    
    // Admin javob berish
    if (userId === OWNER_ID && userState?.stage === 'answering') {
        const question = data.questions.find(q => q.id === userState.questionId);
        
        if (question) {
            question.answer = messageText;
            question.answered = true;
            question.answeredAt = new Date().toISOString();
            await saveData(data);
            
            try {
                const answerText = `${getText(question.userId, 'admin_answer')}\n\n${messageText}`;
                await ctx.telegram.sendMessage(question.userId, answerText, { parse_mode: 'Markdown' });
                await ctx.reply(getText(userId, 'answer_sent'));
            } catch (error) {
                await ctx.reply('❌ Javob yuborilmadi');
            }
        }
        
        userStates.delete(userId);
        return;
    }
    
    // Savol yozish
    if (userState?.stage === 'writing_question') {
        const question = {
            id: Date.now(),
            text: messageText,
            userId: userId,
            userName: ctx.from.first_name + (ctx.from.last_name ? ` ${ctx.from.last_name}` : ''),
            userUsername: ctx.from.username,
            isAnonymous: userState.isAnonymous,
            timestamp: new Date().toISOString(),
            answered: false
        };
        
        data.questions.push(question);
        await saveData(data);
        
        await ctx.reply(getText(userId, 'question_sent'), getMainMenu(userId));
        
        // Adminga xabar
        const authorInfo = question.isAnonymous ? 
            '👤 Anonim' : 
            `👤 ${question.userName} (@${question.userUsername || 'username_yoq'})`;
        
        const adminMessage = `${getText(OWNER_ID, 'new_question')} #${question.id}\n\n${authorInfo}\n\n❓ ${messageText}`;
        
        try {
            await ctx.telegram.sendMessage(OWNER_ID, adminMessage, {
                ...getAdminButtons(question.id, OWNER_ID),
                parse_mode: 'Markdown'
            });
        } catch (error) {
            console.error('Admin xabar xatosi:', error);
        }
        
        userStates.delete(userId);
        return;
    }
    
    // Menu tugmalari
    if (messageText === getText(userId, 'ask_question')) {
        await ctx.reply(getText(userId, 'choose_type'), getQuestionTypeButtons(userId));
        return;
    }
    
    if (messageText === getText(userId, 'about_me')) {
        const lang = getUserLang(userId);
        const profile = data.profile;
        
        const profileText = `${getText(userId, 'profile_title')}

👤 **${profile.name}**

${getText(userId, 'interests')} ${profile.interests[lang]}

${getText(userId, 'goals')} ${profile.goals[lang]}

${getText(userId, 'social')}
• Telegram: ${profile.social.telegram}
• Instagram: ${profile.social.instagram} 
• GitHub: ${profile.social.github}`;
        
        await ctx.reply(profileText, { parse_mode: 'Markdown' });
        return;
    }
    
    if (messageText === getText(userId, 'top_questions')) {
        const lang = getUserLang(userId);
        const questions = data.popularQuestions[lang];
        
        let text = `${getText(userId, 'top_questions_title')}\n\n`;
        questions.forEach((q, i) => {
            text += `${i + 1}. ${q}\n\n`;
        });
        
        await ctx.reply(text, { parse_mode: 'Markdown' });
        return;
    }
    
    if (messageText === getText(userId, 'settings')) {
        await ctx.reply(getText(userId, 'choose_language'), getLanguageButtons());
        return;
    }
    
    // Admin komandalar
    if (userId === OWNER_ID) {
        if (messageText === '/questions') {
            const waiting = data.questions.filter(q => !q.answered).slice(-5);
            
            if (waiting.length === 0) {
                await ctx.reply('📭 Javobsiz savollar yo\'q');
                return;
            }
            
            for (const q of waiting) {
                const authorInfo = q.isAnonymous ? '👤 Anonim' : `👤 ${q.userName}`;
                const questionText = `❓ **Savol #${q.id}**\n\n${authorInfo}\n\n${q.text}\n\n📅 ${new Date(q.timestamp).toLocaleString()}`;
                
                await ctx.reply(questionText, {
                    ...getAdminButtons(q.id, userId),
                    parse_mode: 'Markdown'
                });
            }
            return;
        }
        
        if (messageText === '/stats') {
            const total = data.questions.length;
            const anonymous = data.questions.filter(q => q.isAnonymous).length;
            const open = total - anonymous;
            const answered = data.questions.filter(q => q.answered).length;
            const waiting = total - answered;
            
            const statsText = `📊 **STATISTIKA**\n\nJami savollar: ${total}\nAnonim: ${anonymous}\nOchiq: ${open}\nJavob berilgan: ${answered}\nKutayotgan: ${waiting}`;
            
            await ctx.reply(statsText, { parse_mode: 'Markdown' });
            return;
        }
    }
    
    // Noma'lum xabar
    await ctx.reply('🤷‍♂️ Noma\'lum buyruq. Menyudan foydalaning:', getMainMenu(userId));
});

// Error handler
bot.catch((err, ctx) => {
    console.error('❌ Bot xatosi:', err);
    if (ctx) {
        ctx.reply('❌ Xatolik yuz berdi').catch(() => {});
    }
});

// Bot ishga tushirish
bot.launch()
    .then(() => {
        console.log('🚀 Bot muvaffaqiyatli ishga tushdi!');
        console.log(`👤 Owner ID: ${OWNER_ID}`);
        console.log(`📱 Bot username: @${bot.botInfo?.username}`);
    })
    .catch(err => {
        console.error('❌ Bot ishga tushmadi:', err);
        process.exit(1);
    });

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Express serverni ishga tushiramiz
app.listen(PORT, () => {
  console.log(`🌐 Express server http://localhost:${PORT} da ishlayapti`);
});