// DataDrop lead intake → Google Sheets.
// Deploy: Extensions › Apps Script in your sheet, paste this, set SECRET,
// then Deploy › New deployment › Web app (Execute as: Me, Access: Anyone).

const SECRET = 'change-me'; // must equal SHEETS_WEBHOOK_SECRET in Vercel

const COLUMNS = {
  seller: ['submittedAt', 'name', 'email', 'company', 'role', 'situation', 'dataTypes', 'headcount', 'yearsOfData', 'notes', 'source', 'status'],
  buyer: ['submittedAt', 'name', 'email', 'company', 'role', 'buyerType', 'dataTypes', 'budget', 'timeline', 'notes', 'source', 'status'],
};
const TABS = { seller: 'Sellers', buyer: 'Buyers' };

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json({ ok: false, error: 'unauthorized' });

    const lead = body.lead || {};
    const cols = COLUMNS[lead.type];
    if (!cols) return json({ ok: false, error: 'unknown lead type' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(TABS[lead.type]) || ss.insertSheet(TABS[lead.type]);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(cols);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, cols.length).setFontWeight('bold');
    }

    const row = cols.map(function (c) {
      if (c === 'status') return 'New';
      const v = lead[c] == null ? '' : String(lead[c]);
      // Block formula injection from user input.
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    sheet.appendRow(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
