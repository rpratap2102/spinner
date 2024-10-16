const teamSelect = document.getElementById('teamSelect');
const memberSelect = document.getElementById('memberSelect');
const newMemberInput = document.getElementById('newMemberInput');
const addMemberButton = document.getElementById('addMemberButton');
const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');
let teams = {};
let currentTeamMembers = [];

// Fetch teams from teams.json
fetch('teams.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        teams = data.teams;
        populateTeamDropdown(Object.keys(teams));
    })
    .catch(error => {
        console.error('Error fetching team members:', error);
    });


// Populate the team dropdown
function populateTeamDropdown(teamNames) {
    teamNames.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.text = team;
        teamSelect.appendChild(option);
    });
}

// Populate the member dropdown when a team is selected
teamSelect.addEventListener('change', () => {
    const selectedTeam = teamSelect.value;
    if (selectedTeam !== "") {
        currentTeamMembers = teams[selectedTeam];
        populateMemberDropdown(currentTeamMembers);
    } else {
        memberSelect.innerHTML = ""; // Clear member dropdown if no team is selected
    }
});

// Populate the member dropdown with selected team members
function populateMemberDropdown(members) {
    memberSelect.innerHTML = ""; // Clear existing options
    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.text = member;
        memberSelect.appendChild(option);
    });
}

// Add new dynamic member
addMemberButton.addEventListener('click', () => {
    const newMember = newMemberInput.value.trim();
    if (newMember !== "") {
        currentTeamMembers.push(newMember);
        const option = document.createElement('option');
        option.value = newMember;
        option.text = newMember;
        memberSelect.appendChild(option);
        newMemberInput.value = "";
    }
});

// Spin the wheel and select a random member
spinButton.addEventListener('click', () => {
    let selectedMembers = Array.from(memberSelect.selectedOptions).map(option => option.value);

    if (selectedMembers.length === 0) {
        result.textContent = "Please select at least one member.";
        return;
    }

    let spinTime = Math.floor(Math.random() * 4000) + 2000; // Random spin time between 2-6 seconds
    let randomIndex = Math.floor(Math.random() * selectedMembers.length);

    // Reset any previous animation
    spinner.style.animation = 'none';
    setTimeout(() => {
        spinner.style.animation = `spin ${spinTime}ms ease-in-out`; // Start spin animation
    }, 10);

    setTimeout(() => {
        spinner.style.animation = ''; // Reset animation after spin
        result.textContent = `Selected team member: ${selectedMembers[randomIndex]}`;
    }, spinTime);
});

