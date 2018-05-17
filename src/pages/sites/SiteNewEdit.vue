<template>
  <div v-if="site">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="site" :label-width="100" ref="site" :rules="ruleInline">
      <FormItem label="站点名称" prop="name">
        <Input v-model="site.name" placeholder="请填写站点名称"></Input>
      </FormItem>
      <FormItem label="域名" prop="domain">
        <Input v-model="site.domain" placeholder="请填写域名"></Input>
      </FormItem>
      <FormItem label="商户密码" prop="secret">
        <Input v-model="site.secret" placeholder="请填写商户密码"></Input>
      </FormItem>
      <FormItem label="升级规则" prop="level_rule">
        <Select v-model="site.level_rule" style="width:200px">
          <Option v-for="rule in level_rule" :value="rule.value" :key="rule.value">{{ rule.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="站点过期时间" prop="ended_at">
        <DatePicker v-model="site.ended_at" type="date" placeholder="请选择站点过期时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="关注后发送信息" prop="subscribe_text">
        <Input v-model="site.subscribe_text" placeholder="请填写关注后发送信息"></Input>
      </FormItem>
      <FormItem label="客服联系电话" prop="kf_mobile">
        <Input v-model="site.kf_mobile" placeholder="请填写客服联系电话"></Input>
      </FormItem>
      <FormItem label="客服微信" prop="kf_weixin">
        <Input v-model="site.kf_weixin" placeholder="请填写客服微信"></Input>
      </FormItem>
      <FormItem label="转发域名" prop="share_domain">
        <Input v-model="site.share_domain" placeholder="请填写转发域名"></Input>
      </FormItem>
      <FormItem label="微信appid" prop="weixin_appid">
        <Input v-model="site.weixin_appid" placeholder="请填写微信appid"></Input>
      </FormItem>
      <FormItem label="微信secret" prop="weixin_appsecret">
        <Input v-model="site.weixin_appsecret" placeholder="请填写微信secret"></Input>
      </FormItem>
      <FormItem label="mp验证code" prop="mp_code">
        <Input v-model="site.mp_code" placeholder="请填写mp验证code"></Input>
      </FormItem>
      <FormItem label="微信支付商户id" prop="wxpay_mch_id">
        <Input v-model="site.wxpay_mch_id" placeholder="请填写微信支付商户id"></Input>
      </FormItem>
      <FormItem label="微信支付key" prop="wxpay_key">
        <Input v-model="site.wxpay_key" placeholder="请填写微信支付key"></Input>
      </FormItem>
      <FormItem label="微信支付回调地址" prop="wxpay_notify_url">
        <Input v-model="site.wxpay_notify_url" placeholder="请填写微信支付回调地址"></Input>
      </FormItem>
      <FormItem label="微信支付证书" prop="wxpay_apiclient_cert_file">
        <img :src="site.wxpay_apiclient_cert_file" v-if="site.wxpay_apiclient_cert_file !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="wxpayUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="微信支付证书密码" prop="wxpay_apiclient_pass">
        <Input v-model="site.wxpay_apiclient_pass" placeholder="请填写微信支付证书密码"></Input>
      </FormItem>
      <FormItem label="过期模板消息" prop="tp_expire_coupon">
        <Input v-model="site.tp_expire_coupon" placeholder="请填写过期模板消息"></Input>
      </FormItem>
      <FormItem label="领取模板消息" prop="tp_get_coupon">
        <Input v-model="site.tp_get_coupon" placeholder="请填写领取模板消息"></Input>
      </FormItem>
      <FormItem label="使用模板消息" prop="tp_use_coupon">
        <Input v-model="site.tp_use_coupon" placeholder="请填写使用模板消息"></Input>
      </FormItem>
      <FormItem label="订单支付模板消息" prop="tp_order_paied">
        <Input v-model="site.tp_order_paied" placeholder="请填写订单支付模板消息"></Input>
      </FormItem>
      <FormItem label="外卖订单通知管理员模板消息" prop="tp_order_notice">
        <Input v-model="site.tp_order_notice" placeholder="请填写外卖订单通知管理员模板消息"></Input>
      </FormItem>
      <FormItem label="助力成功模板消息" prop="tp_zhuli">
        <Input v-model="site.tp_zhuli" placeholder="请填写助力成功模板消息"></Input>
      </FormItem>
      <FormItem label="关注后发券" prop="active">
        <i-switch v-model="site.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem label="站点二维码" prop="qr">
        <img :src="site.qr" v-if="site.qr !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="qrUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="站点logo" prop="logo">
        <img :src="site.logo" v-if="site.logo !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="logoUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('site')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      site: {
        name: null,
        domain: null,
        kf_mobile: null,
        kf_weixin: null,
        ended_at: null,
        share_domain: null,
        weixin_appid: null,
        weixin_appsecret: null,
        illustration: 5,
        wxpay_mch_id: null,
        wxpay_notify_url: null,
        wxpay_key: null,
        wxpay_apiclient_cert_file: null,
        wxpay_apiclient_pass: null,
        tp_expire_coupon: null,
        tp_get_coupon: null,
        tp_use_coupon: null,
        tp_order_paied: null,
        tp_order_notice: null,
        tp_zhuli: null,
        qr: null,
        logo: null,
        subscribe_text: null,
        level_rule: null,
        consume_rule: null,
        secret: null,
        mp_code: null,
        active: null
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写站点名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请填写域名', trigger: 'blur' }
        ],
        weixin_appid: [
          { required: true, message: '请填写微信appid', trigger: 'blur' }
        ],
        weixin_appsecret: [
          { required: true, message: '请填写微信secret', trigger: 'blur' }
        ],
        qr: [
          { required: true, message: '请上传站点二维码' }
        ],
        logo: [
          { required: true, message: '请上传站点logo' }
        ]
      },
      level_rule: [
        {
          value: 1,
          label: '按照积分升级'
        },
        {
          value: 2,
          label: '按照消费次数升级'
        },
        {
          value: 3,
          label: '按照消费金额升级'
        }
      ]
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'SiteNew') {
      this.formTitle = '新建站点'
    } else {
      this.formTitle = '编辑站点'
      this.$http.get('/admin/sites/' + this.$route.params.id).then((res) => {
        this.site = res.data.site
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
      if (this.$route.name === 'SiteNew') {
        this.$http.post('/admin/sites', {site: this.site}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/sites/' + this.$route.params.id, this.site).then((res) => {
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
    wxpayUpload (res) {
      this.site.wxpay_apiclient_cert_file = res.picture.image_url
    },
    qrUpload (res) {
      this.site.qr = res.picture.image_url
    },
    logoUpload (res) {
      this.site.logo = res.picture.image_url
    }
  }
}
</script>