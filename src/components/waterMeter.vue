<template>
  <!-- 工程中心-多水表录入 -->
  <div class="water-meter">
        <div class='table-content' v-if="NotDisabled ==false">
          <el-button-group class="add-line">
            <el-button type="info" size="mini"  icon="el-icon-plus" @click="addRow()" ></el-button>
          </el-button-group>
        </div>
      <div class="kl-table">
      
        
        <el-table 
          v-if="tableShow" 
          :max-height="maxHeight" 
          stripe border 
          :data="tableData" 
          class="wuserInfo-table">
          <el-table-column type="index" fixed="left" label="NO." width="50" :index="indexMethod"></el-table-column>
            <el-table-column prop="houseCert" min-width="100" label="房产证号"  >
              <template slot-scope="scope">
                <el-input v-model="scope.row.houseCert" :disabled="NotDisabled">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="contractNo" min-width="100" label="供水合同编号" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.contractNo" :disabled="NotDisabled">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="contractAddr" min-width="150" label="供水合同签订地址" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.contractAddr" :disabled="NotDisabled">
                </el-input>
              </template>
            </el-table-column>

          <el-table-column prop="contractDate" min-width="120" label="合同签订日期">
            <template slot-scope="scope">
                <el-date-picker v-model="scope.row.contractDate" :disabled="NotDisabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" >
                </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column prop="openDate" min-width="120" label="开户日期" >
            <template slot-scope="scope">
                <el-date-picker v-model="scope.row.openDate" :disabled="NotDisabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" >
                </el-date-picker>
              </template>
          </el-table-column> 
          
          <el-table-column prop="documentType"   min-width="100" label="行业分类" >
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.tradeClassify" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                  <el-option v-for="item in tradeClassifyOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="meterType"   min-width="100" label="水表类型" >
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.meterType" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                  <el-option v-for="item in dictionaryData.MMT" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="useWaterObject"   min-width="100" label="用水对象" >
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.useWaterObject" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                  <el-option v-for="item in dictionaryData.UWS" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="meterUse"   min-width="100" label="水表用途" >
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.meterUse" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                  <el-option v-for="item in dictionaryData.CMC" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="fatherMeterNo" min-width="100" label="总表编号">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.fatherMeterNo" :disabled="NotDisabled"  size="mini" clearable >
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="meterNo" min-width="100" label="水表编号">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.meterNo" :disabled="NotDisabled" size="mini" clearable >
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="setupMeterAddr" min-width="100" label="装表地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.setupMeterAddr" :disabled="NotDisabled">
              </el-input>
            </template>
          </el-table-column>
  
          
          <el-table-column prop="setupMeterLocation" min-width="100" label="装表位置">
            <template slot-scope="scope">
              <el-input v-model="scope.row.setupMeterLocation" :disabled="NotDisabled">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="setupMeterDate" min-width="100" label="装表日期">
            <template slot-scope="scope">
                <el-date-picker v-model="scope.row.setupMeterDate" :disabled="NotDisabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" >
                </el-date-picker>
              </template>
          </el-table-column> 

          <el-table-column prop="bookNo" min-width="100" label="册本号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bookNo" :disabled="NotDisabled">
              </el-input>
            </template>
          </el-table-column>
  
          
          <el-table-column prop="sortNo" min-width="100" label="排序号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sortNo" :disabled="NotDisabled">
              </el-input>
            </template>
          </el-table-column>
          
          <el-table-column prop="meterReadingCycle"   min-width="100" label="抄表周期">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.meterReadingCycle" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                  <el-option v-for="item in dictionaryData.RTP" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="useWaterType"   min-width="100" label="用水类型">
            <template slot-scope="scope">
              <el-cascader
                  :disabled="NotDisabled"
                  v-model="scope.row.useWaterType"
                  :options="useWaterTypeOptions"
                  :show-all-levels="false"
                  :props="props">
                </el-cascader>
              <!-- <el-select 
                v-model="scope.row.useWaterType" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                
                <el-option label="机械表" value="0"></el-option>
                <el-option label="智能表" value="1"></el-option>
              </el-select> -->
            </template>
          </el-table-column>
          
          <el-table-column prop="inflate"   min-width="100" label="是否加压">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.inflate" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column prop="secondaryWater"   min-width="100" label="是否二供">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.secondaryWater" :disabled="NotDisabled"
                @keyup.esc.native="cancel(scope.$index, scope.row)">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>

            <el-table-column label="操作" fixed="right" width="85" >
              <template slot-scope="scope">
                <el-button 
                  type="text" 
                  @click.native="reMove(scope.$index)" 
                >
                删除</el-button>
              </template>
            </el-table-column>

        </el-table>


      </div>
  </div>
</template>
<script>
export default {
  // SetAccount 立户节点
  //id 单据id
  //NotDisabled 是否可修改
  props:["NotDisabled","bookNoShow","SetAccount","id"],
  data(){
    return {
      maxHeight: 0,
      oldData:[],
      tableShow: true,
      tableData:[],
      tableQuery:{
        consultId:'',
        userInfo:[]
      },
      
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      dictionaryData:[],//数据字典
      tradeClassifyOptions:[],
      useWaterTypeOptions:[]//用水类型
    };
  },
  mounted(){
    this.getDictionary();
    this.SelectTradeClassifyOptions();
    this.SelectUseWaterTypeOptions();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.water-meter .kl-table', ['.water-meter .block'])
    })
    eventBus.$on('openInit', (item) => {
      this.init() 
      
    })
  },
  methods:{
    
    	//初始化
     init() {
      let _this = this
      this.tableQuery.consultId = this.id;
      let params = {
          "busicode": "PjMeterList",
          "data": {'consultId':this.tableQuery.consultId},
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.tableData = res;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(this, ".water-meter", [
          ".water-meter .toolbar",
          ".water-meter .block",
        ]);
      })
    },
    
    	//初始化
     initDraft(val) {
      let _this = this
      this.tableQuery.consultId = val;
      let params = {
          "busicode": "PjMeterList",
          "data": {'consultId':this.tableQuery.consultId},
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        
        _this.tableData = res; 
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(this, ".water-meter", [
          ".water-meter .toolbar",
          ".water-meter .block",
        ]);
      })
      
    },
    //水表录入-删除
    reMove(index){
      this.tableData.splice(index)
    },
    
    // 添加行
    addRow() {
      this.tableData.push({
        id: "",
        userNo: "",//用户编号
        houseCert: "",//房产证号
        contractNo: "",//供水合同编号
        contractAddr: "",//供水合同签订地址
        contractDate: "",//供水合同签订时间
        openDate: "",//开户日期
        comments: "",//备注
        tradeClassify: "",//行业分类
        meterType: "",//水表类型
        useWaterObject: "",//用水对象
        meterUse: "",//水表用途
        fatherMeterNo: "",//总表编号
        meterNo: "",//水表编号
        setupMeterAddr: "",//装表地址
        setupMeterLocation: "",//装表位置
        setupMeterDate: "",//装表日期
        bookNo: "",//册本号
        sortNo: "",//排序号
        meterReadingCycle: "",//抄表周期
        useWaterType: "",//用水类型
        inflate: "",//是否加压
        secondaryWater: "",//是否二供
      });
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".water-meter", [
        ".water-meter .toolbar",
        ".water-meter .block",
      ]);
    },
    
    //行业分类下拉框
    SelectTradeClassifyOptions() {
      let _this = this
      let params = {
        "busicode": "TradeClassifySelect",
        "data": {
          // "businessAbodeId":id
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.tradeClassifyOptions = res;
      })
    },
    
    //用水类型下拉框
    SelectUseWaterTypeOptions() {
      let _this = this
      let params = {
        "busicode": "WaterTypeTree",
        "data": {
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        let data = _this.getArr(res.children)
        _this.useWaterTypeOptions = data;
      })
    },
    //树结构数据处理
    getArr(data){
      for (let i = 0; i< data.length; i++) {
        if(data[i].isParent === false) {
          delete data[i].children
        } else {
          this.getArr(data[i].children)
        }
      }
      return data
    },
    // 数据字典数据获取
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MMT,UWS,CMC,RTP"
        //水表类型、用水对象、水表用途、抄表方式
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    
    indexMethod(index) {//获取表格序号
      return   (index+1)
    },
    //多水表保存
    SaveWaterMeter(val){
      var _this = this
      let test = [];
      for(let i =0;i<this.tableData.length;i++){
        let data ={
          'id': _this.tableData[i].id ,
          'userNo': _this.tableData[i].userNo ,//用户编号
          'houseCert': _this.tableData[i].houseCert ,//房产证号
          'contractNo': _this.tableData[i].contractNo ,//供水合同编号
          'contractAddr': _this.tableData[i].contractAddr ,//供水合同签订地址
          'contractDate': _this.tableData[i].contractDate ,//供水合同签订时间
          'openDate': _this.tableData[i].openDate ,//开户日期
          'comments': _this.tableData[i].comments ,//备注
          'tradeClassify': _this.tableData[i].tradeClassify ,//行业分类
          'meterType': _this.tableData[i].meterType ,//水表类型
          'useWaterObject': _this.tableData[i].useWaterObject ,//用水对象
          'meterUse': _this.tableData[i].meterUse ,//行业分类
          'fatherMeterNo': _this.tableData[i].fatherMeterNo ,//总表编号
          'meterNo': _this.tableData[i].meterNo ,//水表编号
          'setupMeterAddr': _this.tableData[i].setupMeterAddr ,//装表地址
          'setupMeterLocation': _this.tableData[i].setupMeterLocation ,//装表位置
          'setupMeterDate': _this.tableData[i].setupMeterDate ,//装表日期
          'bookNo': _this.tableData[i].bookNo ,//册本号
          'sortNo': _this.tableData[i].sortNo ,//排序号
          'meterReadingCycle': _this.tableData[i].meterReadingCycle ,//抄表周期
          'useWaterType': _this.tableData[i].useWaterType ,//用水类型
          'inflate': _this.tableData[i].inflate ,//是否加压
          'secondaryWater': _this.tableData[i].secondaryWater ,//是否二供
        }
        test.push(data) 
      }
      var params = {
        "busicode": "PjMeterSave",
        "data": {
          'consultId': val,
          'userInfo' : test
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        this.$notify({
          title: '成功',
          message: '多水表保存成功',
          type: 'success'
        });
      })
    }
  },
  watch:{
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  },
}
</script>
<style lang="scss">
  .water-meter{
    height: 100%;
    width: 100%;
    
    .table-content{
      height: 40px;
      background: #f3f5fb;
      padding: 5px 0px 0px 0px;
      margin: 0 20px;

      font{
        font-weight: 700;
        padding: 5px 20px;
        font-size: 12px;
        margin-bottom: 5px;
      }
      .add-line {
        float: right;
        margin-right: 20px;
        // margin-bottom: 5px;
        .el-button--info{
          background-color: #b5bac3;
          border-color: #b5bac3;
        }
      }
    }
  }
  
</style>