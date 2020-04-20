<template>
  <div class="NotificationDetails">

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right">
        <el-button size="mini" @click="add" type="primary">重发</el-button>
      </div>
    </div>

    <div class="toolbar">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label="模糊查询：" class="width-200">
            <el-input v-model="formData.con" placeholder="用户编号/手机号码"></el-input>
          </el-form-item>

          <el-form-item label="通知状态：">
            <el-select clearable v-model="formData.watermeterWarehouse" placeholder="通知状态">
              <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='通知日期：'>
            <el-date-picker v-model="formData.meterDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>
        <!-- 高级查询内容 -->
        <el-form-item v-show="isActive" class="advancedQuery">
          <el-form-item label="通知渠道：">
            <el-select clearable v-model="formData.noticeChannels" placeholder="全部">
              <el-option v-for="(item,index) in formData.noticeChannelOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="通知类型：">
            <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="全部">
              <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="册本号：" class="width-150">
            <el-input v-model="formData.baseBook" placeholder="请输入册本号"></el-input>
          </el-form-item>
          <el-form-item label="抄表员：">
            <el-select clearable v-model="formData.meterReadingStaff" placeholder="全部">
              <el-option v-for="(item,index) in formData.meterReadingStaffOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="kl-table">
      <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="selection" width="50" fixed="left">
        </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="channel" min-width="80" label="通知渠道">
        </el-table-column>

        <el-table-column prop="Mtype" min-width="80" label="通知类型">
        </el-table-column>

        <el-table-column prop="code" min-width="80" label="用户编号">
        </el-table-column>

        <el-table-column prop="concentrator" min-width="100" label="用户名称">
        </el-table-column>

        <el-table-column prop="factoryName" min-width="100" label="手机号码">
        </el-table-column>

        <el-table-column prop="fcode" min-width="250" label="短信内容">
        </el-table-column>

        <el-table-column prop="areaName" min-width="80" label="通知人">
        </el-table-column>

        <el-table-column prop="endTime" min-width="80" label="通知日期">
        </el-table-column>

        <el-table-column prop="connect" min-width="80" label="通知状态">
        </el-table-column>

        <el-table-column prop="daytime" min-width="80" label="备注">
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import MassageDetailsEdit from "./MassageDetailsEdit";

export default {
  name: "NotificationDetails",
  components: {
    MassageDetailsEdit
  },
  data() {
    return {
      isActive: false, //控制高级查询内容的显示
      EditVisible: false, //弹出表单
      activeName: "ShortMessageSending",
      crumbsData: {
        //面包屑
        titleList: [{ title: "客户通知" }, { title: "消息查询" }]
      },
      formData: {
        con: "",
        watermeterWarehouse: "1",
        watermeterWarehouseOptions: [
          {
            name: "发送成功",
            value: "1"
          },
          {
            name: "发送失败",
            value: "2"
          }
        ],
        noticeChannelOptions: [
          {
            name: "短信",
            value: "1"
          },
          {
            name: "微信",
            value: "2"
          }
        ],
        waterMeterManufacturer: "1",
        waterMeterManufacturerOptions: [
          {
            name: "水费通知",
            value: "1"
          },
          {
            name: "欠费通知",
            value: "2"
          },
          {
            name: "停水通知",
            value: "3"
          },
          {
            name: "缴费通知",
            value: "4"
          },
          {
            name: "水厂开放日通知",
            value: "5"
          },
          {
            name: "满意度调查通知",
            value: "6"
          },
          {
            name: "新闻公告",
            value: "7"
          },
          {
            name: "其它",
            value: "8"
          }
        ],
        meterReadingStaff:'',
        meterReadingStaffOptions:[],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [],
        meterDate: ""
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      histroyData: {},
      rules: {
        watermeterWarehouse: [
          { required: true, message: "请选择短语", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入用户编号", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".ShortMessageNotification .kl-table", [
      ".ShortMessageNotification .toolbar",
      ".ShortMessageNotification .block",
      ".ShortMessageNotification #crumbs"
    ]);
  },
  methods: {
    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
      }
      this.$nextTick(() => {
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        this.common.changeTable(this, ".ShortMessageNotification .kl-table", [
          ".ShortMessageNotification .toolbar",
          ".ShortMessageNotification .block",
          ".ShortMessageNotification #crumbs"
        ]);
      });
    },
    editMassege() {
      this.EditVisible = true;
    },
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
            channel: "短信",
            Mtype: "水费通知",
            areaId: null,
            areaName: "张三",
            code: "01057239",
            concentrator: "季尚武",
            connect: "发送成功",
            daytime: "-",
            endTime: "2019-07-02",
            factoryName: "15850212384",
            fcode:
              "尊敬的用户季尚武，您好！您的账户（01057239）预存水费200元，先在余额为160.15元。",
            fix: "其他",
            fixValue: "王驰也",
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
            channel: "短信",
            Mtype: "水费通知",
            areaId: null,
            areaName: "李四",
            code: "01024094",
            concentrator: "曹琴",
            connect: "发送成功",
            daytime: "-",
            endTime: "2019-07-04",
            factoryName: "15850212384",
            fcode:
              "尊敬的用户曹琴您好！您的账户（01024094）预存水费13元，先在余额为0.15元。",
            fix: "其他",
            fixValue: "冯艳",
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
      this.ArrearsDetails = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
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
            waterGroup: null,
            sub: "",
            Total: ""
          },
          {
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
            waterGroup: null,
            sub: "",
            Total: ""
          },
          {
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
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "合计：",
            flux: "-",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "笔数：",
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
            waterGroup: null,
            sub: "3",
            Total: "17.7"
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
    },

    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      // this.tableQuery.page = val
      this.init();
    },
    indexMethod(index) {
      //获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (
        (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1)
      );
    },
    add() {
      this.ShortMessagePhraseManagementVisible = true;
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
.NotificationDetails {
  width: calc(100% - 20px);
  height: calc(100% - 0px);
}
</style>