<template>
  <div class="Roles">
    <el-card>
      <el-row>
        <!-- 添加角色 -->
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
        <el-col>
          <!-- 角色列表 -->
          <el-table :data="roleList" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template v-slot="{ row }">
                <el-row
                  class="role-row"
                  v-for="item1 in row.children"
                  :key="item1.id"
                >
                  <!-- 渲染一级权限 -->
                  <el-col :span="5">
                    <el-tag closable @close="removeRightById(row, item1.id)">{{
                      item1.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <!-- 渲染二和三级权限 -->
                  <el-col :span="19">
                    <!-- 通过 for 嵌套 渲染二级权限 -->
                    <el-row
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      class="role-row"
                    >
                      <el-col :span="6">
                        <el-tag
                          type="success"
                          closable
                          @close="removeRightById(row, item2.id)"
                        >
                          {{ item2.authName }}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag
                          type="warning"
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          closable
                          @close="removeRightById(row, item3.id)"
                        >
                          {{ item3.authName }}
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteRole(row.id)"
                  icon="el-icon-delete"
                  >删除</el-button
                >
                <el-button
                  size="mini"
                  @click="showSetRightDialog(row)"
                  type="warning"
                  icon="el-icon-search"
                  >分配权限</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
    >
      <el-form
        :model="addRolesForm"
        :rules="addFormRules"
        ref="addRolesForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%">
      <el-form
        :model="editRolesForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rolesFormRulesMixin } from "@/common/mixins";
import {
  getRoleList,
  addRole,
  editRole,
  deleteRole,
  deleteRoleRight,
  getRightTree,
  allotRights
} from "@/api/data.js";
export default {
  mixins: [rolesFormRulesMixin],
  data() {
    return {
      // 所有角色的列表
      roleList: [],
      // 所有权限的数据
      rightList: [],
      // 添加角色对话框的显示和隐藏
      addDialogVisible: false,
      // 编辑对话框的显示和隐藏
      editDialogVisible: false,
      // 分配权限对话框的显示和隐藏
      setRightDialogVisible: false,
      addRolesForm: {
        roleName: "",
        roleDesc: "",
      },
      editRolesForm: {},
      // 树形控件的绑定对象
      treeProps: {
        children: "children",
        label: "authName",
      },
      // 树形控件 -> 默认选中的节点id值数组
      checkedKeys: [],
      // 当前即将分配权限的角色的ID
      currentRoleId: ''
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      getRoleList().then((res) => {
        this.roleList = res.data;
      });
    },
    // 添加角色
    addRolesUser() {
      this.$refs.addRolesForm.validate(async (valid) => {
        if (!valid) return;
        addRole(this.addRolesForm).then((res) => {
          this.$message.success("添加角色成功!");
          this.getRoleList();
          this.addDialogVisible = false;
        });
      });
    },
    // 清空添加角色对话框
    addDialogClosed() {
      this.$refs.addRolesForm.resetFields();
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm("此操作将永久删除角色,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除用户成功!",
            });
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 得到修改用户的信息
    showEditDialog(roleInfo) {
      this.editRolesForm = JSON.parse(JSON.stringify(roleInfo));
      this.editDialogVisible = true;
    },
    editRole() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editRole(this.editRolesForm).then((res) => {
          if (res) {
            this.$message.success("修改角色成功!");
            this.getRoleList();
            this.editDialogVisible = false;
          }
        });
      });
    },

    // 根据ID删除对应的权限
    removeRightById(role, rightId) {
      // 弹框提示用户是否删除
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRoleRight(role.id, rightId).then((res) => {
            if (!res) return;
            this.$message({
              type: "success",
              message: "删除权限成功!",
            });
            // 返回的数据是最新的权限
            role.children = res.data;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 展示分配权限的对话框
    showSetRightDialog(role) {
      // 获取所有权限列表
      getRightTree().then((res) => {
        this.rightList = res.data;
      });
      // 递归获取三级节点
      this.getLeafKeys(role);
      this.setRightDialogVisible = true;
      this.currentRoleId = role.id
    },

    // 获取该权限默认选中的节点 递归方式
    getLeafKeys(node) {
      // 如果当前node没有children属性则是三级节点
      if (!node.children) {
        return this.checkedKeys.push(node.id);
      }
      node.children.forEach((item) => this.getLeafKeys(item));
    },

    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      // 清空 checkedKeys 数组  避免累积
      this.checkedKeys = [];
    },
    // 点击确定 为角色分配权限
    allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const roleIdsStr = keys.join(",");
      allotRights(this.currentRoleId,roleIdsStr).then((res) => {
        if (res) {
          this.$message.success("分配权限成功!");
          this.getRoleList();
          this.setRightDialogVisible = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.role-row {
  padding: 15px 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
</style>