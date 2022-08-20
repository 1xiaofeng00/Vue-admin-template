<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- @tab-click="handleClick" -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          v-model="data"
          class="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <h4>门店{{title}}排名</h4>
          <ul>
            <li>
              <span class="graph">1</span>
              <span>肯德基</span>
              <span>1234</span>
            </li>
            <li>
              <span class="graph">2</span>
              <span>麦当劳</span>
              <span>1234</span>
            </li>
            <li>
              <span class="graph">3</span>
              <span>肯德基</span>
              <span>1234</span>
            </li>
            <li>
              <span >4</span>
              <span>海底捞</span>
              <span>1234</span>
            </li>
            <li>
              <span >5</span>
              <span>麦当劳</span></span>
              <span>1234</span>
            </li>
            <li>
              <span >6</span>
              <span>汉堡王</span>
              <span>1234</span>
            </li>
            <li>
              <span >7</span>
              <span>肯德基</span>
              <span>1234</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      //由于myCharts为局部变量，挂载到组件实例身上
      myCharts:null,
      // 收集日历的数组
      data:[],
    };
  },
  mounted() {
    //初始化echarts实例
    this.myCharts = echarts.init(this.$refs.charts);
    //配置数据
    this.myCharts.setOption({
      title: {
        text: this.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [390, 330,200, 334,10, 52,52,200, 334, 390, 330,220],
          color: "yellowgreen",
        },
      ],
    });
  },
  computed:{
  //计算属性-标题
  title(){
      return this.activeName=="sale"?"销售额":"访问量"
  }
  },
  // 监听属性
  watch:{
    title(){
      //重新修改图标的配置数据
      this.myCharts.setOption({
        title:{
          text:this.title
        }
      })
    }
  },
  methods:{
    setDay(){
       const day=dayjs().format("YYYY-MM-DD");
       this.data=[day,day]
    },
    setWeek(){
      const start =dayjs().day(1).format("YYYY-MM-DD");
      const end =dayjs().day(7).format("YYYY-MM-DD");
      this.data=[start,end]
    },
    setMonth(){
      const start =dayjs().startOf("month").format("YYYY-MM-DD");
      const end =dayjs().endOf("month").format("YYYY-MM-DD");
      this.data=[start,end]
    },
      setYear(){
      const start =dayjs().startOf("year").format("YYYY-MM-DD");
      const end =dayjs().endOf("year").format("YYYY-MM-DD");
      this.data=[start,end]
    }
  }
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
  cursor: pointer;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
  font-size: 14px;
  line-height: 25px;
  
}
ul li span:nth-of-type(2n){
   margin-left:30px ;
   margin-right:110px ;
}
ul li span:first-child{ 
    float: left;
    width: 25px;
    height: 25px;   
    text-align: center;
}
.graph{
    color: white;
    background-color: black;
    border-radius: 50%;
}
</style>
