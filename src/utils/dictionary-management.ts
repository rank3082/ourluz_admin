import {store} from "../app/store";
const isEnglish = store.getState().global.isEnglish;
export const text = {
    WelcomeText:isEnglish?"Welcome To Our Luz":"ברוכים הבאים ללו״ז שלנו",
    ManageYourSchedule:isEnglish?"The place to manage the schedule":"המקום לנהל בו את הלו״ז",
    AddEventBtn:isEnglish?"Add event +":"הוסף אירוע +",
    eventDetails:isEnglish?"Event details":"פרטי האירוע",
    description:isEnglish?"description":"שם האירוע",
    location:isEnglish?"location":"מיקום",
    startAt:isEnglish?"start at":"תאריך התחלה",
    endAt:isEnglish?"end at":"תאריך סיום",
    color:isEnglish?"color":"צבע",
    showWithoutOverlap:isEnglish?"show without overlap":"הצג ללא חפיפת אירועים",
    submit:isEnglish?"Submit":"עדכן פרטים",
    delete:isEnglish?"Delete":"מחק אירוע",
    shiftManager:isEnglish?"shift manager":"נהל משמרות",
    selectEventForm:isEnglish?"select event":"נהל משמרות",
    amount:isEnglish?"amount":"כמות",
};
