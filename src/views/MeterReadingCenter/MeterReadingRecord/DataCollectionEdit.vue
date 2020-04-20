
<template>
  <div class="DataCollectionEdit">
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
        <el-form-item class="form-left">
          <el-form-item label="册本号：">
            <el-input v-model="tableQuery.bookNo" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="抄表日期：">
            <el-date-picker 
            v-model="tableQuery.date" 
            size="mini" type="date" 
            placeholder="选择日期" >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最大容忍天数：">
            <el-input v-model="tableQuery.daysMax" placeholder="5"></el-input>
          </el-form-item>
          <el-form-item label="是否异常：">
            <el-select clearable v-model="tableQuery.abnormal" placeholder="是否异常">
              <el-option v-for="(item,index) in abnormalOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="init" >抄读</el-button>
            <el-button size="mini" @click="linkCollect"  type="primary">查看实时数据</el-button>
          </el-form-item>
          <br>
          <el-form-item label="总数：">
            <font color="red">{{treeBooks.Wtotal}}</font>
          </el-form-item>
          <el-form-item label="未抄：">
            <font color="red">{{treeBooks.notCopied}}</font>
          </el-form-item>
          <el-form-item label="已抄：">
            <font color="red">{{treeBooks.Copied}}</font>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>

    <div class="kl-table">
      <el-table stripe border :data="tableData.list" class="change-tables-table">

        <el-table-column type="selection" width="50" fixed="left">
        </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="iserror" min-width="80" label="是否异常">
        </el-table-column>

        <el-table-column prop="connect" min-width="80" label="用户名称">
        </el-table-column>

        <el-table-column prop="userNo" min-width="100" label="用户编号">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="100" label="装表时间">
        </el-table-column>

        <el-table-column prop="connect" min-width="70" label="上期抄表日">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="已抄日期">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="已抄水量">
        </el-table-column>

        <el-table-column prop="fixValue" min-width="80" label="抄表日期">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="止码">
        </el-table-column>

        <el-table-column prop="flux" min-width="80" label="水量">
        </el-table-column>

        <el-table-column prop="lvalue" min-width="100" label="用户地址">
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataCollectionEdit",
  props: ['booksVal'],
  data() {
    return {
      
      //列表存值
      tableData: [],
      //查询表单数据
      tableQuery: {
        page: 1,
        pageCount: 20,
        date: "",//抄表日期
        bookNo: "",//册本号
        abnormal: "",//是否异常
        daysMax:'',//最大容忍天数
      },
      
      //是否异常
      abnormalOption:[{
        value: 0,
        label: '是'
      },{
        value: 1,
        label: '否'
      }],
      treeBooks:{
        Wtotal: 455,
        notCopied: 400,
        Copied: 395,
      },
      DateChoosevalue: "",
    };
  },
  mounted() {
    this.tableQuery.bookNo = this.booksVal.bookNo
    
    
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".DataCollectionEdit", [".DataCollectionEdit .toolbar",".DataCollectionEdit .block",  ]);
    });
  },
  methods: {
      //初始化
    init() {
      let _this = this
      let params = {
          "busicode": "MrRecordCopyList",
          "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
          // _this.tableData = res; 
          this.$nextTick(() => {
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            this.common.changeTable(this, ".DataCollectionEdit", [".DataCollectionEdit .toolbar",".DataCollectionEdit .block",  ]);
          });
      })
    },
    //跳转至集抄系统
    linkCollect(){
      window.open('http://jc.uat.gdhwater.com/cas.htm','_blank')
    },
    indexMethod(index) {//获取表格序号
      return  (index+1)
    },
  }
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.DataCollectionEdit {
  height: calc(100% - 41px);
  margin: 0 auto;
}
</style>
