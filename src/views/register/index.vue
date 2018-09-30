<template>
    <div class="register">
        <div class="register-title mb30">
            新用户注册
        </div>
        <div class="input-wrap">
            <el-input v-model="formData.username" placeholder="用户名"></el-input>
        </div>
        <div class="input-wrap">
            <el-input v-model="formData.email" placeholder="邮箱"></el-input>
        </div>
        <div class="input-wrap">
            <el-input v-model="formData.password" type="password" placeholder="密码" @keyup.enter.native="handleRegister"></el-input>
        </div>
        <div class="btn-wrap">
            <el-button type="primary" @click="handleRegister">注册</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            handleRegister() {
                this.$axios.post('/user',this.formData).then(res=>{
                    // console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push('/index')
                        },500)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .register {
        width: 580px;
        margin: 90px auto 0;
        padding: 40px;
        background: #fff;
        border-radius: 8px;

        .register-title {
            text-align: center;
            color: #333;
            font-size: 24px;
            font-weight: 500;
        }

        .input-wrap {
            width: 420px;
            margin: 0 auto 30px;
        }

        .btn-wrap {
            width: 420px;
            margin: 0 auto 30px;

            /deep/ .el-button {
                width: 100%;
            }
        }
    }
</style>