<template>
  <div class="main-layout">
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" app class="elevation-1">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <div>
              <div class="title font-weight-bold">Firelayer Admin</div>
              <div class="overline">1.0.0 Valiant</div>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <v-subheader class="mt-1 overline">Menu</v-subheader>
        <v-list-item v-for="item in items" :key="item.text" :to="item.link" :exact="item.exact">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2 text-center">
          <v-btn small href="https://firelayer.io/docs" target="_blank" text>Docs</v-btn>
          <v-btn small href="https://github.com/firelayer/starter-template" target="_blank" text>Feedback</v-btn>
          <v-btn small href="https://github.com/firelayer/starter-template" target="_blank" text>Support</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div>
        <UserMenu></UserMenu>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import UserMenu from '../components/common/UserMenu'

export default {
  components: {
    UserMenu
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'Dashboard', link: '/dashboard', exact: true },
      { icon: 'mdi-account-multiple-outline', text: 'Users', link: '/users' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex: 1 1 auto;
}

.menu-text {
  font-size: 0.875rem;
}

.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 14px;
}

.theme--dark {
  .v-icon {
    color: #ccced2;
  }

  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #ccced2 !important;
  }
}

.v-list-item--active {
  &,
  .v-icon {
    color: lighten($primary, 25%);
  }

  .menu-text {
    font-weight: bold;
  }
}
</style>
