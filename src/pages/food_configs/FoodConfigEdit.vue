<template>
  <div>
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="food_config" :label-width="100" ref="food_config" :rules="ruleInline">
      <FormItem label="起送金额" prop="price">
        <Input v-model="food_config.price" placeholder="请填写起送金额"></Input>
      </FormItem>
       <FormItem label="配送时间段" prop="time">
        <Input v-model="food_config.time" placeholder="请填写配送时间段"></Input>
      </FormItem>
       <FormItem label="配送费" prop="deliveryFee">
        <Input v-model="food_config.deliveryFee" placeholder="请填写配送费"></Input>
      </FormItem>
      <FormItem label="商家电话" prop="shopTel">
        <Input v-model="food_config.shopTel" placeholder="请填写商家电话"></Input>
      </FormItem>
      <FormItem label="详细内容" prop="content">
        <Input v-model="food_config.content" placeholder="请填写详细内容"></Input>
      </FormItem>
      <FormItem label="描述" prop="desc">
        <Input v-model="food_config.desc" type="text" clearable placeholder="请填写简介"></Input>
      </FormItem>
      <FormItem label="客服" prop="kefu">
        <Input v-model="food_config.kefu" placeholder="请填写客服电话"></Input>
      </FormItem>
      <FormItem label="配送微信" prop="weixin">
        <Input v-model="food_config.weixin" placeholder="请填写配送微信"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('food_config')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// import ueditor from '@/components/UEditor'
export default {
  // components: {
  //   ueditor
  // },
  data () {
    return {
      food_config: {
        price: '',
        time: '',
        deliveryFee: '',
        shopTel: '',
        content: '',
        desc: '',
        kefu: '',
        weixin: ''
      },
      ruleInline: {
        price: [
          { required: true, message: '请填写起送金额', trigger: 'blur' }
        ],
        shopTel: [
          { required: true, message: '请填写商家电话', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写公告', trigger: 'blur' }
        ],
        weixin: [
          { required: true, message: '请填写配送微信', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.formTitle = '外卖配置'
    if (this.$route.name === 'FoodConfig') {
      this.$http.get('/admin/waimai_config/' + this.$route.params.id).then((res) => {
        this.food_config = res.data.waimai_config
      })
    }
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
      this.$http.put('/admin/waimai_config', this.food_config).then((res) => {
        if (res.data.status === 1) {
          this.$Message.success('修改成功！')
        } else {
          this.$Message.error(res.data.notice)
        }
      })
    }
  }
}
</script>