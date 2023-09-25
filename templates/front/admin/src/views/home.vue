<template>
<div class="content" :style='{"padding":"30px"}'>
	<div class="text" :style='{"margin":"50px auto","fontSize":"24px","color":"rgb(51, 51, 51)","textAlign":"center","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
    <div class="cardView">
        <div class="cards" :style='{"margin":"0 0 20px 0","alignItems":"center","justifyContent":"center","display":"flex"}'>
			<div :style='{"boxShadow":"0 1px 6px rgba(0,0,0,.3)","margin":"0 10px","borderRadius":"40px","display":"flex"}' v-if="isAuth('xinfangxinxi','首页总数')">
				<div :style='{"width":"20px","margin":"20px 10px","borderRadius":"40px","background":"#d5dccc","height":"20px"}'></div>
				<div :style='{"width":"160px","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#333","fontWeight":"bold","height":"24px"}'>{{xinfangxinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"16px","color":"#666","height":"24px"}'>房产信息总数</div>
				</div>
			</div>
        </div>
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xinfangxinxi','首页统计')">
                <div id="xinfangxinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xinfangxinxi','首页统计')">
                <div id="xinfangxinxiChart2" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xinfangxinxi','首页统计')">
                <div id="xinfangxinxiChart3" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xinfangxinxi','首页统计')">
                <div id="xinfangxinxiChart4" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xinfangxinxi','首页统计')">
                <div id="xinfangxinxiChart5" style="width:100%;height:400px;"></div>
            </el-card>
        </div>
    </div>
</div>
</template>
<script>
//5
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
            xinfangxinxiCount: 0,
		};
	},
  mounted(){
    this.init();
    this.getxinfangxinxiCount();
    this.xinfangxinxiChat1();
    this.xinfangxinxiChat2();
    this.xinfangxinxiChat3();
    this.xinfangxinxiChat4();
    this.xinfangxinxiChat5();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    },
    getxinfangxinxiCount() {
        this.$http({
            url: `xinfangxinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.xinfangxinxiCount = data.data
            }
        })
    },

    xinfangxinxiChat1() {
      this.$nextTick(()=>{

        var xinfangxinxiChart1 = echarts.init(document.getElementById("xinfangxinxiChart1"),'macarons');
        this.$http({
            url: "xinfangxinxi/group/jzmj",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].jzmj);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].jzmj
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '建筑面积统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                xinfangxinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xinfangxinxiChart1.resize();
                };
            }
        });
      })
    },

    xinfangxinxiChat2() {
      this.$nextTick(()=>{

        var xinfangxinxiChart2 = echarts.init(document.getElementById("xinfangxinxiChart2"),'macarons');
        this.$http({
            url: "xinfangxinxi/group/huxing",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].huxing);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].huxing
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '户型统计',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                xinfangxinxiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xinfangxinxiChart2.resize();
                };
            }
        });
      })
    },

    xinfangxinxiChat3() {
      this.$nextTick(()=>{

        var xinfangxinxiChart3 = echarts.init(document.getElementById("xinfangxinxiChart3"),'macarons');
        this.$http({
            url: `xinfangxinxi/value/loupanming/junjia`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].loupanming);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].loupanming
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '房价统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:70
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                xinfangxinxiChart3.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xinfangxinxiChart3.resize();
                };
            }
        });
      })
    },


    xinfangxinxiChat4() {
      this.$nextTick(()=>{

        var xinfangxinxiChart4 = echarts.init(document.getElementById("xinfangxinxiChart4"),'macarons');
        this.$http({
            url: "xinfangxinxi/group/leixing",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].leixing);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].leixing
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '类型统计',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                xinfangxinxiChart4.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xinfangxinxiChart4.resize();
                };
            }
        });
      })
    },

    xinfangxinxiChat5() {
      this.$nextTick(()=>{

        var xinfangxinxiChart5 = echarts.init(document.getElementById("xinfangxinxiChart5"),'macarons');
        this.$http({
            url: "xinfangxinxi/group/biaoqian",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].biaoqian);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].biaoqian
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '标签统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'line',
                        areaStyle: {},
                        smooth: true
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                xinfangxinxiChart5.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xinfangxinxiChart5.resize();
                };
            }
        });
      })
    },

  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
</style>
