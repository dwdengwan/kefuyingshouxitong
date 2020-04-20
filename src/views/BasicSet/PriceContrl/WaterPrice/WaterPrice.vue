
<template>
  <div class="WaterPrice">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="EditVisible">
        <el-button size="mini" type="primary" @click="submitForm('WaterPriceEditFrom')">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
      </div>
    </div>
    <div v-if="EditVisible" class="WaterPriceEditContain">
      <WaterPriceEdit ref="WaterPriceEdit"></WaterPriceEdit>
    </div>

    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label="状态：">
            <el-select v-model="tableQuery.status" placeholder="请选择状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用水类型：" class="searchInput">
            <el-input v-model="tableQuery.useWaterType " @keyup.enter.native="search" clearable placeholder="用水类型"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form-item>

      </el-form>
    </div>
    <div class="kl-table">
      <el-table :max-height="maxHeight" v-if="tableShow" stripe border :data="tableData.list" class="wuserInfo-table">

        <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
        </el-table-column>


        <el-table-column prop="useWaterType" min-width="100" label="用水类型">
        </el-table-column>


        <el-table-column prop="effectiveDate" min-width="100" label="生效时间">
        </el-table-column>

        <el-table-column prop="expiryDate" min-width="100" label="截至时间">
        </el-table-column>

        <el-table-column prop="status" min-width="80" label="状态">
        </el-table-column>

        <el-table-column label="操作" width="85">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click.native="add(scope.row)">编辑</el-button>
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
</template>
<script>
import WaterPriceEdit from "./WaterPriceEdit";
export default {
  name: "WaterPrice-index",
  components: {
    WaterPriceEdit
  },
  data() {
    return {
      EditVisible: false, //弹出表单
      formData: {
        useWaterType: "",
        penaltyStrategy: "",
        effectiveDate: "",
        expiryDate: "",
        status: "",
        ladderlist: []
      },
      tableData: [],
      crumbsData: {
        //面包屑
        titleList: [
          { title: "收费管理" },
          { title: "价格管理" },
          { title: "用水价格" }
        ]
      },
      maxHeight: 0,
      tableShow: false,
      tableQuery: {
        page: 1,
        pageCount: 50,
        status: "",
        useWaterType: ""
      }
    };
  },
  mounted() {
    // 侧边栏
    eventBus.$emit("asideMenuShow", "businessMenuShow4");
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".WaterPrice .WaterPrice-right-content", [
        ".WaterPrice .toolbar",
        ".WaterPrice .block"
      ]);
    });
  },
  methods: {
    init() {
      let _this = this;
      let params = {
        busicode: "WaterPriceList",
        data: this.tableQuery
      };
      this.$api
        .fetch({
          params: params //参数
        })
        .then(res => {
          _this.tableData = res;
        });
    },
    // 搜索
    search() {
      this.tableQuery.page = 1;
      this.init();
    },
    // 添加按钮点击事件
    add(val) {
      // this.bankLinkShow = false;
      this.EditVisible = true;
      this.$nextTick(() => {
        if (val === "add") {
          //取所有费用种类
          let _this = this;
          //费用名称
          this.$api
            .fetch({
              params: {
                busicode: "DetailNameSelect",
                data: {}
              } //参数
            })
            .then(res => {
              let costList = []; //费用种类
              let detailNameOptions = {};
              for (let i = 0; i < res.length; i++) {
                if (!detailNameOptions[res[i].costId])
                  detailNameOptions[res[i].costId] = [];
                detailNameOptions[res[i].costId][
                  detailNameOptions[res[i].costId].length
                ] = res[i];
                let isfound = false;
                for (let j = 0; j < costList.length; j++) {
                  if (costList[j].costId === res[i].costId) {
                    isfound = true;
                    break;
                  }
                }
                if (!isfound) {
                  costList[costList.length] = {
                    costId: res[i].costId,
                    costName: res[i].costName
                  };
                }
              }
              //默认显示所有的费用种类
              this.$refs.WaterPriceEdit.detailNameOptions = detailNameOptions;

              this.$refs.WaterPriceEdit.editData({
                useWaterType: "",
                penaltyStrategy: "",
                effectiveDate: "",
                expiryDate: "",
                status: "",
                ladderlist: costList
              });
            });
          // this.crumbsData.titleList.push({title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(
            this,
            this.formData,
            "set",
            "WaterPriceEdit"
          );
        } else {
          // this.crumbsData.titleList.push({title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
            busicode: "WaterPriceQuery",
            data: {
              waterPriceId: val.waterPriceId
            }
          };
          this.$api
            .fetch({
              params: params //参数
            })
            .then(res => {
              let handleData = res.WaterPricebean;
              handleData.ladderlist = res.ladderlist;
              this.$refs.WaterPriceEdit.detailNameOptions =
                res.detailNameOptions;
              this.$refs.WaterPriceEdit.editData(handleData);
              this.common.chargeObjectEqual(
                this,
                handleData,
                "set",
                "WaterPriceEdit"
              );
            });
        }
      });
    },
    // 列表的NO列
    indexMethod(index) {
      return (
        (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
      );
    },
    handleSizeChange(val) {
      //显示多少数据一页
      this.tableQuery.pageCount = val;
      this.tableQuery.page = 1;
      this.init();
    },
    handleCurrentChange(val) {
      //页码点击
      this.tableQuery.page = val;
      this.init();
    },
    closeDialog() {
      // this.crumbsData.titleList.pop();
      this.EditVisible = false;
    },
    // 返回
    handleClose() {
      this.$refs.WaterPriceEdit.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[3].title;
      this.$refs.WaterPriceEdit.submitForm(formName, type);
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.WaterPrice {
  width: 100%;
  height: 100%;
  .WaterPriceEditContain {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>


