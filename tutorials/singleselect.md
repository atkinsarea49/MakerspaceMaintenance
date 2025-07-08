## Structure 
Single Select Machine Functions are functions for the parts of the form that only allow the user to make one selection on all 
of their questions. These are simpler than [Multiselect Machine Functions]{@link FormInput.Machines.MultiSelect}, so they have their own section. 
Functions that belong to this category include:

All of the values we get from the form entry are from the `json` parameter that is passed to
the function.
### Range
1. We get the range of spreadsheet cells that we are going to be working with. This is a `constant`,
meaning that this value will not change. We can then access this value within our function by
calling "range".
```
const range = sheet.getRange('A5:D');
```
### Inserting Data
2. Create a variable for the cell that we want to start in. Taking a closer look at this variable:
    - `range` - We defined this variable earlier in the process. This is the available range of cells we are working with.
    - `getNextDataCell` - Find the next cell with data in it.
        - `(SpreadsheetApp.Direction.DOWN)` - This is the parameter that the above function takes, representing the
        direction we want to move in. In this case, the direction is down.
    - `offset(1,0)` - Move over to the next cell. This is the cell that will be stored in the variable.
```
var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);
```
3. We will now fill in the type of service in this cell. There is another way to use `setValue` that is listed in
[Multiselect Machine Functions Tutorial]{@tutorial multiselect}. Let's look at the parameter:
    - `json` - This is one of the parameters that our function takes. It is the raw json data that the form submission sends.
            - `namedValues` - One of the accessible pieces of data we can get from the json data is `namedValues`. These are
            accessed by their names rather than their indeces. In this case, the name of the value is the question from the
            form. You will need to put `[0]` after the name to access the value.
Honestly, I don't remember why I accessed the json values two different ways, but I really don't feel like standardizing that
right now.
```
cell.setValue([json.namedValues["Which vinyl cutter task did you do?"][0]]);
```
4. Now we will change the cell we are working with to the adjacent one using `offset`:
```
cell = cell.offset(0,1);
```
5. Repeat steps 3 and 4 with the remaining fields that need to be added (i.e. date, email address, and notes)

Hot Tip! Javascript is an actual literal toddler that will yell at you if you don't close your parentheses and brackets and add a ;
at the end of every line. Be mindful of this when editing.