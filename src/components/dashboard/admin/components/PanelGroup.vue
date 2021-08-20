<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user-solid" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            预约人数
          </div>
          <count-to :start-val="0" :end-val="appointAll" :duration="5000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-message" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            消息通知
          </div>
<!--          duration数字滚动的时间     -->
          <count-to :start-val="0" :end-val="messageAll" :duration="6000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-point">
          <i class="el-icon-map-location" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            接种点
          </div>
          <count-to :start-val="0" :end-val="pointAll" :duration="4000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-vaccine">
          <i class="el-icon-help" style="font-size: 50px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            疫苗数量
          </div>
          <count-to :start-val="0" :end-val="vaccineAll" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data(){
    return{
      appointAll:0,
      vaccineAll:0,
      pointAll:0,
      messageAll:0
    }
  },
  mounted() {
    this.findAppointAll()
    this.findMessageAll()
    this.findPointAll()
    this.findVaccineAll()
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    },
    findAppointAll(){
      let that = this
      that.$axios
        .post('/appointment/findAppointAll', {
          hospital:that.$store.state.user.id,
        })
        .then(res => {
          if (res.data.code === 200) {
            that.appointAll = res.data.data
          }
          else{


          }
        })

        // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
    findVaccineAll(){
      let that = this
      that.$axios
        .post('/vaccine/findVaccineAll', {
          hospital:that.$store.state.user.id,
        })
        .then(res => {
          if (res.data.code === 200) {
            that.vaccineAll = res.data.data
          }
          else{


          }
        })

        // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
    findPointAll(){
      let that = this
      that.$axios
        .post('/point/findPointAll', {
          hospital:that.$store.state.user.id,
        })
        .then(res => {
          if (res.data.code === 200) {
            that.pointAll = res.data.data
          }
          else{


          }
        })

        // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
    findMessageAll(){
      let that = this
      that.$axios
        .post('/message/findMessageAll', {
          hospital:that.$store.state.user.id,
        })
        .then(res => {
          if (res.data.code === 200) {
            that.messageAll = res.data.data
          }
          else{


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
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;

    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-point {
        background: #5a9bc6;
      }

      .icon-vaccine {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-point {
      color: #5a9bc6;
    }


    .icon-vaccine {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
