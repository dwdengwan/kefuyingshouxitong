<template>
  <div class="QualityReading">
    <!-- 抄表抽查 模块 -->
    <!-- index页 -->
    <div v-if="indexShow==1" class="baseContent">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button size="mini" icon="el-icon-plus" @click="add" type="primary">添加</el-button>
        </div>
      </div>
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="queryData" class="demo-form-inline">
          <el-form-item class="form-left">
            <el-form-item label="账期：">
              <el-date-picker v-model="queryData.month" type="month" placeholder="选择账期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="状态：">
              <el-select clearable v-model="queryData.approvalStatus" placeholder="未审">
                <el-option v-for="(item,index) in approvalStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-button class='searchBtn' icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table stripe border :data="tableData">
          <el-table-column type="index" label="序号" fixed="left" width="50">
          </el-table-column>
          <el-table-column prop="state" min-width="60" label="状态">
          </el-table-column>
          <el-table-column prop="engineeringState" min-width="100" label="进度">
          </el-table-column>
          <el-table-column prop="handleName" min-width="100" label="当前处理人">
          </el-table-column>
          <el-table-column prop="engineeringCode" min-width="80" label="单据编号">
          </el-table-column>
          <el-table-column prop="engineeringTime" min-width="80" label="单据日期">
          </el-table-column>
          <el-table-column prop="waterSelect" min-width="80" label="账期">
          </el-table-column>
          <el-table-column prop="num" min-width="80" label="抽检数量">
          </el-table-column>
          <el-table-column prop="num" min-width="80" label="完成数量">
          </el-table-column>
          <el-table-column prop="remark" min-width="200" label="备注">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.native="backEdit(scope.$index, scope.row)">回填</el-button>
              <el-button type="text" size="mini" @click.native="">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
          </el-pagination>
        </div>

      </div>
    </div>
    <!-- 编辑页 -->
    <div v-else-if="indexShow==2" class="baseContent">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <!-- <el-button @click="closeDia" type="primary" size='mini'>选择水表</el-button> -->
          <el-button size="mini" type="primary">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>

      <QualityReadingEdit ref="childWarehousing"></QualityReadingEdit>
    </div>
    <!-- 回填页 -->
    <div v-else-if="indexShow ==4" class="baseContent">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button size="mini" type="primary">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>

      <QualityReadingHuiTian></QualityReadingHuiTian>
    </div>
  </div>
</template>
<script>
import QualityReadingEdit from "./QualityReadingEdit";
import QualityReadingHuiTian from "./QualityReadingHuiTian";
export default {
  components: {
    QualityReadingEdit,
    QualityReadingHuiTian
  },
  name: "QualityReading-index",
  data() {
    return {
      approvalStatusOptions: [
        { value: "1", name: "全部" },
        { value: "2", name: "草稿" },
        { value: "3", name: "进行中" },
        { value: "4", name: "已办结" },
        { value: "5", name: "已废弃" }
      ], //审批状态下拉框
      indexShow: 1, //1 index页 2添加页 3修改页 4回填页
      huitianVisible: false,
      fareDate: ["2019-07-01", "2019-07-05"],
      dialogFormVisible: false, //弹出表单
      tableData: [
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          waterLadder: "0001",
          waterSelect: "2019-09",
          waterState: "2019-09-10",
          remark: "",
          num: "1000"
        },
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          waterLadder: "0002",
          waterSelect: "2019-10",
          waterState: "2019-10-10",
          remark: "",
          num: "101"
        },
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          waterLadder: "0002",
          waterSelect: "2019-10",
          waterState: "2019-10-10",
          remark: "",
          num: "2000"
        }
      ],
      //   查询表单
      queryData: {
        month: "",
        checkDate: ""
      },
      form: {
        ladderType: "month",
        waterSelect: "",
        priceModel: "",
        mixtrueSelect: "",
        waterLevel: "",
        waterValue: false,
        startTime: "",
        endTime: "",
        bulidReson: "",
        priceDetail: "04",
        state: "1",
        bulidTime: "",
        updateReson: "",
        updataTime: "",
        remark: ""
      },
      formLabelWidth: "100px",
      crumbsData: {
        //面包屑`
        titleList: [
          { title: "抄表开账" },
          { title: "检查" },
          { title: "抄表抽查" }
        ]
      },
      rules: {
        Applicant: [
          { required: true, message: "请输入申请人", trigger: "blur" }
        ],
        applicantDate: [
          { required: true, message: "请输入申请日期", trigger: "blur" }
        ],
        engineerType: [
          { required: true, message: "请选择工程类型", trigger: "change" }
        ],
        Contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        documentType: [
          { required: true, message: "请输入证件类型", trigger: "blur" }
        ],
        documentNumber: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        contactNumber: [
          { required: true, message: "请输入座机号码", trigger: "blur" }
        ],
        Emergency: [
          { required: true, message: "请选择紧急程度", trigger: "change" }
        ]
      },
      ruleForm: {
        Applicant: "",
        engineerType: ""
      },
      options1: [
        {
          value: 10,
          label: "包含当前"
        },
        {
          value: 11,
          label: "全部时间"
        }
      ],
      options2: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "停用"
        }
      ],
      options3: [
        {
          value: "01",
          label: "0015_特种用水1.67"
        },
        {
          value: "02",
          label: "0029_区域用水"
        },
        {
          value: "03",
          label: "0030_基本用水1.30"
        }
      ],
      options4: [
        {
          value: "04",
          label: "ZBSF_水费"
        },
        {
          value: "05",
          label: "SZYF_污水处理费"
        },
        {
          value: "06",
          label: "SSCLF_省水处理费"
        }
      ],
      histroyData: {},
      tableShow: false,
      tableList: [
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          startUsage: "0",
          endUsage: "14",
          price: "2.68",
          coefficient: "1.0",
          stageMoney: "0"
        },
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          startUsage: "15",
          endUsage: "28",
          price: "4.68",
          coefficient: "1.0",
          stageMoney: "37.52"
        },
        {
          engineeringCode: "18010",
          concentrator: "周新宇",
          engineeringTime: "2019/07/02",
          startUsage: "",
          endUsage: "",
          price: "",
          coefficient: "",
          stageMoney: ""
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            engineeringCode: "18010",
            concentrator: "周新宇",
            engineeringTime: "2019/07/02",
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            engineeringCode: "18010",
            concentrator: "周新宇",
            engineeringTime: "2019/07/02",
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            engineeringCode: "18010",
            concentrator: "周新宇",
            engineeringTime: "2019/07/02",
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            engineeringCode: "18010",
            concentrator: "周新宇",
            engineeringTime: "2019/07/02",
            areaId: null,
            areaName: "东深小区",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "2019-07-02",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "-",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "-",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          }
        ],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        navigatePages: 8,
        navigatepageNums: Array(1),
        nextPage: 0,
        pageNum: 1,
        pageSize: 20,
        pages: 1,
        prePage: 0,
        size: 5,
        startRow: 1,
        total: 3
      };
    },

    add() {
      //添加
      this.indexShow = 2;
      // this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } })
    },
    backEdit() {
      // this.$set(this.crumbsData.titleList, "3", { title: '回填', method: () => { window.histroy.back() } })
      this.indexShow = 4;
    },
    closeDialog() {
      //关闭会话
      // this.crumbsData.titleList.splice(3, 1);
      this.indexShow = 1;
    },
    closeDia() {
      eventBus.$emit("ccccc", true);
    },
    handleCurrentChange() {},
    handleSizeChange() {}
  },
  watch: {}
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.QualityReading {
  height: 100%;
  .baseContent {
    height: 100%;
  }
}
</style>

