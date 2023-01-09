export function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

export function convertToRawString(string) {
  if (string) {
    const text = string.toString();
    return removeVietnameseTones(text.toLowerCase());
  } else return "";
}

export function saveLocalStore(name, data) {
  if (name) {
    localStorage.setItem(name, JSON.stringify(data));
  }
}

export function getLocalStore(name) {
  if (name) return JSON.parse(localStorage.getItem(name));
}

export function getListSuggestMoney(money) {
  const listMoney = [];
  if (money) {
    let num = Math.ceil(money / 1000);
    if (num) {
      listMoney.push(num * 1000);
      num++
      listMoney.push(num * 1000);
      while (lastDigit(num) != 0) {
        num = getNextMoney(num)
        listMoney.push(num * 1000);
      }
      num = num/10
      while (lastDigit(num) != 0) {
        num = getNextMoney(num)
        listMoney.push(num * 10000);
      }
      num = num/10
      while (lastDigit(num) != 0 && lastDigit(num) != 5  ) {
        num = getNextMoney(num)
        listMoney.push(num * 100000);
      }
      
    }
  }
  return listMoney;
}
function lastDigit(n) {
  return n % 10;
}

function getNextMoney(num) {
  switch (lastDigit(num)) {
    case 0:
      return num+10
    case 1:
      return num+1
    case 2:
      return num+3
    case 3:
      return num+2
    case 4:
      return num+1
    case 5:
      return num+5
    case 6:
      return num+4
    case 7:
      return num+3
    case 8:
      return num+2
    case 9:
      return num+1
    default:
      return num+10
  }
}
