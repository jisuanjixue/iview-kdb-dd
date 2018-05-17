<template>
  <div>
    <div class="form-title">
      <h3>任务详情</h3>
    </div>
    <Form :label-width="100">
      <FormItem label="站点名称">
        {{site.name}}
      </FormItem>
      <FormItem label="域名">
        {{site.domain}}
      </FormItem>
      <FormItem label="商户密码">
        {{site.secret}}
      </FormItem>
      <FormItem label="升级规则">
        {{site.level_rule === 1 ? '按照积分升级' : ''}}
        {{site.level_rule === 2 ? '按照消费次数升级' : ''}}
        {{site.level_rule === 3 ? '按照消费金额升级' : ''}}
      </FormItem>
      <FormItem label="站点过期时间">
        {{site.ended_at}}
      </FormItem>
      <FormItem label="关注后发送信息">
        {{site.subscribe_text}}
      </FormItem>
      <FormItem label="客服联系电话">
        {{site.kf_mobile}}
      </FormItem>
      <FormItem label="客服微信">
        {{site.kf_weixin}}
      </FormItem>
      <FormItem label="转发域名">
        {{site.share_domain}}
      </FormItem>
      <FormItem label="微信appid">
        {{site.weixin_appid}}
      </FormItem>
      <FormItem label="微信secret">
        {{site.weixin_appsecret}}
      </FormItem>
      <FormItem label="mp验证code">
        {{site.mp_code}}
      </FormItem>
      <FormItem label="微信支付商户id">
        {{site.wxpay_mch_id}}
      </FormItem>
      <FormItem label="微信支付key">
        {{site.wxpay_key}}
      </FormItem>
      <FormItem label="微信支付回调地址">
        {{site.wxpay_notify_url}}
      </FormItem>
      <FormItem label="微信支付证书">
        <img :src="site.wxpay_apiclient_cert_file">
      </FormItem>
      <FormItem label="微信支付证书密码">
        {{site.wxpay_apiclient_pass}}
      </FormItem>
      <FormItem label="过期模板消息">
        {{site.tp_expire_coupon}}
      </FormItem>
      <FormItem label="领取模板消息">
        {{site.tp_get_coupon}}
      </FormItem>
      <FormItem label="使用模板消息">
        {{site.tp_use_coupon}}
      </FormItem>
      <FormItem label="订单支付模板消息">
        {{site.tp_order_paied}}
      </FormItem>
      <FormItem label="外卖订单通知管理员模板消息">
        {{site.tp_order_notice}}
      </FormItem>
      <FormItem label="助力成功模板消息">
        {{site.tp_zhuli}}
      </FormItem>
      <FormItem label="关注后发券">
        {{site.active === true ? '已启用' : '未启用'}}
      </FormItem>
      <FormItem label="站点二维码">
        <img :src="site.qr">
      </FormItem>
      <FormItem label="站点logo">
        <img :src="site.logo">
      </FormItem>
      <FormItem>
        <Button type="ghost" style="margin-left: 8px" @click="$router.go(-1)">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      site: {}
    }
  },
  created () {
    this.$http.get('/admin/sites/' + this.$route.params.id).then((res) => {
      this.site = res.data.site
    })
  },
  methods: {
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>