

<template>
  <div class="LiquidatedDamagesEdit">

    <commonPart :parentToChild="'2'"></commonPart>
    <el-form class="formBill" size="mini" :inline="true" :model="LiquidatedDamagesEditForm" :rules="rules" label-width="100px">
      <legend class="legendColumn">违约金减免信息</legend>
      <el-form-item :label="v.label" v-for="(v,i) in LiquidatedDamagesEditForm.backfillInput" :key="i">
        <el-date-picker v-model="v.value" type="date" :placeholder="v.tips">
        </el-date-picker>
      </el-form-item>

      <el-form-item class="f2" label="减免原因：">
        <el-input type="textarea" v-model="LiquidatedDamagesEditForm.UpdateCodeCopye" placeholder=""></el-input>
      </el-form-item>

      <div class="kl-table">
        <el-table stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="selection" fixed="left" width="50">
          </el-table-column>

          <el-table-column type="index" label="NO." fixed="left" width="50">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="账期">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="费用项目">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="抄表日期">
          </el-table-column>

          <el-table-column prop="factoryName" min-width="100" label="水量">
          </el-table-column>

          <el-table-column prop="factoryName" min-width="80" label="金额">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="应收违约金">
          </el-table-column>

          <el-table-column prop="daytime" min-width="100" label="计算截止日期">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.meter" type="date" placeholder="">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="减免金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.meter" placeholder=""></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="fixValue" min-width="100" label="实收违约金">
          </el-table-column>

        </el-table>
      </div>
      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

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
  name: "LiquidatedDamagesEdit",
  components: {
    uploadFile,
    commonPart,
    procedure
  },
  data() {
    return {
      LiquidatedDamagesEditForm: {
        // 查询内容
        backfillInput: [
          {
            label: "有效日期：",
            value: "",
            tips: ""
          }
        ],
        backfillInputDisable: [
          {
            label: "用户名称：",
            value: "",
            tips: "165497974"
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
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "0040__生活用水2.85",
            value: ""
          },
          {
            name: "0041__免费用水",
            value: ""
          }
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        totalRedu: ""
      },
      histroyData: {},
      rules: {
        userNum: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        PriceStrategy: [
          { required: true, message: "请输入账期", trigger: "blur" }
        ]
      }
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
            areaId: null,
            areaName: "水费",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "10",
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
            areaId: null,
            areaName: "污水管理费",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "10",
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
            areaId: null,
            areaName: "水资源费",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "201907",
            endTime: null,
            factoryName: "10",
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
        total: 5
      };
    }
  }
};
</script>
<style lang="scss">
.LiquidatedDamagesEdit {
  height: 100%;
  overflow-y: auto;
}
</style>

