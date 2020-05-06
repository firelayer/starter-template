<template>
  <div class="main-layout">
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" app floating class="elevation-1">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <div>
              <div class="title font-weight-bold">Firelayer Admin</div>
              <div class="overline">1.0.0 Valiant | Alpha</div>
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

        <!-- <v-subheader class="mt-4 overline">System</v-subheader>
        <v-list-item
          v-for="item in itemsSystem"
          :key="item.text"
          :to="item.link"
          :exact="item.exact"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>

      <div class="nav-footer">
        <v-btn small href="https://firelayer.io/docs" target="_blank" text>Docs</v-btn>
        <v-btn small href="https://github.com/firelayer/starter-template" target="_blank" text>Feedback</v-btn>
        <v-btn small href="https://github.com/firelayer/starter-template" target="_blank" text>Support</v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app flat color="transparent pa-1">
      <v-card class="flex-grow-1 d-flex pa-1 mt-2">
        <v-app-bar-nav-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <div>
          <UserMenu></UserMenu>
        </div>
      </v-card>
    </v-app-bar>

    <v-content>
      <v-container fill-height fluid>
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-content>
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
    // itemsSystem: [
    //   { icon: 'mdi-tune', text: 'Settings', link: '/settings' }
    // ]
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

.v-list {
  padding-bottom: 64px;
}

.nav-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 14px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
