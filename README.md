# Welcome to the Makerspace Maintenance Documentation!
Here is the documentation for how I configured the Makerspace Maintence Google Apps Script. I may at some point
add some documentation for working with the spreadsheet itself, but for now, this is just for the Javascript.
\n
Standard documentation for all of the funcitons and namespaces and such can be found on the sidebar, but if
you don't really know JS, I made some tutorials that walk you through some of the functions.

- [Multiselect Machine Functions]{@tutorial multiselect} - Documents functions that process one or more questions
that allow the user to select multiple items. Such as:
    - [3D Printers]{@link FormInput.Machines.MultiSelect.threeDp}
    - [Sewing/Embroidery Machines]{@link FormInput.Machines.MultiSelect.sewing}
    - View the [Multiselect namespace]{@link FormInput.Machines.MultiSelect} for the full list.
- [Single Select Machine Functions]{@tutorial singleselect} - Documents functions that process questions that
only allow the user to select one item. Such as:
    - [Laser Cutter]{@link FormInput.Machines.SingleSelect.laser}
    - [Vinyl Cutter]{@link FormInput.Machines.SingleSelect.vinyl}
    - View the [Single Select namespace]{@link FormInput.Machines.SingleSelect} for the full list.
## Editing the actual Google Apps Script
While I highly recommend not messing with this if you don't know what you're doing, you may have to change or
update stuff. Most of the files in this repository are related to the documentation. If you have to edit the
actual Google App Script, here are the two files that you will be concerned with:
- [makerspaceMachines.js]{./makerspaceMachines.js} - This deals with parsing the information from the form and
adding it to the spreadsheet
- [sendEmail.js]{./sendEmail.js} - this sends an email to Breck (can be reconfigured to someone else) every day
detailing the maintenance status. You will most likely not need to modify this one, as the functionality is not
core to the program.
Both files are in this repo for backup purposes. You have to copy and paste the code into the Google Apps Script
that's attached to the spreadsheet. It's annoying, but anything else would be way too complicated for such a
small project. **Please try to keep both places up to date!**
### Accessing the Google Apps Script
1. From [this spreadsheet]{https://docs.google.com/spreadsheets/d/1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E/edit?gid=745229284#gid=745229284}, go to Extensions > Google Apps Script.
2. If it the scripts don't show up for you, let me (Breck) know. It might be local to only my account.
