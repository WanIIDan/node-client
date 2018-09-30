<template>
    <div class="user-box fr">

        <div class="login-box" v-if="!userInfo.username">
            <div class="input-wrap mb30">
                <input type="text" class="input" placeholder="邮箱" v-model="formData.email">
            </div>
            <div class="input-wrap mb30">
                <input type="password" class="input" placeholder="密码" v-model="formData.password" @keyup.enter="handleLogin">
            </div>
            <div class="btn-wrap mb30">
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </div>
            <div class="btn-wrap mb30">
                <el-button @click="$router.push('/register')">注册</el-button>
            </div>
        </div>


        <div class="user-msg-box" v-else>
            <div class="img-wrap">
                <img :src="userInfo.avatar">
            </div>
            <div class="username">
                <span>{{userInfo.username}}</span>  
            </div>
            <div class="logout-wrap">
                <el-button type="warning" @click="handleLogout">退出登录</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
    import {mapState} from 'vuex' 

    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                    email: '',
                    avatar: ''
                }
            }
        },
        methods: {
            handleLogin() {
                this.$axios.post('/login',this.formData).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                    }
                    this.$store.commit('CHANGE_userInfo', res.userData)
                })
            },
            handleLogout() {
                this.$axios.get('/logout').then(res=>{
                    let userInfo = {
                        username: '',
                        email: '',
                        avatar: ''
                    }
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$store.commit('CHANGE_userInfo', userInfo) // 清空vuex中保留的用户数据 
                        this.$router.push('/index')

                    }else{ // 未登录状态

                        // 清空vuex中保留的用户数据
                        this.$store.commit('CHANGE_userInfo', userInfo) 
                        this.$message.info('登录状态已过期，自动退出')
                    }
                })
            }
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style scoped lang="scss">
    .user-box {
        width: 360px;
        height: 340px;
        background: #fff;
        border-radius: 6px;
        padding: 50px 35px 20px;
        box-sizing: border-box;

        .input {
            width: 100%;
            padding: 13px 18px;
            box-sizing: border-box;
            font-size: 14px;
            outline: none;
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            color: #333;
        }

        .btn-wrap {
            /deep/ .el-button {
                width: 100%;
            }
        }

        .user-msg-box { // 用户信息盒子

            .img-wrap {
                width: 150px;
                height: 150px;
                margin: 0 auto;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .username {
                font-size: 20px;
                color: #444;
                padding: 15px 0 20px;
                text-align: center;
                font-weight: 700;
            } 

            .logout-wrap {
                /deep/ .el-button {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
</style>