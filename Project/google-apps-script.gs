function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('지원자') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('지원자');
  const data = JSON.parse(e.postData.contents || '{}');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['접수일', '이름', '연락처', '생년월일', '지원분야', '상담내용', '개인정보동의', '마케팅동의']);
  }

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.birth || '',
    data.category || '',
    data.message || '',
    data.privacy ? 'Y' : 'N',
    data.marketing ? 'Y' : 'N'
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
