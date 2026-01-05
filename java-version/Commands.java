import java.util.ArrayList;

public class Commands {

    //finds first occurrence of ch in aString
    public static int splitString(String aString, char ch) {
        int charIndex = 0;
        for (int i = 0; i < aString.length(); i++) {
            if (aString.charAt(i) == ch) {
                charIndex = i;
                i = aString.length();
            }
        }
        return charIndex;
    }

    //gets first "command" from string parsed by ch
    public static String getCommand(String aString, char ch) {
        return aString.substring(0,splitString(aString, ch));
    }

    //returns the string after parsing the first command
    public static String getRestOfString(String aString, char ch) {
        return aString.substring(splitString(aString, ch)+1,aString.length());
    }

    public static boolean roomExists(int room) {
        if (Hotel.rooms.size() >= 1) {
            for (Room r : Hotel.rooms) {
                if (r.getNumber() == room) {
                    return true;
                }
            }
        }
        return false;
    }

    public static Room getRoom(int room) {
        for (Room r: Hotel.rooms) {
            if (r.getNumber() == room) {
                return r;
            }
        }
        return null;
    }

    public static ArrayList<String> getCommands(String aString) {
        String bString = aString + " ";
        ArrayList<String> commands = new ArrayList();
        while (bString.length() > 1) {
            commands.add(getCommand(bString, ' '));
//            System.out.println("Command added: " + getCommand(bString, ' '));
            bString = getRestOfString(bString, ' ');
//            System.out.println("Rest of string: " + bString);
        }
        return commands;
    }

    public static boolean checkReservations(String room, Date aD, Date dD) {
        for (Reservation r: getRoom(Integer.parseInt(room)).getReservations()) {
            Date rAD = r.getArrivalDate();
            Date rDD = r.getDepartureDate();

            //aD is before reservation start date
            if (checkDate(aD, rAD)) {
                if (checkDate(rAD, dD)) {
                    return true;
                }
            }
            else if (checkDate(aD, rDD)) {
                return true;
            }
        }
        return false;
    }

    public static boolean checkDate(Date d1, Date date2) {
        if ((d1.getYear() < date2.getYear())
                || (d1.getYear() == date2.getYear() &&
                    (d1.getMonth() < date2.getMonth() ||
                            (d1.getMonth() == date2.getMonth() &&
                                d1.getDay() < date2.getDay())))) {
            return true;
        }
        return false;
    }

    public static void scanString(String aString) {
        //parse to first space
//        String command = getCommand(aString, ' ');
        ArrayList<String> commands = getCommands(aString);
        switch (commands.get(0).toLowerCase()) {
            case "add":
            case "new":
//                addCommand(getRestOfString(aString, ' '));
                addCommand(commands);
                break;
            case "remove":
            case "delete":
                deleteCommand(commands);
                break;
            case "print":
            case "display":
                printCommand(commands);
                break;
            default:
                System.out.println("Invalid command. Try again.");
        }
    }

    public static void addCommand(ArrayList<String> commands) {
//        public static void addCommand(String aString) {
        //room
        //reservation
        //booking
        switch (commands.get(1).toLowerCase()) {
            case "room":
                addRoom(commands);
                break;
            case "reservation":
                addReservation(commands);
                break;
            case "booking":
                addBooking(commands);
                break;
            default:
                System.out.println("Invalid command. Try again.");
        }
    }
    public static void addRoom(ArrayList<String> commands) {
        //if room doesn't already exist, make it
        String room = commands.get(2);
        if (roomExists(Integer.parseInt(room))) {
            System.out.println("Room " + room + " already exists.");
        } else {
            Hotel.rooms.add(new Room(Integer.parseInt(room)));
            System.out.println("Room " + room + " added.");
        }
    }
    public static void addReservation(ArrayList<String> commands) {
        //find room #
        //check date conflicts
        //add if no conflict
        String room = commands.get(2);
        Date arrivalDate = new Date(commands.get(3));
        Date departureDate = new Date(commands.get(4));
        String name = "";
        for (int i = 5; i < commands.size(); i++) {
            name += commands.get(i) + " ";
        }

        if (roomExists(Integer.parseInt(room))) {
            if (checkReservations(room, arrivalDate, departureDate)) {
                System.out.println("A reservation for room " + room + " conflicts with this time.");
            } else {
                getRoom(Integer.parseInt(room)).addReservation(
                        new Reservation(Integer.parseInt(room), arrivalDate, departureDate, name));
                System.out.println("Reservation for Room " + room + " added for " + name + "from " + arrivalDate + " to " + departureDate + ".");
            }
        } else {
            System.out.println("Room " + room + " does not exist. Try again.");
        }
    }
    public static void addBooking(ArrayList<String> commands) {
//        public static void addBooking() {
        //find room #
        //check date conflicts
        //add if no conflict
        //set room as full
    }

    public static void deleteCommand(ArrayList<String> commands) {
        //room
        //reservation
        //booking
        switch (commands.get(1).toLowerCase()) {
            case "room":
                //search rooms, delete from array list
                deleteRoom(commands);
                break;
            case "reservation":
                deleteReservation(commands);
                break;
            case "booking":
                deleteBooking(commands);
                break;
            default:
                System.out.println("Invalid command. Try again.");
        }
    }
    public static void deleteRoom(ArrayList<String> commands) {
        //search rooms, delete from array list

        String room = commands.get(2);
        if (roomExists(Integer.parseInt(room))) {
            int i = 0;
            int k = 0;
            for (Room r: Hotel.rooms) {
                if (r.getNumber() == Integer.parseInt(room)) {
                    k = i;
                }
                i++;
            }
            Hotel.rooms.remove(k);
            System.out.println("Room " + room + " deleted.");
        } else {
            System.out.println("Room " + room + " does not exist.");
        }
    }
    public static void deleteReservation(ArrayList<String> commands) {
        //search reservations for room
        //delete reservation
        String room = commands.get(2);
        Date arrivalDate = new Date(commands.get(3));
        Date departureDate = new Date(commands.get(4));
        String name = "";
        for (int i = 5; i < commands.size(); i++) {
            name += commands.get(i) + " ";
        }

        if (roomExists(Integer.parseInt(room))) {
            int i = 0;
            int k = -1;
            for (Reservation r: getRoom(Integer.parseInt(room)).getReservations()) {
                if (r.getArrivalDate().equals(arrivalDate) && r.getDepartureDate().equals(departureDate) && r.getGuestName().equalsIgnoreCase(name)) {
                    k = i;
                }
                i++;
            }
            if (k != -1) {
                getRoom(Integer.parseInt(room)).getReservations().remove(k);
                System.out.println("Reservation for Room " + room + " for " + name + "from " + arrivalDate + " to " + departureDate + " deleted.");
            } else {
                System.out.println("Reservation not found.");
            }
        } else {
            System.out.println("Room " + room + " does not exist.");
        }
    }
    public static void deleteBooking(ArrayList<String> commands) {
        //find room
        //set available
        //delete departure date

    }

    public static void printCommand(ArrayList<String> commands) {
        switch (commands.get(1).toLowerCase()) {
            case "reservations":
                printReservations(commands);
                break;
            case "free":
            case "open":
                break;
            case "booked":
            case "reserved":
                break;
            default:
                System.out.println("Invalid command. Try again.");
        }
        //print reservations
        //print reservations all
        //for each room
            //for each reservation
                //print reservation

        //print reservations <number>
        //print reservations room <number>
        //for each reservation

        //print reservations arrival <date>

        //print reservations departure <date>

        //print reservations guest <guest name>

        //print free <arrival date> <departure date>
        //print open <arrival date> <departure date>
            //for each room:
                //for each reservation:
                    //check reservation conflict
                    //if no conflict, mark room as free

        //print booked <arrival date> <departure date>
        //print reserved <arrival date> <departure date>
    }
    public static void printReservations(ArrayList<String> commands) {
        String str = "";
        if (commands.size() > 3) {
            str = commands.get(3);
        }
        switch (commands.get(2).toLowerCase()) {
            case "all":
                for (Room r: Hotel.rooms) {
                    printRoomReservations(r);
                }
                break;
            case "room":
                printRoomReservations(getRoom(Integer.parseInt(str)));
                break;
            case "arrival":
                printArrivalReservations(new Date(str));
                break;
            case "departure":
                printDepartureReservations(new Date(str));
                break;
            case "guest":
            case "name":
                String name = "";
                for (int i = 3; i < commands.size(); i++) {
                    name += commands.get(i) + " ";
                }
                printGuestReservations(name);
                break;
            default:
                System.out.println("Invalid command. Try again.");
        }
    }
    public static void printRoomReservations(Room room) {
        System.out.println("Room number: " + room.getNumber());
        for (Reservation r: room.getReservations()) {
            System.out.println("    Guest name:     " + r.getGuestName());
            System.out.println("    Arrival date:   " + r.getArrivalDate());
            System.out.println("    Departure date: " + r.getDepartureDate());
            System.out.println();
        }
    }
    public static void printArrivalReservations(Date date) {
        for (Room r: Hotel.rooms) {
            for (Reservation res: r.getReservations()) {
                if (res.getArrivalDate().equals(date)) {
                    System.out.println("Room number: " + res.getRoomNumber());
                    System.out.println("    Guest name:     " + res.getGuestName());
                    System.out.println("    Arrival date:   " + res.getArrivalDate());
                    System.out.println("    Departure date: " + res.getDepartureDate());
                }
            }
        }
    }
    public static void printDepartureReservations(Date date) {
        for (Room r: Hotel.rooms) {
            for (Reservation res: r.getReservations()) {
                if (res.getDepartureDate().equals(date)) {
                    System.out.println("Room number: " + res.getRoomNumber());
                    System.out.println("    Guest name:     " + res.getGuestName());
                    System.out.println("    Arrival date:   " + res.getArrivalDate());
                    System.out.println("    Departure date: " + res.getDepartureDate());
                }
            }
        }
    }
    public static void printGuestReservations(String name) {
        for (Room r: Hotel.rooms) {
            for (Reservation res: r.getReservations()) {
                if (res.getGuestName().equalsIgnoreCase(name)) {
                    System.out.println("Room number: " + res.getRoomNumber());
                    System.out.println("    Guest name:     " + res.getGuestName());
                    System.out.println("    Arrival date:   " + res.getArrivalDate());
                    System.out.println("    Departure date: " + res.getDepartureDate());
                }
            }
        }
    }
}
