<template>
  <!-- <div
    class="thumbnail"
    :style="{'background-image': 'src(' + thumbnail + ')', 'background-position': 'center', 'background-repeat': 'no-repeat'}"
  ></div>-->
  <img class="image" :src="thumbnail" />
</template>

<script>
import * as fromApi from "../core/api.service";

export default {
  name: "thumbnail",
  props: {
    path: { type: String, required: true },
    extension: { type: String, required: true }
  },
  computed: {
    thumbnail: function() {
      return `${this.path}/portrait_xlarge.${this.extension}`;
    }
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
</style>
