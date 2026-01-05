public class Reservation {
    int roomNumber;
    Date arrivalDate;
    Date departureDate;
    String guestName;

    Reservation(int room, Date arrival, Date departure, String guest) {
        roomNumber = room;
        arrivalDate = arrival;
        departureDate = departure;
        guestName = guest;
    }
    Reservation(int room, String arrival, String departure, String guest) {
        roomNumber = room;
        arrivalDate = new Date(arrival);
        departureDate = new Date(departure);
        guestName = guest;
    }

    public void setRoomNumber(int number) {
        roomNumber = number;
    }
    public int getRoomNumber() {
        return roomNumber;
    }
    public void setArrivalDate(Date arrival) {
        arrivalDate = arrival;
    }
    public Date getArrivalDate() {
        return arrivalDate;
    }
    public void setDepartureDate(Date departure) {
        departureDate = departure;
    }
    public Date getDepartureDate() {
        return departureDate;
    }
    public void setGuestName(String guest) {
        guestName = guest;
    }
    public String getGuestName() {
        return guestName;
    }
}
