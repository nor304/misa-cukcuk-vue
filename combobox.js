const list = [
  { value: 0, text: "Nữ" },
  { value: 1, text: "Nam" },
  { value: 2, text: "Khác" },
];

const cbBox = $('.cb-autocomplete');
const dataListElement = cbBox.find('.datalist');
const combobox = cbBox.find('.cb');
let index = -1; //Thứ tự phần tử trong combobox
let selectedItem = null;

$(function () {
  
  //Lấy giá trị phần tử được chọn của combobox
  cbBox.getValue = function () {
      return selectedItem && selectedItem.value;
  }

  //Lấy text phần tử được chọn của combobox
  cbBox.getText = function () {
      return selectedItem && selectedItem.text;
  }

  //Lấy danh sách toggle của combobox.
  cbBox.getData = function () {
      return list;
  }

  //Nhập input vào combo box
  combobox.on('input', function (e) {
      e.preventDefault();
      let val = $(this).val();
      if (val === '') {
          cbBox.removeClass('error');
          cbBox.find('.cb').removeAttr('title');
      }
      let datalist = list.filter((item) => item.text.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
      if (datalist.length == 0) {
          cbBox.addClass('error');
          cbBox.find('.cb').attr('title', "Dữ liệu không tồn tại trong hệ thống.");
      }
      bindDataListToHtml(datalist, true);
      index = -1;
  });

  //Click chọn 1 item
  cbBox.on('mousedown', '.datalist li', function (e) {
      e.preventDefault();
      selectItemCombobox($(this));
  });

  //Click icon toggle
  cbBox.find('.icon').on('mousedown', function (e) {
      e.preventDefault();
      if (dataListElement.hasClass('hide')) {
          combobox.focus();
          bindDataListToHtml(list, false);
          index = -1;
      } else {
          dataListElement.addClass('hide');
      }
  });

  //Sự kiện lose focus
  cbBox.on('focusout', function (e) {
      e.preventDefault();
      dataListElement.addClass('hide');
  })

  //Sự kiện nhấn phím
  cbBox.on('keydown', function (e) {
      let keyCode = e.keyCode;
      let count = dataListElement.find('li').length;

      if (keyCode == 40) {
          //Mũi tên xuống
          e.preventDefault();
          if (index < count - 1) {
            dataListElement.find('li').eq(index).removeClass('hover');
            dataListElement.find('li').eq(index + 1).addClass('hover');
            index++;
          }

      } else if (keyCode == 38) {
          //Mũi tên lên
          e.preventDefault();
          if (index > 0) {
              dataListElement.find('li').eq(index).removeClass('hover');
              dataListElement.find('li').eq(index - 1).addClass('hover');
              index--;
          }
      } else if (keyCode == 13) {
          //Enter
          e.preventDefault();
          let _this = dataListElement.find('li.hover');
          selectItemCombobox(_this);
      }
  });

});


//Hàm bind data vào html cho danh sách combobox.
//@param {Array} datalist : danh sách hiện tại của combobox.
//@param {Boolean} isInput : Xác định đang nhập dữ liệu hay đang click vào icon toggle.
function bindDataListToHtml(datalist, isInput) {
  if (isInput) {
      selectedItem = null;
  }
  dataListElement.html('');
  datalist.forEach((item) => {
      var dataItem = $(`
          <li>
              <span class="item-icon"></span>
              <span class="item-text">${item.text}</span>
          </li>
      `);
      if (selectedItem && selectedItem.value == item.value) {
          dataItem.addClass('selected');
      }
      dataItem.data(item);
      dataItem.appendTo(dataListElement);
  });
  dataListElement.removeClass('hide');
}

//Hàm chọn một item trong danh sách của combobox.
//@param {Element} eleSelected : Item được chọn trong danh sách của combobox.
function selectItemCombobox(eleSelected) {
  let data = eleSelected.data();
  selectedItem = data;
  combobox.val(data.text);
  combobox.focus();
  dataListElement.addClass('hide');
}