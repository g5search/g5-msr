<template>
  <b-navbar class="nav-bar d-block px-0 bg-primary-70">
    <div class="w-100 d-flex mb-2 px-3 justify-content-between">
      <b-navbar-brand class="text-white d-flex align-items-baseline">
        <b-img-lazy src="/G5-RP_logo_2023-RED.png" height="35" class="mr-2" />
        <b-icon-alarm />
        Activity Tracker
      </b-navbar-brand>
      <b-nav-text class="align-self-start p-0">
        <h2 class="mb-0 text-white font-weight-bold">
          {{ name }}
        </h2>
        <div class="text-white text-uppercase small mb-0">
          From
          <b-badge class="px-3" style="font-size: 0.75rem;" variant="gray-20">
            {{ period.from }}
          </b-badge>
          To
          <b-badge class="px-3" style="font-size: 0.75rem;" variant="gray-20">
            {{ period.to }}
          </b-badge>
        </div>
      </b-nav-text>
      <b-list-group class="flex-row align-items-center">
        <b-list-group-item
          v-for="(item, i) in items"
          :key="item.text"
          class="p-0 mr-1 border-0 bg-transparent"
        >
          <b-btn
            :href="item.href"
            variant="secondary-70"
            class="px-3 m-0 text-uppercase nav-btn font-weight-bold"
            style="border-radius: 11px; box-shadow: 0 2px 2px rgba(5, 5, 5, 0.5);"
            size="sm"
            @click="move(i)"
          >
            {{ item.text }}
          </b-btn>
        </b-list-group-item>
      </b-list-group>
    </div>
    <b-progress
      :value="position"
      class="w-100 mb-0 rounded-0"
      height="3px"
    />
  </b-navbar>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default () {
        return [
          { text: 'Overview', href: '#overview' },
          { text: 'Digital Advertising', href: '#da' },
          { text: 'SEO', href: '#seo' },
          { text: 'Customer Care', href: '#cc' }
        ]
      }
    },
    period: {
      type: Object,
      default () {
        return {
          to: '',
          from: ''
        }
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    position () {
      return `${Math.round(this.progress * 100)}%`
    }
  },
  methods: {
    move (index) {
      if (index < 0) {
        this.position = 0
      } else if (index > this.items.length - 1) {
        this.position = this.items.length - 1
      } else {
        this.position = index
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-btn:focus {
    box-shadow: none;
  }
</style>
