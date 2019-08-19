<template>
  <div class="login">
      <div class="formContainer">
          <h1>CatWatermelon</h1>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="37">
            <FormItem label="账号" prop="account">
                <Input type="text" v-model="formCustom.account"></Input>
            </FormItem>
            <FormItem label="密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
            </FormItem>
        </Form>
        <div class="forget">
            <a href="#">忘记密码?</a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        const account = (rule, value, callback) => {
            if (value === '' || value.trim == '') {
                callback(new Error('请输入账号！'));
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        
        return {
            isRegister: false,
            formCustom: {
                aaccount:'',
                passwd: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                account: [
                    { validator: account, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style>
.login {
    background: url(../assets/loginBg.jpg) 0px -200px no-repeat;
    background-size: cover;
    height: 656px;
    display: flex;
    justify-content: flex-end;
}
.login h1 {
    margin: 20px;
}
.login .formContainer{
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    border-radius: 8px;
    padding: 20px 50px;
    background-color: rgba(255,255,255,.5);
    width: 500px;
}
.login input.ivu-input.ivu-input-default, .login button.ivu-btn.ivu-btn-primary{
    width: 350px;
}   
.login .forget {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.login span {
    font-size: 12px;
}
</style>
