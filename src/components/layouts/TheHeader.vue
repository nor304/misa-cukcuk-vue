<template>
  <div>
        <div id="header">
        <div>
            <select id="restaurants">
                <option>
                    Nhà hàng Biển Đông
                </option>
                <option>
                    Nhà hàng Biển Tây
                </option>
                <option>
                    Nhà hàng Biển Nam
                </option>
                <option>
                    Nhà hàng Biển Bắc
                </option>

            </select>
        </div>
        <div class="menu-navbar-header">
            <div id="ava"></div>
            <div id="name">Phan Bắc</div>
            <div id="option"></div>
        </div>
    </div>
    </div>
</template>
<style scoped>
#header {
  border: 1px solid #dedede;
  position: absolute;
  left: 200px;
  right: 0;
  height: 60px;
  top: 0;
}

#restaurants
{
    position: absolute;
    border: none;
    font-size: 20px;
    padding: 6px;
    outline: none;
    margin-top: 12px;
    margin-left: 20px;
    width: 18%;
    font-family: GoogleSans-Bold;
    background-size:contain;
}

#ava {
    background-image: url('../../assets/icon/avatar-default.png');
    background-size: contain;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size:contain;
    position: absolute;
    right: 150px;
    top: 10px;
    cursor: pointer;
}

#name {
    font-size: 20px;
    position: absolute;
    right: 50px;
    top: 19px;
    background-size:contain;
}

#option {
    background-image: url('../../assets/icon/option.png');
    background-size: contain;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    position: absolute;
    right: 16px;
    top: 20px;
    cursor: pointer;
    background-size:contain;
}
</style>