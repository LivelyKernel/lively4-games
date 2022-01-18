# Notes

## JavaScript Beispiele 

```javascript
if (1 > 2) {
    lively.notify("hello");
} else {
      lively.notify("world");
}
```


## Programmieren für Nepomuk


```javascript


var a = 3; // variable a; 3 ist eine number

var b =  a + 1

a = a + 1

var person1 = {name: "Nepomuk", born: 2007} // Objekte

var person2 = {name: "Jens", born: 1981}

// var person = o

function ageByYear(person) {
  var today = new Date()
  var thisYear = today.getFullYear()
  var age = thisYear - person.born 
  return age
}

ageByYear(person1) 

var executionCounter = 0

function whoIsOlder(person1, person2) {
  executionCounter = executionCounter + 1
  lively.notify("Wer ist älter wird berechnet: " + executionCounter)
  if (ageByYear(person1) >= ageByYear(person2)) {
    return person1 // return first person if same age
  } else {
    return person2
  }
}

var oldPerson ={name: "Metusalem", born: -2000}

whoIsOlder(person1, person2)
whoIsOlder(person1, oldPerson)


var liste = [person1, person2, {name: "Olli", born: 2001}]

function averageAgeOfTwoPersons(person1, person2) {
  return (ageByYear(person1) + ageByYear(person2)) / 2
}

averageAgeOfTwoPersons(person1, person2)

// var listOfPersons = liste

function averageAge(listOfPersons) {
  var totalAge = 0
  for(var person of listOfPersons) {
    var age = ageByYear(person)
    totalAge = totalAge + age
    lively.notify(person.name + " " + person.born + " " + age)
  }
  return totalAge / listOfPersons.length
}

averageAge(liste)


```


```javascript 
var birth_day=3
var birth_month=4
var birth_year=2000
var today_day=18
var today_month=1
var today_year=2022

var age_day = today_day-birth_day
if age_day < 0 
  var birth_month+1

var age_month = today_month-birth_month
if age_month < 0
  var birth_year+1 

var age_year = today_year-birth_year

return age_year 

```









