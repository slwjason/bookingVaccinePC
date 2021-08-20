<template>
  <div class="bg">
    <div class="main">
        <div class="title">
          <p>疫苗预约平台</p>
        </div>
        <div class="loginForm">
          <el-card>
            <el-form class="login-container">
              <el-form-item class="inp">
                <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
                <img src="../../static/icons/用户(1).png" class="zh" alt="" />
              </el-form-item>
              <el-form-item class="inp">
                <el-input
                  placeholder="请输入密码"

                  v-model="loginForm.password"
                  show-password
                ></el-input>
                <img src="../../static/icons/密码.png" class="mm" alt="" />
              </el-form-item>
              <el-form-item class="login">
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
              <el-form-item class="register" >
                <span  @click="register" > 注册</span></el-form-item>
            </el-form>
          </el-card>

        </div>


    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm:{
        account: "",
        password: "",
      },

    };
  },

  methods:{
    login () {
      var _this = this
      // console.log(this.$store.state)
      this.$axios
        .post('/hospital/login', {
          account: _this.loginForm.account,
          password: _this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('login', successResponse.data.result[0])
            this.$router.replace('/index')
            // _this.$store.commit('login', successResponse.data.result[0])
          }
          else{
            _this.$message.error('账号或密码输入错误')


          }
        })

        // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
    register(){
      this.$router.push('/register')
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
  margin-top: 9%;
}
.title p {
  font-size: 26px;
  color: #5a9bc6;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.loginForm .inp {
  margin-bottom: 20px;
}
.loginForm {
  margin: 0 auto;
  width: 448px;
}
.loginForm .el-input__inner {
  background-color: #fff;
  color: #2c3e50;
  height: 50px;
  padding-left: 50px;
}
.loginForm .el-input__inner:focus {
  border-color: #5a9bc6;
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
