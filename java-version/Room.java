import java.util.ArrayList;

public class Room {
    int number;
    ArrayList<Reservation> reservations = new ArrayList<>();
    boolean full = false;

    Room(int num) {
        number = num;
    }

    Room(int num, Reservation reserv) {
        number = num;
        reservations.add(reserv);
    }

    Room(int num, Reservation reserv, boolean f) {
        number = num;
        reservations.add(reserv);
        full = f;
    }

    public int getNumber() {
        return number;
    }
    public void addReservation(Reservation reservation) {
        //check if departure date is after arrival date
        //check if no conflicts with other reservations
        reservations.add(reservation);
    }

    public ArrayList<Reservation> getReservations() {
        return reservations;
    }

    public boolean getFull() {
        //check if reservation for current date
        //if yes, setFull(true);
        return full;
    }

    public void setFull(boolean b) {
        full = b;
    }
}
