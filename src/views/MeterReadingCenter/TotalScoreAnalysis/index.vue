<template>
  <div class="MeterRelationship">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if = 'this.activeName == "first" && !GeneralSubTableShow'>
          <!-- 总分表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
        </div>
        <div class="bread-contain-right" v-if = 'this.activeName == "first" && GeneralSubTableShow'>
          <!-- 总分表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button  icon="el-icon-caret-left" size="mini" @click="callBack">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else-if = 'this.activeName == "third" && !FireMeterShow'>
          <!-- 消防表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
        </div>
        <div class="bread-contain-right" v-else-if = 'this.activeName == "third" && FireMeterShow'>
          <!-- 消防表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button  icon="el-icon-caret-left" size="mini" @click="callBack">返回</el-button>
        </div>
        <div class="bread-contain-right" v-else-if = 'this.activeName == "fourth" && !MonitoringTable'>
          <!-- 监控表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
        </div>
        <div class="bread-contain-right" v-else-if = 'this.activeName == "fourth" && MonitoringTable'>
          <!-- 监控表分析 -->
          <el-button size="mini" type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button  icon="el-icon-caret-left" size="mini" @click="callBack">返回</el-button>
        </div>
    </div>
    <el-tabs class='tabsBlock' type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="总分表分析" name="first">

        <section v-show="GeneralSubTableShow">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              <span class="meter-type">子表</span>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">

              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="增减水量">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="实际用水">
              </el-table-column>

            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        <section v-show="!GeneralSubTableShow">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
              <span class="meter-type">总表</span>

              <el-form-item label="账期：" style="margin-left: 5%;">
                <el-date-picker v-model="formData.beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="营业所：">
                <el-select v-model="formData.department" size="mini">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="城市" value="1"></el-option>
                  <el-option label="农村" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模糊查询：" class="width-150">
                <el-tooltip class="item" effect="dark" content="册本、总表编号、总表名称、总表地址" placement="top">
                  <el-input v-model="formData.searchType"></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item>
                <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">

              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="engineeringType" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="用户编号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户名称">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="环比%">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="漏失率%">
              </el-table-column>

              <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                  
                  <el-button type="text" size='mini' @click="details('GeneralSubTableShow')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        
      </el-tab-pane>
      <el-tab-pane label="监控表分析" name="fourth">
        <section v-show="MonitoringTable">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData3" class="demo-form-inline">
              <span class="meter-type">子表</span>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">
              
              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="增减水量">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="实际用水">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        <section v-show="!MonitoringTable">

        
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData3" class="demo-form-inline">
              <span class="meter-type">监控表</span>

              <el-form-item label="账期：" style="margin-left: 5%;">
                <el-date-picker v-model="formData3.beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="营业所：">
                <el-select v-model="formData3.department" size="mini">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="城市" value="1"></el-option>
                  <el-option label="农村" value="2"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item label="模糊查询：" class="width-150">
                <el-tooltip class="item" effect="dark" content="册本、总表编号、总表名称、总表地址" placement="top">
                  <el-input v-model="formData3.searchType"></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item>
                <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>

            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">

              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="engineeringType" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="用户编号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户名称">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="环比%">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="漏失率%">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                  
                  <el-button type="text" size='mini' @click="details('MonitoringTable')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        
      </el-tab-pane>
      <el-tab-pane label="消防表分析" name="third">
        <section v-show="FireMeterShow">
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData2" class="demo-form-inline">
              <span class="meter-type">分摊表</span>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">

              <el-table-column type="index" label="NO." fixed="left" width="50" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户编号">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户名称">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="增减水量">
              </el-table-column>
              <el-table-column prop="flux" min-width="80" label="分摊水量">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="实际用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="分摊比例">
              </el-table-column>

            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        <section v-show="!FireMeterShow">

        
          <div class="toolbar">
            <el-form :inline="true" size="mini" :model="formData2" class="demo-form-inline">
              <span class="meter-type">消防表</span>

              <el-form-item label="账期：" style="margin-left: 5%;">
                <el-date-picker v-model="formData2.beginYearM" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:100%;">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="营业所：">
                <el-select v-model="formData2.department" size="mini">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="城市" value="1"></el-option>
                  <el-option label="农村" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="模糊查询：" class="width-150">
                <el-tooltip class="item" effect="dark" content="册本、总表编号、总表名称、总表地址" placement="top">
                  <el-input v-model="formData2.searchType"></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item>
                <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="kl-table">
            <el-table stripe border :data="histroyData.list" class="change-tables-table">

              <el-table-column type="index" label="NO." width="50"  fixed="left" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="engineeringType" min-width="100" label="册本号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="100" label="用户编号">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="用户名称">

              </el-table-column>

              <el-table-column prop="lvalue" min-width="80" label="用户地址">
              </el-table-column>

              <el-table-column prop="fixValue" min-width="80" label="上期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期抄码">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="本期用水">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="环比%">
              </el-table-column>

              <el-table-column prop="flux" min-width="80" label="分摊水量">
              </el-table-column>


              <el-table-column prop="flux" min-width="80" label="分摊比例">
              </el-table-column>

              <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                  
                  <el-button type="text" size='mini' @click="details('FireMeterShow')">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
              </el-pagination>
            </div>
          </div>
        </section>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "MeterRelationship",
  components: {

  },
  data() {
    return {
      GeneralSubTableShow:false,
      FireMeterShow:false,
      MonitoringTable:false,
      treeDatas: {
        tree: [{ foreignkey: '册本', id: '222', _child: [{ foreignkey: '城区', id: '222', _child: [{ foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }, { foreignkey: '0035E应抄7646已抄0', id: '222' }] }] }],
        defaultProps: {
          label: 'foreignkey',
          children: '_child'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['parentMask', 'mask', 'childMask', 'seq', 'id', 'type', 'foreignkey'],
        rootName: '总部',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '抄表开账' },
          { title: '统计' },
          { title: '总分分析' },
          // { title: '总分表分析', method: () => { window.histroy.back() } }
        ],

      },
      isActive: false,  //控制高级查询内容的显示
      formData: {
        department: '0',

        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []

      },
      formData1: {},
      formData2: {},
      formData3: {},
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      histroyData: {

      },
      waterAddVisible: false,  //综合查询的显示和隐藏
      WaterEditorName: '综合查询',
      ruleFormData: {},
      backfillName: "用户基础资料管理-编辑",
      backfillVisible: false,
      options6: [
        {
          value: 12,
          label: '全部'
        },
      ],
      ruleForm: {},
      activeName: 'first',
      indexMethod: '1',
    }
  },
  mounted() {
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, '.MeterRelationship .kl-table', ['.MeterRelationship .toolbar', '.MeterRelationship .block', '.MeterRelationship bread-contain'])
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
        total: 5,
      }
    },
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = false;
        $('.el-table--fit').css('height', '66%');

      } else {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')

        this.isActive = true;
        $('.el-table--fit').css('height', '50%');
      }
    },
    handleClick(){
      console.log(this.activeName);
      if(this.activeName == 'third'){
        // this.$set(this.crumbsData.titleList[3],'title','消防表分析')
      }else if(this.activeName == 'fourth'){
        // this.$set(this.crumbsData.titleList[3],'title','监控表分析')
      }else if(this.activeName == 'first'){
        // this.$set(this.crumbsData.titleList[3],'title','总分表分析')
      }
    },
    demand() {  //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init()
    },
    //   导出
    exportExcel() {
      //   	let listData = {}
      //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
      //     let params ={
      //       "busicode":"MeterReadingList",
      //       "data": this.tableQuery
      //     }
      //     this.$api.fetch({
      //       apiUrl: 'interface.api',//路径
      //       method: 'post',//请求方法
      //       params:params,//参数
      //       needErrorCallback:true
      //     }).then(res =>{
      //     	if(res.code===0){
      //         listData = res.data
      //         if (!listData.list[0]) {
      //         		this.$notify({
      //               title: '警告',
      //               message:'表格没有相关数据',
      //               type: 'error'
      //             })
      //         	} else {
      //         		import('@/vendor/Export2Excel').then(excel => {
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
      // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
      // 			        const list = listData.list
      // 			        const data = this.formatJson(filterVal, list)
      // 			        excel.export_json_to_excel({
      // 			          header: tHeader,
      // 			          data,
      // 			          filename: this.tableQuery.daytime + '抄表数据',
      // 			          autoWidth: '100'
      // 			        })
      // 			      })
      //         		this.tableQuery.pageCount = 20
      //         	}
      //       }
      //     })
    },
    //分页
    handleSizeChange(val) { //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      // this.tableQuery.page = val
      this.init()
    },
    //   查看历史
    viewHistory(index, row) {

    },
    cellClick(row, column, cell, event) { //点击文件名
      let that = this;

    },
    indexMethod(index) {//获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (this.histroyData.pageSize - 1) * this.histroyData.pages + (index + 1);

    },
    closeDialog() { //关闭会话
      this.waterAddVisible = false;
      this.backfillVisible = false;
      this.init()
    },
    //弹出框
    submit(formName) {	//提交
      this.$refs.childWaterEditor.submit()
      // this.waterAddVisible = false;
    },
    // 添加
    add() {

    },
    // 批量编辑
    BatchEditing() {

    },
    // 资料导出
    DataDerivation() {

    },
    // 导出本页
    exportPage() {

    },
    // 综合查询
    ComprehensiveQuery() {
      this.waterAddVisible = true;
    },
    // 编辑
    edit() {
      this.backfillVisible = true;
    },
    backTreeData() { },
    details(val){
      this[val] = true;
    },
    callBack(){
      this.GeneralSubTableShow = false;
      this.FireMeterShow = false;
      this.MonitoringTable = false;
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
<style lang="scss">
.MeterRelationship {
  width: 100%;
  height: 100%;
    .tabsBlock{
    height: calc(100% - 42px);
        .el-tabs--border-card{
            border: 1px solid #eaf4ff;
        }
    }
    .el-tabs__conten{
        padding: 5px;
    }
  .el-tabs{
    height: calc(100% - 50px);
    .el-tabs__content{
      height: calc(100% - 55px);
      .options{
        padding-left: 15px;
      }
    }
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
  .meter-type {
    font-weight: bolder;
    display: inline-block;
    line-height: 30px;
    height: 100%;
    font-size: 1rem;
  }
  .el-tabs__content > div {
    height: 100%;
    overflow: auto;
  }
}
</style>
