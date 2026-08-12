// 데이터가 저장될 시트 이름
var sheetName = 'Sheet1';

// 스크립트 속성
var scriptProp = PropertiesService.getScriptProperties();


// ========================================
// 최초 1회 실행
// ========================================
function initialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (!activeSpreadsheet) {
    throw new Error('연결된 Google 스프레드시트를 찾을 수 없습니다.');
  }

  scriptProp.setProperty(
    'key',
    activeSpreadsheet.getId()
  );

  Logger.log('Spreadsheet ID 저장 완료: ' + activeSpreadsheet.getId());
}


// ========================================
// 브라우저에서 링크 확인용
// ========================================
function doGet() {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        result: 'success',
        message: 'Google Apps Script Web App is working.'
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}


// ========================================
// POST 데이터 저장
// ========================================
function doPost(e) {

  var lock = LockService.getScriptLock();

  try {

    // 최대 10초 대기
    lock.waitLock(10000);

    // 저장된 Spreadsheet ID 가져오기
    var spreadsheetId = scriptProp.getProperty('key');

    if (!spreadsheetId) {
      throw new Error(
        'Spreadsheet ID가 설정되지 않았습니다. initialSetup()을 먼저 실행하세요.'
      );
    }


    // Spreadsheet 열기
    var doc = SpreadsheetApp.openById(spreadsheetId);

    // Sheet 가져오기
    var sheet = doc.getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(
        '"' + sheetName + '" 시트를 찾을 수 없습니다.'
      );
    }


    // 첫 번째 행 Header 가져오기
    var lastColumn = sheet.getLastColumn();

    if (lastColumn === 0) {
      throw new Error(
        'Sheet1 첫 번째 행에 헤더를 입력해주세요.'
      );
    }

    var headers = sheet
      .getRange(1, 1, 1, lastColumn)
      .getValues()[0];


    // 다음 저장 위치
    var nextRow = sheet.getLastRow() + 1;


    // POST 데이터 생성
    var newRow = headers.map(function(header) {

      // 헤더 앞뒤 공백 제거
      header = String(header).trim();

      if (header.toLowerCase() === 'timestamp') {
        return new Date();
      }

      return e && e.parameter
        ? (e.parameter[header] || '')
        : '';
    });


    // Spreadsheet 저장
    sheet
      .getRange(
        nextRow,
        1,
        1,
        newRow.length
      )
      .setValues([newRow]);


    // 성공 응답
    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: 'success',
          row: nextRow
        })
      )
      .setMimeType(ContentService.MimeType.JSON);


  } catch (error) {

    // 오류 응답
    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: 'error',
          error: error.message
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } finally {

    // Lock이 잡혀있을 경우에만 해제
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}
