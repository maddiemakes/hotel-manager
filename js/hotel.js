// Date class
class DateObj {
    constructor(dateString) {
        this.parseDate(dateString);
    }

    parseDate(dateString) {
        const parts = dateString.split('/');
        this.month = parseInt(parts[0]);
        this.day = parseInt(parts[1]);
        this.year = parseInt(parts[2]);
        
        // Handle 2-digit years
        if (this.year < 100) {
            this.year += 2000;
        }
    }

    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }

    getYear() {
        return this.year;
    }

    toString() {
        return `${this.month}/${this.day}/${this.year}`;
    }

    equals(date) {
        return this.year === date.getYear() && 
               this.month === date.getMonth() && 
               this.day === date.getDay();
    }
}

// Reservation class
class Reservation {
    constructor(roomNumber, arrival, departure, guestName) {
        this.roomNumber = roomNumber;
        this.arrivalDate = typeof arrival === 'string' ? new DateObj(arrival) : arrival;
        this.departureDate = typeof departure === 'string' ? new DateObj(departure) : departure;
        this.guestName = guestName;
    }

    getRoomNumber() {
        return this.roomNumber;
    }

    getArrivalDate() {
        return this.arrivalDate;
    }

    getDepartureDate() {
        return this.departureDate;
    }

    getGuestName() {
        return this.guestName;
    }
}

// Room class
class Room {
    constructor(number) {
        this.number = number;
        this.reservations = [];
        this.full = false;
    }

    getNumber() {
        return this.number;
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    getReservations() {
        return this.reservations;
    }

    getFull() {
        return this.full;
    }

    setFull(full) {
        this.full = full;
    }
}

// Hotel class
class Hotel {
    constructor() {
        this.rooms = [];
        this.initializeRooms();
    }

    initializeRooms() {
        // Create 30 rooms per floor, 8 floors (100-800)
        for (let floor = 1; floor <= 8; floor++) {
            for (let room = 1; room <= 30; room++) {
                const roomNumber = floor * 100 + room;
                this.rooms.push(new Room(roomNumber));
            }
        }

        // Generate random reservations
        this.generateRandomReservations();
    }

    generateRandomReservations() {
        const firstNames = [
            "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
            "William", "Barbara", "David", "Elizabeth", "Richard", "Susan", "Joseph", "Jessica",
            "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
            "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
            "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
            "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa",
            "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon",
            "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy",
            "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen", "Stephen", "Anna",
            "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma",
            "Benjamin", "Samantha", "Samuel", "Katherine", "Raymond", "Christine", "Gregory", "Debra",
            "Frank", "Rachel", "Alexander", "Catherine", "Patrick", "Carolyn", "Jack", "Janet",
            "Dennis", "Ruth", "Jerry", "Maria", "Tyler", "Heather", "Aaron", "Diane"
        ];

        const lastNames = [
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
            "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
            "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
            "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
            "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
            "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
            "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker",
            "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy",
            "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey",
            "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
            "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza",
            "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers",
            "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell"
        ];

        const getRandomName = () => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            return `${firstName} ${lastName}`;
        };

        const getRandomDate = (year, startMonth, endMonth) => {
            const month = Math.floor(Math.random() * (endMonth - startMonth + 1)) + startMonth;
            const daysInMonth = new Date(year, month, 0).getDate();
            const day = Math.floor(Math.random() * daysInMonth) + 1;
            return new DateObj(`${month}/${day}/${year}`);
        };

        const addDays = (date, days) => {
            const newDate = new Date(date.getYear(), date.getMonth() - 1, date.getDay());
            newDate.setDate(newDate.getDate() + days);
            return new DateObj(`${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`);
        };

        // Add 1-4 reservations to random rooms
        const roomsToFill = Math.floor(this.rooms.length * 0.6); // Fill 60% of rooms
        const selectedRooms = [];
        
        // Randomly select rooms
        while (selectedRooms.length < roomsToFill) {
            const randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            if (!selectedRooms.includes(randomRoom)) {
                selectedRooms.push(randomRoom);
            }
        }

        // Add reservations to selected rooms
        for (const room of selectedRooms) {
            const numReservations = Math.floor(Math.random() * 3) + 1; // 1-3 reservations per room
            const reservations = [];

            for (let i = 0; i < numReservations; i++) {
                let attempts = 0;
                let validReservation = false;

                while (!validReservation && attempts < 10) {
                    const year = 2024 + Math.floor(Math.random() * 2); // 2024-2025
                    const arrivalDate = getRandomDate(year, 1, 11);
                    const stayLength = Math.floor(Math.random() * 7) + 2; // 2-8 days
                    const departureDate = addDays(arrivalDate, stayLength);
                    const guestName = getRandomName();

                    // Check for conflicts with existing reservations
                    let hasConflict = false;
                    for (const existingRes of reservations) {
                        const eAD = existingRes.getArrivalDate();
                        const eDD = existingRes.getDepartureDate();

                        // Check overlap
                        if (this.checkDateBefore(arrivalDate, eAD)) {
                            if (this.checkDateBefore(eAD, departureDate)) {
                                hasConflict = true;
                                break;
                            }
                        } else if (this.checkDateBefore(arrivalDate, eDD)) {
                            hasConflict = true;
                            break;
                        }
                    }

                    if (!hasConflict) {
                        const reservation = new Reservation(room.getNumber(), arrivalDate, departureDate, guestName);
                        reservations.push(reservation);
                        room.addReservation(reservation);
                        validReservation = true;
                    }

                    attempts++;
                }
            }
        }
    }

    checkDateBefore(d1, d2) {
        if (d1.getYear() < d2.getYear()) return true;
        if (d1.getYear() === d2.getYear()) {
            if (d1.getMonth() < d2.getMonth()) return true;
            if (d1.getMonth() === d2.getMonth() && d1.getDay() < d2.getDay()) return true;
        }
        return false;
    }

    getRooms() {
        return this.rooms;
    }

    roomExists(roomNumber) {
        return this.rooms.some(room => room.getNumber() === roomNumber);
    }

    getRoom(roomNumber) {
        return this.rooms.find(room => room.getNumber() === roomNumber) || null;
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    removeRoom(roomNumber) {
        const index = this.rooms.findIndex(room => room.getNumber() === roomNumber);
        if (index !== -1) {
            this.rooms.splice(index, 1);
            return true;
        }
        return false;
    }
}

// Commands class
class Commands {
    constructor(hotel, outputCallback) {
        this.hotel = hotel;
        this.output = outputCallback;
    }

    getCommands(inputString) {
        return inputString.trim().split(/\s+/);
    }

    checkDate(d1, d2) {
        if (d1.getYear() < d2.getYear()) return true;
        if (d1.getYear() === d2.getYear()) {
            if (d1.getMonth() < d2.getMonth()) return true;
            if (d1.getMonth() === d2.getMonth() && d1.getDay() < d2.getDay()) return true;
        }
        return false;
    }

    checkReservations(roomNumber, arrivalDate, departureDate) {
        const room = this.hotel.getRoom(roomNumber);
        if (!room) return false;

        for (const reservation of room.getReservations()) {
            const rAD = reservation.getArrivalDate();
            const rDD = reservation.getDepartureDate();

            // Check if new reservation overlaps with existing
            if (this.checkDate(arrivalDate, rAD)) {
                if (this.checkDate(rAD, departureDate)) {
                    return true;
                }
            } else if (this.checkDate(arrivalDate, rDD)) {
                return true;
            }
        }
        return false;
    }

    scanString(inputString) {
        const commands = this.getCommands(inputString);
        
        if (commands.length === 0) return;

        const mainCommand = commands[0].toLowerCase();

        switch (mainCommand) {
            case 'add':
            case 'new':
                this.addCommand(commands);
                break;
            case 'remove':
            case 'delete':
                this.deleteCommand(commands);
                break;
            case 'print':
            case 'display':
                this.printCommand(commands);
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'help':
                this.showHelp();
                break;
            default:
                this.output('Invalid command. Type "help" for available commands.');
        }
    }

    addCommand(commands) {
        if (commands.length < 2) {
            this.output('Invalid add command. Type "help" for usage.');
            return;
        }

        const subCommand = commands[1].toLowerCase();

        switch (subCommand) {
            case 'room':
                this.addRoom(commands);
                break;
            case 'reservation':
                this.addReservation(commands);
                break;
            default:
                this.output('Invalid add command. Type "help" for usage.');
        }
    }

    addRoom(commands) {
        if (commands.length < 3) {
            this.output('Usage: add room <number>');
            return;
        }

        const roomNumber = parseInt(commands[2]);
        
        if (isNaN(roomNumber)) {
            this.output('Room number must be a valid number.');
            return;
        }

        if (this.hotel.roomExists(roomNumber)) {
            this.output(`Room ${roomNumber} already exists.`);
        } else {
            this.hotel.addRoom(new Room(roomNumber));
            this.output(`Room ${roomNumber} added.`);
        }
    }

    addReservation(commands) {
        if (commands.length < 6) {
            this.output('Usage: add reservation <room> <arrival> <departure> <guest name>');
            return;
        }

        const roomNumber = parseInt(commands[2]);
        const arrivalDate = new DateObj(commands[3]);
        const departureDate = new DateObj(commands[4]);
        const guestName = commands.slice(5).join(' ');

        if (!this.hotel.roomExists(roomNumber)) {
            this.output(`Room ${roomNumber} does not exist. Try again.`);
            return;
        }

        if (this.checkReservations(roomNumber, arrivalDate, departureDate)) {
            this.output(`A reservation for room ${roomNumber} conflicts with this time.`);
            return;
        }

        this.hotel.getRoom(roomNumber).addReservation(
            new Reservation(roomNumber, arrivalDate, departureDate, guestName)
        );
        this.output(`Reservation for Room ${roomNumber} added for ${guestName} from ${arrivalDate} to ${departureDate}.`);
    }

    deleteCommand(commands) {
        if (commands.length < 2) {
            this.output('Invalid delete command. Type "help" for usage.');
            return;
        }

        const subCommand = commands[1].toLowerCase();

        switch (subCommand) {
            case 'room':
                this.deleteRoom(commands);
                break;
            case 'reservation':
                this.deleteReservation(commands);
                break;
            default:
                this.output('Invalid delete command. Type "help" for usage.');
        }
    }

    deleteRoom(commands) {
        if (commands.length < 3) {
            this.output('Usage: delete room <number>');
            return;
        }

        const roomNumber = parseInt(commands[2]);

        if (this.hotel.roomExists(roomNumber)) {
            this.hotel.removeRoom(roomNumber);
            this.output(`Room ${roomNumber} deleted.`);
        } else {
            this.output(`Room ${roomNumber} does not exist.`);
        }
    }

    deleteReservation(commands) {
        if (commands.length < 6) {
            this.output('Usage: delete reservation <room> <arrival> <departure> <guest name>');
            return;
        }

        const roomNumber = parseInt(commands[2]);
        const arrivalDate = new DateObj(commands[3]);
        const departureDate = new DateObj(commands[4]);
        const guestName = commands.slice(5).join(' ');

        if (!this.hotel.roomExists(roomNumber)) {
            this.output(`Room ${roomNumber} does not exist.`);
            return;
        }

        const room = this.hotel.getRoom(roomNumber);
        const reservations = room.getReservations();
        let foundIndex = -1;

        for (let i = 0; i < reservations.length; i++) {
            const r = reservations[i];
            if (r.getArrivalDate().equals(arrivalDate) && 
                r.getDepartureDate().equals(departureDate) && 
                r.getGuestName().toLowerCase() === guestName.toLowerCase()) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex !== -1) {
            reservations.splice(foundIndex, 1);
            this.output(`Reservation for Room ${roomNumber} for ${guestName} from ${arrivalDate} to ${departureDate} deleted.`);
        } else {
            this.output('Reservation not found.');
        }
    }

    printCommand(commands) {
        if (commands.length < 2) {
            this.output('Invalid print command. Type "help" for usage.');
            return;
        }

        const subCommand = commands[1].toLowerCase();

        switch (subCommand) {
            case 'reservations':
                this.printReservations(commands);
                break;
            default:
                this.output('Invalid print command. Type "help" for usage.');
        }
    }

    printReservations(commands) {
        if (commands.length < 3) {
            this.output('Usage: print reservations <all|room|guest|arrival|departure>');
            return;
        }

        const filter = commands[2].toLowerCase();

        switch (filter) {
            case 'all':
                for (const room of this.hotel.getRooms()) {
                    this.printRoomReservations(room);
                }
                break;
            case 'room':
                if (commands.length < 4) {
                    this.output('Usage: print reservations room <number>');
                    return;
                }
                const roomNumber = parseInt(commands[3]);
                const room = this.hotel.getRoom(roomNumber);
                if (room) {
                    this.printRoomReservations(room);
                } else {
                    this.output(`Room ${roomNumber} does not exist.`);
                }
                break;
            case 'guest':
            case 'name':
                if (commands.length < 4) {
                    this.output('Usage: print reservations guest <name>');
                    return;
                }
                const guestName = commands.slice(3).join(' ');
                this.printGuestReservations(guestName);
                break;
            case 'arrival':
                if (commands.length < 4) {
                    this.output('Usage: print reservations arrival <date>');
                    return;
                }
                const arrivalDate = new DateObj(commands[3]);
                this.printArrivalReservations(arrivalDate);
                break;
            case 'departure':
                if (commands.length < 4) {
                    this.output('Usage: print reservations departure <date>');
                    return;
                }
                const departureDate = new DateObj(commands[3]);
                this.printDepartureReservations(departureDate);
                break;
            default:
                this.output('Invalid filter. Type "help" for usage.');
        }
    }

    printRoomReservations(room) {
        this.output(`Room number: ${room.getNumber()}`);
        const reservations = room.getReservations();
        if (reservations.length === 0) {
            this.output('    No reservations');
        } else {
            for (const r of reservations) {
                this.output(`    Guest name:     ${r.getGuestName()}`);
                this.output(`    Arrival date:   ${r.getArrivalDate()}`);
                this.output(`    Departure date: ${r.getDepartureDate()}`);
                this.output('');
            }
        }
    }

    printArrivalReservations(date) {
        let found = false;
        for (const room of this.hotel.getRooms()) {
            for (const res of room.getReservations()) {
                if (res.getArrivalDate().equals(date)) {
                    found = true;
                    this.output(`Room number: ${res.getRoomNumber()}`);
                    this.output(`    Guest name:     ${res.getGuestName()}`);
                    this.output(`    Arrival date:   ${res.getArrivalDate()}`);
                    this.output(`    Departure date: ${res.getDepartureDate()}`);
                    this.output('');
                }
            }
        }
        if (!found) {
            this.output(`No reservations found with arrival date ${date}`);
        }
    }

    printDepartureReservations(date) {
        let found = false;
        for (const room of this.hotel.getRooms()) {
            for (const res of room.getReservations()) {
                if (res.getDepartureDate().equals(date)) {
                    found = true;
                    this.output(`Room number: ${res.getRoomNumber()}`);
                    this.output(`    Guest name:     ${res.getGuestName()}`);
                    this.output(`    Arrival date:   ${res.getArrivalDate()}`);
                    this.output(`    Departure date: ${res.getDepartureDate()}`);
                    this.output('');
                }
            }
        }
        if (!found) {
            this.output(`No reservations found with departure date ${date}`);
        }
    }

    printGuestReservations(name) {
        let found = false;
        for (const room of this.hotel.getRooms()) {
            for (const res of room.getReservations()) {
                if (res.getGuestName().toLowerCase() === name.toLowerCase()) {
                    found = true;
                    this.output(`Room number: ${res.getRoomNumber()}`);
                    this.output(`    Guest name:     ${res.getGuestName()}`);
                    this.output(`    Arrival date:   ${res.getArrivalDate()}`);
                    this.output(`    Departure date: ${res.getDepartureDate()}`);
                    this.output('');
                }
            }
        }
        if (!found) {
            this.output(`No reservations found for guest ${name}`);
        }
    }

    clearOutput() {
        document.getElementById('output').innerHTML = '';
    }

    showHelp() {
        this.output('Available Commands:');
        this.output('  add room <number> - Add a new room');
        this.output('  delete room <number> - Delete a room');
        this.output('  add reservation <room> <arrival> <departure> <guest name> - Add reservation');
        this.output('  delete reservation <room> <arrival> <departure> <guest name> - Delete reservation');
        this.output('  print reservations all - Show all reservations');
        this.output('  print reservations room <number> - Show reservations for a room');
        this.output('  print reservations guest <name> - Show reservations for a guest');
        this.output('  print reservations arrival <date> - Show reservations by arrival date');
        this.output('  print reservations departure <date> - Show reservations by departure date');
        this.output('  clear - Clear the terminal');
        this.output('  help - Show this help message');
        this.output('');
        this.output('Date format: MM/DD/YYYY or MM/DD/YY');
    }
}

// Initialize the application
let hotel;
let commands;

function appendOutput(text) {
    const outputDiv = document.getElementById('output');
    const line = document.createElement('div');
    line.textContent = text;
    outputDiv.appendChild(line);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function handleCommand(input) {
    if (!input.trim()) return;
    
    // Echo the command
    appendOutput(`> ${input}`);
    
    // Process the command
    try {
        commands.scanString(input);
    } catch (error) {
        appendOutput(`Error: ${error.message}`);
    }
}

// GUI Functions
let selectedRoom = null;

function renderRoomGrid(filterFloor = 'all', filterStatus = 'all', searchQuery = '') {
    const roomGrid = document.getElementById('roomGrid');
    if (!roomGrid) return;
    
    roomGrid.innerHTML = '';
    
    let rooms = hotel.getRooms();
    
    // Apply filters
    if (filterFloor !== 'all') {
        const floorNum = parseInt(filterFloor);
        rooms = rooms.filter(room => Math.floor(room.getNumber() / 100) === floorNum);
    }
    
    if (filterStatus === 'available') {
        rooms = rooms.filter(room => room.getReservations().length === 0);
    } else if (filterStatus === 'occupied') {
        rooms = rooms.filter(room => room.getReservations().length > 0);
    }
    
    if (searchQuery) {
        rooms = rooms.filter(room => {
            return room.getReservations().some(res => 
                res.getGuestName().toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }
    
    // Sort rooms by number
    rooms.sort((a, b) => a.getNumber() - b.getNumber());
    
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        
        const reservationCount = room.getReservations().length;
        if (reservationCount === 0) {
            roomCard.classList.add('available');
        } else {
            roomCard.classList.add('occupied');
        }
        
        if (selectedRoom && selectedRoom.getNumber() === room.getNumber()) {
            roomCard.classList.add('selected');
        }
        
        roomCard.innerHTML = `
            <div class="room-number">${room.getNumber()}</div>
            <div class="room-status">${reservationCount === 0 ? 'Available' : reservationCount + ' res.'}</div>
            ${reservationCount > 0 ? `<div class="reservation-count">${reservationCount}</div>` : ''}
        `;
        
        roomCard.addEventListener('click', () => {
            selectedRoom = room;
            renderRoomGrid(
                document.getElementById('floorFilter').value,
                document.getElementById('statusFilter').value,
                document.getElementById('searchGuest').value
            );
            showRoomDetails(room);
        });
        
        roomGrid.appendChild(roomCard);
    });
}

function showRoomDetails(room) {
    const detailsPanel = document.getElementById('roomDetailsPanel');
    const detailsTitle = document.getElementById('roomDetailsTitle');
    const detailsContent = document.getElementById('roomDetailsContent');
    
    if (!detailsPanel || !detailsTitle || !detailsContent) return;
    
    detailsTitle.textContent = `Room ${room.getNumber()} Details`;
    
    const reservations = room.getReservations();
    
    if (reservations.length === 0) {
        detailsContent.innerHTML = '<p class="no-reservations">No reservations for this room</p>';
    } else {
        let html = '';
        reservations.forEach((res, index) => {
            html += `
                <div class="reservation-item">
                    <h4>Reservation ${index + 1}</h4>
                    <div class="reservation-detail">
                        <span class="label">Guest:</span>
                        <span class="value">${res.getGuestName()}</span>
                    </div>
                    <div class="reservation-detail">
                        <span class="label">Arrival:</span>
                        <span class="value">${res.getArrivalDate()}</span>
                    </div>
                    <div class="reservation-detail">
                        <span class="label">Departure:</span>
                        <span class="value">${res.getDepartureDate()}</span>
                    </div>
                    <button class="delete-reservation-btn" onclick="deleteReservationGUI(${room.getNumber()}, '${res.getArrivalDate()}', '${res.getDepartureDate()}', '${res.getGuestName()}')">
                        Delete Reservation
                    </button>
                </div>
            `;
        });
        detailsContent.innerHTML = html;
    }
}

function deleteReservationGUI(roomNumber, arrival, departure, guestName) {
    const arrivalDate = new DateObj(arrival);
    const departureDate = new DateObj(departure);
    
    const room = hotel.getRoom(roomNumber);
    if (!room) return;
    
    const reservations = room.getReservations();
    let foundIndex = -1;
    
    for (let i = 0; i < reservations.length; i++) {
        const r = reservations[i];
        if (r.getArrivalDate().equals(arrivalDate) && 
            r.getDepartureDate().equals(departureDate) && 
            r.getGuestName() === guestName) {
            foundIndex = i;
            break;
        }
    }
    
    if (foundIndex !== -1) {
        reservations.splice(foundIndex, 1);
        refreshGUI();
        alert(`Reservation deleted for ${guestName}`);
    }
}

function updateStatistics() {
    const totalRoomsEl = document.getElementById('totalRooms');
    const totalReservationsEl = document.getElementById('totalReservations');
    const occupiedRoomsEl = document.getElementById('occupiedRooms');
    const availableRoomsEl = document.getElementById('availableRooms');
    
    if (!totalRoomsEl) return;
    
    const rooms = hotel.getRooms();
    let totalReservations = 0;
    let occupiedRooms = 0;
    
    rooms.forEach(room => {
        const resCount = room.getReservations().length;
        totalReservations += resCount;
        if (resCount > 0) occupiedRooms++;
    });
    
    totalRoomsEl.textContent = rooms.length;
    totalReservationsEl.textContent = totalReservations;
    occupiedRoomsEl.textContent = occupiedRooms;
    availableRoomsEl.textContent = rooms.length - occupiedRooms;
}

function refreshGUI() {
    const floorFilter = document.getElementById('floorFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchGuest = document.getElementById('searchGuest');
    
    if (floorFilter && statusFilter && searchGuest) {
        renderRoomGrid(floorFilter.value, statusFilter.value, searchGuest.value);
    }
    updateStatistics();
    
    if (selectedRoom) {
        const room = hotel.getRoom(selectedRoom.getNumber());
        if (room) {
            showRoomDetails(room);
        }
    }
}

function initializeGUI() {
    // Add Reservation Form
    const addReservationForm = document.getElementById('addReservationForm');
    if (addReservationForm) {
        addReservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const roomNumber = parseInt(document.getElementById('guiRoomNumber').value);
            const arrivalDate = document.getElementById('guiArrivalDate').value;
            const departureDate = document.getElementById('guiDepartureDate').value;
            const guestName = document.getElementById('guiGuestName').value;
            
            if (!hotel.roomExists(roomNumber)) {
                alert(`Room ${roomNumber} does not exist.`);
                return;
            }
            
            try {
                const arrival = new DateObj(arrivalDate);
                const departure = new DateObj(departureDate);
                
                // Check for conflicts using the Commands class method
                if (commands.checkReservations(roomNumber, arrival, departure)) {
                    alert(`A reservation for room ${roomNumber} conflicts with this time.`);
                    return;
                }
                
                hotel.getRoom(roomNumber).addReservation(
                    new Reservation(roomNumber, arrival, departure, guestName)
                );
                
                alert(`Reservation added for ${guestName} in room ${roomNumber}`);
                
                // Clear form
                addReservationForm.reset();
                
                // Refresh GUI
                refreshGUI();
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        });
    }
    
    // Filter controls
    const floorFilter = document.getElementById('floorFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchGuest = document.getElementById('searchGuest');
    
    if (floorFilter) {
        floorFilter.addEventListener('change', () => refreshGUI());
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', () => refreshGUI());
    }
    
    if (searchGuest) {
        searchGuest.addEventListener('input', () => refreshGUI());
    }
    
    // Close details button
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            selectedRoom = null;
            renderRoomGrid(floorFilter.value, statusFilter.value, searchGuest.value);
            document.getElementById('roomDetailsContent').innerHTML = '<p>Select a room to view details</p>';
        });
    }
    
    // Initial render
    renderRoomGrid();
    updateStatistics();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    hotel = new Hotel();
    commands = new Commands(hotel, appendOutput);
    
    // CLI Setup
    const input = document.getElementById('commandInput');
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = input.value;
            handleCommand(command);
            input.value = '';
        }
    });
    
    // Welcome message
    appendOutput('Welcome to Hotel Management System');
    appendOutput('Type "help" for available commands');
    appendOutput('');
    appendOutput('System initialized with 240 rooms (30 per floor, floors 1-8)');
    appendOutput('Random reservations generated for approximately 60% of rooms');
    appendOutput('');
    
    // Count total reservations
    let totalReservations = 0;
    for (const room of hotel.getRooms()) {
        totalReservations += room.getReservations().length;
    }
    appendOutput(`Total rooms: ${hotel.getRooms().length}`);
    appendOutput(`Total reservations: ${totalReservations}`);
    appendOutput('');
    
    // Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    const cliInterface = document.getElementById('cliInterface');
    const guiInterface = document.getElementById('guiInterface');
    
    modeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to GUI
            cliInterface.classList.remove('active');
            guiInterface.classList.add('active');
            initializeGUI();
        } else {
            // Switch to CLI
            guiInterface.classList.remove('active');
            cliInterface.classList.add('active');
            input.focus();
        }
    });
});
