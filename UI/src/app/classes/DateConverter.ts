export class DateConverter
{
     //Year/Month/Day
    public static DateToString(date:Date):string
    {
        return date.toISOString().split('T')[0]
    }

    public static PrettyDate(date:Date):string
    {
        var days = new Array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday');
        var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

        return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
    }
}