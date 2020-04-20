<template>
  <div class="water-type">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="EditVisible">
        <el-button size="mini" type="primary" @click="submitForm('WaterTypeEditForm')">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
      </div>
    </div>

    <div v-show="EditVisible">
      <WaterTypeEdit ref="WaterTypeEdit"></WaterTypeEdit>
    </div>

    <div v-show="!EditVisible" class="company-content">
      <div class="company-left">
        <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
      </div>
      <div class="company-right">
        <div class="kl-table">
          <el-table :max-height="maxHeight" stripe border :data="tableData" class="wuserInfo-table">

            <el-table-column type="index" label="NO." width="50" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="waterTypeNo" min-width="100" label="类型编号">

            </el-table-column>

            <el-table-column prop="waterTypeName" min-width="100" label="类型名称">

            </el-table-column>
            <el-table-column prop="sortNo" min-width="100" label="排序" show-overflow-tooltip>

            </el-table-column>

            <el-table-column prop="status" min-width="100" label="状态">
            </el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text" @click.native="add(scope.row)" style="font-size:12px;">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WaterTypeEdit from "./WaterTypeEdit";

export default {
  components: {
    WaterTypeEdit
  },

  name: "water-type-index",
  data() {
    return {
      EditVisible: false, //弹出表单
      tableData: [{}],
      formData: {
        waterTypeName: "",
        sortNo: "",
        status: ""
      },
      crumbsData: {
        //面包屑
        titleList: [
          { title: "收费管理" },
          { title: "价格管理" },
          { title: "用水类型" }
        ]
      },
      maxHeight: 0,
      tableShow: false,
      treeDatas: {
        tree: [{ foreignkey: "全部", id: "222", _child: [] }],
        defaultProps: {
          label: "name",
          children: "children"
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: "请输入节点"
        },
        sendTreeProp: [
          "code",
          "name",
          "districtArr",
          "children",
          "id",
          "group",
          "isLeaf",
          "isParent",
          "parent",
          "sonData"
        ],
        rootName: "总部",
        defaultOpen: {
          nodeKey: "id"
          // nodeItem:164
        }
      },
      waterTypeNo: "",
      treeParantId: ""
    };
  },
  mounted() {
    this.getTreeDatas();

    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".water-type .water-type-right-content", [
        ".water-type .toolbar"
      ]);
    });
  },
  methods: {
    // 添加按钮点击事件
    add(val) {
      this.EditVisible = true;
      if (val === "add") {
        this.$refs.WaterTypeEdit.editData({
          waterTypeName: "",
          sortNo: "",
          status: ""
        });
        // this.$set(this.crumbsData.titleList,"4",{title:'添加',method:()=>{window.histroy.back()}});
        this.common.chargeObjectEqual(
          this,
          this.formData,
          "set",
          "WaterTypeEdit"
        );
      } else {
        // this.$set(this.crumbsData.titleList,"4",{title:'编辑',method:()=>{window.histroy.back()}});
        let _this = this;
        let params = {
          busicode: "WaterTypeQuery",
          data: {
            waterTypeId: val.waterTypeId
          }
        };
        this.$api
          .fetch({
            params: params //参数
          })
          .then(res => {
            _this.$refs.WaterTypeEdit.editData(res);
            _this.common.chargeObjectEqual(this, res, "set", "WaterTypeEdit");
          });
      }
    },
    // 列表的NO列
    indexMethod(index) {
      return index + 1;
    },
    init() {
      let _this = this;
      let params = {
        busicode: "WaterTypeList",
        data: { waterTypeNo: this.waterTypeNo }
      };
      this.$api
        .fetch({
          params: params //参数
        })
        .then(res => {
          _this.tableData = res.pageInfo.list;
        });
    },
    // 获取树的数据
    getTreeDatas() {
      let _this = this;
      let params = {
        busicode: "WaterTypeTree",
        data: {}
      };
      this.$api
        .fetch({
          params: params //参数
        })
        .then(res => {
          _this.treeDatas.tree = res;
          _this.waterTypeNo = res.code;
          _this.treeParantId = res.id;
          _this.$set(_this.crumbsData.titleList, "3", {
            title: res.name,
            method: () => {
              window.histroy.back();
            }
          });
          _this.init();
        });
    },
    closeDialog() {
      this.EditVisible = false;
      // this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {
      this.$refs.WaterTypeEdit.handleClose();
    },
    // 树的点击
    backTreeData(val) {
      let _this = this;
      this.treeParantId = val.id;
      this.waterTypeNo = val.code;
      // this.$set(this.crumbsData.titleList,"3",{title:val.name,method:()=>{window.histroy.back()}});
      let params = {
        busicode: "WaterTypeList",
        data: { waterTypeNo: this.waterTypeNo }
      };
      this.$api
        .fetch({
          params: params //参数
        })
        .then(res => {
          _this.tableData = res.pageInfo.list;
        });
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[4].title;
      this.$refs.WaterTypeEdit.submitForm(formName, type, this.treeParantId);
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
.water-type {
  height: 100%;
}
</style>
