<template>
  <div class="search-container">
    <div class="d-flex title mb-1">
      Search
      <v-spacer></v-spacer>
      <v-btn :disabled="isLoading" icon small @click="$emit('retry')">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <div class="d-sm-flex align-center">
      <v-select
        v-model="searchInField"
        :items="fields"
        class="search-select"
        label="Field"
        required
      ></v-select>
      <v-text-field
        v-model="searchQuery"
        label="Search for"
        class="mx-sm-2 flex-grow-2"
        clearable
        append-icon="mdi-magnify"
        placeholder="value"
        @keyup.enter="$emit('search', { searchQuery, searchInField })"
      ></v-text-field>
      <v-btn
        :loading="isLoading"
        color="black"
        dark
        @click="$emit('search', { searchQuery, searchInField })"
      >
        <v-icon left>mdi-magnify</v-icon>Search
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => ['id']
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ''
    },
    queryInField: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      searchQuery: '',
      searchInField: 'id'
    }
  },
  watch: {
    query(val) {
      this.searchQuery = val
    },
    queryInField(val) {
      this.searchInField = val
    }
  },
  created() {
    this.searchQuery = this.query
    this.searchInField = this.queryInField
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  padding: 16px;
}

.search-select {
  max-width: 120px;
}

@include media("xs-only") {
  .search-select {
    max-width: none;
  }
}
</style>
