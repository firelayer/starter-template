<template>
  <div class="firetable">
    <fire-table-search
      v-if="hasSearch"
      :fields="fields"
      :query="query"
      :query-in-field="queryInField"
      :is-loading="isLoading"
      @retry="onRetry"
      @search="onSearch"
    />

    <div v-else class="d-flex title pa-2">
      <v-spacer></v-spacer>
      <v-btn :disabled="isLoading" icon small @click="onRetry">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <!-- list items slot -->
    <slot
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :disable-sort="disableSort"
      :is-loading="isLoading"
      :items="items"
      :page="page"
      :has-more="hasMore"
      :query="query"
      :query-in-field="queryInField"
      :sort="onSort"
      :search="onSearch"
      :retry="onRetry"
      name="list"
    ></slot>

    <fire-table-pagination
      :page="page"
      :has-more="hasMore"
      :is-loading="isLoading"
      @next="nextPage"
      @prev="prevPage"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { fireTableState, fireTableActions, fireTableMutations } from './store'
import FireTableSearch from './FireTableSearch'
import FireTablePagination from './FireTablePagination'

export default {
  name: 'FireTable',
  components: {
    FireTableSearch,
    FireTablePagination
  },
  props: {
    namespace: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 10
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    fields: {
      type: Array,
      default: () => ['id']
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    persist: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    items() {
      return this.$store.state[this.namespace]['items']
    },
    isLoading() {
      return this.$store.state[this.namespace]['isLoading']
    },
    page() {
      return this.$store.state[this.namespace]['page']
    },
    hasMore() {
      return this.$store.state[this.namespace]['hasMore']
    },
    sortBy() {
      return this.$store.state[this.namespace]['sortBy']
    },
    sortDesc() {
      return this.$store.state[this.namespace]['sortDesc']
    },
    queryInField() {
      return this.$store.state[this.namespace]['queryInField']
    },
    query() {
      return this.$store.state[this.namespace]['query']
    },
    disableSort() {
      return this.$store.state[this.namespace]['disableSort']
    },
    initialized() {
      return this.$store.state[this.namespace]['initialized']
    }
  },
  created() {
    if (!this.isModuleCreated([this.namespace])) this.registerModule()

    this.$emit('sort-updated', {
      sortBy: this.sortBy,
      sortDesc: this.sortDesc
    })
  },
  mounted() {
    if (!this.initialized)
      this.search({
        query: '',
        queryInField: 'id',
        disableSort: false,
        sortBy: null,
        sortDesc: true
      })
  },
  beforeDestroy() {
    if (!this.persist) this.$store.unregisterModule(this.namespace)
  },
  methods: {
    ...mapActions({
      search(dispatch, payload) {
        return dispatch(this.namespace + '/search', payload)
      },
      nextPage(dispatch, payload) {
        return dispatch(this.namespace + '/nextPage', payload)
      },
      prevPage(dispatch, payload) {
        return dispatch(this.namespace + '/prevPage', payload)
      }
    }),
    onSort(options) {
      const { sortBy, sortDesc } = options

      // console.log(options)

      if (sortBy !== this.sortBy || sortDesc !== this.sortDesc) {
        const sortOptions = {
          sortBy: typeof sortBy !== 'undefined' ? sortBy : this.sortBy,
          sortDesc: typeof sortDesc !== 'undefined' ? sortDesc : this.sortDesc
        }

        this.search({
          query: '',
          disableSort: false,
          ...sortOptions
        })

        this.$emit('sort-updated', {
          sortBy: this.sortBy,
          sortDesc: this.sortDesc
        })
      }
    },
    onSearch({ searchQuery, searchInField } = {}) {
      this.search({
        query: searchQuery,
        queryInField: searchInField,
        disableSort: searchQuery ? true : false,
        sortBy: null,
        sortDesc: true
      })
    },
    onRetry() {
      const { query, queryInField, disableSort, sortBy, sortDesc } = this

      this.search({
        query,
        queryInField,
        disableSort,
        sortBy,
        sortDesc
      })
    },
    searchLatest() {
      this.search({
        query: '',
        queryInField: 'id',
        disableSort: false,
        sortBy: 'updated_at',
        sortDesc: true
      })
    },
    isModuleCreated(path) {
      let m = this.$store._modules.root

      return path.every((p) => {
        m = m._children[p]

        return m
      })
    },
    registerModule() {
      this.$store.registerModule(this.namespace, {
        namespaced: true,
        state: fireTableState(),
        actions: fireTableActions(this.limit, this.fetch),
        mutations: fireTableMutations()
      })
    }
  }
}
</script>
