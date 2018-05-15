<template>
  <div v-if="merchant_address">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="merchant_address" :label-width="100" ref="merchant_address" :rules="ruleInline">
      <FormItem label="门店名称" prop="name">
        <Input v-model="merchant_address.name" placeholder="请填写门店名称"></Input>
      </FormItem>
      <!-- <FormItem label="门店介绍" prop="content">
        <Input v-model="merchant_address.content" placeholder="请填写门店介绍"></Input>
      </FormItem> -->
      <FormItem label="联系电话" prop="tel">
        <Input v-model="merchant_address.tel" placeholder="请填写联系电话"></Input>
      </FormItem>
      <FormItem label="门店地址" prop="location">
        <Input v-model="merchant_address.location" placeholder="请填写门店地址"></Input>
      </FormItem>
      <!-- <Card style="margin-bottom: 10px;">
        <div slot="title">
          <Input clearable placeholder="输入城市进行搜索" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
          <Button type="primary" icon="ios-search" @click="test()">搜索</Button>
        </div>
        <div id="container"></div>
      </Card> -->
      <FormItem>
        <Button type="primary" @click="handleSubmit('merchant_address')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// import { TxMap } from '@/components/TxMap'
export default {
  data () {
    return {
      merchant_address: {
        name: null,
        tel: null,
        location: null
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写门店名称', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请在地图上点击选择门店位置', trigger: 'blur' }
        ]
      }
    }
  },
  /*
  mounted () {
    var that = this
    var citylocation = null
    var map = null
    var geocoder = null
    TxMap('CXGBZ-2KYCQ-2C55A-GSINS-4KBPE-KIBV5').then((qq) => {
      // var marker = null
      var center = new qq.maps.LatLng(39.916527, 116.397128)
      map = new qq.maps.Map(document.getElementById('container'), {
        center: center,
        zoom: 13
      })
      // 获取城市列表接口设置中心点
      citylocation = new qq.maps.CityService({
        complete: function (result) {
          map.setCenter(result.detail.latLng)
        }
      })
      // 调用searchLocalCity()方法    根据用户IP查询城市信息。
      citylocation.searchLocalCity()
      // 调用地址解析类
      geocoder = new qq.maps.Geocoder({
        complete: function (result) {
          map.setCenter(result.detail.location)
          // eslint-disable-next-line
          var marker = new qq.maps.Marker({
            map: map,
            position: result.detail.location
          })
        }
      })
      // 添加监听事件
      qq.maps.event.addListener(map, 'click', function (event) {
        var latLng = event.latLng
        var lat = latLng.getLat().toFixed(5)
        var lng = latLng.getLng().toFixed(5)
        // alert('您点击了地图.' + lat + ':' + lng)
        that.merchant_address.location = lat + ',' + lng
      })
    })
    // eslint-disable-next-line
    that.codeAddress = function (search) {
      geocoder.getLocation(search)
    }
  },
  */
  created () {
    if (this.$route.name === 'MerchantAddressNew') {
      this.formTitle = '新建门店地址'
      // this.merchant_address.merchant_id = this.$route.params.id
    } else {
      this.formTitle = '编辑门店地址'
      this.$http.get('/admin/merchant_addresses/' + this.$route.params.id).then((res) => {
        this.merchant_address = res.data.merchant_address
        // this.merchant_address.location = this.merchant_address.location.toString()
      })
    }
  },
  methods: {
    // test () {
    //   this.codeAddress(this.search)
    // },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'MerchantAddressNew') {
        this.$http.post('/admin/merchant_addresses', {merchant_address: this.merchant_address}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/merchant_addresses')
        })
      } else {
        this.$http.put('/admin/merchant_addresses/' + this.$route.params.id, this.merchant_address).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/merchant_addresses')
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>