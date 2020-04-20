<template>
  <div class="business-area">
        
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('BusinessAreaEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
      
      <div v-show="EditVisible">
        <BusinessAreaEdit ref="BusinessAreaEdit"></BusinessAreaEdit>
      </div>
      <div v-show="!EditVisible">
        <div class="kl-table">

          <el-table 
            v-if="tableShow" 
            :max-height="maxHeight" 
            stripe border 
            :data="tableData" 
            class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>
            
            <el-table-column prop="branchNo" width="70" label="网点编号">
            </el-table-column>

            <el-table-column prop="branchName"  width="120" label="网点名称">
            </el-table-column>


            <el-table-column prop="branchAddr"  label="网点地址">
            </el-table-column>
            <el-table-column prop="branchOpsition" width="150" label="网点坐标">
            </el-table-column>
            

            <el-table-column prop="businessTime" width="120" label="营业时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sortNo" width="70" label="排序号">
            </el-table-column>

            <el-table-column prop="status" width="60" label="状态">
            </el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <!-- style="font-size:12px;text-align:center;" -->
                <el-button type="text" @click.native="add(scope)">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      
      </div>

  </div>
</template>
<script>
import BusinessAreaEdit from "./BusinessAreaEdit"

export default {
  name: "business-area-index",
  components:{
      BusinessAreaEdit,
  },
  data() {
    return {
      tableData:[],
      EditVisible:false,//弹出表单
      formData: {
        branchNo:'',
        branchName:'',
        branchOpsition:'',
        branchAddr:'',
        businessTime:"",
        status:'',
        comments:'',
        sortNo:"",
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '区域配置', method: () => { window.histroy.back() } },
          { title: '营业所', method: () => { window.histroy.back() } }
        ],
      },
      
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit('asideMenuShow', 'basicsMenuShow1')
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.business-area .kl-table', [])
    })
  },
  methods: {
    init() {
      let _this = this
      let params = {
          "busicode": "BusinessBranchList",
          "data": {},
      }
      this.$api.fetch({
      params: params,//参数
      
      }).then(res => {
          _this.tableData = res;
          
      })
      
    },

    // 添加按钮点击事件
      add(val) {
        // this.bankLinkShow = false;
        this.EditVisible = true;
        if(val==='add'){
          this.$refs.BusinessAreaEdit.editData({
            branchNo:'',
            branchName:'',
            branchOpsition:'',
            branchAddr:'',
            businessTime:"",
            status:'',
            comments:'',
            sortNo:"",
          });
          this.common.chargeObjectEqual(this,this.formData,'set','BusinessAreaEdit');
        }else{
          let _this = this;
          let params = {
              "busicode": "BusinessBranchQuery",
              "data": {
                id:val.row.id,
              },
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            this.$refs.BusinessAreaEdit.editData(res);
            this.common.chargeObjectEqual(this,res,'set','BusinessAreaEdit');
          })
        }
        
      },
      // 列表的NO列
      indexMethod(index) {
        return index+1 ;
      },
      closeDialog(){
        // this.crumbsData.titleList.pop();
        this.EditVisible = false;
      },
      // 返回
      handleClose() {
        
        this.$refs.BusinessAreaEdit.handleClose();
      },
      //保存按钮
      submitForm(formName) {
        this.$refs.BusinessAreaEdit.submitForm(formName);
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

