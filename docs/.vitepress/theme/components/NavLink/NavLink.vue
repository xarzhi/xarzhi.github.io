<template>
  <div class="nav_link">
    <div class="sidebar">
      <div class="menu">
        <ul>
          <li v-for="item in data" :key="item.title">
            <a :href="`#${item.title}`">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <h1>导航</h1>
      <div class="content" v-for="item in data" :key="item.title">
        <h2>{{ item.title }}</h2>
        <el-tabs
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
          v-model="activeName"
        >
          <template v-for="links in item.items" :key="links.title">
            <el-tab-pane :label="links.title" name="first" class="links">
              <div class="link" v-for="link in links.items" :key="link.title">
                {{ link.title }}
              </div>
            </el-tab-pane>
          </template>

          <!-- <el-tab-pane label="Config" name="second">Config</el-tab-pane>
          <el-tab-pane label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
        </el-tabs>
        <!-- <div class="links" v-for="links in item.items" :key="links.title">
          <div class="link" v-for="link in links.items" :key="link.title"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const activeName = ref("first");
const data = [
  {
    title: "编程",
    items: [
      {
        title: "前端",
        items: [
          {
            title: "开发框架",
            items: [
              {
                title: "Vue2",
                link: "123",
              },
            ],
          },
          {
            title: "Ui组件库",
            items: [
              {
                title: "Element-Plus",
                link: "https://element-plus.org/",
              },
            ],
          },
        ],
      },
      {
        title: "后端",
        items: [
          {
            title: "开发框架11",
            items: [
              {
                title: "Vue2",
                link: "123",
              },
            ],
          },
          {
            title: "Ui组件库22",
            items: [
              {
                title: "Element-Plus",
                link: "https://element-plus.org/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "办公",
    items: [
      {
        title: "ppt下载",
        items: [{ title: "简易ppt" }],
      },
      {
        title: "pdf处理",
        items: [{ title: "i love pdf" }],
      },
    ],
  },
];

const handleClick = (val, e) => {
  activeName.value = "前端";
  console.log(val, e);
};
</script>

<style lang="scss" scoped>
.nav_link {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  color: #333;
  font-family: var(--vp-font-family-base);
  .sidebar {
    height: 100%;
    background-color: aqua;
    .menu {
      margin-left: 200px;
      width: 150px;
      ul {
        li {
          a {
            width: 150px;
          }
        }
      }
    }
  }
  .main {
    flex: 1;
    height: 100%;
    padding: 20px 80px;
    .content {
      .links {
        display: flex;
        margin-bottom: 20px;
        .link {
          width: 300px;
          height: 80px;
          display: flex;
          border: 1px solid #000;
          border-radius: 8px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
