## Structure 
Multiselect Machine Functions are functions for the parts of the form that allow the user to make multiple selections on one or more questions. These are slightly different from [Single Select Machine Functions]{@link FormInput.Machines.SingleSelect}, so they have their own section. Functions that belong to this category include:

All of the values we get from the form entry are from the `json` parameter that is passed to
the function.
### Range
1. We get the range of spreadsheet cells that we are going to be working with. This is a `constant`,
meaning that this value will not change. We can then access this value within our function by
calling "range".
```
const range = sheet.getRange('A5:E');
```
### List
1. Now we get the list of values that the user selected in the multiselect question.
By using "stringify" on the value, we convert the list from json to a string
(plain text that we can use in the spreadsheet) In this example, the list we are
getting is the list of machines that the user performed the task on, but this 
can vary based on the individual function.
```
var machineList = JSON.stringify([json.values[5]])
```
### Convert the String to an Array
1. Next we will convert this string to an array, which is basically a single variable
that holds a list of objects instead of just one. Here is an example of an array:
```
const myArray = ["string 1", "string 2", "string 3"]
```
2. Each object in this array can be accessed by calling the variable name with the index
(the object's number in the sequence, starting with 0).
```
myArray[0] //gives you the value "string 1"
```
3. We will use the following code to remove all the characters that will get in the way
of creating a nice, clean array, such as brackets and quotes.  
- `replace` Looks for the first value, then replaces it with the second value
- `replaceAll` Looks for a longer string of values, then replaces it with the second value
```
machineList = machineList.replaceAll(", ", ',');
machineList = machineList.replace("[",'')
machineList = machineList.replace("]", '')
machineList = machineList.replace('"', '')
machineList = machineList.replace('"', '')
```
The above code should give us something that looks kind of like this:
```
"machine 1,machine 2,machine 3"
```
4. Now to convert it to an array, we use `split` and tell it to use the commas as delimiters (basically
the character that tells the computer, "This is where we want you to speparate this string!").
```
machineList = machineList.split(",")
```
### Create an Entry in the Spreadsheet for every List Item
1. To do this, we need to use a `for` loop. This tells the computer to look at our array, and do a
bunch of stuff to each item in the list. Since we now have our list of machines, this for loop will
complete all of the instructions we specify for each machine in the list. A for loop needs to be
enclosed in {} like this:
```
//for every machine in our machine list...
for (machine in machineList) {
    //do stuff
}
```
**Now lets add the stuff we want to do for each machine:**
2. Create a variable for the cell that we want to start in. Taking a closer look at this variable:
    - `range` - We defined this variable earlier in the process. This is the available range of cells we are working with.
    - `getNextDataCell` - Find the next cell with data in it.
        - `(SpreadsheetApp.Direction.DOWN)` - This is the parameter that the above function takes, representing the
        direction we want to move in. In this case, the direction is down.
    - `offset(1,0)` - Move over to the next cell. This is the cell that will be stored in the variable.
```
var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);
```
3. Taking the cell that we just accessed, we now set the value to the specified json value. Let's take a closer look:
    - `setValue` - This method sets the value of our cell to whatever we specify in the parentheses.
        - `json` - This is one of the parameters that our function takes. It is the raw json data that the form submission sends.
            - `values` - One of the accessible pieces of data we can get from the json data is `values`. Just like an array,
            we can access any of these values by using its index (remember that the indeces start with 0, not 1). A lot of the json
            values will be blank because not every question is filled out on the form.
```
cell.setValue([json.values[6]]);
```
4. Now we will change the cell we are working with to the adjacent one using `offset`:
```
cell = cell.offset(0,1);
```
5. Similar to the above `setValue`, let's add the machine for this entry next. The `machineList` is an array, so we can access
the individual machine by using the `machine` "variable" we created in the `for` loop. Think of it like the computer's count of
what number its on. We'll also use `offset` to move on to the next cell.
```
cell.setValue(machineList[machine]);
cell = cell.offset(0,1);
```
6. We will now fill in the date of the maintenance in this cell. This works pretty much the same as the last time we set the value
of the cell, but let's look at the parameter:
    - `json` - This is one of the parameters that our function takes. It is the raw json data that the form submission sends.
            - `namedValues` - One of the accessible pieces of data we can get from the json data is `namedValues`. These are
            accessed by their names rather than their indeces. In this case, the name of the value is the question from the
            form. You will need to put `[0]` after the name to access the value.
Honestly, I don't remember why I accessed the json values two different ways, but I really don't feel like standardizing that
right now.
```
cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
```
7. Repeat steps 5 and 6 with the remaining fields that need to be added (i.e. email address and notes)

Hot Tip! Javascript is an actual literal toddler that will yell at you if you don't close your parentheses and brackets and add a ;
at the end of every line. Be mindful of this when editing.