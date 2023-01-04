<template>
  <div class="container">
    <h2 class="text-center">Fetch Data Search</h2>
    <div class="w-100 text-center">
      <el-input placeholder="Tìm kiếm sách" v-model="searchText"></el-input>
    </div>
    <div class="show-post" v-loading="loading">
      <div class="mb-4" v-for="post in posts" :key="post.id">
        <h4 class="title">{{ post.title }}</h4>
        <div class="body">{{ post.body }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      posts: [],
      loading: false,
      searchText: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.posts = []
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`);
        if (response.status == 200) {
          this.posts = response.data;
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.show-post {
  height: 600px;
  overflow-y: auto;
}
</style>
