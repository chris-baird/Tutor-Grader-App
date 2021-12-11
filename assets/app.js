window.onload = () => {
     clock(renderDisplay(retrieveStorage()))
     return setTimeout(() => {
        document.getElementById("loading-spinner").classList.remove('spinner-border')
     },1000) 
}
function retrieveStorage() {
    let storage = JSON.parse(localStorage.getItem('appData')) || { bookedTutorSessios: 0, completedTutorSessions: 0, gradingSessionsNeeded: 30, gradingSessionsComplete: 0, weeklyHourlyTotal: 0, homeWorksGradedThisSession: 0, homeworksGradedThisWeek: 0 }
    return storage
}

function clock() {
    setInterval(() => {
        document.getElementById("todays-date").innerText = moment().format('MMMM Do YYYY, h:mm:ss a')
    }, 1000);
}

function calculateWeeklyPaycheck(rate,hours) {
    return rate * hours
}

function setUpWeek() {
    let numberOfBookedSessions
    do {
        numberOfBookedSessions = parseInt(prompt("How Many Sessions Are Booked This Week?"))
    } while (!numberOfBookedSessions || numberOfBookedSessions === NaN || numberOfBookedSessions < 0 || numberOfBookedSessions > 30)
    return numberOfBookedSessions
}

function calculateAvgGradingHoursPerDay(gradingHours) {
    let day = moment().day()    
    let gradingHoursPerDay
    if (day === 1) {
        gradingHoursPerDay = gradingHours / 7
    }
    if (day === 2) {
        gradingHoursPerDay = gradingHours / 6
    }
    if (day === 3) {
        gradingHoursPerDay = gradingHours / 5
    }
    if (day === 4) {
        gradingHoursPerDay = gradingHours / 4
    }
    if (day === 5) {
        gradingHoursPerDay = gradingHours / 3
    }
    if (day === 6) {
        gradingHoursPerDay = gradingHours / 2
    }
    if (day === 0) {
        gradingHoursPerDay = gradingHours / 1
    }
    return gradingHoursPerDay.toFixed(1)
}

function updateData() {

}

function saveStorage(data) {
    localStorage.setItem('appData', JSON.stringify(data))
}

function stateReducer(state = { bookedTutorSessios: 0, completedTutorSessions: 0, gradingSessionsNeeded: 30, gradingSessionsComplete: 0, weeklyHourlyTotal: 0, homeWorksGradedThisSession: 0, homeworksGradedThisWeek: 0 }, action = {}) {
    if (action.type === SETUP) {
        let newState = { ...state, ...action.payload }
        return newState
    }
    if (action.type === ADDTUTORSESSION) {
        let newState = (state.bookedTutorSessios < 30 ? { ...state, bookedTutorSessios: state.bookedTutorSessios + 1, gradingSessionsNeeded: state.gradingSessionsNeeded - 1 } : state)
        return newState
    }
    if (action.type === REMOVETUTORSESSION) {
        console.log('inside');
        let newState = (state.bookedTutorSessios > 0 ? { ...state, bookedTutorSessios: state.bookedTutorSessios - 1, gradingSessionsNeeded: state.gradingSessionsNeeded + 1 } : state)
        return newState
    }
    if (action.type === ADDCOMPLETEDTUTORSESSION) {
        let newState = { ...state, completedTutorSessions: state.completedTutorSessions + 1 }
        return newState
    }
    if (action.type === UNDOCOMPLETETUTORSESSION) {
        let newState = ( state.completedTutorSessions > 0 ? { ...state, completedTutorSessions: state.completedTutorSessions - 1 }:state)
        return newState
    }
    if (action.type === COMPLETEGRADINGSESSION) {
        let newState = { ...state, gradingSessionsComplete: state.gradingSessionsComplete + 1 }
        return newState
    }
    if (action.type === ADDHOMEWORKGRADEDTHISSESSION) {
        let newState = { ...state, homeWorksGradedThisSession: state.homeWorksGradedThisSession + 1, homeworksGradedThisWeek: state.homeworksGradedThisWeek + 1 }
        return newState
    }
    if (action.type === REMOVEHOMEWORKGRADEDTHISSESSION) {
        let newState = { ...state, homeWorksGradedThisSession: state.homeWorksGradedThisSession -1, homeworksGradedThisWeek: state.homeworksGradedThisWeek - 1 }
        return newState
    }
    if (action.type === CLEARHOMEWORKGRADEDTHISSESSION) {
        let newState = { ...state, homeWorksGradedThisSession: 0 }
        return newState
    }
    if (action.type === RESETWEEKLYGRADEDHOMEWORKS) {
        let newState = { ...state, homeworksGradedThisWeek: 0 }
        return newState
    }

    return state
}


function renderDisplay(data) {
    let displayData = (!data ? stateReducer() : data)

    document.getElementById("homeworks-graded-this-week").innerText = displayData.homeworksGradedThisWeek

    document.getElementById("homeworks-graded-this-session").innerText = displayData.homeWorksGradedThisSession

    document.getElementById("booked-sessions").innerText = displayData.bookedTutorSessios

    document.getElementById("tutor-sessions-left").innerText = (displayData.bookedTutorSessios - displayData.completedTutorSessions > 0 ? displayData.bookedTutorSessios - displayData.completedTutorSessions : 0)

    document.getElementById("graded-sessions-needed").innerText = displayData.gradingSessionsNeeded

    document.getElementById("weekly-total-hours").innerText = displayData.completedTutorSessions + displayData.gradingSessionsComplete

    document.getElementById("complete-grading-sessions").innerText = displayData.gradingSessionsComplete

    document.getElementById("complete-tutor-sessions").innerText = displayData.completedTutorSessions
    document.getElementById("grading-hours-per-day").innerText = calculateAvgGradingHoursPerDay(displayData.gradingSessionsNeeded - displayData.gradingSessionsComplete)

    document.getElementById("weekly-ovetime-hours").innerText = (displayData.completedTutorSessions + displayData.gradingSessionsComplete > 30 ? displayData.completedTutorSessions + displayData.gradingSessionsComplete - 30 : 0)

    document.getElementById("weekly-estimated-paycheck").innerText = calculateWeeklyPaycheck(30,displayData.completedTutorSessions) + calculateWeeklyPaycheck(20, displayData.gradingSessionsComplete)
    return displayData
}

function deleteAllData() {
    if(confirm("Are you sure? This can not be undone")) {
        localStorage.clear()
        renderDisplay(retrieveStorage())
    }
}

function resetWeeklyHomeworkCount() {
    if(confirm("Are you sure? This can not be undone")) {    
        saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: RESETWEEKLYGRADEDHOMEWORKS })))
    }
    return
}

document.getElementById("set-booked-sessions").addEventListener("click", () => {
    let setup = setUpWeek()
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: SETUP, payload: { bookedTutorSessios: setup, gradingSessionsNeeded: 30 - setup  } })))
})

document.getElementById("add-booked-session").addEventListener('click', () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: ADDTUTORSESSION })))
})

document.getElementById("remove-booked-session").addEventListener('click', () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: REMOVETUTORSESSION })))
})

document.getElementById("add-completed-session").addEventListener('click', () => {
    console.log('inside');
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: ADDCOMPLETEDTUTORSESSION })))
})

document.getElementById("undo-completed-session").addEventListener('click', () => {
    console.log('inside');
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: UNDOCOMPLETETUTORSESSION })))
})

document.getElementById("complete-tutor-session").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: COMPLETETUTORSESSION })))
})

document.getElementById("complete-grading-session").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: COMPLETEGRADINGSESSION })))
})

document.getElementById('clear-all-data').addEventListener("click", deleteAllData)

document.getElementById("increase-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: ADDHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("decrease-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: REMOVEHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("clear-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: CLEARHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("reset-weekly-graded-homeworks").addEventListener("click", resetWeeklyHomeworkCount)
