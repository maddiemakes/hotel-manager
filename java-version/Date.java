public class Date {
    int month, day, year;

    Date(String aString) {
        parseDate(aString);
    }

    public void parseDate(String aString) {
        //parse string and separate by month/day/year
        String str = aString;
        int index = Commands.splitString(str, '/');
        month = Integer.parseInt(str.substring(0,index));
        str = str.substring(index+1);
        index = Commands.splitString(str, '/');
        day = Integer.parseInt(str.substring(0,index));
        str = str.substring(index+1);
        year = Integer.parseInt(str);
    }
    public void setMonth(int m) {
        month = m;
    }
    public int getMonth() {
        return month;
    }
    public void setDay(int d) {
        day = d;
    }
    public int getDay() {
        return day;
    }
    public void setYear(int y) {
        year = y;
    }
    public int getYear() {
        return year;
    }

    public String toString() {
        return getMonth() + "/" + getDay() + "/" + getYear();
    }

    public boolean equals(Date date) {
        if (year == date.getYear() && month == date.getMonth() && day == date.getDay()) {
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        System.out.println((new Date("12/1/2016")).getMonth());
        System.out.println((new Date("12/1/2016")).getDay());
        System.out.println((new Date("12/1/2016")).getYear());
        System.out.println((new Date("2/13/16")).getMonth());
        System.out.println((new Date("2/13/16")).getDay());
        System.out.println((new Date("2/13/16")).getYear());
    }
}
