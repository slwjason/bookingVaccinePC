<template>
  <div>
    <el-card style="width: 100%;margin: 0 auto">
      <div style="margin: 10px;background: #5a9bc6;color: #fff">接种完成个人信息填写</div>
      <el-form :model="addForm" :rules="rules" label-position="right"
               label-width="130px" ref="addForm">
        <el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item prop="idCard" label="身份证号">
                <el-input type="text" v-model="addForm.idCard"
                          auto-complete="off" placeholder="请输入身份证号" @change="findArchives" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="20">
            <el-form-item prop="name" label="用户姓名">
              <el-input type="text" v-model="addForm.name" disabled
                        auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <el-form-item prop="phone" label="联系电话">
              <el-input type="text" v-model="addForm.phone" disabled
                        auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <el-form-item  label="年龄" prop="age">
              <el-input type="text" v-model="addForm.age" disabled
                        auto-complete="off" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <el-form-item  label="性别" prop="sex">
              <el-input type="text" v-model="addForm.sex" disabled
                        auto-complete="off" placeholder="请输入性别"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" >
            <el-form-item label="是否有不良反应" >
              <el-switch v-model="reaction"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="width: 80%">
          <el-button type="primary"  @click="submitForm('addForm')">提交</el-button>
          <el-button type="success" @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
    export default {
        name: "code",
        data(){
          return{
            addForm:{},
            reaction:false,//是否有不良反应
            rules:{
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
              ],

              idCard:[
                { required: true, validator: this.common.checkIdNum, trigger: 'blur' }
              ],
              phone:[
                { required: true, validator: this.common.checkPhone, trigger: 'blur' }
              ],
              sex:[
                { required: true, message: '请输入性别', trigger: 'blur' }
              ],
              age:[
                { required: true, validator: this.common.checkAge, trigger: 'blur' }
              ]
            }
          }
        },
      mounted() {

      },
      methods:{
        findArchives(){
          let that = this
          that.$axios
            .post('/archives/getArchivesByIdCard', {
                idCard:that.addForm.idCard
            })
            .then(res => {
              if (res.data.code === 200) {
                that.addForm = res.data.data[0]
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        submitForm(formName) {
          let that = this
          that.$refs[formName].validate((valid) => {
            if (valid) {
              if(that.addForm.fid==null ||that.addForm.fid==''||that.addForm.fid==undefined){
                that.$axios
                  .post('/first/addFirst', {
                    archives:that.addForm.id,
                    point:that.addForm.point,
                    hospital:that.addForm.hospital,
                    vaccine:that.addForm.vaccine,
                    reaction:that.reaction
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('填写成功')
                      that.clear()
                    }
                    else if(res.data.code == 'ER_DUP_ENTRY'){
                      that.$message.success('您已填写成功，不能重复填写哦')
                    }
                    else{
                      that.$message.success('填写失败')
                    }
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(failResponse => {

                  })
              }else{
                that.$axios
                  .post('/second/addSecond', {
                    archives:that.addForm.id,
                    point:that.addForm.point,
                    hospital:that.addForm.hospital,
                    vaccine:that.addForm.vaccine,
                    reaction:that.reaction
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('您已完成接种！祝您身体健康。')
                      that.clear()
                    }
                    else if(res.data.code == 'ER_DUP_ENTRY'){
                      that.$message.success('您已填写成功，不能重复填写哦')
                    }
                    else{
                      that.$message.success('填写失败')
                    }
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(failResponse => {

                  })
              }

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      },
    }
</script>

<style scoped>

</style>
