# JavaScript Notes


## Gleichheit vs. Zuweisung 

```javascript
var a = 4 
var b = 3

var c  

if (a > b) {
  c = "größer"
} 

if (a < b) {
  c = "kleiner"
} 

if (a == b){
  c = "gleich"
}

lively.notify("c " + c )
```

## If und If Else

```javascript
var a = 4
var b = 3

var c 

if (a > b) {
  c = "größer"
} else if (a < b) {
  c = "kleiner"
} else {
  c = "gleich"
}

lively.notify("c " + c )
```
