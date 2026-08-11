/**
 * Google Apps Script
 * 1) 새 Google Spreadsheet 생성
 * 2) 확장 프로그램 > Apps Script
 * 3) 이 코드를 붙여넣고 SHEET_NAME 확인
 * 4) 배포 > 새 배포 > 웹 앱
 *    - 실행 사용자: 나
 *    - 액세스 권한: 모든 사용자
 * 5) 생성된 /exec URL을 React의 REACT_APP_GOOGLE_SCRIPT_URL에 설정
 */
const SHEET_NAME = 'Leads';

function doPost(e) {
  const sheet = getSheet_();
  const p = e.parameter || {};

  sheet.appendRow([
    new Date(),
    p.type || '',
    p.name || '',
    p.email || '',
    p.phone || '',
    p.consent || '',
    p.source || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['신청일시', '유형', '이름', '이메일', '전화번호', '동의', '유입URL']);
  }
  return sheet;
}
