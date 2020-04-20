<template>
    <div class="customerCenter">
        <aside class="customerCenter-right">
                <router-view></router-view>
        </aside>
    </div>
</template>
<script>
export default {
    name:"customerCenter",
    data(){
        return{

        }
    },

}
</script>
<style lang="scss">
  @import "../../assets/styles/scss/base/fn";
  $imgWidth: 200px;
$theme-color:#297acc;
    .customerCenter{
        .idCard{
            .el-form-item__content{
                margin-top:8px;
            }
        }
        .userCode{
            .el-form-item__content{
                width: 60% !important;
            }
            .el-input{
                width: 60%;
            }
            .el-button{
                height: 28px;
                width: 44px;
                padding: 6px 0px;
                // margin-top:6px;
            }
        }
        .el-table{
            .el-button--text {
                line-height: 5px;
                font-size: 12px;
            }
        }
        #crumbs {
            border-bottom: 1px solid #eaf4ff;
        }
        &:after{
            @include _clearBoth()
        }
        & > .customerCenter-right{
            width: 100%;
            height: 100%;
            > div{
                height: 100%;
            }
        }
        
    }
</style>
