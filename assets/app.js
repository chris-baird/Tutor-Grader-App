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
    // TODO number at least 1 less than or equal to 30 and of type number
    let numberOfBookedSessions
    do {
        numberOfBookedSessions = parseInt(prompt("How Many Sessions Are Booked This Week?"))
    } while (!numberOfBookedSessions || numberOfBookedSessions === NaN || numberOfBookedSessions < 1 || numberOfBookedSessions > 30)
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
    if (day === 7) {
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
    if (action.type === COMPLETETUTORSESSION) {
        let newState = { ...state, completedTutorSessions: state.completedTutorSessions + 1 }
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
    console.log(data)

    document.getElementById("homeworks-graded-this-week").innerText = displayData.homeworksGradedThisWeek

    document.getElementById("homeworks-graded-this-session").innerText = displayData.homeWorksGradedThisSession

    document.getElementById("booked-sessions").innerText = displayData.bookedTutorSessios

    document.getElementById("tutor-sessions-left").innerText = (displayData.bookedTutorSessios - displayData.completedTutorSessions > 0 ? displayData.bookedTutorSessios - displayData.completedTutorSessions : 0)

    document.getElementById("graded-sessions-needed").innerText = displayData.gradingSessionsNeeded

    document.getElementById("weekly-total-hours").innerText = displayData.completedTutorSessions + displayData.gradingSessionsComplete

    document.getElementById("complete-grading-sessions").innerText = displayData.gradingSessionsComplete

    document.getElementById("complete-tutor-sessions").innerText = displayData.completedTutorSessions
    console.log(displayData.gradingSessionsComplete);
    console.log(displayData.gradingSessionsNeeded);
    document.getElementById("grading-hours-per-day").innerText = calculateAvgGradingHoursPerDay(displayData.gradingSessionsNeeded - displayData.gradingSessionsComplete)

    document.getElementById("weekly-ovetime-hours").innerText = (displayData.completedTutorSessions + displayData.gradingSessionsComplete > 30 ? displayData.completedTutorSessions + displayData.gradingSessionsComplete - 30 : 0)

    document.getElementById("weekly-estimated-paycheck").innerText = calculateWeeklyPaycheck(30,displayData.completedTutorSessions) + calculateWeeklyPaycheck(20, displayData.gradingSessionsComplete)
    return displayData
}

document.getElementById("set-booked-sessions").addEventListener("click", () => {
    // Function pipeline for setting the number of sesions for the week
    let setup = setUpWeek()
    console.log(setup)
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: SETUP, payload: { bookedTutorSessios: setup, gradingSessionsNeeded: 30 - setup  } })))
})

document.getElementById("add-booked-session").addEventListener('click', () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: ADDTUTORSESSION })))
})

document.getElementById("complete-tutor-session").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: COMPLETETUTORSESSION })))
})

document.getElementById("complete-grading-session").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: COMPLETEGRADINGSESSION })))
})

document.getElementById('clear-all-data').addEventListener("click", () => {
    localStorage.clear()
    return renderDisplay(retrieveStorage())
})

document.getElementById("increase-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: ADDHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("decrease-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: REMOVEHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("clear-graded-homework").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: CLEARHOMEWORKGRADEDTHISSESSION })))
})

document.getElementById("reset-weekly-graded-homeworks").addEventListener("click", () => {
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: RESETWEEKLYGRADEDHOMEWORKS })))
})

// When I click the Add Booked Session button
// Then the booked sessions is increased by one, the grading needed is subtracted by one, and the display is re rendered

//When I click the Complete Grading Session button
// Then the grading sessions complete this week is increased by one, the grading need is subtracted by one, add one to the total hours for the week and the display is re rendered

// When I click the Complete Tutor Session button
// Then the completed sesions are increased by one, sessions left is subtracted by one, the total hours is increased by one and the display is re rendered

// When I click the Increment button the Homeworks graded this session is increased by one and the displa is re rendered

// When I click the clear button for the homeworks graded this sessions
// Then the number is reset back to zero and one is added to Homeworks Graded 

// When the clear button is clicked the homeworks graded is reset back to 0 and the local storage is reset
