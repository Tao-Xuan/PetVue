<template>
  <div class="pet-hospital-home">
    <!-- 顶部导航栏 -->
    <el-header class="header fixed-header" style="height:64px;">
      <div class="logo">
        <img src="../assets/logo/logo.png" alt="Logo" />
      </div>
      <el-menu
          class="menu"
          mode="horizontal"
          background-color="#ffffff"
          text-color="#333333"
          active-text-color="#409EFF"
          :default-active="activeMenu"
          @select="handleMenuSelect"
      >
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="about">关于</el-menu-item>
        <el-menu-item index="team">医疗团队</el-menu-item>
        <el-menu-item index="services">诊疗服务</el-menu-item>
        <el-menu-item index="news">资讯</el-menu-item>
      </el-menu>
      <el-button
          type="primary"
          class="login-button"
          @click="goToLogin"
      >
        登录/注册
      </el-button>
    </el-header>

    <!-- 主内容区 -->
    <el-main class="main-content">
      <div class="banner" id="home">
        <div class="banner-text">
          <h2>因为严谨 所以安心</h2>
          <div class="text-cn">以保障爱宠的健康为宗旨，重新定义每个小生命的尊严和价值</div>
          <div class="text-en">Redefining the dignity and value of every little life for the purpose
            of protecting the health of love and affection
          </div>
          <el-button round style="margin-top: 30px;width: 240px;height: 50px" type="primary" size="large" @click="bookAppointment">
            预约诊疗
          </el-button>
        </div>
      </div>

      <div class="about" id="about">
        <div class="home-tit transition">
          <div style="padding-top: 15px">About us</div>
          <span>关于哞哞</span>
          <p>致力于推动中国宠物医疗事业发展，本着“因为严谨、所以安心”的宗旨以“家人”般的呵护，将服务做到贴心与专业，为爱宠提供人性化、高品质的健康服务体验</p>
        </div>

        <ul class="clearfix">
          <li class="transition">
            <div class="item b-shadow">
              <img src="../assets/home/home_about_ico1.png" alt="180家分院" />
              <span class="num">
                180<em>+</em>
              </span>
              <div>家分院</div>
              <p>183 Hospital Branch</p>
            </div>
          </li>
          <li class="transition">
            <div class="item b-shadow">
              <img src="../assets/home/home_about_ico2.png" alt="800名医生" />
              <span>
                799
              </span>
              <div>名医生</div>
              <p>800 pet doctors</p>
            </div>
          </li>
          <li class="transition">
            <div class="item b-shadow">
              <img src="../assets/home/home_about_ico3.png"
                   alt="180万https://beian.miit.gov.cn/" />
              <span class="num">
                180W<em>+</em>
              </span>
              <div>年接诊病例</div>
              <p>1800000+ Clinical case</p>
            </div>
          </li>
          <li class="transition">
            <div class="item b-shadow">
              <img src="../assets/home/home_about_ico4.png" alt="30000+客户感谢留言" />
              <span class="num">
                30000<em>+</em>
              </span>
              <div>客户感谢留言</div>
              <p>30000+ Customer letter</p>
            </div>
          </li>
          <li class="transition">
            <div class="item b-shadow">
              <img src="../assets/home/home_about_ico5.png" alt="400万+康复案例" />
              <span class="num">
                400W<em>+</em>
              </span>
              <div>康复案例</div>
              <p>4000000+ Rehabilitation cases</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="team" id="team">
        <div class="home-tit transition">
          <div>Medical team</div>
          <span>医疗团队</span>
          <p>现有800+主治医生全体持证上岗，20+博士专家，临床经验丰富、医疗技术精湛</p>
        </div>
        <div class="team-list">
          <div class="team-member" v-for="member in team" :key="member.id">
            <img :src="member.avatar" alt="头像" />
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
          </div>
        </div>
      </div>

      <div class="services" id="services">
        <h2>诊疗服务</h2>
        <el-row >
          <el-col :span="8" v-for="service in services" :key="service.id">
            <el-card class="card">
              <h3>{{ service.name }}</h3>
              <p>{{ service.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div class="news" id="news">
        <h2>最新资讯</h2>
        <el-carousel height="200px" :autoplay="true" indicator-position="outside">
          <el-carousel-item v-for="article in news" :key="article.id">
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-main>

    <!-- 页脚 -->
    <el-footer class="footer">
      <p>© 2024 宠物医院 版权所有 | 联系我们: 123-456-7890 | 邮箱: info@pethospital.com</p>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "PetHospitalHome",
  data() {
    return {
      activeMenu: "home",
      sections: ["home", "about", "team", "services", "news"],  // 页面各个部分的 id
      team: [
        {id: 1, name: "张医生", role: "主治医生", avatar: "https://via.placeholder.com/100"},
        {id: 2, name: "李医生", role: "外科医生", avatar: "https://via.placeholder.com/100"},
        {id: 3, name: "王护士", role: "护士长", avatar: "https://via.placeholder.com/100"},
      ],
      services: [
        {id: 1, name: "健康检查", description: "全面的宠物健康检查服务。"},
        {id: 2, name: "疫苗接种", description: "为宠物提供安全、专业的疫苗接种。"},
        {id: 3, name: "手术治疗", description: "专业的手术服务，保障宠物健康。"},
      ],
      news: [
        {id: 1, title: "春季宠物疫苗接种指南", summary: "保护宠物健康，从疫苗接种开始。"},
        {id: 2, title: "如何预防宠物中暑", summary: "夏季来临，中暑防护要点。"},
        {id: 3, title: "宠物饮食健康小贴士", summary: "科学搭配宠物饮食，增强免疫力。"},
      ],
    };
  },
  mounted() {
    // 页面加载时监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // 组件销毁时，移除滚动事件监听
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY + 64;  // 当前滚动位置加上导航栏高度
      this.sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 64;  // 去除导航栏的高度
          const bottom = top + element.offsetHeight;
          // 判断当前滚动位置是否在该区域内
          if (scrollPosition >= top && scrollPosition < bottom) {
            this.activeMenu = section;  // 更新激活的菜单项
          }
        }
      });
    },
    handleMenuSelect(menu) {
      //跳转到其他页面方法
      this.activeMenu = menu;
      // this.$router.push(`/${menu}`);
      //固定到当前页面锚点
      // const element = document.getElementById(menu);
      // if (element) {
      //   element.scrollIntoView({ behavior: "smooth" });
      // }
      //固定到导航栏下面
      const element = document.getElementById(menu);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 64,  // 这里的 64 是导航栏的高度，可以根据需要调整
          behavior: "smooth",
        });
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    bookAppointment() {
      alert("预约功能开发中，敬请期待！");
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.pet-hospital-home {
  background-color: #f9f9f9;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  margin-top: 64px; /* 调整内容区的上边距以避免被固定头部遮挡 */
  padding: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 20px;
  height: 64px;
}

.logo img {
  height: 64px;
}

.menu {
  flex: 1;
  margin-left: 20px;
}

/* 覆盖Element UI水平菜单项悬停和聚焦时的背景颜色 */
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent !important; /* 或者您想要设置的背景颜色 */
}

.login-button {
  margin-left: auto;
}

.banner {
  background-position: center center;
  background-size: cover;
  background-image: url("../assets/home/home-banner.png");
  height: calc(100vh - 64px);
  text-align: center;
  background-color: #e3f2fd;
}

.banner-text {
  position: absolute;
  width: 100%;
  left: 0;
  top: 40%;
  color: #FFFFFF;
}

.banner-text h2 {
  font-size: 60px;
  letter-spacing: 2px;
  padding-bottom: 20px;
  position: relative;
  font-weight: 500;
  color: #FFFFFF;
}

.banner-text .text-cn {
  margin: 20px auto 0;
  max-width: 820px;
  font-size: 30px;
}

.banner-text .text-en {
  margin: 20px auto 0;
  max-width: 730px;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  opacity: .6;
}

.about {
  background-position: center center;
  background-size: cover;
  background-image: url("../assets/home/home_about_bg.png");
  height: calc(100vh - 64px);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "思源黑体", "Microsoft Yahei", -apple-system, "PingFang SC", "Helvetica Neue", STHeiti, Tahoma, Simsun, sans-serif;
}

.clearfix {
  margin: 50px;
  display: flex;
  justify-content: space-around; /* 元素水平对齐方式 */
  list-style: none; /* 去掉默认的列表样式 */
}

.clearfix li {
  padding: 0 15px;
  flex: 1; /* 可选，设置每个 li 等宽 */
  text-align: center; /* 可选，居中内容 */
}

.clearfix li .item {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 15% 0;
}

.clearfix li .item p {
  margin-top: 10px;
  font-size: 12px;
  text-transform: uppercase;
  color: #1cb19c;
}

.clearfix li .item span {
  color: #ff7f5b;
  font-size: 58px;
}

em {
  font-style: normal;
}

.clearfix li .item div {
  margin-top: 15px;
  color: #333333;
}

.clearfix img {
  margin: 0 auto 20px;
  display: block;
}

.home-tit {
  text-align: center;
}

.home-tit div {
  font-size: 30px;
  color: #333333;
  text-transform: uppercase;
}

.home-tit span {
  margin-top: 5px;
  display: block;
  font-size: 18px;
  color: #333333;
}

.home-tit p {
  color: #666;
  margin: 20px auto 0;
  max-width: 650px;
  line-height: 30px;
}

.news {
  background-position: center center;
  background-size: cover;
  background-image: url("../assets/home/home-news.png");
  height: calc(100vh - 64px);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.services {
  background-position: center center;
  background-size: cover;
  background-image: url("../assets/home/home-services.png");
  height: calc(100vh - 64px);
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.team {
  /*background-position: center center;*/
  /*background-size: cover;*/
  /*background-image: url("@/assets/img/home/home-team.png");*/
  height: calc(100vh - 64px);
  background: linear-gradient(to bottom, #fffcee 50%, white 50%);
  /*background-color: #fffcee;*/
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card {
  margin-bottom: 20px; /* 卡片底部边距 */
  margin-left: 10px; /* 左边距 */
  margin-right: 10px; /* 右边距 */
}

.team-list {
  display: flex;
  justify-content: space-around;
}

.team-member {
  text-align: center;
  width: 150px;
}

.footer {
  height: 20px;
  text-align: center;
  padding: 0;
  background-color: pink;
  color: white;
}
</style>