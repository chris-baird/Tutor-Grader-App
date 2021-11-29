window.onload = () => {
    return clock(renderDisplay(retrieveStorage()))
}



function retrieveStorage() {
    let storage = JSON.parse(localStorage.getItem('appData')) || { bookedTutorSessios: 0, completedTutorSessions: 0, gradingSessionsNeeded: 30, gradingSessionsComplete: 0, weeklyHourlyTotal: 0, homeWorksGradedThisSession: 0, homeworksGradedThisWeek: 0 }, action = {}
    return storage
}

function clock() {
    setInterval(() => {
        document.getElementById("todays-date").innerText = moment().format('MMMM Do YYYY, h:mm:ss a')
    }, 1000);
}

function setUpWeek() {
    // TODO number at least 1 less than or equal to 30 and of type number
    let numberOfBookedSessions
    do {
        numberOfBookedSessions = parseInt(prompt("How Many Sessions Are Booked This Week?"))
    } while (!numberOfBookedSessions || numberOfBookedSessions === NaN || numberOfBookedSessions < 1 || numberOfBookedSessions > 30)
    return numberOfBookedSessions
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
        let newState = (state.bookedTutorSessios < 30 ? { ...state, bookedTutorSessios: state.bookedTutorSessios + 1 } : state)
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

    return state
}


function renderDisplay(data) {
    let displayData = (!data ? stateReducer() : data)

    document.getElementById("booked-sessions").innerText = displayData.bookedTutorSessios

    document.getElementById("tutor-sessions-left").innerText = (displayData.bookedTutorSessios - displayData.completedTutorSessions > 0 ? displayData.bookedTutorSessios - displayData.completedTutorSessions : 0)

    document.getElementById("graded-sessions-needed").innerText = displayData.gradingSessionsNeeded - displayData.bookedTutorSessios

    document.getElementById("grading-sessions-left").innerText = (displayData.gradingSessionsNeeded - displayData.bookedTutorSessios - displayData.gradingSessionsComplete > 0 ? displayData.gradingSessionsNeeded - displayData.bookedTutorSessios - displayData.gradingSessionsComplete: 0) 

    document.getElementById("weekly-total-hours").innerText = displayData.completedTutorSessions + displayData.gradingSessionsComplete

    document.getElementById("complete-grading-sessions").innerText = displayData.gradingSessionsComplete

    document.getElementById("complete-tutor-sessions").innerText = displayData.completedTutorSessions

    document.getElementById("weekly-ovetime-hours").innerText = (displayData.completedTutorSessions + displayData.gradingSessionsComplete > 30 ? displayData.completedTutorSessions + displayData.gradingSessionsComplete - 30 : 0)

    return displayData
}

document.getElementById("set-booked-sessions").addEventListener("click", () => {
    // Function pipeline for setting the number of sesions for the week
    return saveStorage(renderDisplay(stateReducer(retrieveStorage(), { type: SETUP, payload: { bookedTutorSessios: setUpWeek() } })))
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
