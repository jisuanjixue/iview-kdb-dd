<template>
  <div v-if="promotion">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="promotion" :label-width="100" ref="promotion" :rules="ruleInline">
      <FormItem label="活动标题" prop="title">
        <Input v-model="promotion.title" placeholder="请填写活动标题"></Input>
      </FormItem>
      <FormItem label="活动简介" prop="desc">
        <Input v-model="promotion.desc" placeholder="请填写活动简介"></Input>
      </FormItem>
      <FormItem label="活动类型" prop="render">
        <RadioGroup v-model="promotion.render">
          <Radio label="">默认</Radio>
          <Radio label="zhuanpan">转盘</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="结束时间" prop="ended_at">
        <DatePicker v-model="promotion.ended_at" type="date" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="每人领取数量" prop="get_count">
        <InputNumber :min="1" v-model="promotion.get_count"></InputNumber>
      </FormItem>
      <FormItem label="制卡说明" prop="remark">
        <Input v-model="promotion.remark" placeholder="如不需打印二维码，则不填此栏"></Input>
      </FormItem>
      <!-- <FormItem label="选择参与活动店铺" prop="merchant_address_ids">
        <Select v-model="promotion.merchant_address_ids" style="width:200px" multiple>
          <Option v-for="store in stores" :value="store.id" :key="store.id">{{ store.name }}</Option>
        </Select>
      </FormItem> -->
      <!-- <FormItem label="活动宣传图片" prop="image">
        <img :src="promotion.image" v-if="promotion.image !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem> -->
      <!-- <FormItem label="详细内容" prop="content">
        <ueditor @ready="editorReady"></ueditor>
      </FormItem>
      <FormItem label="活动规则" prop="rules">
        <ueditor @ready="editorReady1"></ueditor>
      </FormItem> -->
      <FormItem>
        <Button type="primary" @click="handleSubmit('promotion')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// import ueditor from '@/components/UEditor'
// import { mapState } from 'vuex'
export default {
  // components: {
  //   ueditor
  // },
  data () {
    return {
      promotion: {
        title: null,
        render: null,
        desc: null,
        content: null,
        rules: null,
        // ended_at: null,
        get_count: null,
        remark: null,
        // merchant_address_ids: [],
        image: null
      },
      ruleInline: {
        title: [
          { required: true, message: '请填写活动标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写活动简介', trigger: 'blur' }
        ],
        render: [
          { required: true, message: '请选择活动类型' }
        ],
        ended_at: [
          { required: true, message: '请选择结束时间' }
        ],
        get_count: [
          { required: true, message: '请选择每人领取数量' }
        ],
        // merchant_address_ids: [
        //   { required: true, message: '请选择参与活动店铺' }
        // ],
        image: [
          { required: true, message: '请上传活动宣传图片' }
        ],
        content: [
          { required: true, message: '请填写详细内容', trigger: 'blur' }
        ],
        rules: [
          { required: true, message: '请填写活动规则', trigger: 'blur' }
        ]
      }
      // stores: null
    }
  },
  created () {
    // this.Url = global.URL
    // this.headers = this.$http.defaults.headers.common
    // this.getStores()
    if (this.$route.name === 'PromotionNew') {
      this.formTitle = '新建活动'
    } else {
      this.formTitle = '编辑活动'
      this.$http.get('/admin/promotions/' + this.$route.params.id).then((res) => {
        this.promotion = res.data.promotion
        // editorInstance.setContent(this.promotion.rules)
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
      if (this.$route.name === 'PromotionNew') {
        this.$http.post('/admin/promotions', {promotion: this.promotion}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/promotions/' + this.$route.params.id, this.promotion).then((res) => {
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
    // editorReady (editorInstance) {
    //   this.getPromotion(editorInstance)
    // },
    // getPromotion (editorInstance) {
    //   if (this.$route.name === 'PromotionEdit') {
    //     this.$http.get('/admin/promotions/' + this.$route.params.id).then((res) => {
    //       this.promotion = res.data.promotion
    //       editorInstance.setContent(this.promotion.content)
    //     })
    //   }
    //   editorInstance.addListener('contentChange', () => {
    //     this.promotion.content = editorInstance.getContent()
    //   })
    // },
    // editorReady1 (editorInstance) {
    //   this.getPromotion1(editorInstance)
    // },
    // getPromotion1 (editorInstance) {
    //   if (this.$route.name === 'PromotionEdit') {
    //     this.$http.get('/admin/promotions/' + this.$route.params.id).then((res) => {
    //       this.promotion = res.data.promotion
    //       editorInstance.setContent(this.promotion.rules)
    //     })
    //   }
    //   editorInstance.addListener('contentChange', () => {
    //     this.promotion.rules = editorInstance.getContent()
    //   })
    // },
    // getStores () {
    //   this.$http.get('/merchant_address_list?merchant_id=' + this.manager.merchant_id).then((res) => {
    //     this.stores = res.data.merchant_addresses
    //   })
    // },
    upload (res) {
      this.promotion.image = res.picture.image_url
    }
  }
}
</script>

<style scoped>

</style>