
/**
 * Functions and objects and such that have to do with the form input.
 * @namespace FormInput
 */

/**
 * Functions for each individual machine input.
 * @namespace Machines
 * @memberof FormInput
 */

/**
 * @typedef {Object} Sheet A reference to a specific spreadsheet on a Google Sheet workbook.
 */

/**
 * @typedef {Object} JSON A json object. In our case, these are used as the raw data received from the form. You can think of a json object
 * as a collection of data that's all wrapped up in a neat little package.
 */

/**
 * @typedef {Object} Range A range of cells in a Sheet. 
 */

/**
 * Machine functions that allow the user to input multiple selections for one or more questions
 * as opposed to just one. This means that the multiselect questions need to be formatted and
 * split up so that each selection can have its own entry.
 * 
 * See the [Multiselect Machine Functions Tutorial]{@tutorial multiselect} for a breakdown of how multiselect machine functions work.
 * 
 * @tutorial multiselect
 * @namespace MultiSelect
 * @memberof FormInput.Machines
 */

/**
 * Machine functions that only allow the user to input one selection per question.
 * 
 * See the [Single Select Machine Functions Tutorial]{@tutorial singleselect} for a breakdown of how multiselect machine functions work.
 * 
 * @tutorial singleselect
 * @namespace SingleSelect
 * @memberof FormInput.Machines
 */

/**
 * This triggers the script to run. You most likely won't have to mess with this.
 * 
 * @listens A form submission
 * @memberof FormInput
 */
function makeTrigger() {
  const sheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('adder')
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
}

/**
 * This is just a fake json entry that I use for testing. If you need to actually make any human sense
 * of this or any other entry, I suggest pasting this into a json linter such as jsonlint.com.
 * /n
 * All raw json entries are placed in a hidden sheet called "test." You can unhide it if you 
 * need to access any of the raw form entries, but please hide it again when you're done. 
 * 
 * @memberof FormInput
 * @constant 
 * @default {authMode:"FULL","namedValues":{"Email Address":["bstenson@charlotte.edu"],"What was the date of the maintenance?":["2/19/2025"],"What did you replace?":[""],"Which sewing/embroidery machine task did you do?":["Bobbin Holder/Feed Dog Cleaning"],"Which printer did you do this on?":[""],"Which CNC did you do this on?":[""],"What machine was this task for?":["Sewing/Embroidery Machines"],"Which serger task did you do?":[""],"Which machine did you do this on?":["Singer QS1, Singer QS2, Singer Heavy Duty, Janome 1, Janome 2, Embroidery Machine"],"Which Cricut task did you do?":[""],"Which vinyl cutter task did you do?":[""],"What laser cutter task did you do?":[""],"Which CNC task did you do?":[""],"Timestamp":["2/19/2025 14:26:44"],"Notes:":[""],"What 3D printer task did you do? ":[""]},"range":{"columnEnd":16,"columnStart":1,"rowEnd":47,"rowStart":47},"source":{},"triggerUid":"-8663804608173561165","values":["2/19/2025 14:26:44","bstenson@charlotte.edu","Sewing/Embroidery Machines","","","","","","","","","Singer QS1, Singer QS2, Singer Heavy Duty, Janome 1, Janome 2, Embroidery Machine","Bobbin Holder/Feed Dog Cleaning","","","2/19/2025"]}
 */
const test = {"authMode":"FULL","namedValues":{"Email Address":["bstenson@charlotte.edu"],"What was the date of the maintenance?":["2/19/2025"],"What did you replace?":[""],"Which sewing/embroidery machine task did you do?":["Bobbin Holder/Feed Dog Cleaning"],"Which printer did you do this on?":[""],"Which CNC did you do this on?":[""],"What machine was this task for?":["Sewing/Embroidery Machines"],"Which serger task did you do?":[""],"Which machine did you do this on?":["Singer QS1, Singer QS2, Singer Heavy Duty, Janome 1, Janome 2, Embroidery Machine"],"Which Cricut task did you do?":[""],"Which vinyl cutter task did you do?":[""],"What laser cutter task did you do?":[""],"Which CNC task did you do?":[""],"Timestamp":["2/19/2025 14:26:44"],"Notes:":[""],"What 3D printer task did you do? ":[""]},"range":{"columnEnd":16,"columnStart":1,"rowEnd":47,"rowStart":47},"source":{},"triggerUid":"-8663804608173561165","values":["2/19/2025 14:26:44","bstenson@charlotte.edu","Sewing/Embroidery Machines","","","","","","","","","Singer QS1, Singer QS2, Singer Heavy Duty, Janome 1, Janome 2, Embroidery Machine","Bobbin Holder/Feed Dog Cleaning","","","2/19/2025"]}

/**
 * Function that puts the form submission information into the laser cutter sheet. This function is a [Single Select Machine Function]
 * {@link FormInput.Machines.SingleSelect}. To see a breakdown on how these functions work, see the [Single Select Machine Functions Tutorial]{@tutorial singleselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Laser Cutter")] The spreadsheet that we are going to use. The default value can be overridden by passing a
 * different sheet. You probably won't have to do this.
 * @memberof FormInput.Machines.SingleSelect
 * @tutorial multiselect
 */
function laser(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Laser Cutter")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.SingleSelect.laser
   */
  const range = sheet.getRange('A5:D');

  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.laser
   */
  var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

  //Set the value of the starting cell to the laser cutter task data that was submitted in the form.
  cell.setValue([json.namedValues["What laser cutter task did you do?"][0]]);
  
  //select the cell to the right of the current cell.
  cell = cell.offset(0,1);

  //Set the value of this cell to the date that was submitted in the form.
  cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
  
  cell = cell.offset(0,1);
  //Set the value of this cell to the email of the person who submitted in the form.
  cell.setValue([json.namedValues["Email Address"][0]]);
  
  cell = cell.offset(0,1);
  //Set the value of this cell to the notes that were submitted in the form, if any.  
  cell.setValue([json.namedValues["Notes:"][0]]);
  
  cell = cell.offset(0,1);

};

/**
 * Function that puts the form submission information into the 3D Printer sheet. This function is a [Multiselect Machine Function]
 * {@link FormInput.Machines.MultiSelect}. To see a breakdown on how these functions work, see the [Multiselect Machine Functions Tutorial]{@tutorial multiselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("3D Printers")] The spreadsheet that we are
 * going to use. This can be overriden by passing in a different sheet. You most likely won't have to do this.
 * @memberof FormInput.Machines.MultiSelect
 * @tutorial multiselect
 */
function threeDp(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("3D Printers")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.MultiSelect.threeDp
   */
  const range = sheet.getRange('A5:E');

  /**
   * The list of machines that the tasks have been performed on. Received from {@param json}.
   * @type {String}
   * @memberof FormInput.Machines.MultiSelect.threeDp
   */  
  var machineList = JSON.stringify([json.values[5]])

  //replace all unnecessary characters in the string, then convert it to an array based on where the commas are
  machineList = machineList.replaceAll(", ", ',');
  machineList = machineList.replace("[",'')
  machineList = machineList.replace("]", '')
  machineList = machineList.replace('"', '')
  machineList = machineList.replace('"', '')
  //converts machine list to an array
  machineList = machineList.split(",")

  //creates a new row for each machine that's listed in machine list.
  for (machine in machineList) {
  
  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.threeDp
   */
    var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

    //inputs the service
    cell.setValue([json.values[6]]);
    //moves on to next cell in row
    cell = cell.offset(0,1);
    
    //gets the indicated machine from the machine list and inputs it
    cell.setValue(machineList[machine]);
    cell = cell.offset(0,1);

    cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Email Address"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Notes:"][0]]);
  }

};

/**
 * Function that puts the form submission information into the CNC sheet. This function is a [Multiselect Machine Function]
 * {@link FormInput.Machines.MultiSelect}. To see a breakdown on how these functions work, see the [Multiselect Machine Functions Tutorial]{@tutorial multiselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("CNC Router")] The spreadsheet that we are
 * going to use. This can be overriden by passing in a different sheet. You most likely won't have to do this.
 * @memberof FormInput.Machines.MultiSelect
 * @tutorial multiselect
 */
function cnc(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("CNC Router")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.MultiSelect.cnc
   */
  const range = sheet.getRange('A5:E');

  /**
   * The list of machines that the tasks have been performed on. Received from {@param json}.
   * @type {String}
   * @memberof FormInput.Machines.MultiSelect.cnc
   */  
  var machineList = JSON.stringify([json.values[7]])

  //replace all unnecessary characters in the string, then convert it to an array based on where the commas are
  machineList = machineList.replaceAll(", ", ',');
  machineList = machineList.replace("[",'')
  machineList = machineList.replace("]", '')
  machineList = machineList.replace('"', '')
  machineList = machineList.replace('"', '')
  //converts machine list to an array
  machineList = machineList.split(",")

  //creates a new row for each machine that's listed in machine list.
  for (machine in machineList) {

  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.cnc
   */
    var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

    //inputs the service
    cell.setValue([json.values[8]]);
    //moves on to next cell in row
    cell = cell.offset(0,1);
    
    //gets the indicated machine from the machine list and inputs it
    cell.setValue(machineList[machine]);
    cell = cell.offset(0,1);

    cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Email Address"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Notes:"][0]]);
  }

};

/**
 * Function that puts the form submission information into the vinyl cutter sheet. This function is a [Single Select Machine Function]
 * {@link FormInput.Machines.SingleSelect}. To see a breakdown on how these functions work, see the [Single Select Machine Functions Tutorial]{@tutorial singleselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Vinyl Cutter")] The spreadsheet that we are going to use. The default value can be overridden by passing a
 * different sheet. You probably won't have to do this.
 * @memberof FormInput.Machines.SingleSelect
 * @tutorial singleselect
 */
function vinyl(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Vinyl Cutter")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.SingleSelect.vinyl
   */
  const range = sheet.getRange('A5:D');

  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.vinyl
   */
  var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

  cell.setValue([json.namedValues["Which vinyl cutter task did you do?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Email Address"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Notes:"][0]]);
  
  cell = cell.offset(0,1);

};

/**
 * Function that puts the form submission information into the Cricut sheet. This function is a [Single Select Machine Function]
 * {@link FormInput.Machines.SingleSelect}. To see a breakdown on how these functions work, see the [Single Select Machine Functions Tutorial]{@tutorial singleselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Cricut")] The spreadsheet that we are going to use. The default value can be overridden by passing a
 * different sheet. You probably won't have to do this.
 * @memberof FormInput.Machines.SingleSelect
 * @tutorial singleselect
 */
function cricut(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Cricut")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.SingleSelect.cricut
   */
  const range = sheet.getRange('A5:D');

  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.cricut
   */
  var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

  cell.setValue([json.namedValues["Which Cricut task did you do?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Email Address"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Notes:"][0]]);
  
  cell = cell.offset(0,1);

};

/**
 * Function that puts the form submission information into the sewing/embroidery machine sheet. This function is a [Multiselect Machine Function]
 * {@link FormInput.Machines.MultiSelect}. To see a breakdown on how these functions work, see the [Multiselect Machine Functions Tutorial]{@tutorial multiselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Sewing/Embroidery Machines")] The spreadsheet that we are
 * going to use. This can be overriden by passing in a different sheet. You most likely won't have to do this.
 * @memberof FormInput.Machines.MultiSelect
 * @tutorial multiselect
 */
function sewing(json = test, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Sewing/Embroidery Machines")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.MultiSelect.sewing
   */
  const range = sheet.getRange('A5:E');
  
  /**
   * The list of machines that the tasks have been performed on. Received from {@param json}.
   * @type {String}
   * @memberof FormInput.Machines.MultiSelect.sewing
   */  
  var machineList = JSON.stringify([json.values[11]])

  machineList = machineList.replaceAll(", ", ',');
  machineList = machineList.replace("[",'')
  machineList = machineList.replace("]", '')
  machineList = machineList.replace('"', '')
  machineList = machineList.replace('"', '')
  //converts machine list to an array
  machineList = machineList.split(",")

  //creates a new row for each machine that's listed in machine list.
  for (machine in machineList) {
    
    /**
    * The cell where we will start inserting data. Received from {@constant Range}.
    * @memberof FormInput.Machines.SingleSelect.sewing
    */
    var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);
    //inputs the service
    cell.setValue([json.values[12]]);
    //moves on to next cell in row
    cell = cell.offset(0,1);
    
    //gets the indicated machine from the machine list and inputs it
    cell.setValue(machineList[machine]);
    cell = cell.offset(0,1);

    cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Email Address"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Notes:"][0]]);
  }

};

/**
 * Function that puts the form submission information into the serger sheet. This function is a [Single Select Machine Function]
 * {@link FormInput.Machines.SingleSelect}. To see a breakdown on how these functions work, see the [Single Select Machine Functions Tutorial]{@tutorial singleselect}.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Serger")] The spreadsheet that we are going to use. The default value can be overridden by passing a
 * different sheet. You probably won't have to do this.
 * @memberof FormInput.Machines.SingleSelect
 * @tutorial singleselect
 */
function serger(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Serger")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @memberof FormInput.Machines.SingleSelect.serger
   */
  const range = sheet.getRange('A5:D');
  /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.serger
   */
  var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);

  cell.setValue([json.namedValues["Which serger task did you do?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Email Address"][0]]);
  
  cell = cell.offset(0,1);

  cell.setValue([json.namedValues["Notes:"][0]]);
  
  cell = cell.offset(0,1);

};

/**
 * Function that puts the form submission information into the wide format printer sheet. This function is a [Multiselect Machine Function]
 * {@link FormInput.Machines.MultiSelect}. To see a breakdown on how these functions work, see the [Multiselect Machine Functions Tutorial]{@tutorial multiselect}.
 * Note that the list referenced in this function is called `replacementList` because the question that gives us this list gives us a list of
 * replacement items rather than a list of machines.
 * 
 * @param {JSON} json The json entry to parse
 * @param {Sheet} [sheet=SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Wide Format Printer")] The spreadsheet that we are
 * going to use. This can be overriden by passing in a different sheet. You most likely won't have to do this.
 * @memberof FormInput.Machines.MultiSelect
 * @tutorial multiselect
 */
function wideFormat(json, sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Wide Format Printer")) {

  /**
   * The range of cells that we are working with. Received from {@param sheet}.
   * @constant 
   * @type {Range}
   * @memberof FormInput.Machines.MultiSelect.wideFormat
   */
  const range = sheet.getRange('A5:E');

  /**
   * The list of supply replacements that have been performed. Received from {@param json}.
   * @type {String}
   * @memberof FormInput.Machines.MultiSelect.wideFormat
   */
  var replacementList = JSON.stringify([json.values[14]]);

  //replace all unnecessary characters in the string (such as quotes and brackets, basically anything that's not a comma), then convert it to an array based on where the commas are
  replacementList = replacementList.replaceAll(", ", ',');
  replacementList = replacementList.replace('[','');
  replacementList = replacementList.replace(']', '');
  replacementList = replacementList.replace('"', '');
  replacementList = replacementList.replace('"', '');
  //converts machine list to an array by splitting it at the commas
  replacementList = replacementList.split(",");

  //for every replacement in the list...
  for (replacement in replacementList) {
    
    /**
   * The cell where we will start inserting data. Received from {@constant Range}.
   * @memberof FormInput.Machines.SingleSelect.wideFormat
   */
    var cell = range.getNextDataCell(SpreadsheetApp.Direction.DOWN).offset(1,0);
    //set the value to whatever the replacement was
    cell.setValue(replacementList[replacement]);

    cell = cell.offset(0,1);
    //this goes in the quantity column, which keeps track of stock
    cell.setValue(1);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["What was the date of the maintenance?"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Email Address"][0]]);
    cell = cell.offset(0,1);
    cell.setValue([json.namedValues["Notes:"][0]]);
    cell = cell.offset(0,1);
  };

};

/**
 * This function takes the data given to us by the form and decides which [Machine]{@link Machines} function we want to run.
 * It uses the user's answer to the machine question to determine this.
 * @param {JSON} e This is the json data that is passed from the form submission. We will pass this to whichever function is appropriate
 * for the machine type.
 * @memberof FormInput
 */
function adder(e = test) {

  /**
   * The spreadsheet we are going to deposit the raw {@type JSON} data into.
   * @constant
   * @memberof FormInput.adder
   */
  const sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName('Test');
  
  /**
   * A variable that will hold the json data from {@param e} as a string
   * @type {String}
   * @memberof FormInput.adder
   */
  const jsonString = JSON.stringify(e);
  //add this parsed data to the raw data sheet
  sheet.appendRow([jsonString]);

  //using submitted form data, select the correct sheet for data input, then run that sheet's dedicated function
  switch(e.namedValues["What machine was this task for?"][0]) {
    case "Laser Cutter":
      laser(json = e);
      break;
    case "3D Printers":
      threeDp(json = e);
      break;
    case "CNC Routers":
      cnc(json = e);
      break;
    case "Vinyl Cutter":
      vinyl(json = e);
      break;
    case "Cricut":
      cricut(json = e);
      break;
    case "Sewing/Embroidery Machines":
      sewing(json = e);
      break;
    case "Serger":
      serger(json = e);
      break;
    case "Wide Format Printer":
      wideFormat(json = e);
      break;
  } 
}
