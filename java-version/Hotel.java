import java.util.ArrayList;
import java.util.Scanner;

public class Hotel {
    public static ArrayList<Room> rooms = new ArrayList<>();

    public static void main(String[] args) {

        rooms.add(new Room(101));
        rooms.add(new Room(102));
        rooms.add(new Room(103));
        rooms.add(new Room(104));
        rooms.add(new Room(201));
        rooms.add(new Room(202));
        rooms.add(new Room(203));
        rooms.add(new Room(204));
//        run.add("add reservation 101 1/3/16 2/3/16 James Hilton");
//        run.add("add reservation 103 1/3/16 2/3/16 James Hilton");
//        run.add("add reservation 101 4/8/16 4/12/16 Helen");
//        run.add("add reservation 101 6/9/17 7/12/17 George Falcon");
        Commands.getRoom(101).addReservation(new Reservation(101, "1/3/16", "2/3/16", "James Hilton"));
        Commands.getRoom(101).addReservation(new Reservation(101, "4/8/16", "4/12/16", "Helen"));
        Commands.getRoom(101).addReservation(new Reservation(101, "6/9/17", "7/12/17", "George Falcon"));


        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        while (!str.equalsIgnoreCase("stop")) {
            Commands.scanString(str);
            str = scanner.nextLine();
        }

//        ArrayList<String> run = new ArrayList<>();
//        run.add("add room 101");
//        run.add("add room 102");
//        run.add("add room 103");
//        run.add("add room 104");
//        run.add("add room 201");
//        run.add("add room 202");
//        run.add("add room 203");
//        run.add("add room 204");
//        run.add("add reservation 101 1/3/16 2/3/16 James Hilton");
//        run.add("add reservation 103 1/3/16 2/3/16 James Hilton");
//        run.add("add reservation 101 4/8/16 4/12/16 Helen");
//        run.add("add reservation 101 6/9/17 7/12/17 George Falcon");
//        run.add("delete room 102");
//        run.add("delete room 106");
//        run.add("add room 102");
//        run.add("print reservations all");
//        run.add("print reservations room 101");
//        run.add("print reservations guest James Hilton");
////        run.add("delete reservation 101 1/3/16 2/3/16 jams hilton");
////        run.add("delete reservation 101 1/3/16 2/3/16 james hilton");
////        run.add("remove reservation 101 6/9/17 7/12/17 george falcon");
////        run.add("delete reservation 101 1/3/16 2/3/16 james hilton");
//
//        for (int i = 0; i < run.size(); i++) {
//            Commands.scanString(run.get(i));
//        }
    }
}
