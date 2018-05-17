<template>
  <div v-if="manager1">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="manager1" :label-width="100" ref="manager1" :rules="ruleInline">
      <FormItem label="登录邮箱" prop="email">
        <Input v-model="manager1.email" placeholder="请填写登录邮箱"></Input>
      </FormItem>
      <!-- <FormItem label="手机号" prop="mobile">
        <Input v-model="manager1.mobile" placeholder="请填写手机号"></Input>
      </FormItem> -->
      <FormItem label="管理权限" prop="role">
        <RadioGroup v-model="manager1.role">
          <Radio label="super_admin">超级管理员</Radio>
          <Radio label="site_admin">站点管理员</Radio>
          <!-- <Radio label="merchant_admin">商户管理员</Radio> -->
        </RadioGroup>
      </FormItem>
      <!-- <FormItem label="管理站点" prop="site_id">
        <Select v-model="manager1.site_id" @on-change="getMerchant">
          <Option v-for="(site, key) in allSites" :value="site.id" :key="key">{{ site.name }}</Option>
        </Select>
      </FormItem> -->
      <!-- <FormItem label="管理商户" prop="merchant_id" v-if="manager1.role === 'merchant_admin' && manager.id !== manager1.id">
        <Select v-model="manager1.merchant_id">
          <Option v-for="(merchant, key) in merchants" :value="merchant.id" :key="key">{{ merchant.name }}</Option>
        </Select>
      </FormItem> -->
      <FormItem label="密码" prop="password">
        <Input v-model="manager1.password" placeholder="请填写密码" type="password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="password_confirmation">
        <Input v-model="manager1.password_confirmation" placeholder="请确认密码" type="password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('manager1')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复填写密码'))
      } else if (value !== this.manager1.password) {
        callback(new Error('两次填写的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      manager1: {
        email: null,
        // mobile: null,
        role: null,
        password: null,
        password_confirmation: null
        // site_id: null
        // merchant_id: null
      },
      ruleInline: {
        email: [
          { required: true, message: '请填写用户邮箱', trigger: 'blur' },
          { type: 'email', message: '请正确填写用户邮箱', trigger: 'blur' }
        ],
        // mobile: [
        //   { required: true, message: '请填写手机号', trigger: 'blur' }
        // ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ],
        password_confirmation: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
      // allSites: null
      // merchants: null
    }
  },
  created () {
    if (this.$route.name === 'ManagerNew') {
      this.formTitle = '新建管理员'
    } else {
      this.formTitle = '编辑管理员'
      this.$http.get('/admin/managers/' + this.$route.params.id).then((res) => {
        this.manager1 = res.data.manager
        // if (this.manager1.site_id !== null) {
        //   this.getMerchant(this.manager1.site_id)
        // }
      })
    }
    // this.$http.get('/all_sites').then((res) => {
    //   this.allSites = res.data.sites
    // })
  },
  computed: {
    // ...mapState([
    //   'manager'
    // ])
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'ManagerNew') {
        this.$http.post('/admin/managers', {manager: this.manager1}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/managers/' + this.$route.params.id, this.manager1).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
    // getMerchant (res) {
    //   this.$http.get('/current_site_merchants?site_id=' + res).then((res1) => {
    //     this.merchants = res1.data.merchants
    //   })
    // }
  }
}
</script>