<template>
  <div class="water-mater-manfa">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('WaterMeterfacturerEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
    
      <div v-show="EditVisible">
        <WaterMeterfacturerEdit ref="WaterMeterfacturerEdit"></WaterMeterfacturerEdit>
      </div>

      <div  v-show="!EditVisible" class="water-mater-manfa-right-content">
        <div class="toolbar">
            <el-form :inline="true" size="mini" class="demo-form-inline">
                
                <el-form-item class="form-left">

                    <el-form-item label="供应商名称：" class="">
                        <el-input v-model="tableQuery.factoryName" clearable placeholder="供应商名称" @keyup.enter.native="search"></el-input>
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

            <el-table-column prop="factoryName" min-width="100" label="厂家名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="factoryFullName" min-width="100" label="厂家全称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="factoryAddr" min-width="100" label="厂家地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="linkMan" min-width="100" label="联系人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="linkTel" min-width="100" label="座机号码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sortNo" min-width="100" label="排序号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" min-width="80" label="状态">
            </el-table-column>
            <el-table-column prop="comments" min-width="100" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text" @click.native="add(scope.row)" style="font-size:12px;">编辑</el-button>
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
import WaterMeterfacturerEdit from "./WaterMeterfacturerEdit"

export default {
  components:{
      WaterMeterfacturerEdit,
  },
  name: "water-mater-manfa-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      formData:{
        factoryName:'',
        factoryFullName:'',
        factoryAddr:'',
        linkMan:'',
        linkTel:"",
        status:'',
        sortNo:'',
        comments:'',

      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '水表配置', method: () => { window.histroy.back() } },
          { title: '水表供应商', method: () => { window.histroy.back() } }
        ],
      },
      maxHeight: 0,
      tableShow: false,
      tableData:[
      ],
      tableQuery:{
        page:1,
        pageCount:50
      }
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.water-mater-manfa .water-mater-manfa-right-content', ['.water-mater-manfa .block','.water-mater-manfa .toolbar'])
    })
  },

   methods: {
    init() {
      let _this = this
      let params = {
          "busicode": "MeterFactoryList",
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
          this.$refs.WaterMeterfacturerEdit.editData({
            factoryName:'',
            factoryFullName:'',
            factoryAddr:'',
            linkMan:'',
            linkTel:"",
            status:'',
            sortNo:'',
            comments:'',
          });
          // this.crumbsData.titleList.push({title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(this,this.formData,'set','WaterMeterfacturerEdit');
        }else{
          // this.crumbsData.titleList.push({title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
              "busicode": "MeterFactoryQuery",
              "data": {
                factoryId:val.factoryId,
              },
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            this.$refs.WaterMeterfacturerEdit.editData(res);
            this.common.chargeObjectEqual(this,res,'set','WaterMeterfacturerEdit');
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
        
        this.$refs.WaterMeterfacturerEdit.handleClose();
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[3].title;
        this.$refs.WaterMeterfacturerEdit.submitForm(formName,type);
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

