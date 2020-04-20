

<template>
  <div class="CancellMonthlyEdit">

    <el-form class="formBill" size="mini" :inline="true" :model="FinancialAdjustmentEditForm" label-width="130px" ref="ruleForm" :rules="rules">
      <commonPart :parentToChild="'2'"></commonPart>

      <legend class="legendColumn">取消当月收费信息</legend>

      <el-form-item label="账期：">
        <el-input class="read-only" disabled="disabled" v-model="FinancialAdjustmentEditForm.Remarks" placeholder="2019-10"></el-input>
      </el-form-item>

      <el-form-item label="取消金额：">
        <el-input class="read-only" disabled="disabled" v-model="FinancialAdjustmentEditForm.Remarks" placeholder="142"></el-input>
      </el-form-item>

      <el-form-item class="f2" label="备注：">
        <el-input type="textarea" v-model="FinancialAdjustmentEditForm.Remarks" placeholder=""></el-input>
      </el-form-item>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
import commonPart from "../../CustomerCenter/changeMangement/commonPart"; //公告模块
export default {
  name: "CancellMonthlyEdit",
  components: {
    uploadFile,
    commonPart,
    procedure
  },
  data() {
    return {
      redTime: "",
      beginYearM: "",
      FinancialAdjustmentEditForm: {
        // 查询内容
        cDate: "",
        cTime: "",
        backfillInput: [
          {
            label: "用户名称：",
            value: "",
            tips: ""
          },

          {
            label: "用户地址：",
            value: "",
            tips: ""
          },
          {
            label: "用水类型：",
            value: "",
            tips: ""
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "座机号码：",
            value: "",
            tips: ""
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "0040__生活用水2.85",
            value: "1"
          },
          {
            name: "0041__免费用水",
            value: "2"
          }
        ],
        IsFine: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        UpdateCodeCopying: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "2",
        UpdateCodeCopye: "2",
        Remarks: "",
        priorPeriodNum: "",
        currendPeriodNum: "",
        currendPeriodWater: ""
      },
      rules: {
        userNum: [
          { required: true, trigger: "blur", message: "请输入用户编号" }
        ],
        desc: [{ required: true, trigger: "blur" }]
      },
      histroyData: {},
      label: 0
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
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
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
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
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
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
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
        total: 5
      };
    }
  }
};
</script>
<style lang="scss">
$theme-font-color: #3680cd;
.CancellMonthlyEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
}
</style>

 