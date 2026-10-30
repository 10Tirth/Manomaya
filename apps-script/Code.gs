/**
 * Mind Matters Fest 2026 - registration backend.
 * Bound to a Google Sheet. Deploy as Web app: Execute as Me, Who has access: Anyone.
 * One row per (student, activity). Duplicates (same email + activity) are ignored.
 */
var SHEET_NAME = 'Registrations';
var HEADERS = [
  'Timestamp', 'Registration ID', 'Activity ID', 'Activity', 'Date', 'Time',
  'Full Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Department',
  'Student ID', 'Accessibility / Dietary', 'Message', 'Consent'
];

function setup() {
  getSheet_();
}

function doGet() {
  return json_({ ok: true, service: 'Mind Matters Fest registrations', status: 'live' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (data.website) return json_({ ok: true, skipped: true }); // honeypot: ignore bots

    var name = clean_(data.name);
    var email = clean_(data.email).toLowerCase();
    var activities = Array.isArray(data.activities) ? data.activities.slice(0, 30) : [];
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || activities.length === 0) {
      return json_({ ok: false, error: 'Invalid or missing fields' });
    }

    var sheet = getSheet_();
    var seen = {};
    var last = sheet.getLastRow();
    if (last > 1) {
      sheet.getRange(2, 1, last - 1, HEADERS.length).getValues().forEach(function (r) {
        seen[String(r[7]).toLowerCase() + '|' + r[2]] = true; // email | activity id
      });
    }

    var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
    var stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
    var added = 0;

    activities.forEach(function (a) {
      var key = email + '|' + clean_(a.id);
      if (seen[key]) return;
      seen[key] = true;
      sheet.appendRow([
        stamp, clean_(data.registrationId), clean_(a.id), clean_(a.title), clean_(a.date), clean_(a.time),
        name, email, phone_(data.phone), clean_(data.college), clean_(data.course), clean_(data.year),
        clean_(data.department), clean_(data.studentId), clean_(data.needs), clean_(data.message),
        data.consent ? 'Yes' : 'No'
      ]);
      added++;
    });

    return json_({ ok: true, added: added, duplicates: activities.length - added });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange('A:Q').setNumberFormat('@'); // plain text: keeps phone numbers and IDs intact
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#E3F1EC');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return sheet;
}

function clean_(v) {
  var s = (v === null || v === undefined) ? '' : String(v);
  s = s.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? ' ' + s : s; // block spreadsheet-formula injection
}

function phone_(v) {
  return String(v || '').replace(/[^0-9+\s-]/g, '').trim().slice(0, 20);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
