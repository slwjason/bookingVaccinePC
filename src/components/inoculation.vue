<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%;">
    <el-tab-pane label="第一针">
      <el-dialog
        title="选择接种对象"
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
        title="通告内容"
        :visible.sync="dialogForm"
        width="60%">
        <div style="text-align: left">
          <el-form :model="addForm"  label-position="left"
                   label-width="0px" ref="addForm">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="title">
                  <el-input type="text" v-model="addForm.title"
                            auto-complete="off" placeholder="请输入标题内容" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="content">
                  <el-input type="textarea" v-model="addForm.content"
                            auto-complete="off" placeholder="请输入通知内容（如：x月x日xx时间xx地点）" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="width: 50%">
              <el-button type="primary" style="width: 40%;background:#5a9bc6;border: none" @click="submitForm">确定</el-button>
              <el-button type="success" style="width: 40%;background: #34bfa3;border: none" @click="resetForm('addForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
        <el-card style="margin: 18px 2%;width: 95%">
          <el-input  placeholder="请输入关键词搜索"  v-model="selectObjFirst" style="width: 20%;border-right:none;float:right">
            <el-button  slot="suffix" icon="el-icon-search" @click="findsFirst" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
          </el-input>
          <el-table
            :data="firsts"
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
              label="接种人"
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
              width="400"
              fit>
            </el-table-column>
            <el-table-column
              prop="number"
              label="排号单"
              width="400"
              fit>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              sortable
              width="100">
            </el-table-column>

          </el-table>
          <div style="margin: 20px 0 20px 0;float: left">
                        <el-button class="add-button" type="success" @click="dialogFormVisible = true">发送通知</el-button>
            <!--        <el-button>批量删除</el-button>-->
          </div>
          <div class="block" >
            <el-pagination
              @size-change="handleSizeChangeFirst"
              @current-change="handleCurrentChangeFirst"
              :current-page="currentPageFirst"
              :page-sizes="pageSizesFirst"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalFirst"
              :page-size="PageSizeFirst"
            >
            </el-pagination>
          </div>
        </el-card>
    </el-tab-pane>
    <el-tab-pane label="第二针">
      <el-card style="margin: 18px 2%;width: 95%">
        <el-input  placeholder="请输入关键词搜索"  v-model="selectObjSecond" style="width: 20%;border-right:none;float:right">
          <el-button  slot="suffix" icon="el-icon-search" @click="findsSecond" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
        </el-input>
        <el-table
          :data="seconds"
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
            label="接种人"
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
            width="400"
            fit>
          </el-table-column>
          <el-table-column
            prop="number"
            label="排号单"
            width="400"
            fit>
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
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


    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import XLSX from "xlsx";

    export default {
        name: "inoculation",
        data(){
          return{
            // 默认每页显示的条数（可修改）
            PageSizeFirst:5,
            // 默认显示第几页
            currentPageFirst:1,
            // 个数选择器（可修改）
            pageSizesFirst:[5,10,15,20],
            //总数
            totalFirst:0,
            //------------------------------
            // 默认每页显示的条数（可修改）
            PageSize:5,
            // 默认显示第几页
            currentPage:1,
            // 个数选择器（可修改）
            pageSizes:[5,10,15,20],
            //总数
            total:0,
            addForm:{},
            dialogFormVisible:false,
            dialogForm:false,
            tabPosition: 'left',
            selectObjFirst:'',
            selectObjSecond:'',
            firsts:[],//第一针数据，
            seconds:[],//第二针数据
            //穿梭框已选数据
            selectData:[],
            data:[]
          }
        },
      mounted() {
          this.findFirst()
         this.findSecond()
      },
      methods:{
        // 每页显示的条数
        handleSizeChangeFirst(val) {
          // 改变每页显示的条数
          this.PageSizeFirst=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPageFirst=1
        },
        // 显示第几页
        handleCurrentChangeFirst(val) {
          // 改变默认的页数
          this.currentPageFirst=val
        },
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
        accept(){
          if(this.selectData!=null && this.selectData.length>0){
            this.dialogForm = true
          }else{
            this.$message.info('您未选择数据')
          }



        },


        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submitForm(){
          this.dialogForm = false
          let that = this
          this.$axios
            .post('/message/addMessage', {
              hospital:that.$store.state.user.id,
              selected:that.selectData,
              content:that.addForm.content,
              title:that.addForm.title
            })
            .then(res => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false
                this.$message.success('处理成功')
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        findsFirst(){
          if(this.selectObjFirst==''){
            this.findFirst()
          }else{
            let that = this
            that.$axios
              .post('/first/findFirstByLike', {
                point:that.$route.query.point,
                name:'%'+that.selectObjFirst+'%',
                idCard:'%'+that.selectObjFirst+'%',
                number:'%'+that.selectObjFirst+'%'
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.firsts = res.data.data
                  this.totalFirst = res.data.data.length
                }
                else{


                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          }
        },
        findFirst(){
            let that = this
            that.$axios
              .post('/first/findFirstByPoint', {
                point:that.$route.query.point
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.firsts = res.data.data
                  this.totalFirst = res.data.data.length
                  if(this.firsts.length>0) {
                    for (let i = 0; i < this.firsts.length; i++) {
                      this.data.push({
                        key: this.firsts[i].id,
                        label: this.firsts[i].name,

                      });
                    }
                  }
                }
                else{
                  that.$message.error('系统繁忙！请稍后重试')

                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          },
        findSecond(){
          let that = this
          that.$axios
            .post('/second/findSecondByPoint', {
              point:that.$route.query.point
            })
            .then(res => {
              if (res.data.code === 200) {
                that.seconds = res.data.data
                this.total = res.data.data.length
                // if(this.seconds.length>0) {
                //   for (let i = 0; i < this.seconds.length; i++) {
                //     this.data.push({
                //       key: this.seconds[i].id,
                //       label: this.seconds[i].name,
                //
                //     });
                //   }
                // }
              }
              else{
                that.$message.error('系统繁忙！请稍后重试')

              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        findsSecond(){
          if(this.selectObjSecond==''){
            this.findSecond()
          }else{
            let that = this
            that.$axios
              .post('/second/findSecondByLike', {
                point:that.$route.query.point,
                name:'%'+that.selectObjSecond+'%',
                idCard:'%'+that.selectObjSecond+'%',
                number:'%'+that.selectObjSecond+'%'
              })
              .then(res => {
                if (res.data.code === 200) {
                  that.seconds = res.data.data
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
