const SHEET_NAME = '웨딩예약';

function doGet() {
  return json_({ status: 'ok', message: 'Wedding reservation API is running' });
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("'웨딩예약' 시트를 찾을 수 없습니다.");
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.name || !d.phone || !d.weddingDate || !d.visitDate || !d.visitTime || d.privacy !== true) {
      return json_({ status: 'error', message: '필수 입력값이 누락되었습니다.' });
    }
    sheet.appendRow([
      new Date(), safe_(d.name), safe_(d.phone), safe_(d.email || ''), safe_(d.weddingDate),
      safe_(d.visitDate), safe_(d.visitTime), safe_(d.dress || ''), Number(d.people || 1),
      safe_(d.message || ''), d.privacy ? 'Y' : 'N', d.marketing ? 'Y' : 'N', '신규신청'
    ]);
    return json_({ status: 'success', message: '예약 신청이 저장되었습니다.' });
  } catch (err) {
    return json_({ status: 'error', message: String(err.message || err) });
  }
}
function safe_(v) { let s = String(v ?? ''); if (/^[=+\-@]/.test(s)) s = "'" + s; return s; }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
