<template>
  <div class="water-mater-model">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('WatermeterModelEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
    
      <div v-show="EditVisible">
        <WatermeterModelEdit ref="WatermeterModelEdit"></WatermeterModelEdit>
      </div>

      <div v-show="!EditVisible">
        <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                
                <el-form-item class="form-left">

                    <el-form-item label="水表型号：">
                      <el-input v-model="tableQuery.modelName"
                       @keyup.enter.native="search"
                                placeholder="请输入水表型号">
                      </el-input>
                    </el-form-item>

                    <el-form-item>
                        
                        <el-button class='searchBtn'  @click="search" icon="el-icon-search"></el-button>
                    </el-form-item>
                    
                </el-form-item>

            </el-form>
        </div>

        <div class="kl-table">
          <el-table 
            v-if="tableShow" 
            :max-height="maxHeight" 
            stripe border 
            :data="tableData.list" 
            class="wuserInfo-table">
            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="modelName" min-width="100" label="水表型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="meterType" min-width="100" label="水表型式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="transWay" min-width="100" label="传输方式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="meterSensor" min-width="100" label="水表传感器" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sortNo" min-width="100" label="排序号">
            </el-table-column>
            <el-table-column prop="status" min-width="80" label="状态">
            </el-table-column>
            
            <el-table-column prop="comments" min-width="100" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <!-- style="font-size:12px;" -->
                <el-button type="text" @click.native="add(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
            </el-pagination>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
import WatermeterModelEdit from "./WatermeterModelEdit"

export default {
  components:{
      WatermeterModelEdit,
  },
  name: "water-mater-model-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      formData:{
        modelName: "",
        meterType: "",
        transWay: "",
        meterSensor:"",
        comments:"",
        status:"",
        sortNo:""

      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '水表配置', method: () => { window.histroy.back() } },
          { title: '水表型号', method: () => { window.histroy.back() } }
        ],
      },
      maxHeight: 0,
      tableShow: false,
      tableData:[
      ],
      tableQuery:{
        page:1,
        pageCount:50,
        modelName:"",
      }
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'basicsMenuShow2')
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.water-mater-model .water-mater-model-right-content', ['.water-mater-model .block','.water-mater-model .toolbar'])
    })
  },
  methods: {
    init() {
      let _this = this
      let params = {
          "busicode": "MeterModelList",
          "data": this.tableQuery,
      }
      this.$api.fetch({
      params: params,//参数
      
      }).then(res => {
          _this.tableData = res;
          
      })
      
    },
     // 搜索
    search(){
      this.tableQuery.page = 1;
      this.init()
    },
    // 添加按钮点击事件
      add(val) {
        // this.bankLinkShow = false;
        this.EditVisible = true;
        if(val==='add'){
          this.$refs.WatermeterModelEdit.editData({
            modelName: "",
            meterType: "",
            transWay: "",
            meterSensor:"",
            comments:"",
            status:"",
            sortNo:""
          });
          // this.crumbsData.titleList.push({title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(this,this.formData,'set','WatermeterModelEdit');
        }else{
          // this.crumbsData.titleList.push({title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
              "busicode": "MeterModelQuery",
              "data": {
                modelId:val.modelId,
              },
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            this.$refs.WatermeterModelEdit.editData(res);
            this.common.chargeObjectEqual(this,res,'set','WatermeterModelEdit');
          })
        }
        
      },
      // 列表的NO列
      indexMethod(index) {
        return (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      },
      handleSizeChange(val) { //显示多少数据一页
        this.tableQuery.pageCount = val;
        this.tableQuery.page = 1;
        this.init();
      },
      handleCurrentChange(val) {  //页码点击
        this.tableQuery.page = val;
        this.init();
      },
      closeDialog(){
        // this.crumbsData.titleList.pop();
        this.EditVisible = false;
      },
      // 返回
      handleClose() {
        
        this.$refs.WatermeterModelEdit.handleClose();
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[3].title;
        this.$refs.WatermeterModelEdit.submitForm(formName,type);
      },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
