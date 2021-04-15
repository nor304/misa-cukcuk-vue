<template>
  <div
    id="dlgEmployeeDetail"
    class="dialog"
    :class="{ 'dialog-hide': !isShow }"
  >

    <div class="model"></div>
    <div class="dialog-content">
      <div class="edialog-header">
        <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
        <div class="dialog-close-button" @click="btnCloseOnClick()">
          &#x2715;
        </div>
      </div>
      <div class="dialog-body">
        <div>
          <img
            src="../../assets/img/default-avatar.jpg"
            width="110"
            height="110"
            class="personal-image"
          />
          <label class="text-under-pimg1">(Vui lòng chọn ảnh có</label>
          <label class="text-under-pimg2">định dạng</label>
          <label class="text-under-pimg3">.jpg .jpeg .png .gif)</label>
        </div>
        <div class="em-row-tittle">
          <p><b>A. THÔNG TIN CHUNG:</b></p>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Mã nhân viên(<span style="color: red">*</span>)</label>
            <div v-if="formMode === 'add'">
              <input
                id="txtEmployeeCode"
                type="text"
                v-model="this.newEmployee"
                :class="{ 'error-hide': !inputEmployeeCode }"
              />
            </div>
            <div v-else>
              <input
                id="txtEmployeeCode"
                type="text"
                v-model="employee.EmployeeCode"
                :class="{ 'error-hide': !inputEmployeeCode }"
              />
            </div>
          </div>
          <div class="em-col">
            <label>Họ và tên(<span style="color: red">*</span>)</label>
            <input
              id="txtFullName"
              type="text"
              v-model="employee.FullName"
              :class="{ 'error-hide': !inputFullName }"
            />
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Ngày sinh</label>
            <input
              id="DateOfBirth"
              type="date"
              v-model="employee.DateOfBirth"
            />
          </div>
          <div class="em-col">
            <label>Giới tính</label>
            <select id="Gender" v-model="employee.Gender">
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
              <option value="2">Không xác định</option>
            </select>
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Số CMTND/ Căn cước(<span style="color: red">*</span>)</label>
            <input
              id="txtIdentityNumber"
              type="text"
              v-model="employee.IdentityNumber"
              :class="{ 'error-hide': !inputIdentityNumber }"
            />
          </div>
          <div class="em-col">
            <label>Ngày cấp</label>
            <input
              id="txtIdentityDate"
              type="date"
              v-model="employee.IdentityDate"
            />
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Nơi cấp</label>
            <input
              id="txtIdentityPlace"
              type="text"
              v-model="employee.IdentityPlace"
            />
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Email(<span style="color: red">*</span>)</label>
            <input
              id="txtEmail"
              type="text"
              v-model="employee.Email"
              :class="{ 'error-hide': !inputEmail }"
            />
          </div>
          <div class="em-col">
            <label>Số điện thoại(<span style="color: red">*</span>)</label>
            <input
              id="txtPhoneNumber"
              type="text"
              v-model="employee.PhoneNumber"
              :class="{ 'error-hide': !inputPhoneNumber }"
            />
          </div>
        </div>
        <div class="em-row-tittle">
          <p><b>B. THÔNG TIN CÔNG VIỆC:</b></p>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Vị trí</label>
            <select v-model="employee.PositionId">
              <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">Giám đốc</option>
              <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">Thu ngân</option>
              <option value="148ed882-32b8-218e-9c20-39c2f00615e8">Nhân viên marketting</option>
            </select>
          </div>
          <div class="em-col">
            <label>Phòng ban</label>
            <select v-model="employee.DepartmentId">
              <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">Phòng Marketting</option>
              <option value="17120d02-6ab5-3e43-18cb-66948daf6128">Phòng đào tạo</option>
              <option value="469b3ece-744a-45d5-957d-e8c757976496">Phòng Nhân sự</option>
              <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">Phòng Công nghệ</option>
            </select>
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Mã số thuế cá nhân</label>
            <input
              id="txtPersonalTaxCode"
              type="text"
              v-model="employee.PersonalTaxCode"
            />
          </div>
          <div class="em-col">
            <label>Mức lương cơ bản</label>
            <input id="txtSalary" type="text" v-model="employee.Salary" class="text-align-right"/>
          </div>
        </div>
        <div class="em-row">
          <div class="em-col">
            <label>Ngày gia nhập công ty</label>
            <input id="JoinDate" type="date" v-model="employee.JoinDate" />
          </div>
          <div class="em-col">
            <label>Tình trạng công việc</label>
            <select v-model="employee.WorkStatus">
              <option value="0">Đã nghỉ việc</option>
              <option value="1">Đang làm việc</option>
              <option value="2">Đang thử việc</option>
              <option value="3">Đã nghỉ hưu</option>
            </select>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button id="btnCancel" @click="btnCloseOnClick()">Hủy</button>
        <button id="btnSave" @click="btnSaveOnClick()">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: Object,
      default: null,
    },
    formMode: {
      type: String,
      default: "add",
    },
    newEmployee: {
      type: String,
      default: "",
    },
  },

  methods: {
    btnCloseOnClick() {
      this.$emit("hideDialog");
      //Trả tất cả giá trị về ban đầu
      this.inputEmployeeCode = true;
      this.inputFullName = true;
      this.inputIdentityNumber = true;
      this.inputEmail = true;
      this.inputPhoneNumber = true;
    },

    check_valid_email(s)
    {
      //Kiểm tra email có hợp lệ
        let index1 = 0, index2 = 0, cnt = 0;
        for(let i in s)
        {
            if(s[i] == '@')
                index1 = i;
            if(s[i] == '.')
            {
                cnt++;
                if(cnt > 1)
                {
                  //Kiểm tra 2 dấu . kề nhau
                  if(i - index2 == 1)
                    return false;
                }
                index2 = i;
            }
            //Kiểm tra kí tự hợp lệ
            if((s[i] >= '0' && s[i] <= '9') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z') || s[i] == '@' || s[i] == '.')
            {
                //OK
            }
            else
            {
                return false;
            }
        }
        //Kiểm tra '@' không đứng đầu input, giữa '@' và '.' phải có kí tự, '.' không đứng cuối input
        if((index1 > 0) && (index2 - index1 > 1) && (index2 != s.length - 1))
            return true;
        return false;
    },
    
    check_valid_information() {
      //Kiểm tra tất cả thông tin bắt buộc
      if (this.employee.EmployeeCode == "" || this.employee.EmployeeCode == null) {
        this.inputEmployeeCode = false;
      } else {
        this.inputEmployeeCode = true;
      }
      if (this.employee.FullName == "" || this.employee.FullName == null) {
        this.inputFullName = false;
      } else {
        this.inputFullName = true;
      }
      if (this.employee.IdentityNumber == "" || this.employee.IdentityNumber == null) {
        this.inputIdentityNumber = false;
      } else {
        this.inputIdentityNumber = true;
      }
      if (this.employee.Email == "" || this.employee.Email == null || this.check_valid_email(this.employee.Email) == false) {
        this.inputEmail = false;
      } else {
        this.inputEmail = true;
      }
      if (this.employee.PhoneNumber == "" || this.employee.PhoneNumber == null) {
        this.inputPhoneNumber = false;
      } else {
        this.inputPhoneNumber = true;
      }
      //Nếu chỉ 1 thông tin sai
      if (this.inputEmployeeCode == false || this.inputFullName == false || this.inputIdentityNumber == false || this.inputEmail == false || this.inputPhoneNumber == false)
        return false;
      else return true;
    },

    btnSaveOnClick() {
      //Nếu formMode là add thì nhập sẵn employeeCode
      if (this.formMode == "add") this.employee.EmployeeCode = this.newEmployee;
      //Nếu thông tin chưa hợp lệ
      if (this.check_valid_information() == false) {
        alert("Thông tin chưa hợp lệ");
        console.log(123);
        return;
      }
      //Thêm mới nhân viên
      if (this.formMode == "add") {
        this.employee.EmployeeCode = this.newEmployee;
        axios
          .post("http://api.manhnv.net/v1/employees", this.employee)
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
          })
          .catch((res) => {
            console.log(res);
          });
      } // Chỉnh sửa thông tin
      else {
        axios
          .put(
            "http://api.manhnv.net/v1/employees/" + this.employee.EmployeeId,
            this.employee
          )
          .then((res) => {
            console.log(res);
            this.$emit("hideDialog");
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },
  },

  data() {
    return {
      inputEmployeeCode: true,
      inputFullName: true,
      inputIdentityNumber: true,
      inputEmail: true,
      inputPhoneNumber: true,
    };
  },
};
</script>

<style scoped>
.personal-image {
  border-radius: 50%;
  border: 1px solid gray;
  position: absolute;
  left: 8px;
  bottom: 480px;
}

.text-under-pimg1 {
  position: absolute;
  top: 190px;
  left: 6px;
  font-size: 12px;
}

.text-under-pimg2 {
  position: absolute;
  top: 210px;
  left: 36px;
  font-size: 12px;
}

.text-under-pimg3 {
  position: absolute;
  top: 230px;
  left: 16px;
  font-size: 12px;
}

.dialog .dialog-content {
  padding: 24px;
  position: absolute;
  top: 42%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 600px;
  border-radius: 4px;
  background-color: #ffffff;
  padding-top: 40px;
}

.dialog .dialog-title {
  font-size: 16px;
  font-weight: bold;
  top: 20px;
  left: 10px;
  position: absolute;
}

.em-col {
  right: 90px;
  width: 50%;
  float: left;
  padding: 0 3px;
  box-sizing: border-box;
}

.em-row {
  width: 80%;
  display: flex;
  margin-top: 6px;
  left: 100px;
  height: 58px;
  position: relative;
}

.em-row-tittle {
  width: 80%;
  display: flex;
  left: 100px;
  height: 30px;
  position: relative;
}

.em-row label {
  display: block;
}

.em-row input, select {
  margin-top: 2px;
}

input[type="text"], input[type="date"] {
  height: 32px;
  width: 100%;
  border: 1px solid #bbbbbb;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

input[type="text"]:hover {
  border-color: #019160;
}

select {
  height: 32px;
}

#btnSave {
  display: inline-block;
  outline: none;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  height: 34px;
  line-height: 34px;
  background-color: #019160;
  border-radius: 4px;
  font-size: 14px;
  color: #ffffff;
  font-style: normal;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 16px;
}

  #btnSave:hover {
    background-color: #2fbe8e;
  }

  #btnSave:active {
    background-color: #01b075;
  }

#btnCancel {
  display: inline-block;
  outline: none;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  height: 34px;
  line-height: 34px;
  background-color:#b3acac;
  border-radius: 4px;
  font-size: 14px;
  color: #ffffff;
  font-style: normal;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 90px;
}

  #btnCancel:hover {
    background-color: #e97c7c;
  }

  #btnCancel:active {
    background-color: #eb5c5c;
  }

/*Viền đỏ tại ô nhập sai thông tin*/
.error-hide {
  border-color: red !important;
}
</style>