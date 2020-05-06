<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div ref="copylabel" class="copylabel faster" v-on="on" @click.stop.prevent="copy">{{ text }}</div>
    </template>
    <span>Copy</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    toastText: {
      type: String,
      default: 'Copied to clipboard!'
    },
    animation: {
      type: String,
      default: 'heartBeat'
    }
  },
  methods: {
    copy() {
      this.$animate(this.$refs.copylabel, this.animation)
      this.$clipboard(this.text, this.toastText)
    }
  }
}
</script>

<style lang="scss" scoped>
.copylabel {
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px dashed;
}
</style>
