const SHEET_NAME = 'RSVP';

function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  const lock = LockService.getScriptLock();

  lock.waitLock(10000);

  try {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian',
        'Trạng thái',
        'Họ tên',
        'Số người',
        'Số điện thoại',
        'Lời nhắn',
      ]);
      sheet.setFrozenRows(1);
    }

    const data = e.parameter;
    sheet.appendRow([
      new Date(),
      data.attending === 'yes' ? 'Tham dự' : 'Không tham dự',
      safeCell(data.name),
      safeCell(data.count || '0'),
      safeCell(data.phone),
      safeCell(data.note),
    ]);
  } finally {
    lock.releaseLock();
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  const text = String(value || '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}
