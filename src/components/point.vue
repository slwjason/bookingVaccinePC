<template>
  <div style="text-align: left">
    <el-dialog
      title="添加接种点"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="50%">
      <el-form :model="addForm" :rules="rules" label-position="left"
               label-width="0px" ref="addForm">
        <el-row>
          <el-col :span="20">
            <el-form-item prop="name">
              <el-input type="text" v-model="addForm.name"
                        auto-complete="off" placeholder="接种点"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <el-form-item prop="phone">
              <el-input type="text" v-model="addForm.phone"
                        auto-complete="off" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="region">
                <el-cascader
                  placeholder="接种区域"
                  :options="options"
                  v-model="addForm.region"
                  @change="handleChange"
                  :separator="' '"
                >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="vaccine">
              <el-select v-model="addForm.vaccine" placeholder="请选择接种疫苗">
                <el-option
                  :title="'库存：'+item.sum+'支'"
                  v-for="item in vaccines"
                  :key="item.id"
                  :value="item.id+','+item.name"
                  :label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" >
            <el-form-item prop="num">
              <el-input type="text" v-model="addForm.num"
                        auto-complete="off" placeholder="分配疫苗数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item prop="address">
            <el-input type="textarea" v-model="addForm.address"
                      auto-complete="off" placeholder="详细地址" @change="getLatAndLon(addForm.address)"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
          <el-form-item prop="startTime">
              <el-date-picker
                v-model="addForm.startTime"
                type="datetime"
                placeholder="接种时间">
              </el-date-picker>
          </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item prop="endTime">
              <el-date-picker
                v-model="addForm.endTime"
                type="datetime"
                placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="width: 100%">
          <el-button  style="width: 40%;background: #5a9bc6;border: none ;color: #fff" @click="submitForm('addForm')">提交</el-button>
          <el-button style="width: 40%;background: #34bfa3;border: none ;color: #fff" @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="二维码"
      :visible.sync="dialogFormCode"
      width="50%">
      <div id="code"></div>
      <el-button class="add-button" type="success" @click="printCode">打印</el-button>
    </el-dialog>
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加接种点</el-button>
    <el-button class="add-button" type="success" @click="code">生成二维码</el-button>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-input id="input" placeholder="请输入关键词搜索"  v-model="selectObj" style="width: 20%;border-right:none;float:right">
        <el-button id="btnButton" slot="suffix" icon="el-icon-search" @click="finds" style="border-style: none;color:#0c7a73;background:transparent;outline: none;width: 15px;cursor:pointer;"></el-button>
      </el-input>
      <el-table
        :data="points"
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
          :show-overflow-tooltip="true"
          prop="name"
          label="接种点"
          width="200"
          fit>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="region"
          label="地区"
          width="200"
          fit>
        </el-table-column>
        <el-table-column
          prop="address"
          :show-overflow-tooltip="true"
          label="详细地址"
          fit>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          fit>
        </el-table-column>

        <el-table-column
          prop="startTime"
          label="开始时间"
          fit>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
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
              @click="booking(scope.row)"
              type="text"
              size="small">
              预约
            </el-button>
            <el-button
              @click="inoculation(scope.row)"
              type="text"
              size="small">
              接种
            </el-button>
            <el-button
              @click="editPoint(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="delPoint(scope.row)"
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
  <div id="container" style="display: none"></div>
  </div>

</template>
<script>
  import options from '../../static/js/country-level3-data.js'
  import { MP } from '../../static/js/map.js'
  var BMap, map = null
    export default {
        name: "index",
        data(){
          return {
            // 默认每页显示的条数（可修改）
            PageSize:5,
            // 默认显示第几页
            currentPage:1,
            // 个数选择器（可修改）
            pageSizes:[5,10,15,20],
            //总数
            total:0,
            flag:true,//判断是新增还是修改
            //搜索框
            selectObj:'',
            selectedOptions: [],//存放默认值
            options:options ,  //存放城市数据,
            points:[],
            addForm:{},
            vaccines:[],
            dialogFormVisible: false,
            dialogFormCode:false,//二维码弹框
            rules: {
              name: [{required: true, message: '接种点不能为空', trigger: 'blur'}],
              address: [{required: true, message: '详细地址不能为空', trigger: 'blur'}],
              region: [{ required: true, message: '请选择区域', trigger: 'change'}],
              vaccine: [{ required: true, message: '请选择疫苗', trigger: 'change'}],
              num:[
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
              phone:[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator:function(rule,value,callback){
                    if(/^1[34578]\d{9}$/.test(value) == false){
                      callback(new Error("请输入正确的手机号"));
                    }else{
                      callback();
                    }
                  }, trigger: 'blur'
                },
              ],
            },
          }
        },
      mounted() {
          this.findPoints()
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
          //根据地址获取经纬度
        getLatAndLon(address){
          this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
            address: address,
            output: 'json',
            ak: 'ko0i5v3wblYYwuvQivW0tX61mWl2IOQ4'
          }).then(json => {
            console.log(json)
            // 得到我们想要的内容
            this.addForm.latitude = json.result.location.lat
            this.addForm.longitude = json.result.location.lng
          }).catch(err => {
            console.log(err)
          })
        },
          //跳转到二维码页面
        code(){
            this.dialogFormCode = true
            this.qr()
        },
        //生成二维码
        qr(){
          let that = this
          that.$axios
            .post('/Code')
            .then(res => {
              if (res.data.code === 200) {
                if(document.getElementById('code').childElementCount>0)
                     document.getElementById('code').removeChild(div);
                let div = document.createElement('div');
                div.innerHTML = res.data.result;
                div.style='width:150px;height:150px;margin:0 auto'
                document.getElementById('code').appendChild(div);
              }
              else{
              }
            })
          // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        //打印二维码
        printCode(){
          const printBox = document.getElementById('code');
          //拿到打印的区域的html内容
          const newContent =printBox.innerHTML;
          //将旧的页面储存起来，当打印完成后返给给页面。
          const oldContent = document.body.innerHTML;
          //赋值给body
          document.body.innerHTML = newContent;
          //执行window.print打印功能
          window.print();
          // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
          window.location.reload();
          document.body.innerHTML = oldContent;
          return false;
        },
        handleChange(value) {
          console.log(value);
        },
        clear () {
          this.flag = true
          this.addForm = {
            name: '',
            region: '',
            phone: '',
            startTime: '',
            endTime:'',
            address:''
          }
        },
        //输入框查找
        finds(){
            if(this.selectObj==''){
              this.findPoints()
            }else{
              let that = this
              that.$axios
                .post('/point/findPointByLike', {
                  unit:that.$store.state.user.id,
                  name:'%'+that.selectObj+'%',
                  region:'%'+that.selectObj+'%'
                })
                .then(res => {
                  if (res.data.code === 200) {
                    that.points = res.data.data
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
        findPoints(){
            let that = this
            this.$axios
              .post('/point/findPointByUnit', {
                unit:that.$store.state.user.id
              })
              .then(res => {
                if (res.data.code === 200) {
                  this.points = res.data.data
                  this.total = res.data.data.length
                }
                else{


                }
              })

              // eslint-disable-next-line no-unused-vars
              .catch(failResponse => {

              })
          },
        //查找疫苗
        findVaccine(){
          let that = this
          this.$axios
            .post('/vaccine/findVaccineByUnit', {
              unit:that.$store.state.user.id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.vaccines = res.data.data
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
              //将数组转化为字符串
              that.addForm.region = that.addForm.region.join('-')
              console.log(that.addForm)
              if(this.flag){
                that.$axios
                  .post('/point/addPoint', {
                    unit:that.$store.state.user.id,
                    unitName:that.$store.state.user.name,
                    name:that.addForm.name,
                    region:that.addForm.region,
                    phone:that.addForm.phone,
                    startTime:that.common.formatDate(that.addForm.startTime,'yyyy-MM-dd hh:mm:ss'),
                    endTime:that.common.formatDate(that.addForm.endTime,'yyyy-MM-dd hh:mm:ss'),
                    vaccine:that.addForm.vaccine.split(',')[0],
                    vaccineName:that.addForm.vaccine.split(',')[1],
                    num:that.addForm.num,
                    address:that.addForm.address,
                    latitude:that.addForm.latitude,
                    longitude:that.addForm.longitude
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('添加成功')
                      that.dialogFormVisible = false
                      that.clear()
                      that.findPoints()
                    }
                    else{
                    }
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(failResponse => {

                  })
              }else{
                that.$axios
                  .post('/point/updatePoint', {
                    id:that.addForm.id,
                    name:that.addForm.name,
                    region:that.addForm.region,
                    phone:that.addForm.phone,
                    startTime:that.common.formatDate(new Date(that.addForm.startTime),'yyyy-MM-dd hh:mm:ss'),
                    endTime:that.common.formatDate(new Date(that.addForm.endTime),'yyyy-MM-dd hh:mm:ss'),
                    vaccine:that.addForm.vaccine.split(',')[0],
                    vaccineName:that.addForm.vaccine.split(',')[1],
                    num:that.addForm.num,
                    address:that.addForm.address,
                    latitude:that.addForm.latitude,
                    longitude:that.addForm.longitude
                  })
                  .then(res => {
                    if (res.data.code === 200) {
                      that.$message.success('修改成功')
                      that.dialogFormVisible = false
                      that.clear()
                      that.findPoints()
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
        //修改
        editPoint(point){
          this.dialogFormVisible = true
          this.flag = false
          this.$axios
            .post('/point/getPointById', {
              id:point.id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.addForm = res.data.data
                this.addForm.region = this.addForm.region.split('-')
                this.addForm.vaccine = this.addForm.vaccine +','+this.addForm.vaccineName
              }
              else{


              }
            })

            // eslint-disable-next-line no-unused-vars
            .catch(failResponse => {

            })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //删除
        delPoint(point){
          return  this.$confirm('此操作将永久删除该内容, 是否继续?', '系统提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.put('point/deletePoint', {
              id: point.id,
            }).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                // 实现视图更新
                this.findPoints()
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除!'
            });

          });
        },
        //预约
        booking(row){
          this.$router.push({
            path: '/appointment',
            query: {
              point: row.id
            }
          })
        },
        //接种
        inoculation(row){
          this.$router.push({
            path: '/inoculation',
            query: {
              point: row.id
            }
          })
        },

        /**
         * 获取地址栏参数
         * @param name 地址栏参数
         * @returns {null}
         */
        getQueryString(name){
              var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
              console.log(reg)
              var r = window.location.search.substr(1).match(reg);
              console.log(window.location.search.substr(1))
              if(r!=null && r[2]!="")
                return  unescape(r[2]);
              return null;
            }
       },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        },

      },
    }
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
  #code{
    margin: 0 auto;
    text-align: center;
  }
  #container {
    width: 100%;
    height: 100vh;
  }
  .block{
    text-align: right;
    margin:10px ;
  }
</style>
