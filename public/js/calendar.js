//Vanilla JS for Calendar

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const createNewEvent = document.getElementById('createNewEvent');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('eventBackground');
const eventsSearch = document.getElementById('search_bar');
let eventTitleInput = document.getElementById('eventTitleInput');
let eventLocationInput = document.getElementById('eventLocationInput');
let eventDescriptionInput = document.getElementById('eventDescriptionInput');
let eventTypeSelected = document.getElementById('eventTypeSelected');
let eventType = document.getElementById('eventType');

// var eventTypeOptions = ["Social", "Study"];

var yearOptions = ["2021", "2022", "2023", "2024"];

var monthOptions = ["January", "February", "March", "April","May", "June","July","August","September", 
  "October", "November", "December"];

let selectYear = document.getElementById("select_year");
let selectMonth = document.getElementById("select_month");
let MonthandYear = document.getElementById("select_month_year");

for (let i = 0; i < yearOptions.length; i++){
  let newOption = document.createElement("option");
  newOption.innerText = yearOptions[i];
  newOption.setAttribute("value", yearOptions[i]);
  selectYear.appendChild(newOption);
}

for (let i = 0; i < monthOptions.length; i++){
  let newOption = document.createElement("option");
  newOption.innerText = monthOptions[i];
  newOption.setAttribute("value", i);
  selectMonth.appendChild(newOption);
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    document.getElementById('eventLocation').innerText = eventForDay.location;
    document.getElementById('eventDescription').innerText = eventForDay.details;
    document.getElementById('eventTypeSelected').innerText = eventForDay.type;
    deleteEventModal.style.display = 'block';
  } else {
    createNewEvent.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

//Change Color based on Event Type
function displayCol() {
  var eventType = document.newEventForm.eventType.value;
  let eventColorBox = "";
  switch (eventType) {
    case "Social":
      eventColorBox = "rgba(160, 20, 196, 1)";
      break;
    case "Study":
      eventColorBox = "rgba(26, 77, 145, 1)";
      break;
    default:
      eventColorBox = "rgba(153, 198, 109, 1)";
  }
  $("#eventColorBox").css("background", eventColorBox);
}

function load() {
  const dt = new Date();
  

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.id = "daySquare";
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        let eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;

        // let eventTypeSelection = eventForDay.type;

        // switch (eventTypeSelection) {
        //      case "Study":
        //        //eventColor = "blue";
        //        eventDiv.style.backgroundColor = "rgba(26, 77, 145, 1)";
        //        break;
        //      case "Social":
        //        //eventColor = "purple";
        //        eventDiv.style.backgroundColor = "rgba(160, 20, 196, 1)";
        //        break;
        //      default:
        //        //eventColor = "lightgreen";
        //        eventDiv.style.backgroundColor = "lightgreen";
        //        break;
        //    }
        eventDiv.style.backgroundColor = eventForDay.color;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  eventDescriptionInput.classList.remove('error');
  eventLocationInput.classList.remove('error');
  createNewEvent.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  eventDescriptionInput.value = '';
  eventLocationInput.value = '';
  clicked = null;
  load();
}

//Event Types dropdown menu
//Add filter based on Event Type?
// for (let i = 0; i < eventTypeOptions.length; i++){
//   let newEventOption = document.createElement("option");
//   newEventOption.innerText = eventTypeOptions[i];
//   newEventOption.setAttribute("value", i);
//   eventType.appendChild(newEventOption);
// }

function saveEvent() {

  let eventTypeSelection = document.newEventForm.eventType.value;

  //Change eventDiv color based on event type selected
  var eventColor = "";
  switch (eventTypeSelection) {
        case "Study":
          eventColor = "rgba(26, 77, 145, 1)";
          break;
       case "Social":
          eventColor = "purple";
          break;
       default:
          eventColor = "green";
  }

  //Save Event details in Local Storage
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
      location: eventLocationInput.value,
      details: eventDescriptionInput.value,
      type: eventTypeSelection,
      color: eventColor,
    });

    //Save Event to date
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
 
}
  

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
  // document.getElementById('editButton').addEventListener('click', openModal);
}

//Select Year and Month Dropdown Menus
// selectYear.addEventListener('change', function(){
//   let currentMonth = today.getMonth();
//   let currentYear = today.getFullYear();

//   currentYear = parseInt(selectYear.value);
//   currentMonth = parseInt(selectMonth.value);
//   load(currentMonth, currentYear);
// });

// selectMonth.addEventListener('change', function() {

//   let currentMonth = today.getMonth();
//   let currentYear = today.getFullYear();

//   currentYear = parseInt(selectYear.value);
//   currentMonth = parseInt(selectMonth.value);
//   load(currentMonth, currentYear);
// });

function jump() {

}

initButtons();
load();

