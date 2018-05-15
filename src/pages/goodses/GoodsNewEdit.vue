<template>
  <div v-if="stock">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="stock" :label-width="100" ref="stock" :rules="ruleInline">
      <FormItem label="货品名" clearable prop="name">
        <Input v-model="stock.name" type="text" placeholder="请填写货品名"></Input>
      </FormItem>
      <FormItem label="选择货品类型" prop="goods_type_id">
        <Select v-model="stock.goods_type_id" style="width:200px">
          <Option v-for="stocksType in stocksTypes" :value="stocksType.id" :key="stocksType.id">{{ stocksType.name}}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="单位" prop="unit">
        <Select v-model="stock.unit" style="width:260px">
          <Option value="1">件</Option>
          <Option value="2">个</Option>
          <Option value="3">公斤</Option>
        </Select>
      </FormItem> -->
      <FormItem label="当前库存" prop="count_current">
        <Input v-model="stock.count_current" clearable placeholder="请填写当前库存"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('stock')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stock: {
        name: '',
        unit: '',
        goods_type_id: '',
        count_current: ''
      },
      stocksTypes: null,
      // units: null,
      ruleInline: {
        name: [
          { required: true, message: '请填写进货货品类型名', trigger: 'blur' }
        ],
        types: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        units: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        count_current: [
          { required: true, message: '请填写当前库存', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$http.get('/admin/goods_types').then((res) => {
      this.stocksTypes = res.data.goods_types
    })
    if (this.$route.name === 'GoodsNew') {
      this.formTitle = '新建货品类型'
    } else {
      this.formTitle = '编辑货品类型'
      this.$http.get('/admin/goodses/' + this.$route.params.id).then((res) => {
        this.stock = res.data.goods
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
      if (this.$route.name === 'GoodsNew') {
        this.$http.post('/admin/goodses', {goods: this.stock}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/goodses/' + this.$route.params.id, this.stock).then((res) => {
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
  }
}
</script>
