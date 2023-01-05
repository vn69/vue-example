<template>
  <div class="container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="name" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="City" prop="city">
        <el-select
          @visible-change="visibleCityInput"
          @change="selectCity"
          class="w-100"
          :filter-method="searchCity"
          filterable
          value-key="code"
          v-model="ruleForm.city"
          placeholder="Select"
        >
          <el-option v-for="item in listCityFilter" :key="item.code" :label="item.name" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="District" prop="district">
        <el-select
          ref="refSelectDistrict"
          @visible-change="visibleDistrictInput"
          @change="selectDistrict"
          class="w-100"
          :filter-method="searchDistrict"
          filterable
          value-key="code"
          v-model="ruleForm.district"
          placeholder="Select"
        >
          <el-option v-for="item in listDistrictFilter" :key="item.code" :label="item.name" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ward" prop="ward">
        <el-select
          ref="refSelectWard"
          @visible-change="visibleWardInput"
          class="w-100"
          :filter-method="searchWard"
          filterable
          value-key="code"
          v-model="ruleForm.ward"
          placeholder="Select"
        >
          <el-option v-for="item in listWardFilter" :key="item.code" :label="item.name" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getListCity, getListDistrict, getListWard } from "../utils/address/index.js";
import { removeVietnameseTones } from "../utils/function.js";
import _ from "lodash";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Vui lòng nhập tuổi"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Tuổi phải ở dạng số"));
        } else {
          if (value < 18) {
            callback(new Error("Phải lớn hơn 18 tủi"));
          } else if (value > 80) {
            callback(new Error("Quá tuổi rồi"));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu"));
      } else if (value.length < 8) {
        callback(new Error("Phải có ít nhất 8 kí tự"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập lại mật khẩu"));
      } else if (value.length < 8) {
        callback(new Error("Phải có ít nhất 8 kí tự"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Nhập lại mật khẩu không chính xác!"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập tên người dùng"));
      } else if (value.length < 8) {
        callback(new Error("Phải có ít nhất 8 kí tự"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        age: "",
        city: null,
        district: null,
        ward: null,
      },
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        city: [{ required: true, message: "Chọn Tỉnh/TP", trigger: "change" }],
        district: [{ required: true, message: "Chọn Quận, Huyện", trigger: "change" }],
        ward: [{ required: true, message: "Chọn Xã, Phường", trigger: "change" }],
      },
      listCity: [],
      listCityFilter: [],
      listDistrict: [],
      listDistrictFilter: [],
      listWard: [],
      listWardFilter: [],
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    async getAddress() {
      this.listCity = await getListCity();
      this.listCityFilter = _.cloneDeep(this.listCity);
    },
    // city
    visibleCityInput(isShow) {
      if (isShow) {
        this.listCityFilter = _.cloneDeep(this.listCity);
      }
    },
    searchCity(query) {
      const textSearch = removeVietnameseTones(query.trim().toLocaleLowerCase());
      if (textSearch) {
        this.listCityFilter = this.listCity.filter((item) => item.textSearch.includes(textSearch));
      } else {
        this.listCityFilter = _.cloneDeep(this.listCity);
      }
    },
    selectCity(city) {
      this.resetDistrict();
      this.resetWard();
      this.listDistrict = getListDistrict(city.code);
      this.listDistrictFilter = _.cloneDeep(this.listDistrict);
      this.$refs.refSelectDistrict.focus();
    },

    // district
    visibleDistrictInput(isShow) {
      if (isShow) {
        this.listDistrictFilter = _.cloneDeep(this.listDistrict);
      }
    },
    searchDistrict(query) {
      const textSearch = removeVietnameseTones(query.trim().toLocaleLowerCase());
      if (textSearch) {
        this.listDistrictFilter = this.listDistrict.filter((item) => item.textSearch.includes(textSearch));
      } else {
        this.listDistrictFilter = _.cloneDeep(this.listDistrict);
      }
    },
    selectDistrict(district) {
      this.resetWard();
      this.listWard = getListWard(district.code);
      this.listWardFilter = _.cloneDeep(this.listWard);
      this.$refs.refSelectWard.focus();
    },

    // ward
    visibleWardInput(isShow) {
      if (isShow) {
        this.listWardFilter = _.cloneDeep(this.listWard);
      }
    },
    searchWard(query) {
      const textSearch = removeVietnameseTones(query.trim().toLocaleLowerCase());
      if (textSearch) {
        this.listWardFilter = this.listWard.filter((item) => item.textSearch.includes(textSearch));
      } else {
        this.listWardFilter = _.cloneDeep(this.listWard);
      }
    },

    resetDistrict() {
      this.listDistrict = [];
      this.listDistrictFilter = [];
      this.ruleForm.district = null;
    },
    resetWard() {
      this.listWard = [];
      this.listWardFilter = [];
      this.ruleForm.ward = null;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("ok " + JSON.stringify(this.ruleForm));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  width: 50%;
}
</style>
