<template>
  <div class="wrap">
    <div class="addBtn" @click="handleAddClick">+ 新增部门</div>
    <div class="group-sider">
      <!-- <el-menu class="group-menu" @select='handleSelect' @open='handleSelect'>
        <sidebar-items v-for='(item , key) in listTree' :key='key' :item="item" />
      </el-menu> -->
      <el-tree :data="listTree" :props="{ children: 'children', label: 'name' }" node-key="id" accordion
        @node-contextmenu="rightClick" @node-click="handlClick"></el-tree>
      <div v-show="menuVisible">
        <div id="menu" class="menu">
          <div class="menu_item edit" @click="handleEditClick">编辑</div>
          <div class="menu_item delete" @click="handleTreeDeleteClick()">删除</div>
        </div>
      </div>
    </div>
    <div class="group-main">
      <el-card class="box-card">
        <el-row style="text-align: right;padding-bottom: 18px;">
          <el-button type="primary">分配用户</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <span>测试</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" align="center">
            <template slot-scope="scope">
              <span>{{selectIndex.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template v-if="scope.row.id!=1" slot-scope="scope">
              <el-popconfirm
                title="确定要开除此员工吗？"
                confirm-button-text="开除"
                icon="el-icon-info"
                icon-color="red"
                @confirm="handleDeleteClick([scope.row.id])"
              >
                <el-link slot="reference" type="danger" :underline="false">开除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background hide-on-single-page :page-size="pagination.pageSize" :current-page="pagination.pageNum" layout="prev, pager, next" :total="pagination.total"/>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? '编辑' : '新增'"
      :fullscreen="device == 'mobile'">
      <el-form :model="addModel" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="addModel.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上级部门">
          <el-select v-model="addModel.pid" placeholder="请选择">
            <el-option label="顶级部门" :value="0" />
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"
              v-if='item.id != selectIndex.id' />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList,
    add,
    edit,
    remove
  } from '@/api/compyDepartment'
  import {
    handleTree
  } from '@/utils/utils'
  import {
    mapGetters
  } from 'vuex'
  import SidebarItems from './components/sideritem'
  const defaultModel = {
    name: '',
    pid: ''
  }

  export default {
    computed: {
      ...mapGetters(['device'])
    },
    components: {
      SidebarItems
    },
    data() {
      return {
        menuVisible: false,
        tableSelection: [],
        in_search: '',
        list: null,
        listTree: null,
        roleList: null,
        listLoading: true,
        addModel: Object.assign({}, defaultModel),
        dialogVisible: false,
        dialogType: 'add',
        selectIndex: {
          id: -1
        },
        pagination: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handlClick(obj,Node) {
        this.selectIndex = Node.data
      },
      //右键点击
      rightClick(MouseEvent, object, Node, element) {
        this.selectIndex = Node.data
        // 鼠标右击触发事件
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
        var menu = document.querySelector('#menu')
        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.display = 'block'
        menu.style.left = MouseEvent.clientX - 200 + 'px'
        menu.style.top = MouseEvent.clientY - 50 + 'px'
      },
      foo() {
        // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
      handleSelectionChange(val) {
        this.tableSelection = val
      },
      handleHeaderDeleteClick() {
        const ids = []
        this.tableSelection.forEach(item => {
          ids.push(item.id)
        })
        this.handleDeleteClick(ids)
      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.data
          this.listTree = handleTree(this.list)
          this.pagination.total = response.data.total
          this.pagination.pageNum = response.data.current_page
          this.listLoading = false
        })
      },
      handleAddClick() {
        this.addModel = Object.assign({}, defaultModel)
        this.selectIndex = {
          id: -1
        }
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEditClick() {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.addModel = this.selectIndex
      },
      handleTreeDeleteClick() {
        let that = this
        this.handleDeleteClick([that.selectIndex.id])
      },
      handleDeleteClick(account) {
        remove({
          id: account.join(',')
        }).then(response => {
          if (response.code === 200) {
            this.fetchData()
          }
        })
      },
      confirmRole() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          edit(this.addModel).then(response => {
            if (response.code === 200) {
              this.dialogVisible = false
              this.fetchData()
            }
          })
        } else {
          add(this.addModel).then(response => {
            if (response.code === 200) {
              this.dialogVisible = false
              this.fetchData()
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    // padding-left: 10px;
    // background-color: rgb(240, 242, 245);
    position: absolute;
    height: 100%;
    width: 100%;
    top: 50px;

    .addBtn {
      text-align: center;
      line-height: 50px;
      width: 240px;
      background: #fff;
      cursor: pointer;
      color: #1890ff;
      border-right: solid 1px #e6e6e6;
      border-bottom: solid 1px #e6e6e6;
    }

    .group-sider {
      border-right: solid 1px #e6e6e6;
      width: 240px !important;
      height: calc(100vh - 101px);
      overflow: auto;
      overflow-x: hidden;
      padding-top: 6px;
    }

    .group-menu {
      height: 100%;
    }

    .menu {
      list-style: none;
      position: absolute;
      border-radius: 10px;
      border: 1px solid #f1f1f1;
      background: #fff;
      width: 100px;
      cursor: pointer;

      .menu_item {
        text-align: center;
        font-size: 13px;
        line-height: 36px;
        height: 36px;

        &:hover {
          color: #fff;
        }
      }

      .delete {
        border-radius: 0 0 10px 10px;
        color: #f56c6c;

        &:hover {
          background: #f56c6c;
        }
      }

      .edit {
        border-radius: 10px 10px 0 0;
        color: #409eff;

        &:hover {
          background: #409eff;
        }
      }
    }
    .group-main{
      position: absolute;
      right: 0;
      top: 0px;
      left: 240px;
      bottom: 0;
      background: #f2f2f2;
      overflow-y: auto;
    }
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 2px;
    height: 16px;
    background-color: #f1f1f1;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f1f1f1;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f1f1f1;
  }
</style>
