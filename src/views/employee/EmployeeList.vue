<template>
  <div>
    
    <div class="page-title">
      <div class="page-left">Danh sách nhân viên</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default btn-add" @click="btnAddOnClick()">
          Thêm nhân viên
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 260px"
        placeholder="Tìm kiếm theo mã, tên nhân viên"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Tìm kiếm theo mã, tên nhân viên'"
      />
      <select
        id="FilterDepartment"
        v-model="filterDepartmentName"
        @click="findDepartmentName(filterDepartmentName)"
      >
        <option value="0">Tất cả phòng ban</option>
        <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">Phòng Marketting</option>
        <option value="17120d02-6ab5-3e43-18cb-66948daf6128">Phòng đào tạo</option>
        <option value="469b3ece-744a-45d5-957d-e8c757976496">Phòng Nhân sự</option>
        <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">Phòng Công nghệ</option>
      </select>
      <select
        id="FilterPosition"
        v-model="filterPositionName"
        @click="findPositionName(filterPositionName)"
      >
        <option value="0">Tất cả vị trí</option>
        <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">Giám đốc</option>
        <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">Thu ngân</option>
        <option value="148ed882-32b8-218e-9c20-39c2f00615e8">Nhân viên marketting</option>
      </select>
      <button class="btn-delete" @click="btnDeleteClick()"></button>
      <button class="btn-refresh" @click="refresh_data()"></button>
    </div>
    <div class="grid">
      <table id="tblListCustomer" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="trOnDbClick(employee.EmployeeId)"
            @click="trOnClick(employee.EmployeeId, employee.FullName)"
          >
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ formatDateDDMMYYYYnew(employee.DateOfBirth) }}</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td>{{ employee.Salary }}</td>
            <td>
              <p v-if="employee.WorkStatus == 0">Đã nghỉ việc</p>
              <p v-else-if="employee.WorkStatus == 1">Đang làm việc</p>
              <p v-else-if="employee.WorkStatus == 2">Đang thử việc</p>
              <p v-else>Đang nghỉ hưu</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">{{ employeeLength }}</b> nhân viên
        </div>
        <div data-v-a72348a4="" class="paging-option">
          <div data-v-a72348a4="" class="btn-select-page m-btn-firstpage"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-prev-page"></div>
          <div data-v-a72348a4="" class="m-btn-list-page">
            <button data-v-a72348a4="" class="btn-pagenumber btn-pagenumber-selected">1</button>
            <button data-v-a72348a4="" class="btn-pagenumber">2</button>
            <button data-v-a72348a4="" class="btn-pagenumber">3</button>
            <button data-v-a72348a4="" class="btn-pagenumber">4</button>
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-next-page"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-lastpage"></div>
        </div>
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">Tất cả nhân viên trong trang</b>
        </div>
      </div>
    </div>
    <EmployeeDetail
      :isShow="isShowDialogDetail"
      @hideDialog="hideDialog()"
      :employee="selectedEmployee"
      :formMode="dialogFormMode"
      :newEmployee="dialogNewEmployee"
    />
  </div>
</template>

<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";

export default {
  components: {
    EmployeeDetail,
  },
  created() {
    console.log("bac");
    //Load dữ liệu từ API
    axios
      .get("http://api.manhnv.net/v1/employees")
      .then((res) => {
          console.log(res.data);
        for(let i in res.data)
        {
            if(res.data[i].Salary != null)
                res.data[i].Salary = this.formatMoney(res.data[i].Salary);
        }
        this.employees = res.data;
        this.employeeLength = res.data.length;
      })
      .catch((res) => {
        console.log(res);
      });
    //Lọc tất cả theo phòng ban
    this.filterDepartmentName = "0";
    //Lọc tất cả theo vị trí
    this.filterPositionName = "0";
  },

  props: [],

  methods: {
    loadData() {
      //Load dữ liệu
      axios
        .get("http://api.manhnv.net/v1/employees")
        .then((res) => {
          for(let i in res.data)
          {
            if(res.data[i].Salary != null)
                res.data[i].Salary = this.formatMoney(res.data[i].Salary);
          } 
          this.employees = res.data;
          this.employeeLength = res.data.length;
        })
        .catch((res) => {
          console.log(res);
        });
    },

    refresh_data() {
      //Click button refresh
      this.loadData();
    },

    btnAddOnClick() {
      //Click button add
      this.selectedEmployee = {};
      //Lấy mã nhân viên mới nhất
      axios
        .get("http://api.manhnv.net/v1/Employees/NewEmployeeCode")
        .then((res) => {
          this.dialogNewEmployee = res.data;
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
        //Hiển thị dialog
      this.isShowDialogDetail = true;
      //Đổi formMode thành add
      this.dialogFormMode = "add";
    },

    hideDialog() {
      //Ẩn dialog
      this.isShowDialogDetail = false;
      this.loadData();
    },

    formatDateDDMMYYYYnew(date) {
      //Format lại date từ string 
      var newDate = new Date(date);
      var dateString = newDate.getDate();
      var monthString = newDate.getMonth() + 1;
      var year = newDate.getFullYear();
      var s = "";
      var t = "";
      if (dateString < 10) {
        s = "0" + dateString.toString();
      } else {
        s = dateString.toString();
      }
      if (monthString < 10) {
        t = "0" + monthString.toString();
      } else {
        t = monthString.toString();
      }
      return `${s}/${t}/${year}`;
    },

    formatMoney(money) {
      //Đổi tiền về dạng xxx.xxx.xxx.xxx.xxx
        let val = (money / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatMoneyVND(money) {
      //Đổi tiền về dạng xxx.xxx.xxx.xxx.xxx có đuôi VND
        let val = (money / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    },

    trOnClick(EmployeeId, EmployeeFullName) {
      //Click vào 1 hàng để lấy employeeId
      this.selectedEmployeeId = EmployeeId;
      this.selectedEmployeeFullName = EmployeeFullName;
    },

    findDepartmentName(filterDepartmentName) {
        if (filterDepartmentName != "0") {
          axios
            .get("http://api.manhnv.net/v1/employees")
            .then((res) => {
              var listValidEmpoyee = [];
              for (let index in res.data) {
                //Nếu data khớp
                if (res.data[index].DepartmentId == filterDepartmentName) {
                  //Nếu đang đồng thời lọc vị trí
                  if (this.filterPositionName != "0") {
                    //Lọc theo vị trí
                    if (res.data[index].PositionId == this.filterPositionName) {
                      listValidEmpoyee.push(res.data[index]);
                    }
                  } else {
                    listValidEmpoyee.push(res.data[index]);
                  }
                }
              }
              this.employees = listValidEmpoyee;
            })
            .catch((res) => {
              console.log(res);
            });
        }
        //Hiển thị tất cả
        else {
          this.loadData();
        }
    },

    findPositionName(filterPositionName) {
        if (filterPositionName != "0") {
          axios
            .get("http://api.manhnv.net/v1/employees")
            .then((res) => {
              var listValidEmpoyee = [];
              for (let index in res.data) {
                //Nếu data khớp
                if (res.data[index].PositionId == filterPositionName) {
                  //Nếu đang đồng thời lọc phòng ban
                  if (this.filterDepartmentName != "0") {
                    //Lọc theo phòng ban
                    if (
                      res.data[index].DepartmentId == this.filterDepartmentName
                    ) {
                      listValidEmpoyee.push(res.data[index]);
                    }
                  } else {
                    listValidEmpoyee.push(res.data[index]);
                  }
                }
              }
              this.employees = listValidEmpoyee;
            })
            .catch((res) => {
              console.log(res);
            });
        }
        //Hiển thị tất cả
        else {
          this.loadData();
        }
    },

    btnDeleteClick() {
      //Alert thông báo xóa nhân viên
      var r = confirm(
        "Bạn chắc chắn muốn xóa nhân viên " + this.selectedEmployeeFullName
      );
      //Có
      if (r == true) {
        axios
          .delete(
            "http://api.manhnv.net/v1/employees/" + this.selectedEmployeeId
          )
          .then((res) => {
            console.log(res);
            this.loadData();
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },

    trOnDbClick(EmployeeId) {
      //Hiện dialog
      this.isShowDialogDetail = true;
      //Đổi formMode thành edit
      this.dialogFormMode = "edit";
      axios
        .get("http://api.manhnv.net/v1/employees/" + EmployeeId)
        .then((res) => {
          this.selectedEmployee = res.data;
          //Chuyển date về dạng yyyymmdd
          const dateOfBirth = new Date(this.selectedEmployee.DateOfBirth); //Ngày sinh
          this.selectedEmployee.DateOfBirth =
            dateOfBirth.getFullYear().toString() +
            "-" +
            (dateOfBirth.getMonth() + 1 < 10 ? "0" : "") +
            (dateOfBirth.getMonth() + 1).toString() +
            "-" +
            (dateOfBirth.getDate() < 10 ? "0" : "") +
            dateOfBirth.getDate().toString();

          const identityDate = new Date(this.selectedEmployee.IdentityDate); //Ngày cấp cmnd
          this.selectedEmployee.IdentityDate =
            identityDate.getFullYear().toString() +
            "-" +
            (identityDate.getMonth() + 1 < 10 ? "0" : "") +
            (identityDate.getMonth() + 1).toString() +
            "-" +
            (identityDate.getDate() < 10 ? "0" : "") +
            identityDate.getDate().toString();

          const joinDate = new Date(this.selectedEmployee.JoinDate); //Ngày tham gia
          this.selectedEmployee.JoinDate =
            joinDate.getFullYear().toString() +
            "-" +
            (joinDate.getMonth() + 1 < 10 ? "0" : "") +
            (joinDate.getMonth() + 1).toString() +
            "-" +
            (joinDate.getDate() < 10 ? "0" : "") +
            joinDate.getDate().toString();
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },

  data() {
    return {
      isShowDialogDetail: false,
      selectedEmployee: {},
      dialogFormMode: "add",
      dialogNewEmployee: "",
      employeeLength: 0,
      selectedEmployeeId: "",
      selectedEmployeeFullName: "",
      filterDepartmentName: "",
      filterPositionName: "",
      cntDepartment: 0,
      cntPosition: 0,
      employees: [],
    };
  },

  watch: {},
};
</script>

<style scoped>
#FilterDepartment {
  position: absolute;
  height: 40px;
  width: 200px;
  left: 304px;
  top: 81px;
  border: 1px solid #bbbbbb;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

#FilterPosition {
  position: absolute;
  height: 40px;
  width: 200px;
  left: 524px;
  top: 81px;
  border: 1px solid #bbbbbb;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.page-title {
  height: 40px;
  display: flex;
  align-items: center;
}

.page-title .page-right{
    position:  absolute;
    right: 24px;
}

.page-title .page-left{
    font-size: 24px;
    font-weight:bold;
}

.toolbar{
    margin-top: 16px;
    display: flex;
    width: 100%;
    align-items: center;
    height: 42px;
}

.grid{
    position: absolute;
    right:  24px;
    left: 24px;
    bottom: 60px;
    top: 128px;
    overflow-y: auto;
}

.paging{
    position: absolute;
    bottom:0;
    height: 60px;
    left: 24px;
    right: 24px;
}

</style>