<template>
    <div class="changeMatters">
        <!-- <div class="changeContent">
            <i class="changeContent-num">1、</i>
            <i class="changeContent-lable">用户名称：</i>
            张三 
            <i class="el-icon-right"></i>
            <i class="weightFont">李四</i>
        </div>    

        <div class="changeContent">
            <i class="changeContent-num">2、</i>
            <i class="changeContent-lable">用户地址：</i>
            深圳市罗湖区爱国路 
            <i class="el-icon-right"></i>
            <i class="weightFont">深圳市南山区爱国路</i>
        </div> -->
        <span>{{changeMattersData}}</span>
    </div>

</template>
<script>
export default {
    name:"changeMatters",
    props:['changeMattersData'],
    data(){
        return{
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="scss">
.changeMatters{    
    padding-top: 10px;
    margin: 10px 0px 10px 80px;
    font-size: 12px;
    .changeContent{
        display: inline-block;   
        margin-right: 10px;
        .changeContent-num{
            font-style: initial;
        }
        .changeContent-lable{
            font-style: initial;
            color: #a0a0a0;
        }
        .el-icon-right{
            font-weight: 700;
            color: #1d51c5;
        }
        .weightFont{
            font-style: initial;
            font-weight: 700
        }
    }
}
</style>
