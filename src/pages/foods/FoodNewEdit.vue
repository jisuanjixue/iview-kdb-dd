<template>
  <div v-if="food">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="food" :label-width="100" ref="food" :rules="ruleInline">
      <FormItem label="名称" prop="name">
        <Input v-model="food.name" type="text" clearable placeholder="请填写菜品名称"></Input>
      </FormItem>
       <FormItem label="简介" prop="desc">
        <Input v-model="food.desc" type="text" clearable placeholder="请填写菜品简介"></Input>
      </FormItem>
       <FormItem label="价格" prop="price">
        <Input v-model="food.price" placeholder="请填写菜品价格"></Input>
      </FormItem>
       <FormItem label="已售份数" prop="sales">
        <Input v-model="food.sales" placeholder="请填写菜品已售份数"></Input>
      </FormItem>
      <FormItem label="菜品图片" prop="img">
        <img :src="food.img" v-if="food.img !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="选择菜品分类" prop="food_type_ids">
        <Select v-model="food.food_type_ids" style="width:260px" multiple>
          <Option v-for="food_type in food_types" :value="food_type.id" :key="food_type.id">{{ food_type.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择所需货物" prop="food_goods">
        <Row>
           <!-- {{food_goods}} -->
          <CheckboxGroup v-model="selectGoods">
            <Col span="8" v-for="goodType in goods_types" :key="goodType.id">
              <Row type="flex" align="top">{{goodType.name + ':'}}</Row>
              <Row v-for="stock in goodType.goods" :key='stock.id' type="flex" align="top">
                  <Checkbox :label="stock.id" disabled>
                    {{stock.name + '消耗:'}}
                  </Checkbox>
                  <InputNumber size="small" :min="0" :value='0' @on-change="(value) => numChange(value, stock.id)"></InputNumber>
                  {{['个','公斤','件'][stock.unit]}}
              </Row>
            </Col>
          </CheckboxGroup>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('food')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      food: {
        name: '',
        desc: '',
        price: '',
        sales: '',
        food_type_ids: [],
        img: ''
      },
      food_goods: [],
      food_types: [],
      goods_types: [],
      selectGoods: [],
      stocks: [],
      ruleInline: {
        name: [
          { required: true, message: '请填写菜品名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写菜品简介', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请填写菜品价格', trigger: 'blur' }
        ],
        sales: [
          { required: true, message: '请填写菜品已售份数', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传菜品图片', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'FoodNew') {
      this.formTitle = '新建菜品'
    } else {
      this.formTitle = '编辑菜品'
      this.$http.get('/admin/foods/' + this.$route.params.id).then((res) => {
        this.food = res.data.food
      })
    }
    this.$http.get('/admin/food_types').then((res) => {
      this.food_types = res.data.food_types
    })
    this.$http.get('/admin/goodses/all_goods').then((res) => {
      this.goods_types = res.data.goods_types
    })
  },
  methods: {
    numChange (value, goodsId) {
      let foodGood = this.food_goods.find((v) => { return v.goods_id === goodsId })
      if (foodGood) {
        if (value === 0) {
          let index = this.food_goods.indexOf(foodGood)
          this.food_goods.splice(index, 1)
          let selectIndex = this.selectGoods.indexOf(goodsId)
          this.selectGoods.splice(selectIndex, 1)
        } else {
          foodGood.rate = value
        }
      } else {
        if (value > 0) {
          this.food_goods.push({'goods_id': goodsId, 'rate': value})
          this.selectGoods.push(goodsId)
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'FoodNew') {
        this.$http.post('/admin/foods', { food: this.food, food_good: this.food_goods }).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/foods/' + this.$route.params.id, this.food).then((res) => {
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
    upload (res) {
      this.food.img = res.picture.image_url
    }
  }
}
</script>