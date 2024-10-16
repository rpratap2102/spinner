let teams = {};
let currentTeamMembers = [];

// Fetch teams dynamically
fetch('teams.json')
    .then(response => response.json())
    .then(data => {
        teams = data.teams;
        populateTeamDropdown(Object.keys(teams));
    })
    .catch(error => {
        document.getElementById('result').textContent = "Error loading teams. Please try again later.";
        console.error('Error fetching team members:', error);
    });

// Populate the team dropdown
function populateTeamDropdown(teamNames) {
    const teamSelect = document.getElementById('teamSelect');
    teamSelect.innerHTML = `<option value="">--Select a team--</option>`; // Reset
    teamNames.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.text = team;
        teamSelect.appendChild(option);
    });
}

// Update members when a team is selected
document.getElementById('teamSelect').addEventListener('change', () => {
    const selectedTeam = document.getElementById('teamSelect').value;
    if (selectedTeam) {
        currentTeamMembers = teams[selectedTeam] || [];
        populateMemberDropdown(currentTeamMembers);
    } else {
        document.getElementById('memberSelect').innerHTML = ''; // Clear member list
        currentTeamMembers = [];
    }
});

// Populate member dropdown with current team members
function populateMemberDropdown(members) {
    const memberSelect = document.getElementById('memberSelect');
    memberSelect.innerHTML = ''; // Clear current list
    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.text = member;
        memberSelect.appendChild(option);
    });
}

// Add a new member to the current team
document.getElementById('addMemberButton').addEventListener('click', () => {
    const newMember = document.getElementById('newMemberInput').value.trim();
    if (newMember) {
        currentTeamMembers.push(newMember);
        const option = document.createElement('option');
        option.value = newMember;
        option.text = newMember;
        document.getElementById('memberSelect').appendChild(option);
        document.getElementById('newMemberInput').value = ''; // Clear input
        teams[document.getElementById('teamSelect').value] = currentTeamMembers; // Update team members dynamically
    }
});

// Remove a selected member from the current team
document.getElementById('removeMemberButton').addEventListener('click', () => {
    const memberSelect = document.getElementById('memberSelect');
    const selectedMembers = Array.from(memberSelect.selectedOptions).map(option => option.value);

    selectedMembers.forEach(member => {
        const index = currentTeamMembers.indexOf(member);
        if (index > -1) {
            currentTeamMembers.splice(index, 1); // Remove from list
            memberSelect.querySelector(`option[value="${member}"]`).remove(); // Remove from dropdown
        }
    });

    teams[document.getElementById('teamSelect').value] = currentTeamMembers; // Update team members dynamically
});

// Spin the wheel and select a random member
// Spin the wheel and select a random member
document.getElementById('spinButton').addEventListener('click', () => {
    const selectedMembers = Array.from(document.getElementById('memberSelect').selectedOptions).map(option => option.value);

    if (selectedMembers.length === 0) {
        document.getElementById('result').textContent = "Please select at least one member.";
        return;
    }

    let spinTime = Math.floor(Math.random() * 4000) + 2000; // Random spin time between 2-6 seconds
    let randomIndex = Math.floor(Math.random() * selectedMembers.length);

    // Reset any previous animation
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('spin-animation'); // Remove previous spin animation
    void spinner.offsetWidth; // Trigger reflow to restart animation
    spinner.classList.add('spin-animation'); // Add spin animation

    setTimeout(() => {
        document.getElementById('result').textContent = `Selected team member: ${selectedMembers[randomIndex]}`;
    }, spinTime);
});

