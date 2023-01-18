import { nanoid } from "nanoid";

export default {
  methods: {
    initData() {
      return {
        id: nanoid(),
        data: {
          x: 0,
          y: 0,
          w: 100,
          h: 100
        },
      };
    },
  },
};
