# Integrating with Google Sheets
Javascript is just one part of maintaining/updating these sheets. We need to use code in
Google Sheets as well, which is similar to the formulas used in Excell.
## Working with a Google Sheet
### Cells and Formula Syntax
- Cells are referenced by their letter (column) and their number (row). Example:
        | **A** | **B** | **C** |
    -------------------------------
    **1** |A1     |B1     | C1
    **2** |A2     |B2     | C2
    **3** |A3     |B3     | C3
    You will see this throughout formulas on your spreadsheet.
- You can reference ranges of cells by putting a `:` between two cell names (i.e. `A2:A5` will reference all of the cells
between A2 and A5)
    - Using just the letter for a column as the second value will reference the entire column.
- Formulas in Google Sheets **always** start with a `=`.
- Functions are usually all caps.
- Formulas are one line, which can make syntax tricky with longer ones.
- Multiple functions can be nested inside each other.
# Creating a Machine Maintenance Sheet
## Sheet Structure
- Currently, machine maintenance pages each encompass one machine type.
    - i.e. One sheet for all 3D printers
- Sheets are organized into tables (which can be created by selecting a range of cells and
right clicking > convert to table)
    - The table on the left is the log of all of the form entries for that machine
        - **Note**: This tutorial assumes that you have already connected your Google form
        to this particular sheet via the Google Forms editing page.
    - The tables on the right represent each individual machine in that category. Some only
    have one, some have many.
## Machine Log
The machine log holds a list of all of the tasks that have been performed on a particular
machine. These entries are parsed from the hidden sheet called "test," which takes the raw
input data from the form and spits it out in a really ugly, tacky way.
\n
While it sorts data automatically from the form, you can input data into this table manually.
Some tasks are manual-input only because of infrequency.
### Machine Log Columns
- Service - The name of the service that was performed (Dropdown input)
- Date - The date of service (Date input)
- Machine (Usually labeled with the machine type's name) - The machine the task was performed on.
Sheets with only one machine do not have this. (Dropdown input)
- Completed by - The email address of the person who completed the task
- Notes - Notes from the person who completed the task
There isn't really anything special about these columns, just note that they may be slightly
different ranges in each sheet
## Service Charts
Each sheet has one or more service charts, one for each machine. These collect information on
when the last maintenance task of each type was performed on each machine.
### Service Chart Columns
- Machine - Name of the machine
- Service - Name of the service task
- Last completed - Date when the task was last completed. Can be a date or "Never" (Calculated -- do not enter manually)
- Due - Date when the task should next be completed. Depending on the task, this could just be
a suggestion. Can be a date or "As needed," if the frequency is not specified. These cells are color coded. (Calculated -- do not enter manually)
- Freq. (Months) - The frequency in months for the given task. Can be a number or "As Needed"
- Link to Instructions - Links to useful guides for each task
### Machine
- The top cell in this column is just plain text, **but it must match a machine name from the log if there are multiple machines in the sheet**.
- The following cells are either plain text, or they reference this top cell, meaning they display
whatever value the referenced cell is showing.
To reference a cell:
1. Click the cell that you want to display another cell's value.
2. Type an `=`. This initiates formula mode.
3. Either click on the cell you want to reference or manually type its name.
### Service
- This column is also plain text, **but it must match the name of a service from the log**.
### Last Completed
This column references the log and searches it for the most recent machine/service combo.
```
=IFERROR(MAX(FILTER(C5:C, A5:A = H5, B5:B = G5)), "Never")
```
- `IFERROR()` - This function does whatever the first value is, and if there's an error, it displays
the second value. Values are separated by commas. In this case:
    - `MAX(FILTER(C5:5, A5:A = H5, B5:B = G5))`
    - `"Never"`
- `MAX()` - This function returns whatever the maximum value is. In this case, it will return the
maximum value of `FILTER(C5:C, A5:A = H5, B5:B = G5)`
- `FILTER` - This function returns a list of cell values that meet the enclosed filter. Looking at
the syntax:
    - `C5:5` - The range of cells we want to returned value to come from. In this case, we want the
    date from the row that is found.
    - `A5:A = H5` - The first condition. This will look at the range `A5:A` (list of services) and check to
    see if any of the cells match the value in `H5` (the service we want to find the last completed date
    for).
    - `B5:B = G5` - The second condition. This will look at the list of rows returned from the above condition,
    and check to see if there are any in the range `B5:B` (the individual machine from the form entry) that match `G5`
    (The name of the machine from the service chart)
- Remember, the `MAX()` function is going to return the most recent date from the list we get from `FILTER`.
If nothing is returned (i.e. the service has never been performed), `IFERROR` returns `Never` in its place.
### Due
This column looks at the last completed date and the frequency and calculates when the task should
be completed next.
```
=IFERROR(IF(ISBLANK(I5), "", (IF(K5 = "As Needed", "As Needed", (EDATE(I5, K5))))), "Never")
```
- Just like before, `ISERROR` will return `"Never"` if there are any errors.
- `IF()` - this function takes three values:
    - `ISBLANK(I5)` - This first value is the condition we are checking. It needs to evaluate to `true` or `false`.
    The `ISBLANK()` function checks to see if the provided cell is blank and returns one of these two options.
    - `""` - The second value is what we want to return if the first value evaluates to `true`. This value is set
    to a blank string, meaning that the cell will be empty if this is returned.
        - A string is basically any sort of plain text such as `"This is a string!"` and must be enclosed in quotes.
    - `IF(K5 = "As Needed", "As Needed", (EDATE(I5, K5))))` - This last value is what will happen if the first value is `false`. 
    Here, we have another `IF` statement that will run. This one checks if `K5` (the frequency) is set to "As Needed." If it is,
    it will return a due date of "As Needed." If it doesn't, it executes one last function...
        - `EDATE(I5, K5)` - Looks at a date as the first value (`I5`, which represents the last completed date) and then adds
        the second value to it in months (`K5`, which is the frequency in months).
            - i.e. First value: 5/31/2025, second value 12 would return 5/31/2026. 
### Freq. (Months)
- This is a plain number/text column. This can either be a number or "As Needed," to represent the frequency
in months that the task needs to be performed. This is used in the calculation of the due date.


