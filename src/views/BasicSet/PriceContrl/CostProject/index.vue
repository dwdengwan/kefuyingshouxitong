<template>
  <div class="cost-project">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('CostProjectEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
 
      
      <div v-show="EditVisible">
        <CostProjectEdit ref="CostProjectEdit"></CostProjectEdit>
      </div>
       

      <div v-show="!EditVisible" class="cost-project-right-content">

        <div class="kl-table">
            <el-table 
                      v-if="tableShow" 
                      :max-height="maxHeight" 
                      stripe border 
                      :data="tableData" 
                      class="wuserInfo-table">

              <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
              </el-table-column>

              <el-table-column prop="costName" min-width="100" label="费用种类名称" fixed show-overflow-tooltip>
                
              </el-table-column>

              <el-table-column prop="costNo" min-width="80" label="费用种类编号">
                
              </el-table-column>

              <el-table-column prop="consultPrice" min-width="80" label="参考价格">
                
              </el-table-column>
              <el-table-column prop="sortNo" min-width="70" label="排序号" show-overflow-tooltip>
                
              </el-table-column>

              <el-table-column prop="status" min-width="80" label="状态">
                
              </el-table-column>

              <el-table-column prop="comments" min-width="200" label="备注" show-overflow-tooltip>
                
              </el-table-column>

              

              <el-table-column label="操作" width="70" fixed='right'>
                <template slot-scope="scope">
                  <el-button type="text" @click.native="add(scope.row)" style='font-size:12px;'>编辑</el-button>
                </template>
              </el-table-column>

            </el-table>
        </div>
      </div>
  </div>
</template>
<script>import CostProjectEdit from "./CostProjectEdit"

export default {
  components:{
      CostProjectEdit,
  },

  name: "cost-project-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      tableData:[

      ],
      formData: {
        costId:"",
        costName: "",
        costNo: "",
        consultPrice:"",
        comments: "",
        status: '',
        sortNo:''
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统设置', path: '/BusinessArea' },
          { title: '价格管理', path: '/WaterType' },
          { title: '费用种类', method: () => { window.histroy.back() } }
        ],
      },
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.cost-project .cost-project-right-content', [])
    })
  },
  methods: {
    init() {
      let _this = this;
      let params = {
          "busicode": "CostList",
          "data":{},
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
          this.$refs.CostProjectEdit.editData({
            costId:"",
            costName: "",
            costNo: "",
            consultPrice:"",
            comments: "",
            status: '',
            sortNo:''
          });
          this.crumbsData.titleList.push({title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(this,this.formData,'set','CostProjectEdit');
        }else{
          this.crumbsData.titleList.push({title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
              "busicode": "CostQuery",
              "data": {
                costId:val.costId,
              },
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            this.$refs.CostProjectEdit.editData(res);
            this.common.chargeObjectEqual(this,res,'set','CostProjectEdit');
          })
        }
        
      },
      // 列表的NO列
      indexMethod(index) {
        return index+1;
      },
      closeDialog(){
        this.crumbsData.titleList.pop();
        this.EditVisible = false;
      },
      // 返回
      handleClose() {
        
        this.$refs.CostProjectEdit.handleClose();
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[3].title;
        this.$refs.CostProjectEdit.submitForm(formName,type);
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
<style lang="scss">
@import "../../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.cost-project {
  width: 100%;
  height: 100%;
  .cost-project-right-content {
    width: 100%;
    height: calc(100% - 40px);
  }
  .kl-table {
    padding: 0px 20px;
    width: calc(100% - 40px);
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
}
</style>

