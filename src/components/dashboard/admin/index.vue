<template>
  <div class="dashboard-editor-container">
    <!--<github-corner class="github-corner" />-->
    <el-card>
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </el-card>


    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-card>
        <line-chart :chart-data="lineChartData" />
      </el-card>

    </el-row>
    <el-row :gutter="32">
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <el-card>-->
<!--            <raddar-chart />-->
<!--          </el-card>-->

<!--        </div>-->
<!--      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <el-card>
            <pie-chart />
          </el-card>

        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <el-card>
            <bar-chart />
          </el-card>

        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card>
          <transaction-table />
        </el-card>

      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-card>
          <todo-list />
        </el-card>

      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-card>
          <box-card />
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { parseTime } from "../../../utils/index";
import store from '../../../store/index'

console.log(store.state.weekData)
const lineChartData = {
  newVisitis: {
    expectedData: [50, 28, 43, 11, 45, 67, 86],
    actualData: []
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    RaddarChart,
    LineChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data () {
    return {
      weekData:[],
      lineChartData: lineChartData.newVisitis
    }
  },
  mounted() {
    this.getWeek()
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    },
    //获取当前日期的周一到周日的日期
    getWeek(){
      let that = this
      let now = new Date();
      let nowTime = now.getTime() ;
      let day = now.getDay() || 7  //为周日的时候 day 修改为7  否则当天周天会有问题
      let oneDayTime = 24*60*60*1000 ;
      let p = new Promise((resolve, reject) => {
        for (let i = 1; i <=7 ; i++) {
          that.findNumByDay(parseTime(new Date((nowTime - (day-i)*oneDayTime) ),'{y}-{m}-{d}'))
        }
        resolve(1)
      })
     p.then(function (data) {
       lineChartData.newVisitis.actualData=that.weekData

     })

    },

    //查找当周每天的预约数
    findNumByDay(day){
      console.log(2)
      let that = this
      that.$axios
        .post('/appointment/findNumByDay', {
          hospital:that.$store.state.user.id,
          createDate:'%'+day+'%'
        })
        .then(res => {
          if (res.data.code === 200) {
              that.weekData.push(res.data.data)
          }

        })

        // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;

  position: relative;
  margin: -20px 0 0 -10px;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
