import React, {useState} from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment'
import "./CalendarComponent.scss"
import {useAppSelector} from "../../../../app/hooks";
import {useDispatch} from "react-redux";
import {setSelectedEvent, setSelectedPopup, setSlotSelected, setWeekDates} from "../../../../store/global.slice";
import {EventModel} from "../../../../models/event.model";
import {SelectedPopup} from "../../../../utils/enum.const";
import {text} from "../../../../utils/dictionary-management";
import {
    getColorByStatus, getStatusEventForClient, getUserById, isEventHasFullBooking
} from "../../../../utils/general";
import {Icon} from "../../../../components/icon/Icon";

export const CalendarComponent:React.FC<{currentView:any,setCurrentView:any}> = ({currentView, setCurrentView}) => {
    const {isAdmin, selectedPopup, eventList, currentUser, isMobile} = useAppSelector(state => state.global);
    const dispatch = useDispatch()

    const getRollIcon = (rollId: number | null) => {
        switch (rollId) {
            case 1: {
                return <Icon name={"manager"}/>
            }
            case 2: {
                return <Icon name={"computerMan"}/>
            }
            case 3: {
                return <Icon name={"driver"}/>
            }
            default : {
                return <Icon name={"regularEmployee"}/>
            }
        }
    }

    const localTime = momentLocalizer(moment);
    const DailyEventComponent: React.FC<{ event: EventModel }> = ({event}) => {
        const eventUserBooked = event.users.filter((u) => u.booked);
       const userListForDisplay = isAdmin? event.users: eventUserBooked;
        return <div className={"calenderContainer"} style={{
            backgroundColor: isAdmin ? event.backgroundColor : getColorByStatus(getStatusEventForClient(event.users, currentUser)),
            border: isEventHasFullBooking(event) ? "2px solid var(--light-green)" : "2px solid var(--dark)"
        }}>
            <div className={"descriptionStyle"}>{event.description}</div>
            <div>
                <span style={{fontWeight: 600}}>{text.location} - </span>
                <span>{event.location}</span>
            </div>
            <div style={{fontWeight: 600}}>
                שעת התחלה-
            </div>
            <div>{event.start.toString().split("T")[1]}</div>
            {event.comments && event.comments.length>0 && <div style={{overflowX:"auto"}}>
                <div style={{fontWeight: 600}}>{text.comments} : </div>
                <div style={{fontSize:14}}>{event.comments}</div>
            </div>}
            <div
                style={{fontWeight: 600}}>{eventUserBooked.length > 0 ? text.employeeList : text.emptyEmployeeList}</div>
            {userListForDisplay.map((user,index) => {
                return <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 7,
                    alignItems: "center",
                    textAlign: "center"
                }}
                key={index}
                >
                    <div style={{
                        fontSize: user.booked ? 18 : 14,
                        fontWeight: user.booked ? 700 : 400
                    }}>{getUserById(user.id)?.firstName} {getUserById(user.id)?.lastName}</div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 2
                    }} className={"iconWrapperOfRoll"}> {getRollIcon(user.roleId)}</div>
                </div>
            })}
        </div>
    };
    const MonthlyEventComponent: React.FC<{ event: EventModel }> = ({event}) => {
        return <div
            style={{backgroundColor: isAdmin ? event.backgroundColor : getColorByStatus(getStatusEventForClient(event.users, currentUser))}}>
            <div>{event.description}</div>
        </div>
    };
    // const getStatusEventForClient=(event:EventModel)=>{
    //    let status:UserEventStatus = UserEventStatus.nothing
    //        // event.users.
    //
    //     event.users.filter((user)=>user.id === currentUser?.id).forEach((u)=> {
    //      if (u.booked){
    //          status = UserEventStatus.booked
    //      }  else {
    //          status = UserEventStatus.available
    //      }
    //     })
    //     // const now = new Date();
    //     // console.log(new Date(event.start),"event.start")
    //     // console.log(now,"now.start")
    //     // @ts-ignore
    //     // if ((new Date(event.start) > now) && (status !== UserEventStatus.booked)){
    //     //     status = UserEventStatus.eventDoneWithoutBooked
    //     //     console.log("after.start")
    //     // }
    //     // console.log(status,"status")
    //     return getColorByStatus(status)
    // }

    // const getColorByStatus=(status:UserEventStatus)=>{
    //     switch (status){
    //         case UserEventStatus.booked:{
    //             return "green"
    //         }
    //         case UserEventStatus.available:{
    //             return "orange"
    //         }
    //         case UserEventStatus.nothing:{
    //             return "var(--primary)"
    //         }
    //         case UserEventStatus.eventDoneWithoutBooked:{
    //             return "red"
    //         }
    //     }
    //
    // }

    const views = {
        month: {
            event: MonthlyEventComponent,
        }, week: {
            event: DailyEventComponent,
        }, day: {
            event: DailyEventComponent,
        }, agenda: {
            event: DailyEventComponent,
        }
    };
    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };


    const handleSelectEvent = (event: EventModel) => {
        console.log(event, "event123")
        if (currentUser?.isAdmin) {
            dispatch(setSelectedPopup(SelectedPopup.EventDetail))
        } else {
            dispatch(setSelectedPopup(SelectedPopup.ClientEventDetails))
        }
        dispatch(setSelectedEvent(event))
    }

    console.log(eventList, "eventList")


    const handleSelectSlot = (slotDetails: any) => {
        setSelectedDate(slotDetails.start as Date);
        if (currentUser?.isAdmin) {
            dispatch(setSelectedPopup(SelectedPopup.EventDetail))
            dispatch(setSlotSelected({start: slotDetails.start.setHours(5), end: slotDetails.start.setHours(12)}))
        }

    }


    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const selectedSlotStyle = {
        backgroundColor: 'red', // Replace 'red' with your desired color
    };

    const getSlotStyle = (date: Date) => {
        if (selectedDate && moment(date).isSame(selectedDate, 'day')) {
            return selectedSlotStyle;
        }
        return {};
    };
    const handleNavigate=(date: Date, view: string)=>{
        if (view === "week") {
            if (view === "week") {
                // Calculate the start and end dates of the week
                const startOfWeek = moment(date).startOf("week").toDate();
                const endOfWeek = moment(date).endOf("week").toDate();
                dispatch(setWeekDates({ start: startOfWeek, end: endOfWeek }));
            console.log("startOfWeek:", startOfWeek);
            console.log("endOfWeek:", endOfWeek);
            } else {
                dispatch(setWeekDates({start:undefined,end:undefined}));
            }
        }
    }
    const handleRangeChange = (range: any[],view: string) => {
        if (view === "week") {
            const startOfWeek = moment(range[0]).startOf("week").toDate();
            const endOfWeek = moment(range[6]).endOf("week").toDate();
            dispatch(setWeekDates({ start: startOfWeek, end: endOfWeek}));
        }
    };
    // console.log(moment(weekDates?.start).format("yyyy-MM-D"),"weekDates123")
    // console.log(moment(weekDates?.end).format("yyyy-MM-D"),"weekDates123")
    return (<div
            className={selectedPopup !== SelectedPopup.Close && !isMobile ? "notFullCalendarWidth" : "fullCalendarWidth"}>
            <Calendar
                selectable
                onSelectSlot={handleSelectSlot}
                ampm={false}
                events={Object.values(eventList)}
                localizer={localTime}
                components={views}
                // defaultView="week"
                onView={handleViewChange}
                className={currentView === Views.WEEK || currentView === Views.DAY ? "week-calender-wrapper" : `month-calender-wrapper  `}
                formats={{timeGutterFormat: 'HH:mm'}}
                onSelectEvent={handleSelectEvent}
                slotPropGetter={getSlotStyle}
                onNavigate={handleNavigate}
                onRangeChange={handleRangeChange}
            />
        </div>

    )
}