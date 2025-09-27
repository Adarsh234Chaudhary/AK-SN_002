const hamburger = document.getElementById('hamburger');
const slidePanel = document.getElementById('slidePanel');
const closeBtn = document.getElementById('closeBtn');
const mainContent = document.getElementById('mainContent');
const queryIcon = document.getElementById('queryIcon');
const queryPopup = document.getElementById('queryPopup');
const searchButton = document.getElementById('searchButton');
const apiSearchInput = document.getElementById('apiSearchInput');
const categoriesDiv = document.getElementById('categories');

// Data for events with subdivision details
const eventData = [
  {
    name: "Corporate/Professional Events",
    description: "Focused on business objectives, professional development, and networking.",
    subdivisions: [
      { name: "Conferences, Seminars, Workshops", datetime: "Oct 15-17, 2025", venue: "Convention Center", organizer: "BizCon Inc.", cost: "$150", url: "https://example.com/enroll/conferences" },
      { name: "Trade Shows and Expos", datetime: "Nov 5-7, 2025", venue: "Expo Hall 3", organizer: "TradeWorld", cost: "$100", url: "https://example.com/enroll/tradeshows" },
      { name: "Product Launches", datetime: "Dec 1, 2025", venue: "Grand Hotel Ballroom", organizer: "LaunchMaster", cost: "$200", url: "https://example.com/enroll/productlaunch" },
      { name: "Team-Building Activities and Corporate Retreats", datetime: "Sep 10-12, 2025", venue: "Mountain Resort", organizer: "TeamFun Corp.", cost: "$180", url: "https://example.com/enroll/teambuilding" },
      { name: "Board Meetings, Shareholder Meetings", datetime: "Monthly", venue: "Headquarters Conference Room", organizer: "CorpBoard", cost: "Free", url: "https://example.com/enroll/boardmeetings" }
    ]
  },
  {
    name: "Social/Private Events",
    description: "Centered on personal milestones, celebrations, and social interaction.",
    subdivisions: [
      { name: "Weddings and Anniversaries", datetime: "Various Dates", venue: "Banquet Hall", organizer: "EventCo", cost: "Varies", url: "https://example.com/enroll/weddings" },
      { name: "Birthday Parties", datetime: "Various Dates", venue: "Private Venues", organizer: "PartyPlanners", cost: "Varies", url: "https://example.com/enroll/birthdays" },
      { name: "Reunions (Family, Class)", datetime: "July 2025", venue: "Community Hall", organizer: "Reunion Org", cost: "$50", url: "https://example.com/enroll/reunions" },
      { name: "Private Parties and Dinners", datetime: "Flexible Dates", venue: "Various Locations", organizer: "VIP Events", cost: "Varies", url: "https://example.com/enroll/privateparties" }
    ]
  },
  {
    name: "Cultural and Entertainment Events",
    description: "Designed to showcase arts, culture, and provide leisure or amusement.",
    subdivisions: [
      { name: "Festivals (Music, Film, Food, Arts)", datetime: "Sept 20-25, 2025", venue: "City Park", organizer: "CultureFest", cost: "$80", url: "https://example.com/enroll/festivals" },
      { name: "Art Exhibitions and Gallery Shows", datetime: "Ongoing", venue: "Art Gallery", organizer: "ArtWorld", cost: "$30", url: "https://example.com/enroll/artexhibitions" },
      { name: "Theatre Performances, Concerts, and Operas", datetime: "Various Dates", venue: "Opera House", organizer: "StageMasters", cost: "$90", url: "https://example.com/enroll/theatre" },
      { name: "Fashion Shows", datetime: "Nov 10, 2025", venue: "Expo Hall 1", organizer: "Fashion Inc.", cost: "$120", url: "https://example.com/enroll/fashionshows" }
    ]
  },
  {
    name: "Charity/Fundraising Events",
    description: "Organized to raise money or awareness for a specific cause or non-profit organization.",
    subdivisions: [
      { name: "Galas and Society Balls", datetime: "Dec 12, 2025", venue: "Grand Ballroom", organizer: "Charity Org", cost: "$250", url: "https://example.com/enroll/galas" },
      { name: "Charity Auctions", datetime: "Dec 5, 2025", venue: "Auction Hall", organizer: "Fundraiser Group", cost: "Entry $40", url: "https://example.com/enroll/auctions" },
      { name: "Fun Runs, Walkathons, or Sponsored Challenges", datetime: "Oct 2, 2025", venue: "City Park", organizer: "HealthFund", cost: "$25", url: "https://example.com/enroll/funruns" }
    ]
  },
  {
    name: "Community Events",
    description: "Aimed at bringing local people together, often free or low-cost, to foster local spirit and engagement.",
    subdivisions: [
      { name: "Local Fairs and Bazaars", datetime: "Aug 15-16, 2025", venue: "Town Square", organizer: "Community Center", cost: "Free", url: "https://example.com/enroll/fairs" },
      { name: "Parades", datetime: "Dec 1, 2025", venue: "Main Street", organizer: "City Council", cost: "Free", url: "https://example.com/enroll/parades" },
      { name: "Community Gatherings and Town Halls", datetime: "Monthly", venue: "Community Hall", organizer: "Local Govt", cost: "Free", url: "https://example.com/enroll/townhalls" }
    ]
  },
  {
    name: "Sports Events",
    description: "Centered on competitive or participatory athletic activities.",
    subdivisions: [
      { name: "Tournaments and Competitions", datetime: "Sep 12-15, 2025", venue: "Sports Complex", organizer: "Sports League", cost: "$75", url: "https://example.com/enroll/tournaments" },
      { name: "Marathons and Races", datetime: "Nov 20, 2025", venue: "City Streets", organizer: "RunClub", cost: "$50", url: "https://example.com/enroll/marathons" },
      { name: "Spectator Sports Events (e.g., Olympic Games, Football Matches)", datetime: "Seasonal", venue: "Stadium", organizer: "Sports Network", cost: "Varies", url: "https://example.com/enroll/spectatorsports" }
    ]
  },
  {
    name: "Educational Events",
    description: "Focused on learning, training, and sharing knowledge.",
    subdivisions: [
      { name: "Webinars and Online Training Sessions", datetime: "Varies", venue: "Online", organizer: "EduWeb", cost: "$40", url: "https://example.com/enroll/webinars" },
      { name: "Academic Seminars", datetime: "Oct 10, 2025", venue: "University Hall", organizer: "Academic Board", cost: "Free", url: "https://example.com/enroll/seminars" },
      { name: "Lectures and Guest Speaker Sessions", datetime: "Monthly", venue: "Lecture Theater", organizer: "Speaker Society", cost: "$20", url: "https://example.com/enroll/lectures" }
    ]
  }
];

// Build categories with subdivisions in DOM
function createCategory(data) {
  const categoryBox = document.createElement('div');
  categoryBox.classList.add('category-box');
  categoryBox.tabIndex = 0;
  categoryBox.setAttribute('role', 'button');
  categoryBox.setAttribute('aria-expanded', 'false');
  categoryBox.textContent = data.name;

  // Create subdivisions container
  const subdivisionContainer = document.createElement('div');
  subdivisionContainer.classList.add('subdivision-container');
  subdivisionContainer.setAttribute('aria-hidden', 'true');

  data.subdivisions.forEach(sub => {
    const subDiv = document.createElement('div');
    subDiv.classList.add('subdivision');

    const name = document.createElement('h4');
    name.textContent = sub.name;
    subDiv.appendChild(name);

    const date = document.createElement('p');
    date.textContent = `Date & Time: ${sub.datetime}`;
    subDiv.appendChild(date);

    const venue = document.createElement('p');
    venue.textContent = `Venue: ${sub.venue}`;
    subDiv.appendChild(venue);

    const organizer = document.createElement('p');
    organizer.textContent = `Organizer: ${sub.organizer}`;
    subDiv.appendChild(organizer);

    const cost = document.createElement('p');
    cost.textContent = `Enrollment Cost: ${sub.cost}`;
    subDiv.appendChild(cost);

    const enrollBtn = document.createElement('button');
    enrollBtn.classList.add('enroll-btn');
    enrollBtn.textContent = "Enroll";
    enrollBtn.addEventListener('click', () => {
      window.open(sub.url, '_blank');
    });
    subDiv.appendChild(enrollBtn);

    subdivisionContainer.appendChild(subDiv);
  });

  categoryBox.appendChild(subdivisionContainer);

  // Toggle subdivisions display on click with animation
  categoryBox.addEventListener('click', () => {
    const isOpen = subdivisionContainer.classList.contains('open');
    if (isOpen) {
      subdivisionContainer.classList.remove('open');
      categoryBox.classList.remove('active');
      categoryBox.setAttribute('aria-expanded', 'false');
      subdivisionContainer.setAttribute('aria-hidden', 'true');
    } else {
      // Close all others
      document.querySelectorAll('.subdivision-container.open').forEach(el => {
        el.classList.remove('open');
        el.previousSibling.classList.remove('active');
        el.previousSibling.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-hidden', 'true');
      });
      subdivisionContainer.classList.add('open');
      categoryBox.classList.add('active');
      categoryBox.setAttribute('aria-expanded', 'true');
      subdivisionContainer.setAttribute('aria-hidden', 'false');
    }
  });

  // Keyboard accessible toggle (Enter and Space)
  categoryBox.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      categoryBox.click();
    }
  });

  return categoryBox;
}

// Populate categories on page load
eventData.forEach(cat => {
  categoriesDiv.appendChild(createCategory(cat));
});

// Hamburger slide panel open/close
function openMenu() {
  slidePanel.classList.add('open');
  mainContent.classList.add('blurred');
  slidePanel.setAttribute('aria-hidden', 'false');
}
function closeMenu() {
  slidePanel.classList.remove('open');
  mainContent.classList.remove('blurred');
  slidePanel.setAttribute('aria-hidden', 'true');
}
hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') openMenu();
});
closeBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') closeMenu();
});

// Search button alert simulation
searchButton.addEventListener('click', () => {
  alert(`Execute search for: ${apiSearchInput.value}`);
});

// Query icon toggle popup
queryIcon.addEventListener('click', () => {
  queryPopup.classList.toggle('show');
});
queryIcon.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    queryPopup.classList.toggle('show');
  }
});
// Close popup if clicked outside
document.addEventListener('click', e => {
  if(!queryIcon.contains(e.target) && !queryPopup.contains(e.target)) {
    queryPopup.classList.remove('show');
  }
});
