<template>
	<div class="main-content" :style='{"padding":"30px 0 0"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"width":"150px","margin":"0","position":"absolute","right":"7%","background":"none","zIndex":"1003"}' :inline="true" :model="searchForm">
				<el-row :style='{"flexWrap":"wrap","justifyContent":"center","display":"flex"}' >
					<div :style='{"width":"100%","margin":"0 0 10px","flexWrap":"wrap","justifyContent":"center","display":"flex"}'>
						<label :style='{"margin":"0","color":"#333","textAlign":"left","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">楼盘名</label>
						<el-input v-model="searchForm.loupanming" placeholder="楼盘名" clearable></el-input>
					</div>
					<div :style='{"width":"100%","margin":"0 0 10px","flexWrap":"wrap","justifyContent":"center","display":"flex"}'>
						<label :style='{"margin":"0","color":"#333","textAlign":"left","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">户型</label>
						<el-input v-model="searchForm.huxing" placeholder="户型" clearable></el-input>
					</div>
					<div :style='{"width":"100%","margin":"0 0 10px","flexWrap":"wrap","justifyContent":"center","display":"flex"}'>
						<label :style='{"margin":"0","color":"#333","textAlign":"left","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">地址</label>
						<el-input v-model="searchForm.dizhi" placeholder="地址" clearable></el-input>
					</div>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0px","outline":"none","backgroundColor":"#fff","margin":"10px auto","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"20px 0 0 0px","flexWrap":"wrap","flexDirection":"column","background":"none","justifyContent":"center","display":"flex"}'>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>

					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','导入')" type="success" @click="importHandler()">导入</el-button>
                    <el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','上传模板')" type="success" @click="importClcik">上传模板</el-button>
                    <el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','下载模板')" type="success" @click="download($base.url + 'upload/xinfangxinxi_template.xlsx')">下载模板</el-button>


					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','爬取数据')" type="success" @click="spider()">爬取数据</el-button>


					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','建筑面积统计')" type="warning" @click="chartDialog1()">建筑面积统计</el-button>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','户型统计')" type="warning" @click="chartDialog2()">户型统计</el-button>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','房价统计')" type="warning" @click="chartDialog3()">房价统计</el-button>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','类型统计')" type="warning" @click="chartDialog4()">类型统计</el-button>
					<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 auto 10px","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('xinfangxinxi','标签统计')" type="warning" @click="chartDialog5()">标签统计</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3020)","borderColor":"#eee","margin":"0 0 0 7%","borderRadius":"30px 30px 5px 5px","borderWidth":"1px 0 0 1px","background":"#fff","width":"calc(86% - 170px)","borderStyle":"solid"}' 
					v-if="isAuth('xinfangxinxi','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="loupanming"
					label="楼盘名">
						<template slot-scope="scope">
							{{scope.row.loupanming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="junjia"
					label="均价">
						<template slot-scope="scope">
							{{scope.row.junjia}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="jzmj"
					label="建筑面积">
						<template slot-scope="scope">
							{{scope.row.jzmj}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="huxing"
					label="户型">
						<template slot-scope="scope">
							{{scope.row.huxing}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="leixing"
					label="类型">
						<template slot-scope="scope">
							{{scope.row.leixing}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="biaoqian"
					label="标签">
						<template slot-scope="scope">
							{{scope.row.biaoqian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="dizhi"
					label="地址">
						<template slot-scope="scope">
							{{scope.row.dizhi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xszt"
					label="销售状态">
						<template slot-scope="scope">
							{{scope.row.xszt}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="fengmian" width="200" label="封面">
						<template slot-scope="scope">
							<div v-if="scope.row.fengmian">
								<img v-if="scope.row.fengmian.substring(0,4)=='http'" :src="scope.row.fengmian.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.fengmian.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('xinfangxinxi','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('xinfangxinxi','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>





							<el-button :style='{"border":"2px solid","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"#fff","borderImage":"linear-gradient(180deg, rgba(135.00000715255737, 154.00000602006912, 108.00000116229057, 1), rgba(226.0000017285347, 226.0000017285347, 226.0000017285347, 0.3799999952316284)) 1 1","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('xinfangxinxi','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="false"
					:style='{"padding":"0","margin":"20px 0 ","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"70%","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>



		<el-dialog title="导入" :visible.sync="importVisiable" width="50%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item class="upload" label="文件" prop="excelFile">
				  <excel-file-upload
				  tip="点击上传直接导入excel文件"
				  action="xinfangxinxi/importExcel"
				  :limit="1"
                  @change="importChange"
				  ></excel-file-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="importHandler()">关 闭</el-button>
			</span>
		</el-dialog>
        <el-dialog title="上传模板" :visible.sync="importVis" width="50%">
            <el-form ref="form" :model="importForm" label-width="80px">
                <el-form-item class="upload" label="文件" prop="excelFile">
                    <el-upload class="upload-demo" drag :action="$base.url + 'file/upload?type=xinfangxinxi_template'"
                        :show-file-list="false" :on-success="importSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importVis=false">关 闭</el-button>
            </span>
        </el-dialog>


		<el-dialog
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="jzmjChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  :visible.sync="chartVisiable2"
		  width="800">
			<div id="huxingChart2" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog2">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  :visible.sync="chartVisiable3"
		  width="800">
			<div id="junjiaChart3" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog3">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  :visible.sync="chartVisiable4"
		  width="800">
			<div id="leixingChart4" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog4">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  :visible.sync="chartVisiable5"
		  width="800">
			<div id="biaoqianChart5" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog5">返回</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
//折面
//建筑面积统计
//[]
import * as echarts from 'echarts'
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      importVisiable: false,
      importVis: false,
      importForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      layouts: ["total","prev","pager","next","sizes","jumper"],

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },



//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{

        var jzmjChart1 = echarts.init(document.getElementById("jzmjChart1"),'macarons');
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
                jzmjChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    jzmjChart1.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog2() {
      this.chartVisiable2 = !this.chartVisiable2;
      this.$nextTick(()=>{

        var huxingChart2 = echarts.init(document.getElementById("huxingChart2"),'macarons');
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
                        legend: {
                          orient: 'vertical',
                          left: 'left'
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
                huxingChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    huxingChart2.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog3() {
      this.chartVisiable3 = !this.chartVisiable3;
      this.$nextTick(()=>{
        // loupanming loupanming
        //  junjia

        var junjiaChart3 = echarts.init(document.getElementById("junjiaChart3"),'macarons');
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
                junjiaChart3.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    junjiaChart3.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog4() {
      this.chartVisiable4 = !this.chartVisiable4;
      this.$nextTick(()=>{

        var leixingChart4 = echarts.init(document.getElementById("leixingChart4"),'macarons');
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
                        legend: {
                          orient: 'vertical',
                          left: 'left'
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
                leixingChart4.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    leixingChart4.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog5() {
      this.chartVisiable5 = !this.chartVisiable5;
      this.$nextTick(()=>{

        var biaoqianChart5 = echarts.init(document.getElementById("biaoqianChart5"),'macarons');
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
                biaoqianChart5.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    biaoqianChart5.resize();
                };
            }
        });
      })
    },

    init () {
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.loupanming!='' && this.searchForm.loupanming!=undefined){
            params['loupanming'] = '%' + this.searchForm.loupanming + '%'
          }
           if(this.searchForm.huxing!='' && this.searchForm.huxing!=undefined){
            params['huxing'] = '%' + this.searchForm.huxing + '%'
          }
           if(this.searchForm.dizhi!='' && this.searchForm.dizhi!=undefined){
            params['dizhi'] = '%' + this.searchForm.dizhi + '%'
          }
      this.$http({
        url: "xinfangxinxi/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    importChange(){
        this.importHandler()
        this.getDataList()
    },
    importClcik() {
        this.importVis = true
    },
    importSuccess(e) {
        if(e.code==0){
            this.$message.success('上传成功');
            this.importVis = false
            
        }
    },
    importHandler() {
        this.importVisiable = !this.importVisiable;
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "xinfangxinxi/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },

    spider() {
        this.$message({
              message: "数据爬取中...",
              type: "success",
              duration: 3000,
              onClose: () => {
                this.search();
              }
            });
        this.$http({
          url: "spider/xinfangxinxi",
          method: "get",
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
                message: "爬取完成",
                type: "success",
                duration: 1500,
                onClose: () => {
                    this.getDataList(this.roleName);
                }
            });
          } else {
            this.$alert(data.msg)
          }
        });
    },

  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 0px solid;
				border-radius: 0;
				padding: 0 10px;
				box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.3020);
				outline: none;
				margin: 0 auto;
				color: #333;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 0;
				border-radius: 0;
				padding: 0 10px;
				box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.3020);
				outline: none;
				color: #333;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 0;
				border-radius: 0;
				padding: 0 10px 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.3020);
				outline: none;
				color: #333;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #fff;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				background: rgba(135, 154, 108, 1);
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #999;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 12px 0;
				color: #333;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #999;
				background: #fff;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: rgba(135, 154, 108, 1);
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: rgba(135, 154, 108, 1);
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
</style>
