# Age in Days 


## Days per Month

<script>

function daysInMonth(month) {
  // leap years are ignored (for now)
  var days = [31,28,31,30,31,30,31,31,30,31,30,31]
  return days[month-1]
} 



var pane = <table>
  <tr><td>December </td> <td>{ daysInMonth(12,2008) }</td> </tr>
  <tr><td>Novemeber </td> <td>{ daysInMonth(11) }</td> </tr>
  <tr><td>Juni </td> <td>{ daysInMonth(6) }</td> </tr>
  <tr><td>Februar </td> <td>{ daysInMonth(2) }</td> </tr>
</table>

pane
</script>


## Days between two dates

<script>

function daysBetween(from, to) {
  lively.notify(from.day)
  
  //wenn wir im gleichem Jahr und Monat sind
  if ((from.year == to.year) && (from.month == to.month)){
    return to.day-from.day
  }

  var days = 0

  // erst allte tage in ganzen jahren dazwischen
  for (var year=from.year + 1; year < to.year; year++){
    var d= 365 // #TOOD Schaltjahr
    days = days + d
  }
  
  // ganze monate
  if (from.year == to.year) {
    for (var month=from.month + 1; month < to.month; month++){
      var d=daysInMonth(month)
      days = days + d
    }  
  } else {
    // rest monate im 1. Jahr
    for (var month=from.month + 1; month <= 12; month++){
      var d=daysInMonth(month)
      days = days + d
    }
    // erste monate im letzten. Jahr
    for (var month=1; month < to.month; month++){
      var d=daysInMonth(month)
      days = days + d
    }

  }

  // rest tage
  var daysFrom = daysInMonth(from.month) - from.day //form.month soll 30 also Tage im Monat werden
  days += daysFrom 
  
  var daysTo = to.day
  days += daysTo 
  


  return days  
} 


var pane = <table>
  <tr><td>Selber Tag </td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 7, month: 6, year: 2007}) }</td> </tr>
  
    <tr><td>10 Tage </td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 17, month: 6, year: 2007}) }</td> </tr>

    <tr><td>2 Monate </td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 7, month: 8, year: 2007}) }</td> </tr>
  
    <tr><td>2 Monate und ein bisschen</td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 12, month: 8, year: 2007}) }</td> </tr>
  
    
    <tr><td>2 Jahre </td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 7, month: 8, year: 2009}) }</td> </tr>

    <tr><td>Irgendwann</td> <td>{ daysBetween({day: 7, month: 6, year: 2007}, {day: 1, month: 10, year: 2018}) }</td> </tr>


</table>

pane
</script>

