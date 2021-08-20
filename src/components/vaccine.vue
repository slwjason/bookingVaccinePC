<template>
  <div style="text-align: left">
    <el-dialog
      title="添加疫苗"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="50%">
      <el-form :model="addForm" :rules="rules" label-position="left"
               label-width="0px" ref="addForm">
        <el-row>
          <el-col :span="22">
            <el-form-item prop="name">
              <el-input type="text" v-model="addForm.name"
                        auto-complete="off" placeholder="疫苗名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" >
            <el-form-item prop="sum">
              <el-input type="text" v-model="addForm.sum"
                        auto-complete="off" placeholder="疫苗总数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" >
            <el-form-item prop="lot">
              <el-input type="text" v-model="addForm.lot"
                        auto-complete="off" placeholder="产品批号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" >
            <el-form-item prop="manufacturer">
              <el-input type="text" v-model="addForm.manufacturer"
                        auto-complete="off" placeholder="生产单位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="width: 100%">
          <el-button  style="width: 40%;background: #5a9bc6;border: none ;color: #fff" @click="submitForm('addForm')">提交</el-button>
          <el-button  style="width: 40%;background: #34bfa3;border: none ;color: #fff" @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <el-card style="margin: 18px 2%;width: 95%">
        <el-input id="input" placeholder="请输入关键词搜索"  v-model="selectObj" style="width: 20%;border-right:none;float:right">
          <el-button id="btnButton" slot="suffix" icon="el-icon-search" @click="finds" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
        </el-input>
       <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加疫苗</el-button>
    <el-table
      :data="vaccines"
      stripe
      :default-sort = "{prop: 'id', order: 'ascending'}"
      style="width: 100%"
      :max-height="tableHeight">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        v-if="false"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="疫苗"
        fit>
      </el-table-column>
      <el-table-column
        prop="sum"
        label="库存"
        fit>
      </el-table-column>
      <el-table-column
        prop="lot"
        label="批号"
        fit>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="manufacturer"
        label="生产商"
        fit>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="设置时间"
        fit>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            @click="editVaccine(scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="delVaccine(scope.row)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0 20px 0;float: left">
      <!--        <el-button>取消选择</el-button>-->
      <!--        <el-button>批量删除</el-button>-->
    </div>
       <div class="block" >
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="currentPage"
           :page-sizes="pageSizes"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total"
           :page-size="PageSize"
         >
         </el-pagination>
       </div>
  </el-card>
  </div>
</template>

<script>
    export default {
        name: "vaccine",
        data(){
          return{
            // 默认每页显示的条数（可修改）
            PageSize:5,
            // 默认显示第几页
            currentPage:1,
            // 个数选择器（可修改）
            pageSizes:[5,10,15,20],
            //总数
            total:0,
            selectObj:'',
            vaccines:[],
            dialogFormVisible:false,
            addForm:{},
            flag:true,//判断是新增还是修改
            rules:{
              name: [{required: true, message: '疫苗名称不能为空', trigger: 'blur'}],
              lot: [{required: true, message: '疫苗批号不能为空', trigger: 'blur'}],
              manufacturer: [{required: true, message: '生产商不能为空', trigger: 'blur'}],
              sum:[
                { required: true, message: '请输入疫苗数量（单位支）', trigger: 'blur' },
                { validator:function(rule,value,callback){
                    if(/^[0-9]*$/.test(value) == false){
                      callback(new Error("请输入数子"));
                    }else{
                      callback();
                    }
                  }, trigger: 'blur'
                },
              ],
            }
          }
        },
      mounted() {
          this.findVaccine()
      },
      methods:{
        // 每页显示的条数
        handleSizeChange(val) {
          // 改变每页显示的条数
          this.PageSizeFirst=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPageFirst=1
        },
        // 显示第几页
        handleCurrentChange(val) {
          // 改变默认的页数
          this.currentPage=val
        },
        clear () {
          this.flag= true
          this.addForm = {
            name: '',
            sum: '',
          }
        },
        finds(){
          if(this.selectObj==''){
            this.findVaccine()
          }else {
            let that = this
            that.$axios
              .post('/vaccine/findVaccineByLike', {
                unit: that.$store.state.user.id,
                name: '%' + that.selectObj + '%',
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.vaccines = res.data.data
                  this.total = res.data.data.length
                } else {


                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          }
        },
        //查找疫苗
        findVaccine(){
          console.log(3)
          let that = this
          this.$axios
            .post('/vaccine/findVaccineByUnit', {
              unit:that.$store.state.user.id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.vaccines = res.data.data
                this.total = res.data.data.length
              }
              else{
                this.vaccines = null
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
              //将数组转化为字符串
              console.log(that.addForm)
              if(this.flag){
                that.$axios
                  .post('/vaccine/addVaccine', {
                    unit:that.$store.state.user.id,
                    unitName:that.$store.state.user.name,
                    name:that.addForm.name,
                    sum:that.addForm.sum,
                    manufacturer:that.addForm.manufacturer,
                    lot:that.addForm.lot
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('添加成功')
                      that.dialogFormVisible = false
                      that.clear()
                      that.findVaccine()
                    }
                    else{
                    }
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(failResponse => {

                  })
              }else{
                that.$axios
                  .post('/vaccine/updateVaccine', {
                    id:that.addForm.id,
                    name:that.addForm.name,
                    sum:that.addForm.sum,
                    manufacturer:that.addForm.manufacturer,
                    lot:that.addForm.lot
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('修改成功')
                      that.dialogFormVisible = false
                      that.clear()
                      that.findVaccine()
                    }
                    else{
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
        editVaccine(vaccine){
          this.dialogFormVisible = true
          this.addForm  = vaccine
          this.flag = false
        },
        //删除
        //删除
        delVaccine(vaccine){
          return  this.$confirm('此操作将永久删除该内容, 是否继续?', '系统提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.put('vaccine/deleteVaccine', {
              id: vaccine.id,
            }).then(resp => {
              if (resp && resp.data.code === 200) {
                // 实现视图更新
                this.findVaccine()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else if(resp.data.code === 400){
                    this.$message({
                      type: 'info',
                      message: resp.data.msg
                    });
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除!'
            });

          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        },

      },
    }
</script>

<style scoped>
  .block{
    text-align: right;
    margin:10px ;
  }
</style>
