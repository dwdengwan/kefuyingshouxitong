<template>
  <div class="MeterReadingDataEntry">
      <div class='DataEntry-right'>
        <div class="DataEntry-right-detail">

              <div class="my-input-detail">
                <div class="label-detail"><span>客户名称：</span></div>
                <div class="dialogcontent-detail"><span>{{formData.ctmName}}</span></div>
              </div>

              <div class="my-input-detail">
                <div class="label-detail"><span>用户编号：</span></div>
                <div class="dialogcontent-detail"><span>{{formData.userNo}}</span></div>
              </div>

              <div class="my-input-detail">
                <div class="label-detail"><span>装表地址：</span></div>
                <div class="dialogcontent-detail"><span>{{formData.setupMeterAddr}}</span></div>
              </div>

              <div class="my-input-detail">
                <div class="label-detail"><span>用水类型：</span></div>
                <div class="dialogcontent-detail"><span>{{formData.useWaterType}}</span></div>
              </div>
              
              <div class="my-input-detail">
                <span></span>
                <div class="label-detail"><span>上期抄表日：</span></div>
                <div class="dialogcontent-detail"><span>{{formData.priorPeriodDate}}</span></div>
              </div>
        </div>

        <div class='DataEntry-righ-search'>
          <el-form :model="formData" class="formBill-One" ref="form" label-width="100px">
            <el-form-item label="抄表日期：">
              <el-date-picker v-model="formData.meterReadingDate" size="mini" type="date" placeholder="选择日期" disabled></el-date-picker>
            </el-form-item>
            <el-form-item class="Thickening"  label="抄表状态：">
              <el-select  v-model="formData.status" @change='statusChange' clearable size="mini">
                <el-option v-for="item in TableStatusOption" :key="item.value" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上期抄码：" prop="priorPeriodNum">
              <el-input  v-model="formData.priorPeriodNum" size="mini"  disabled></el-input>
            </el-form-item>
            <el-form-item label="本期抄码：" class="Thickening"  prop="currendPeriodNum">
              <el-input v-model="formData.currendPeriodNum" @change='currendPeriodNumChange' size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="本期水量：" prop="currendPeriodWater">
              <el-input v-model="formData.currendPeriodWater" size="mini"  disabled></el-input>
            </el-form-item>
            <el-form-item label="增减水量：" class="Thickening"  prop="addWater">
              <el-input v-model="formData.addWater" @change='addWaterChange' size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="分摊水量：" prop="shareWater">
              <el-input v-model="formData.shareWater" disabled size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="实际用水量：" prop="realityWater">
              <el-input v-model="formData.realityWater" size="mini"  disabled></el-input>
            </el-form-item>
            <el-form-item label="备注：" class="Thickening"  prop="comments">
              <el-input v-model="formData.comments" size="mini" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class='DataEntry-righ-search_1'>
          <el-form :model="formData" class="formBill-Two"  ref="form" label-width="120px">
            <el-form-item label="是否换表：" >
              <div class="dialogcontent3">
                <span class="inputcontent">{{formData.changeMeterFlag}}</span>
              </div>
            </el-form-item>
            <el-form-item label="旧表止码：" >
              <div class="dialogcontent3">
                <span class="inputcontent">{{formData.priorPeriodNum}}</span>
              </div>
            </el-form-item>
            <el-form-item label="余量：">
              <div class="dialogcontent3">
                <span class="inputcontent">{{formData.margin}}</span>
              </div>
            </el-form-item>
            <el-form-item label="新表起码：" >
              <div class="dialogcontent3">
                <span class="inputcontent">{{formData.newMeterNum}}</span>
              </div>
            </el-form-item>

          </el-form>
        </div>
        <div class="DataEntry-button">
          <el-upload class="upload-file" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange" :file-list="fileList">
            <el-button size="mini" type="primary">上传附件</el-button>
          </el-upload>
          <el-button size="mini" @click="saveMeterEntry" type="primary">保存</el-button>
        </div>
      </div>

      <div class='DataEntry-left'>
        <div class="toolbar"> 
          <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline" >
            <el-form-item label="账期：">
              <el-date-picker v-model="tableQuery.accountPeriod" size="mini" type="month" unlink-panels format="yyyy-MM" value-format="yyyyMM" placeholder="选择月"  >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="册本号：" >
              <el-input v-model="tableQuery.bookNo" clearable placeholder="册本号"></el-input>
            </el-form-item>

            <el-form-item label="是否抄表：">
              <el-select  v-model="tableQuery.status" clearable size="mini">
                <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
              <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
            </el-form-item>
            <!-- 高级查询内容 -->
            <el-form-item v-show="isActive" class="advancedQuery">
              
              <el-form-item label="抄表员：">
                <el-select v-model="tableQuery.meterReadingStaff" size="mini">
                  <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                
              <el-form-item label="用户编号：">
                  <el-input v-model="tableQuery.userNo"></el-input>
              </el-form-item>

              <el-form-item label="异常类型：">
                <el-select v-model="tableQuery.abnormalStatus" size="mini">
                  <el-option v-for="item in dictionaryData.WEP" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-form>
            
        </div>
        
<!--  -->
        <div class="kl-table" >
          <el-table stripe border 
          highlight-current-row :row-class-name="rowClassName"   
          @row-click="handleRowChange"  
          :data="tableData.list" 
          class="change-tables-table"
          ref='klTableData'>

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="statusName" min-width="80" label="抄表状态" >
            </el-table-column>

            <el-table-column prop="userNo" min-width="80" label="用户编号">
            </el-table-column>

            <el-table-column prop="ctmName" min-width="80" label="客户名称">
            </el-table-column>

            <el-table-column prop="useWaterType" min-width="150" label="用水类型">
            </el-table-column>

            <el-table-column prop="priorPeriodNum" min-width="80" label="上期抄码">
            </el-table-column>

            <el-table-column prop="currendPeriodNum" min-width="80" label="本期抄码">
            </el-table-column>

            <el-table-column prop="currendPeriodWater" min-width="80" label="本期水量">
            </el-table-column>

            <el-table-column prop="addWater" min-width="80" label="增减水量">
            </el-table-column>

            <el-table-column prop="shareWater" min-width="80" label="分摊水量">
            </el-table-column>

            <el-table-column prop="realityWater" min-width="120" label="实际用水量" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="meterReadingDate" min-width="100" label="抄表日期" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="priorPeriodWater" min-width="100" label="上期水量" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="priorPeriodDate" min-width="100" label="上期抄表日" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="newMeterNum" min-width="100" label="新表起码" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="oldMeterNum" min-width="100" label="旧表底码" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="linkRelativeRatio" min-width="100" label="环比" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="ringRatio" min-width="100" label="环比率" show-overflow-tooltip>
              
              <template slot-scope="scope">
                {{scope.row.ringRatio}}%
              </template>
            </el-table-column>

            <el-table-column prop="average" min-width="100" label="三期均量" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="meterType" min-width="100" label="水表类型">
            </el-table-column>

            <el-table-column prop="setupMeterAddr" min-width="100" label="装表地址" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="comments" min-width="100" label="备注" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="changeMeterFlag" min-width="100" label="是否换表" :formatter='changeMFgformatter' show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="margin" min-width="100" label="余量" show-overflow-tooltip>
            </el-table-column>


            <el-table-column label="操作" fixed="right" width="80px">
              <template slot-scope="scope">
                <el-button type="text" @click="DataEntry()" style="font-size:12px;">查看附件</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" 
              @current-change="handleCurrentChange" 
              :current-page="tableQuery.page" 
              :page-sizes="[20, 100, 500, 1000]" 
              :page-size="tableQuery.pageCount" 
              layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "MeterReadingDataEntry",
  props: ['booksVal'],
  data() {
    return {
      isActive: false,  //控制高级查询内容的显示
      tableData:[],
      formData: {
        row:'',
        id:'',
        ctmName:"",//客户名称
        userNo:"",//用户编号
        setupMeterAddr:"",//装表地址
        useWaterType:"",//用水类型
        priorPeriodDate:0,//上期抄表日
        
        meterReadingDate:'',//抄表日期
        status:0,//抄表状态ID
        statusName:'',//抄表状态名称
        priorPeriodNum:0,//上期抄码
        currendPeriodNum:0,//本期抄码
        addWater:0,//增减水量
        shareWater:0,//分摊水量
        realityWater:0,//实际用水量
        currendPeriodWater:0,//本期水量
        comments:"",//备注

        changeMeterFlag:0,//是否换表
        oldMeterNum:0,//旧表止码
        margin:0,//余量
				newMeterNum:0,//新表起码

        priorPeriodWater:0,//上期水量
        linkRelativeRatio:0,//环比
        ringRatio:0,//环比率
        average:0,//三期均量
        meterType:"",//水表类型
      },
      tableQuery: {
        //查询表单数据
        page: 1,
        pageCount: 20,
        accountPeriod: "202004",//账期
        bookNo: "",//册本号
        userNo:'',//用户编号
        meterReadingStaff:'',//抄表员
        readingStatus:'',//抄表状态
        abnormalStatus:'',//异常状态
      },
      //数据字典
      dictionaryData:[],
      //抄表员
      meterReaderList:[],
      //是否抄表 
      statusOption:[{
        value: 0,
        label: '已抄'
      },{
        value: 1,
        label: '未抄'
      }],
      // 抄表状态下拉框
      TableStatusOption: [],
      //数据字典
      dictionaryData:[],
      maxHeight: 0,
      tableShow: false,
      enterMeterDataShow: false,
      enterMeterDate: "",
      fileList: [],
    };
  },
  mounted() {
    this.tableQuery.bookNo = this.booksVal.bookNo
    
    //抄表状态
    this.getMeterStatusOption();
    //数据字典接口
    this.getDictionary()
    //初始化接口

    this.init()
    
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".DataEntry-left", [".DataEntry-left .toolbar",".DataEntry-left .block",  ]);
    });
  },
  methods: {
      //初始化
    init() {
      let _this = this
      let params = {
          "busicode": "MrRecordList",
          "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          _this.tableData = res; 
          var data = JSON.parse(JSON.stringify(_this.tableData.list[0]))
          _this.formData = data;
          _this.formData.rowData = 0
          this.$nextTick(() => {
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            this.common.changeTable(this, ".DataEntry-left", [".DataEntry-left .toolbar",".DataEntry-left .block",  ]);
          });
      })
    },
    //查询
    search(){
      this.init()
    },
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = false;
        $('.el-table--fit').css('height', '66%');
      } else {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
        this.isActive = true;
        $('.el-table--fit').css('height', '50%');
      }
      this.$nextTick(() => {
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        this.common.changeTable(this, ".DataEntry-left", [".DataEntry-left .toolbar",".DataEntry-left .block", ]);
      });
    },
  
    // 数据字典数据获取
    getDictionary() {
        var _this = this
        var params = {
          "busicode": "DictionarySelect",
          "data": "WEP,"//异常类型
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.dictionaryData = res
        })
    },
      //抄表状态下拉框
    getMeterStatusOption() {
      let _this = this
      let params = {
          "busicode": "MeterStatusSelect",
          "data": {
              "abnormalFlag":"0"
          }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.TableStatusOption = res; 
      })
    },
    calBack() {
      this.$emit("calback", false);
    },
    handleChange(file, fileList) {
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      this.tableQuery.page = val
      this.init();
    },
    indexMethod(index) {//获取表格序号
      return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1)
    },
    statusChange(val){
      if (val == '0') {//正常
        
      }else if(val == '3'){//过圈

      }
    },
    changeMFgformatter(row, column, cellValue, index){
      return row.changeMeterFlag ===0?'否':'是'
      
    },
    //当改变 本期抄码时 数据变化
    currendPeriodNumChange(val){
      this.formData.currendPeriodWater = Number(val)  - this.formData.priorPeriodNum
      this.formData.realityWater = this.formData.currendPeriodWater + this.formData.addWater + this.formData.shareWater
    },
    //当改变 增减水量时 数据变化
    addWaterChange(val){
      this.formData.realityWater = this.formData.currendPeriodWater + Number(val) + this.formData.shareWater
    },
    rowClassName({row, rowIndex}) {
      row.rowData = rowIndex;
    },
    handleRowChange(row, column, event){
      var data = JSON.parse(JSON.stringify(row))
      this.formData = data
    },
    //保存方法
    saveMeterEntry(){
      // this.tableData.list[this.formData.rowData] = this.formData
        var _this = this 
        var params = {
          "busicode": "MrRecordSave",
          "data":{
            accountPeriod:this.tableQuery.accountPeriod,//账期
            id:this.formData.id,//
            userNo:this.formData.userNo,//用户编号
            meterReadingDate:this.formData.meterReadingDate,//抄表日期
            status:this.formData.status,//抄表状态ID
            currendPeriodNum:this.formData.currendPeriodNum,//本期抄码
            addWater:this.formData.addWater,//增减水量
            comments:this.formData.comments,//备注
            
            }
        }
      console.log(params);
        this.$api.fetch({
          params: params,//参数
          }).then(res => {
          _this.$notify({
            title: '成功',
            message: '表单保存成功',
            type: 'success'
          });
        // this.init();
        })
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },
    tableData: function() {
      this.$nextTick(function() {
        this.$refs.klTableData.setCurrentRow(this.tableData.list[0])
      })
    }
    // formData: {
    //   handler: function (newVal, oldVal) {
    //     // console.log(newVal);
    //     // this.currendPeriodNumChange(newVal.currendPeriodNum)
    //     // this.addWaterChange(newVal.addWater)
    //   },
    //   deep: true
    // }
  }
};
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.MeterReadingDataEntry {
  height: calc(100% - 41px);
    display: flex;
    
    //行变色
    .change-tables-table {
      .el-table__body {
        tr {
          td:nth-child(3) {
            div {
              color: #3195f4;
              cursor: pointer;
            }
          }
        }
      }
    }
    .DataEntry-right {
      width: 27%;
      border-right: 1.5px solid rgb(234, 244, 255);
      height: 100%;
      overflow-y: auto;
      .DataEntry-right-detail {
        padding: 10px 20px;
        border-bottom: 1.5px solid #eaf4ff;    
        height: 145px;

        .my-input-detail{
          height: 22px;
          width: 100%;
          float: left;
          margin-bottom: 5px;
        }
        .label-detail {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 12px;
          color: #606266;
          line-height: 20px;
          padding: 0 10px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100px
        }
        .dialogcontent-detail {
          text-align: left;
          vertical-align: middle;
          float: left;
          font-size: 12px;
          color: #121315;
          line-height: 20px;
          padding: 0 10px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin-left: 5px;    
          width: calc(100% - 110px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .DataEntry-righ-search {
        border-bottom: 1.5px solid #eaf4ff;
        padding:0px 20px 5px;
      }
      .DataEntry-button {
        padding: 10px 0px;
        text-align: center;
        .upload-file {
          display: inline-block;
        }
      }
      .DataEntry-righ-search_1{
        padding: 5px 0px;
        height: 60px;
      }
    }
    .DataEntry-left {
      width: 73%;
    }
  .dialogcontent3 {
    width: 40%;
    display: inline-block;
  }
  .dialogcontent3 .inputcontent {
    width: 100%;
    display: inline-block;
  }
}
</style>

