<template>
  <div class="container">
    <!--首页头部-->
    <header-top :title="address.name">
      <span class="header_search"
            slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login"
            slot="right">
        <span class="header_login_text">登录<b class="msite_line">|</b>注册</span>
      </span>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(categorys, index) in categorysArr"
               :key="index">
            <a href="javascript:"
               v-for="(category, index) in categorys"
               :key="index"
               class="link_to_food">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination icon_btn"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont shop_icon icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import Swiper from 'swiper'
import ShopList from '../../components/ShopList/ShopList.vue'
import 'swiper/css/swiper.min.css'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys']),
    /**
     * 根据categorys一维数组生成一个二维数组
     * 小数组中的元素个数最大是8个
     */
    categorysArr () {
      const { categorys } = this
      //  准备一个空的二维数组
      const arr = []
      // 准备一个小数组（最大长度为8）
      let minArr = []
      // 遍历categorys
      categorys.forEach(c => {
        // 如果当前小数组已经满了 ， 创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类保存到小数组中
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    categorys (value) { // 监听categorys数组，数组有值，在异步更新界面之前执行
      // 创建一个Swiper实例对象，来实现轮播
      // 使用setTimeout 可以实现效果，但是不太好
      // setTimeout(() => {
      //   new Swiper('.swiper-container', {
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination'
      //     }
      //   })
      // }, 100)

      // 界面更新就立即创建Swiper对象
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.header {
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 4%;
    top: 40%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .icon-sousuo {
      font-size: 25px;
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 42%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;

    .header_title_text {
      font-size: 20px;
      display: block;
    }
  }

  .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .header_login_text {
      color: #fff;
    }
  }
}

.msite_nav {
  bottom-border-1px(#e4e4e4);
  margin-top: 45px;
  background: #fff;
  overflow: hidden;

  .swiper-container {
    .swiper-wrapper {
      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .link_to_food {
          width: 25%;

          .food_container {
            display: block;
            width: 100%;
            text-align: center;
            padding-bottom: 10px;
            font-size: 0;

            img {
              display: inline-block;
              width: 50px;
              height: 50px;
            }
          }

          span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }

    .swiper-pagination, .icon_btn {
      position: relative;
      margin-top: 1rem;
    }
  }
}

.msite_shop_list {
  top-border-1px(#e4e4e4);
  margin-top: 10px;
  background: #fff;

  .shop_header {
    padding: 10px 10px 0;

    .shop_icon {
      margin-left: 5px;
      color: #999;
    }

    .shop_header_title {
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
.swiper-pagination-bullet-active {
  background-color: #02a774 !important;
}
</style>
