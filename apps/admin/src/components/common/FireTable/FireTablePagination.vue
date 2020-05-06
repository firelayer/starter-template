<template>
  <div class="firetable-pagination">
    <div class="current-page">Page {{ page }}</div>
    <v-btn :disabled="isLoading || page <= 1" icon @click="$emit('prev')">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn :disabled="isLoading || !hasMore" icon @click="$emit('next')">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FireTablePagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.firetable-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.75rem;
  padding: 0 8px;
  min-height: 60px;
  border-top: thin solid rgba(85, 93, 113, 0.12);

  .current-page {
    margin: 0 24px;
  }

  .v-btn {
    margin-left: 10px;
  }
}
</style>
