<template>
  <div class="bank-info">
    
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="EditVisible">
            <el-button size="mini" type="primary" @click="submitForm('BankInfoEditForm')">保存</el-button>
            <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else>
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
        </div>
      </div>
      
      <div v-show="EditVisible">
        <BankInfoEdit ref="BankInfoEdit"></BankInfoEdit>
      </div>
      <div v-show="!EditVisible" class="company-content">
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="company-right">
          <el-table 
              v-if="tableShow" 
              :max-height="maxHeight" 
              stripe border 
              :data="tableData" 
              class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod"></el-table-column>

            <el-table-column prop="bankName" min-width="100" label="银行名称">
            </el-table-column>

            <el-table-column prop="bankNumber" min-width="100" label="银行行号">
            </el-table-column>

            <el-table-column prop="linkMan" min-width="100" label="联系人">
            </el-table-column>

            <el-table-column prop="linkTel" min-width="100" label="座机号码">
            </el-table-column>

            <el-table-column prop="sortNo" min-width="80" label="排序号">
            </el-table-column>
            <el-table-column prop="status" min-width="80" label="状态">
            </el-table-column>

            <el-table-column prop="comments" min-width="150" label="备注" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="add(scope.row)">编辑</el-button>
              </template>
            </el-table-column>

            
          </el-table>
        </div>
      </div>
  </div>
</template>
<script>
import BankInfoEdit from "./BankInfoEdit"

export default {
  components:{
      BankInfoEdit,
  },
  name: "bank-info-index",
  data() {
    return {
      EditVisible:false,//弹出表单
      formData:{
        bankName:'',
        bankNumber:'',
        linkMan:'',
        linkTel:'',
        sortNo:'',
        status:'',
        comments:"",

      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '基础信息', path: '/BusinessArea' },
          { title: '其他配置' },
          { title: '银行信息' }
        ],
      },
      maxHeight: 0,
      tableShow: false,
      tableData:[
      ],
      treeDatas: {
        tree: [{ foreignkey: '全部', id: '222', _child: 
        [
        ]
        }],
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['code', 'name', 'districtArr', 'children', 'id', 'group', 'isLeaf','isParent','parent','sonData'],
        rootName: '总部',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      bankNo:"",
      treeParantId:"",
    }
  },
  mounted() {
    this.getTreeDatas();
    
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      // .bank-info-right-content
      this.common.changeTable(this, '.bank-info .company-content', []);
    })
  },
  methods: {
    // 添加按钮点击事件
      add(val) {
        this.EditVisible = true;
        if(val==='add'){
            this.$refs.BankInfoEdit.editData({
              bankName:'',
              bankNumber:'',
              linkMan:'',
              linkTel:'',
              sortNo:'',
              status:'',
              comments:"",
            });
          // this.$set(this.crumbsData.titleList,"4",{title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(this,this.formData,'set','BankInfoEdit');
        }else{
            // this.$set(this.crumbsData.titleList,"4",{title:'编辑',method:()=>{window.histroy.back()}});
            let _this = this;
            let params = {
                "busicode": "BankQuery",
                "data": {
                  bankId:val.bankId,
                },
            }
            this.$api.fetch({
              params: params,//参数
            }).then(res => {
              this.$refs.BankInfoEdit.editData(res);
              this.common.chargeObjectEqual(this,res,'set','BankInfoEdit');
            })
        }
        
      },
      // 列表的NO列
      indexMethod(index) {
        return index+1 ;
      },
      init() {
        let _this = this;
        
        let params = {
            "busicode": "BankList",
            "data": {bankNo:this.bankNo},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
            _this.tableData = res.pageInfo.list;      
          
          
        })
       
      },
      // 获取树的数据
      getTreeDatas(){
        let _this = this
        let params = {
          "busicode": "BankTree",
          "data": {},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.treeDatas.tree = res;
          _this.bankNo = res.code;
          _this.treeParantId = res.id;
          // _this.$set(this.crumbsData.titleList,"3",{title:res.name,method:()=>{window.histroy.back()}});
          _this.init();
        })
      },
      closeDialog(){
        this.EditVisible = false;
        // this.crumbsData.titleList.pop();
      },
      // 返回
      handleClose() {
        
        this.$refs.BankInfoEdit.handleClose();
      },
      // 树的点击
      backTreeData(val) { 
        let _this = this;
        this.treeParantId = val.id;
        this.bankNo = val.code;
        // this.$set(this.crumbsData.titleList,"3",{title:val.name,method:()=>{window.histroy.back()}});
        let params = {
            "busicode": "BankList",
            "data":  {bankNo:this.bankNo},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {

          _this.tableData = res.pageInfo.list; 

        })
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[4].title;
        this.$refs.BankInfoEdit.submitForm(formName,type,this.treeParantId);
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



