<template>
  <div>
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('BIlTypeEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>

      <div v-if="EditVisible">
        <BIlTypeEdit ref="BIlTypeEdit"></BIlTypeEdit>
      </div>
       
      <div v-show="!EditVisible">
        <div class="kl-table">
          <el-table 
            v-if="tableShow" 
            :max-height="maxHeight" 
            stripe border 
            :data="tableData.list" 
            class="wuserInfo-table">
            <el-table-column type="index" label="序号" fixed="left" width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="strategyName" min-width="80" label="票据编号">
            </el-table-column>


            <el-table-column prop="strategyName" min-width="80" label="票据名称">
            </el-table-column>

            <el-table-column prop="status" min-width="120" label="状态">
            </el-table-column>


            <el-table-column prop="comments" min-width="120" label="备注">
            </el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text"  @click.native="add(scope.row)">编辑</el-button>
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
import BIlTypeEdit from "./BIlTypeEdit"
export default {
  components:{
      BIlTypeEdit,
  },
  name: "BillType-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      tableData:{
          list:[
          {
            strategyName:'电子发票',
            status:'启用',
            comments:'', 
          },
          {
            strategyName:'财政收据',
            status:'启用',
            comments:'', 
          },
          {
            strategyName:'普通发票',
            status:'启用',
            comments:'', 
          },
          {
            strategyName:'增值税发票',
            status:'启用',
            comments:'', 
          }],
          total :4,
      },
      //   查询表单
      formData: {
        strategyName:"",
        status: "",
        comments: "",
        prefStrategylList:[],
      },
      crumbsData: {  //面包屑`    
        titleList: [
          
          { title: '其他配置' },
          { title: '票据类型' }
        ],
      },
      tableShow: false,
      maxHeight:"",
      tableQuery:{
        page:1,
        pageCount:50,
        status:"",
        searchContent:"",
      }
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.BillType .BillType-right-content', ['.BillType .toolbar','.BillType .block'])
    })
  },
  methods: {
    init() {
      let _this = this
    
      
    },
     // 搜索
    search(){
      this.tableQuery.page = 1;
      this.init()
    },
    // 添加按钮点击事件
      add(val) {
        this.EditVisible = true;

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
      // 返回
      handleClose() {
        
        
        // this.crumbsData.titleList.pop();
        this.EditVisible = false;
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[2].title;
        this.$refs.BIlTypeEdit.submitForm(formName,type);
      },
      // 添加行
      addRow(){
        this.$refs.BIlTypeEdit.addRow();
      }
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


