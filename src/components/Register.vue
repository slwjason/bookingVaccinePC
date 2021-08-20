<template>
  <div>
    <div class="bg">
      <div class="title">
        <p>疫苗预约平台注册</p>
      </div>
      <div class="registerForm">
        <el-card>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                type="text"
                placeholder="请输入账号"
                v-model="ruleForm.account"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="name">
              <el-input
                type="text"
                placeholder="请输入单位"
                v-model="ruleForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input
                type="text"
                placeholder="请输入地址"
                v-model="ruleForm.address"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input
                type="text"
                placeholder="请输入电话"
                v-model="ruleForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入单位"));
      } else {

        callback();
      }
    };
    var validateAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入地址"));
      } else {

        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话号码"));
      } else {

        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        account: "",
        name: "",
        phone: "",
        address: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('hospital/register',{
              account:this.ruleForm.account,
              name: this.ruleForm.name,
              password: this.ruleForm.password,
              address:this.ruleForm.address,
              phone:this.ruleForm.phone
            })
            .then(successResponse =>{
              if(successResponse.data.code===200){
                this.$message.success('恭喜！注册成功。')
                //注册成功重新登录
                this.$router.replace('/login')
              }
            })
            // eslint-disable-next-line no-unused-vars
            .catch(failResponse=>{

            })
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
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;

  }
  .title {
    margin-top: 2%;
  }
  .title p {
    font-size: 26px;
    color: #5a9bc6;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .registerForm .inp {
    margin-bottom: 20px;
  }
  .registerForm {
    margin: 0 auto;
    width: 500px;
  }
  .registerForm .el-input__inner {
    background-color: #fff;
    color: #2c3e50;
    height: 50px;
    padding-left: 50px;
  }
  .registerForm .el-input__inner:focus {
    border-color: #5a9bc6;
  }
  .registerForm .el-input__inner {
    background-color: #fff;
    color: #2c3e50;
    height: 50px;
    padding-left: 10px;
  }
  .inp {
    position: relative;
  }
  .inp .zh {
    position: absolute;
    top: 16px;
    left: 14px;
    width: 16px;
    height: 16px;
  }
  .inp .mm {
    position: absolute;
    top: 15px;
    left: 13px;
    width: 19px;
    height: 19px;
  }
  .login .el-button--primary {
    width: 100%;
  }
  .register {
    margin-top: 10px;
  }
  .register span {
    text-decoration: none;
    color: rgb(29, 101, 150);
    cursor: pointer;
  }
</style>
