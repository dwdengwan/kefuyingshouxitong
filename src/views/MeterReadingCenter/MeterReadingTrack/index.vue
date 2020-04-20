<template>
  <div class="Meter-Reading-Track">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
    </div>
    <div class="Meter-Reading-Track-right-content">
      <div class="kr-left">
        <div class="toolbar">
          <el-form  :inline="true" label-width="50px" size="mini" :model="tableQuery" class="demo-form-inline">
            <el-form-item label="账期：">
              <el-date-picker v-model="tableQuery.accountPeriod" size="mini" type="month" unlink-panels format="yyyy-MM" value-format="yyyyMM" placeholder="选择月"  >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="抄表员：">
              <el-select v-model="tableQuery.meterReadingStaff" size="mini">
                <el-option v-for="item in meterReaderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class='searchBtn' @click="init" icon="el-icon-search"></el-button>
            </el-form-item>
            <div style=" color: #c3c3c3;">选中表格行，可查看抄表员抄表轨迹噢</div>
          </el-form>
        </div>
        <div class="kl-table">
          <el-table v-if="tableShow"
          ref='klTableData'
          highlight-current-row  
          :max-height="maxHeight" 
          stripe border fixed="left" 
          :data="tableData" 
          @row-click="handleRowChange"  >
            <el-table-column type="index" label="NO." width="50" :index="indexMethod"></el-table-column>
            <el-table-column prop="userName" min-width="50" label="抄表员"></el-table-column>
            <el-table-column prop="userNum" min-width="70" label="抄表总数"></el-table-column>
            <el-table-column prop="bookCode" min-width="50" label="册本号"></el-table-column>
            <!-- <el-table-column label="轨迹" fixed="right" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click.native="editContent = true" style="font-size:12px;">轨迹查询</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div class="kr-right">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center">
          <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
        </el-amap>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Meter-Reading-Track-index",
  data() {
    return {
      
      tableData: [
      ],
      crumbsData: {
        //面包屑
        titleList: [
          { title: "抄表开账" },
          { title: "抄表" },
          { title: "抄表轨迹" }
        ]
      },
      tableQuery: {
        //查询表单数据
        accountPeriod: "202004",//账期
        meterReadingStaff:'',//抄表员
        
      },
      
      //抄表员
      meterReaderList:[],
      maxHeight: 0,
      tableShow: false,

      zoom: 19,
      center: [114.138776,22.564458],
      polyline: {
        path: [],
        events: {
          click(e) {
            alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log(newPath);
          }
        },
        editable: false
      },
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      window: "",
      multipleTable:[],

    };
  },
  mounted() {
    this.init();
    
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(
        this,
        ".Meter-Reading-Track .kr-left",
        [".Meter-Reading-Track .toolbar"]
      );
    });
  },
  methods: {
    init() {
      
      this.tableData=[
        {
          userName: "焦文",
          userNum: "100",
          bookCode: "EF001",
          path:[[114.137585,22.563908],[114.137617,22.564116],[114.137563,22.564404]]
        },
        {
          userName: "焦文",
          userNum: "200",
          bookCode: "EF002",
          path:[[114.13877,22.564448],[114.138835,22.564716],[114.138835,22.564716],[114.138835,22.564716],[114.138277,22.565285]]
        },
        {
          userName: "焦文",
          userNum: "300",
          bookCode: "EF003",
          path:[[114.135809,22.566455],[114.135933,22.566455],[114.136839,22.566138],[114.136802,22.566009],[114.137236,22.565979],[114.136115,22.56582]]
        }
      ];
      // let _this = this
      // let params = {
      //     "busicode": "MrRecordList",
      //     "data": this.tableQuery,
      // }
      
      // this.$api.fetch({
      //   params: params,//参数
      // }).then(res => {
      //   _this.tableData = res; 
        
      //   this.$nextTick(() => {
      //     //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      //     this.common.changeTable(
      //       this,
      //       ".Meter-Reading-Track .kr-left",
      //       [".Meter-Reading-Track .toolbar"]
      //     );
      //   });
      // })
    },
    handleRowChange(row, column, event){
      this.polyline.path = row.path;   
    },
    // 抄表员数据获取
    getReadingStaff() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": {}//
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.meterReaderList = res
      })
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },
    tableData: function() {
      this.$nextTick(function() {
        this.$refs.klTableData.setCurrentRow(this.tableData.list[0],true)
      })
    }
  }
};
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.Meter-Reading-Track {
  .Meter-Reading-Track-right-content {    
    height: calc(100% - 41px );
    display: flex;
    flex-direction: row;
    .kr-left {
    overflow-y: auto;
      width: 25%;
      height: 100%;
    }
    .kr-right {
      width: 75%;
      height: 100%;
    }
  }
}
</style>

