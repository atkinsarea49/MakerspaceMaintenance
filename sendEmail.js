/**
 * Functions and variables that are involved in sending the reminder email.
 * @namespace SendEmail
 */


/**
 * Function that sends a summary of maintenence tasks that are due soon, overdue, and wide format printer stock that needs
 * to be ordered. Frequency of emails is set in the trigger.
 * @memberof SendEmail
 */
function sendUpdateEmail() {

  //variables below are filtered so that empty cells are not included
  //sheet that we will gather data from

  /**
   * The sheet we are getting the data from.
   * @type {Sheet}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const sheet = SpreadsheetApp.openById('1-tGHaenj-Wmg0LO4etFXQW6cpYALspl6ADAzA9Byt9E').getSheetByName("Maintenance Needed");
  
    /**
   * The email address that the email will be sent to
   * @type {String}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const email = "bstenson@charlotte.edu";
  
    /**
   * The list of machines that will need maintenance soon.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintSoonMachine = sheet.getRange(5,1,13).getValues().filter(r => r.every(Boolean));
  
    /**
   * The list of services that need to be completed soon. Each object cooresponds to a machine.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintSoonService = sheet.getRange(5,2,13).getValues().filter(r => r.every(Boolean));
  
    /**
   * The list of dates that coorespond to a machine and a task.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintSoonDue = sheet.getRange(5,4,13).getValues().filter(r => r.every(Boolean));

    /**
   * The list of machines that need maintenance now.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintNowMachine = sheet.getRange(5,6,13).getValues().filter(r => r.every(Boolean));
  
    /**
   * The list of services that need to be completed now. Each object cooresponds to a machine.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintNowService = sheet.getRange(5,7,13).getValues().filter(r => r.every(Boolean));
 
    /**
   * The list of dates that coorespond to a machine and a task.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const maintNowDue = sheet.getRange(5,9,13).getValues().filter(r => r.every(Boolean));

    /**
   * The list of supplies that need to be ordered soon.
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  const suppliesNames = sheet.getRange(5,11,13).getValues().filter(r => r.every(Boolean));
  
    /**
   * The list of supply quantities that coorespond to a supply
   * @type {String[]}
   * @constant
   * @memberof SendEmail.sendUpdateEmail
   */
  var suppliesQty = sheet.getRange(5,12,13).getValues();

  //for loop that converts "0" values to strings so that they don't get counted as blank
  for (row in suppliesQty) {
    //if the current row is 0...
    if (suppliesQty[row].toString == "0" || suppliesQty[row].toString == "0.00") {
      //convert it to a sting and set it to "0"
      suppliesQty[row].toString;
      suppliesQty[row] = "<p style='color:red;'><strong>0</strong></p>";
    };
  }

  //create a variable to hold the html design for the summary email
  let html = "<h1>Maintenance Due Soon</h1>";

  //if the "maintenance needed soon" list has 1 or more items, create a table to list those items and their associated data
  if (maintSoonMachine.length > 0) {
    html += "<p>Below is a list of maintenance tasks that are due soon, as well as the date they are due.";
    html += '<table border="1px solid black">';
    //header row for table
    html += '<tr border="1px solid black"><td style="padding:20px;" border="1px solid black"><strong>Machine</strong></td><td style="padding:20px;" border="1px solid black"><strong>Service</strong></td><td style="padding:20px;" border="1px solid black"><strong>Due</strong></td></tr>'

    //for each row in "maintenance needed soon" list, list the machine, service, and due date
    for (row in maintSoonMachine) {
      const machine = maintSoonMachine[row];
      const service = maintSoonService[row];
      const due = maintSoonDue[row];

      html += '<tr style="padding:20px;" border="1px solid black">';
      html += `<td style="padding:20px;" border="1px solid black">${machine}</td>`;
      html += `<td style="padding:20px;" border="1px solid black">${service}</td>`;
      html += `<td style="padding:20px;" border="1px solid black">${due}</td>`;
      html += "</tr>";
    };

    html += '</table>';
  } else {
    html += "<p>There is no upcoming maintenance.</p>"
  };

  //header for "maintenance needed now" section. it is similar in structure to the above section
  html += "<h1>Overdue Maintenance</h1>";

  if (maintNowMachine.length > 0) {
    html += "<p>Below is a list of maintenance tasks that are overdue, as well as the date they are due.";
    html += '<table border="1px solid black">';
    html += '<tr border="1px solid black"><td style="padding:20px;" border="1px solid black"><strong>Machine</strong></td><td style="padding:20px;" border="1px solid black"><strong>Service</strong></td><td style="padding:20px;" border="1px solid black"><strong>Due</strong></td></tr>'

    for (row in maintNowMachine) {
      const machine = maintNowMachine[row];
      const service = maintNowService[row];
      const due = maintNowDue[row];

      html += '<tr style="padding:20px;" border="1px solid black">';
      html += `<td style="padding:20px;" border="1px solid black">${machine}</td>`;
      html += `<td style="padding:20px;" border="1px solid black">${service}</td>`;
      html += `<td style="padding:20px;" border="1px solid black">${due}</td>`;
      html += "</tr>";
    };

    html += '</table>';
  } else {
    html += "<p>There is no overdue maintenance.</p>"
  };

//header for the "inventory needed" section. it is similar in structure to the above sections, but has slightly different values
  html+= "<h1>Wide Format Printer Stock</h1>"

  if (suppliesNames.length > 0) {
    html += "<p>Below is a list of wide format printer supplies that need to be restocked soon.</p>";
    html += '<table border="1px solid black">';
    html += '<tr border="1px solid black"><td style="padding:20px;" border="1px solid black"><strong>Item</strong></td><td style="padding:20px;" border="1px solid black"><strong>Stock</strong></td></tr>';

    for (row in suppliesNames) {
      const item = suppliesNames[row];
      const stock = suppliesQty[row];
    
      html += '<tr style="padding:20px;" border="1px solid black">';
      html += `<td style="padding:20px;" border="1px solid black">${item}</td>`;
      html += `<td style="padding:20px;" border="1px solid black">${stock}</td>`;
      html += "</tr>";
    };
    html += '</table>';
  } else {
    html += "<p>There are no low/out of stock items.</p>"
  }
  
  /**
   * Function that sends the email to the email address provided.
   * @memberof SendEmail
   */
  MailApp.sendEmail({
    to: email,
    subject: "Makerspace Maintenance Summary",
    htmlBody: html
  })

};
