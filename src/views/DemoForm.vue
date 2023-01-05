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
        <el-select value-key="code" v-model="value" placeholder="Select">
          <el-option
            v-for="item in listCity"
            :key="item.code"
            :label="item.label"
            :value="item.name">
          </el-option>
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
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        city: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
      },
      listCity: [],
    };
  },
  created() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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
