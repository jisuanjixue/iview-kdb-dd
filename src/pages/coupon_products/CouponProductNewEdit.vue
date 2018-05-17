<template>
  <div v-if="couponProduct">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="couponProduct" :label-width="100" ref="couponProduct" :rules="ruleInline">
      <FormItem label="标题" prop="title">
        <Input v-model="couponProduct.title" placeholder="请填写标题"></Input>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="couponProduct.price" placeholder="请填写价格"></Input>
      </FormItem>
      <FormItem label="库存" prop="stock">
        <Input v-model="couponProduct.stock" placeholder="请填写价格"></Input>
      </FormItem>
      <FormItem label="详细内容" prop="content">
        <Input v-model="couponProduct.buy_count" placeholder="请填写价格"></Input>
      </FormItem>
      <FormItem label="图片" prop="image">
        <img :src="couponProduct.img" v-if="couponProduct.img !== null"></img>
      </FormItem>
      <FormItem label="每个用户限购数量" prop="user_buy_count">
        <img :src="couponProduct.user_buy_count"></img>
      </FormItem>
      <!-- <FormItem label="是否激活" prop="active">
        <i-switch v-model="couponProduct.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem> -->
      <FormItem>
        <Button type="primary" @click="handleSubmit('couponProduct')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      couponProduct: {
        title: null,
        stock: null,
        price: null,
        content: null,
        user_buy_count: null,
        image: null
        // active: null
      },
      ruleInline: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请填写价格', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请填写库存', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        user_buy_count: [
          { required: true, message: '请填写用户限购数量', trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    // this.Url = global.URL
    // this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'CouponProductNew') {
      this.formTitle = '新建页头'
    } else {
      this.formTitle = '编辑页头'
      this.$http.get('/admin/coupon_products/' + this.$route.params.id).then((res) => {
        this.couponProduct = res.data.coupon_product
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
      if (this.$route.name === 'CouponProductNew') {
        this.$http.post('/admin/coupon_products/new', {coupon_product: this.couponProduct}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/coupon_products/' + this.$route.params.id, this.couponProduct).then((res) => {
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
    // upload (res) {
    //   this.bannar.image = res.picture.image_url
    // }
  }
}
</script>