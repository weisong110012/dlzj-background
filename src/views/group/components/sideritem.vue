<template>
  <div>
    <el-submenu :index="item.id+''" v-if='item.children'>
      <template slot="title">
        <span>{{item.name}}</span>
      </template>
      <el-menu-item-group>
          <sidebar-items
            v-for="(child,key) in item.children"
            :key="key"
            :item="child"
            class="nest-menu"
          />
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item :index="item.id+''" v-else>
      {{item.name}}
    </el-menu-item>
  </div>

</template>

<script>
  export default {
    name: 'SidebarItems',
    props: {
      // route object
      item: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style>
</style>
