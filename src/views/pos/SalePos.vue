<template>
  <div>pos</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      test: "",
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const options = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
        params: {keyword: 'iphone', country: 'US', category: 'aps'},
        headers: {
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'amazon-product-reviews-keywords.p.rapidapi.com'
        }
      };

      this.loading = true;
      try {
        const response = await axios.request(options);
        if (response.status == 200) {
          console.log(response);
        } else {
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
