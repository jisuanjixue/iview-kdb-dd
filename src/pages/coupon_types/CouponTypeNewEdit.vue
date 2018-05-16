<template>
  <div v-if="coupon_type">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="coupon_type" :label-width="100" ref="coupon_type" :rules="ruleInline">
      <FormItem label="卡券名称" prop="name">
        <Input v-model="coupon_type.name" placeholder="请填写卡券名称"></Input>
      </FormItem>
      <FormItem label="卡券内容" prop="content">
        <Input v-model="coupon_type.content" placeholder="请填写卡券内容"></Input>
      </FormItem>
      <FormItem label="卡券类型" prop="type">
        <Select v-model="coupon_type.type" style="width:200px">
          <Option v-for="type in types" :value="type.value" :key="type.value">{{ type.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="卡券发放类型" prop="style">
        <Select v-model="coupon_type.style" style="width:200px">
          <Option v-for="style in styles" :value="style.key" :key="style.key">{{ style.value }}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="选择使用门店" prop="merchant_address_ids">
        <Select v-model="coupon_type.merchant_address_ids" style="width:200px" multiple>
          <Option v-for="merchant_address in merchant_addresses" :value="merchant_address.id" :key="merchant_address.id">{{ merchant_address.name }}</Option>
        </Select>
      </FormItem> -->
      <FormItem label="原价" prop="price" v-if="coupon_type.type === 2">
        <InputNumber :min="0" v-model="coupon_type.price"></InputNumber>
      </FormItem>
      <FormItem label="现价" prop="current_price" v-if="coupon_type.type === 2">
        <InputNumber :min="0" v-model="coupon_type.current_price"></InputNumber>
      </FormItem>
      <FormItem label="折扣" prop="rebate" v-if="coupon_type.type === 3">
        <InputNumber :max="100" v-model="coupon_type.rebate" :formatter="formatter" :parser="parser"></InputNumber>
      </FormItem>
      <FormItem label="低值券金额" prop="cut_price" v-if="coupon_type.type === 1">
        <InputNumber :min="0" v-model="coupon_type.cut_price"></InputNumber>
      </FormItem>
      <FormItem label="低值券满多少使用" prop="full" v-if="coupon_type.type === 1">
        <InputNumber :min="0" v-model="coupon_type.full"></InputNumber>
      </FormItem>
      <FormItem label="体验物品名" prop="free_content" v-if="coupon_type.type === 4">
        <Input v-model="coupon_type.free_content" placeholder="请填写体验物品名"></Input>
      </FormItem>
      <FormItem label="使用规则" prop="rule">
        <Input v-model="coupon_type.rule" placeholder="请填写使用规则"></Input>
      </FormItem>
      <FormItem label="到期日期" prop="expire">
        <DatePicker v-model="coupon_type.expire" type="date" placeholder="请选择到期日期" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="到期天数" prop="expire_day">
        <Input v-model="coupon_type.expire_day" placeholder="请填写到期天数"></Input>
      </FormItem>
      <FormItem label="是否激活" prop="active">
        <i-switch v-model="coupon_type.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('coupon_type')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      coupon_type: {
        name: null,
        content: null,
        type: null,
        price: null,
        current_price: null,
        rebate: null,
        cut_price: null,
        rule: null,
        expire: null,
        expire_day: null,
        active: null,
        style: null,
        full: null,
        free_content: null,
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写卡券名称' }
        ],
        content: [
          { required: true, message: '请填写卡券内容' }
        ],
        type: [
          { required: true, message: '请选择卡券类型' }
        ],
        price: [
          { required: true, message: '请填写原价' }
        ],
        current_price: [
          { required: true, message: '请填写现价' }
        ],
        rebate: [
          { required: true, message: '请填写折扣' }
        ],
        cut_price: [
          { required: true, message: '请填写低值券金额' }
        ],
        rule: [
          { required: true, message: '请填写使用规则' }
        ],
        style: [
          { required: true, message: '请选择卡券发放类型' }
        ],
        full: [
          { required: true, message: '请填写低值券满多少使用' }
        ],
        free_content: [
          { required: true, message: '请填写体验物品名' }
        ],
        merchant_address_ids: [
          { required: true, message: '请选择可使用门店' }
        ]
      },
      types: [
        {
          label: '现金券',
          value: 1
        },
        {
          label: '套餐券',
          value: 2
        },
        {
          label: '折扣券',
          value: 3
        },
        {
          label: '体验券',
          value: 4
        }
      ],
      styles: null,
      merchant_addresses: null
    }
  },
  created () {
    this.$http.get('/admin/coupon_types/style').then((res) => {
      this.styles = res.data.styles
    })
    if (this.$route.name === 'CouponTypeNew1') {
      this.formTitle = '新建优惠券'
    } else {
      this.formTitle = '编辑优惠券'
      this.$http.get('/coupon_types/' + this.$route.params.id).then((res) => {
        this.coupon_type = res.data.coupon_types
      })
    }
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
      if (this.$route.name === 'CouponTypeNew') {
        this.$http.post('/admin/coupon_types', {coupon_type: this.coupon_type}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/coupon_types/' + this.$route.params.id, this.coupon_type).then((res) => {
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
    },
    formatter (value) {
      return `${value}%`
    },
    parser (value) {
      return value.replace('%', '')
    }
  }
}
</script>