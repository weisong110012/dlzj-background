<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="文档名称" sortable align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" sortable align="center"></el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" icon="el-icon-edit" style='margin: 0 10px;'>编辑</el-link>
            <el-link type="danger" :underline="false" icon="el-icon-delete">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 2,
          date: '2016-05-04',
          name: '第一章',
         children: [
           {
             id: 31,
             date: '2016-05-01',
             name: '安装第一步',
             address: '上海市普陀区金沙江路 1519 弄'
           },
           {
             id: 32,
             date: '2016-05-01',
             name: '安装第二部',
             address: '上海市普陀区金沙江路 1519 弄'
           }
         ]
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '第二章',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '安装第一步',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '安装第二部',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style></style>
