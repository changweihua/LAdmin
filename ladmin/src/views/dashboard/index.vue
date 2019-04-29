<template>
  <el-row>
    <el-col :span="15">
      <calendar
        ref="calendar1"
        :events="calendar1.events"
        :lunar="calendar1.lunar"
        :value="calendar1.value"
        :values="calendar1.values"
        :weeks="calendar1.weeks"
        :months="calendar1.months"
        :totalMonth="calendar1.totalMonth"
        @select="calendar1.select"
        @selectMonth="calendar1.selectMonth"
        @selectYear="calendar1.selectYear" />
    </el-col>
    <el-col :offset="1" :span="8">
      <el-card>
       <div slot="header" class="clearfix">aaa</div>
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div>
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">sssssssssss</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
    </el-col>
    <!--<button @click="changeEvents">异步更新Price</button>-->
    <!--<button @click="calendar1.value=[2018,1,Math.floor(Math.random()*30+1)]">动态设置日期</button>-->
    <!--<button @click="$refs.calendar1.setToday()">返回今天</button>-->
  </el-row>
</template>

<script>
// import { mapActions, mapState } from "vuex";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      calendar1: {
        totalMonth: 14, //一共显示几个月
        //                  value:[2017,11,1], //默认日期  如果没设置就默认选中今天
        values: [
          [2018, 5, 1],
          [2018, 6, 2],
          [2018, 6, 6],
          [2018, 7, 11],
          [2018, 8, 11],
          [2018, 8, 12],
          [2018, 8, 14]
        ], //有哪些时间点是被选中的
        lunar: true, //显示农历
        //                  weeks:['Sun', 'Mon' , 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        //                  months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        events: {
          "2017-7-7": "$408",
          "2017-7-20": "$408",
          "2017-7-21": "$460",
          "2017-7-22": "$500"
        },
        select(value) {
          console.log(value.toString());
        },
        selectMonth(month, year) {
          console.log(year, month);
        },
        selectYear(year) {
          console.log(year);
        },
        timestamp: Date.now()
      }
    };
  },
  mounted() {
    // this.fetchList();
    // this.$store.commit('SET_CRUMB_VISIBILITY', false)
  },
  watch: {},
  computed: {},
  methods: {
    // ...mapActions(["fetchList"]),
    lookThisMonth() {
      this.$refs.calendar1.setToday();
    }
  }
};
</script>

<style scoped lang="scss">
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

