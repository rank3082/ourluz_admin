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
    rollManager:isEnglish?"roles manager":"נהל תפקידים",
    employeeList:isEnglish?"employee list":"רשימת עובדים ",
    myShift:isEnglish?"my shift":"המשמרות שלי ",
    myAvailability:isEnglish?"my availability":"הזמינות שלי ",
    myDetails:isEnglish?"my details":"הפרטים שלי ",
    emptyEmployeeList:isEnglish?"there is no employee booked":"לא שובצו עובדים",
    selectEventForm:isEnglish?"select event":"בחר אירוע",
    amount:isEnglish?"amount":"כמות",
    signUp:isEnglish?"sign up":"הירשם",
    updateDetails:isEnglish?"update details":"עדכן פרטים",
    logIn:isEnglish?"log in":"התחבר",
    userName:isEnglish?"username":"כינוי",
    password:isEnglish?"password":"סיסמא",
    firstName:isEnglish?"first name":"שם פרטי",
    lastName:isEnglish?"last name":"שם משפחה",
    email:isEnglish?"email":"אימייל",
    phoneNumber:isEnglish?"phone number":"מספר טלפון",
    showEmployeeList:isEnglish?"show employee list":"הצג רשימת עובדים",
    addNewEmployee:isEnglish?"add new employee":"הוסף עובד חדש",
    back:isEnglish?"back":"חזור",
    selectRoles:isEnglish?"select roles":"בחר תפקידים",
    userDetailsId:isEnglish?"Edit details":"ערוך פרטים",
    userId:isEnglish?"user id:":"ת״ז עובד:",
    capacity:isEnglish?"capacity":"כמות נדרשת",
    roll:isEnglish?"roll":"תפקיד",
    booked:isEnglish?"booked":"שובצו",
    withoutEmployee:isEnglish?"there is not available employee for this event":"לא נרשמו עובדים לאירוע זה",
    bookedEmployeesFromList :isEnglish?"booked from employee list":"שבץ מרשימת העובדים",
    addManuelEmployee :isEnglish?"add manual employee":"הוסף עובד ידנית",
    startAtTime :isEnglish?"start at: ":"התחלת משמרת:",
    endAtTime :isEnglish?"end at: ":"סיום משמרת:",
    team :isEnglish?"team: ":"צוות",
    thereIsNotBookedEvent :isEnglish?"there is no booked event: ":"לא שובצו אירועים ",
};
