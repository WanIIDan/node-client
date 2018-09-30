<template>
    <div class="header">
        <div class="header-content w1170 clearfix">
            <div class="header-title fl">
                <router-link to="/">云笔记</router-link>
            </div>
            <div class="btn-wrap fr">
                <el-button @click="handleWrite">
                    写笔记
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            handleWrite() {
                if(this.$store.state.userInfo.username) {
                    this.$router.push('/writeNote')
                }else{
                    this.$message.info('登录后才能写笔记哦~')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background: #409eff;
        height: 50px;
        line-height: 50px;

        .header-title a{
            font-size: 30px;
            color: #fff;
            font-weight: 400;
            text-decoration: none;
        }
    }
</style>