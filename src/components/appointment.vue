<template>
  <div>
    <el-dialog
      title="预约处理"
      :visible.sync="dialogFormVisible"
      width="70%">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block;height: 80%"
          v-model="selectData"
          filterable
          :titles="['预约人', '已选中']"
          :button-texts="['到左边', '到右边']"
          :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
      }"

          :data="data">
          <span slot-scope="{ option }"> {{ option.label }}</span>
          <el-button class="transfer-footer" slot="left-footer" size="small">撤销</el-button>
          <el-button class="transfer-footer" slot="right-footer" size="small" @click="accept">确定</el-button>
        </el-transfer>
      </div>
    </el-dialog>
    <el-dialog
      title="处理完成需要发送接种通知给预约用户，并发送排号单!"
      :visible.sync="dialogList"
      width="60%">
      <div style="text-align: left">
        <el-form :model="addForm"  label-position="left"
                 label-width="0px" ref="addForm">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="name">
                <el-input type="textarea" v-model="addForm.message"
                          auto-complete="off" placeholder="请输入通知内容（如：x月x日xx时间xx地点）" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="width: 50%">
            <el-button type="primary" style="width: 40%;background: #5a9bc6;border: none" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="待处理预约数据" name="1">
        <el-card style="margin: 18px 2%;width: 95%">
          <el-input id="input" placeholder="请输入关键词搜索"  v-model="selectObj" style="width: 20%;border-right:none;float:right">
            <el-button id="btnButton" slot="suffix" icon="el-icon-search" @click="finds" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
          </el-input>
          <el-table
            :data="appointments"
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
              label="预约人"
              fit>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              fit>
            </el-table-column>
            <el-table-column
              prop="idCard"
              label="身份证号"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="brithDay"
              label="出生年月"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              fit>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="400"
              fit>
            </el-table-column>
            <el-table-column
              prop="isIll"
              label="是否有病史"
              width="120"
              fit>
              <template slot-scope="scope">
                {{scope.row.isIll==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="isWill"
              label="是否接受接种"
              width="120"
              fit>
              <template slot-scope="scope">
                {{scope.row.isWill==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="appointDate"
              label="预约时间"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="appointStatus"
              sortable
              width="100">
            </el-table-column>

          </el-table>
          <div style="margin: 20px 0 20px 0;float: left">
            <el-button class="add-button" type="success" @click="dialogFormVisible = true">预约处理</el-button>
            <!--        <el-button>批量删除</el-button>-->
          </div>
          <div class="block" >
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="pageSizes2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
              :page-size="PageSize2"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="已处理预约数据" name="2">
        <el-card style="margin: 18px 2%;width: 95%">
          <el-input  placeholder="请输入关键词搜索"  v-model="selectObjed" style="width: 20%;border-right:none;float:right">
            <el-button  slot="suffix" icon="el-icon-search" @click="findsed" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
          </el-input>
          <el-table
            :data="appointmenteds"
            stripe
            id="table"
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
              label="预约人"
              fit>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              fit>
            </el-table-column>
            <el-table-column
              prop="idCard"
              label="身份证号"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="brithDay"
              label="出生年月"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              fit>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="200"
              fit>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="400"
              fit>
            </el-table-column>
            <el-table-column
              prop="number"
              label="排号单"
              width="300"
              fit>
            </el-table-column>
            <el-table-column
              prop="isIll"
              label="是否有病史"
              width="120"
              fit>
              <template slot-scope="scope">
                {{scope.row.isIll==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="isWill"
              label="是否接受接种"
              width="120"
              fit>
              <template slot-scope="scope">
                {{scope.row.isWill==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="appointDate"
              label="预约时间"
              width="200"
              fit>
            </el-table-column>

            <el-table-column
              label="状态"
              prop="appointStatus"
              sortable
              width="100">
            </el-table-column>
          </el-table>
          <div style="margin: 20px 0 20px 0;float: left">
                    <el-button type="success" class="add-button"  @click="exportExcel">导出</el-button>
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

    export default {
      name: "appointment",
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        },

      },
      data(){
        return{
          // 默认每页显示的条数（可修改）
          PageSize2:5,
          // 默认显示第几页
          currentPage2:1,
          // 个数选择器（可修改）
          pageSizes2:[5,10,15,20],
          //总数
          total2:0,
          //----------------------
          // 默认每页显示的条数（可修改）
          PageSize:5,
          // 默认显示第几页
          currentPage:1,
          // 个数选择器（可修改）
          pageSizes:[5,10,15,20],
          //总数
          total:0,
          activeName:'1',
          addForm:{},
          dialogList:false,
          selectObj:'',//待处理查找
          selectObjed:'',//已处理查找
          appointments:[],//待处理
          appointmenteds:[],//已处理
          dialogFormVisible:false,
          //穿梭框数据
          data:[],
          //穿梭框已选数据
          selectData:[],

        }
      },
      mounted() {
        this.findAppoint()
        this.findAppointed()
      },
      methods:{
        // 每页显示的条数
        handleSizeChange2(val) {
          // 改变每页显示的条数
          this.PageSize2=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage2=1
        },
        // 显示第几页
        handleCurrentChange2(val) {
          // 改变默认的页数
          this.currentPage2=val
        },
        // 每页显示的条数
        handleSizeChange(val) {
          // 改变每页显示的条数
          this.PageSize=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage=1
        },
        // 显示第几页
        handleCurrentChange(val) {
          // 改变默认的页数
          this.currentPage=val
        },

        submitForm(){
          this.dialogList = false
          let that = this
          this.$axios
            .post('/appointment/disposeAppoint', {
              disposes:that.selectData,
              message:that.addForm.message,
            })
            .then(res => {
              if (res.data.code === 200) {
                    this.dialogFormVisible = false
                    this.$message.success('处理成功')
                    this.findAppoint()
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        // handleChange(value, direction, movedKeys) {
        //   console.log(this.selectData);
        // },
        //接受预约
        accept(){

          if(this.selectData!=null && this.selectData.length>0){
            this.dialogList = true
          }else{
            this.$message.info('您未选择数据')
          }


        },

        //输入框查找已处理
        findsed(){
          if(this.selectObjed==''){
            this.findAppoint()
          }else{
            let that = this
            that.$axios
              .post('/appointment/findAppointedByLike', {
                point:that.$route.query.point,
                name:'%'+that.selectObj+'%',
                idCard:'%'+that.selectObj+'%',
                status:'已处理'
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.appointmenteds = res.data.data
                  this.total = res.data.data.length
                }
                else{


                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          }
        },
        //查找已处理的数据
        findAppointed(){
          let that = this
          this.$axios
            .post('/appointment/findAppointed', {
              point:that.$route.query.point
            })
            .then(res => {
              if (res.data.code === 200) {
                this.appointmenteds = res.data.data
                this.total = res.data.data.length
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        //输入框查找待处理
        finds(){
          if(this.selectObj==''){
            this.findAppoint()
          }else{
            let that = this
            that.$axios
              .post('/appointment/findAppointByLike', {
                point:that.$route.query.point,
                name:'%'+that.selectObj+'%',
                idCard:'%'+that.selectObj+'%',
                status:'待处理'
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.appointments = res.data.data
                  this.total2 = res.data.data.length
                }
                else{


                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          }
        },
        findAppoint(){
          let that = this
          this.$axios
            .post('/appointment/findAppointByPoint', {
              point:that.$route.query.point
            })
            .then(res => {
              if (res.data.code === 200) {
                this.appointments = res.data.data
                this.total2 = res.data.data.length
                if(this.appointments.length>0) {
                  for (let i = 0; i < this.appointments.length; i++) {
                    this.data.push({
                      key: this.appointments[i].id,
                      label: this.appointments[i].name,

                    });
                  }
                }
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },

        //导出
        exportExcel () {
          var tab = document.getElementById("table")

          var wb = XLSX.utils.table_to_book(tab)
          /* get binary string as output */
          var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '预约人员信息表.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },
      },
    }
</script>

<style scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .el-transfer-panel__list.is-filterable {
    height: 388px;
    padding-top: 0;
  }
  .block{
    text-align: right;
    margin:10px ;
  }
</style>
