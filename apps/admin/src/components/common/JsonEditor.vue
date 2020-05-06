<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor'
import 'jsoneditor/src/scss/jsoneditor.scss'

export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value: {
      immediate: true,
      async handler(val) {
        if (this.editor) this.editor.set(val)
      },
      deep: true
    }
  },
  mounted() {
    const onChange = () => {
      try {
        const json = this.get()

        this.$emit('change', json)
        this.$emit('input', json)
      } catch (e) {
        this.$emit('error', e)
      }
    }

    this.editor = new JSONEditor(this.$refs.editor, {
      mode: 'code',
      onChange
    })

    this.editor.set(this.value)
  },
  methods: {
    get() {
      return this.editor.get()
    }
  }
}
</script>
