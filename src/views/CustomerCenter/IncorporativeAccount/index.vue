
<template>
  <div class="mergeCust">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" icon="el-icon-s-check" type="primary" @click="getData()">确定并户</el-button>
        <!-- <el-button icon="el-icon-caret-left" size="mini" @click="closeMergeCustDialog">返回</el-button> -->
      </div>
    </div>
    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline" label-width="130px">

        <el-form-item class="form-left">
          <el-form-item label="身份证号码：" class="width-200">
            <el-input v-model="tableQuery.certNo" placeholder="请输入需要并户的身份证号码" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <div style="margin-bottom:10px">
        <i class="tips">单击切换主客户号，默认第一户为主客户号</i>
      </div>
      <el-table @cell-click="cellClick" @row-dblclick="changeTag" @selection-change="handleSelectionChange" current-change stripe border :data="tableData" class="change-tables-table">

        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="ctmNo" min-width="120" label="客户编号">
        </el-table-column>

        <el-table-column prop="ctmName" min-width="180" label="客户名称">
        </el-table-column>

        <el-table-column prop="ctmAddr" min-width="180" label="客户地址">
        </el-table-column>

        <el-table-column prop="ctmType" min-width="100" label="客户类型">
        </el-table-column>

        <el-table-column prop="linkTel" min-width="100" label="联系电话">
        </el-table-column>

        <el-table-column prop="mobile" min-width="80" label="手机号码">
        </el-table-column>

        <el-table-column prop="flag" label="是否为主客户" min-width="160">
          <template slot-scope="scope">
            <el-radio v-model="tableData[scope.$index].flag" :label="1" @change="change(1,scope.$index)" :disabled="disabled">主客户</el-radio>
            <el-radio v-model="tableData[scope.$index].flag" :label="0" @change="change(0,scope.$index)" :disabled="disabled">次客户</el-radio>
          </template>
        </el-table-column>

        <el-table-column min-width="60" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  name: "mergeCust",
  data() {
    return {
      num: 0,
      disabled:true,
      multipleSelection: [],//被选中的客户
      flag: 1,//1主客户/0次客户
      crumbsData: {  //面包屑
        titleList: [
          // { title: '业务管理', path: '/customerManagement' },
          { title: '客户管理' },
          { title: '并户' }
        ],

      },
      tableData: [],

      tableQuery: {
        certNo: '',
        page: 1,
        pageCount: 20,
      },
    }
  },
  methods: {
    cellClick(row, column, cell, event) {
      if (column.label === '是否为主客户') {
        console.log('111');
      }
    },
    //主客户/次客户的切换 
    change(status, num) {
      console.log(status, num);
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请勾选你所需的并户！',
          type: 'warning'
        });
        return
      }
      if (status == 1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (i == num) {
            this.tableData[i].flag = 1;
            this.$set(this.tableData[i],'flag',1)
            // this.multipleSelection[i].flag = 1;
            this.$set(this.multipleSelection[i],'flag',1);
          } else {
            this.tableData[i].flag = 0;
            this.$set(this.tableData[i],'flag',0)
            // this.multipleSelection[i].flag = 0;
            this.$set(this.multipleSelection[i],'flag',0);
          }
        }
      }
      console.log(this.multipleSelection);
    },
    //查询
    demand() {
      if (this.tableQuery.certNo == '') {
        this.$message({
          message: '身份证号码不能为空！',
          type: 'warning'
        });
        return
      }
      let _this = this;
      let params = {
        "busicode": "ClientInfoList",
        "data": {
          "certNo": _this.tableQuery.certNo,
        },
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        console.log(res);
        if (_this.num == 0) {
          res.flag = 1;
        } else {
          res.flag = 0;
        }
        if (_this.tableData.length !== 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (res.ctmNo == _this.tableData[i].ctmNo) {
              this.$message({
                message: '不能重复查询相同的身份证号',
                type: 'warning'
              });
              return
            }
          }
        }
        _this.tableQuery.certNo = '';
        _this.tableData.push(res);
        console.log(_this.tableData);
        _this.num++;
      })
    },
    //确定并户
    getData() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length < 2) {
        this.$message({
          message: '并户的客户数量不能小于2！',
          type: 'warning'
        });
        return
      }
      let j = 0;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        console.log(this.multipleSelection[i].flag == 1);
        if (this.multipleSelection[i].flag == 1) {
          j++;
        }
      }
      console.log(j);
      if (j == 0) {
        this.$message({
          message: '请选择一个主客户！',
          type: 'warning'
        });
        return
      }else if(j > 1){
        this.$message({
          message: '主客户的数量只能为一个！',
          type: 'warning'
        });
        return
      }
      let _this = this;
      let params = {
        "busicode": "ClientInfoMerge",
        "data": _this.multipleSelection,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        this.$message({
          message: '并户成功',
          type: 'success'
        });
        console.log(_this.tableData);
        for (let i = 0; i < _this.tableData.length; i++) {
          if (_this.tableData[i].flag == 1) {
            let data = _this.tableData[i];
            _this.tableData = [];
            _this.tableData.push(data)
          }
        }
      })
    },
    // 删除
    remove(i, row) {
      console.log(i, row);
      this.$confirm('此操作将删除此客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.tableData.splice(i, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //获取表格序号
    indexMethod(index) {
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    changeTag(row, column, event) {
      // console.log(column); 
    },

    handleSelectionChange(val) {
      //this.multipleSelection = val;
      console.log(val);
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        let data = {
          ctmNo: '',
          flag: '',
        }
        data.ctmNo = val[i].ctmNo;
        data.flag = val[i].flag;
        this.multipleSelection.push(data);
      }
      if (this.multipleSelection.length > 0) {
        this.disabled = false;
      }else{
        this.disabled = true;
      }
      console.log(this.multipleSelection);
    }
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.mergeCust {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  .tips {
    font-size: 12px;
    font-style: inherit;
    color: #7b7579;
  }
}
</style>
