<template>
  <div class="params">
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert
        title="注意: 只允许为第三级分类设置相关参数!"
        :closable="false"
        type="warning"
        show-icon
      >
      </el-alert>

      <el-row class="cat_opt">
        <span>选择商品分类: </span>
        <!-- 级联选择框 -->
        <el-cascader
          v-model="selectedCateKeys"
          :options="cateList"
          :props="{ expandTrigger: 'hover', ...cateProps }"
          @change="selectedCate"
        ></el-cascader>
      </el-row>

      <!-- tab 页签区 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            size="mini"
            :disabled="isBtnDisabled"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template v-slot="{ row }">
                <!-- 循环渲染Tag标签 -->
                <el-tag
                  closable
                  v-for="(item, index) in row.attr_vals"
                  :key="index"
                  @close="handleClosed(index, row)"
                >
                  {{ item }}</el-tag
                >
                <!-- 输入的文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="row.inputVisible"
                  v-model="row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  @click="showEditDialog(row)"
                  icon="el-icon-edit"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="removeParams(row.attr_id)"
                  icon="el-icon-delete"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            size="mini"
            :disabled="isBtnDisabled"
            >添加属性</el-button
          >
          <!-- 静态参数表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template v-slot="{ row }">
                <!-- 循环渲染Tag标签 -->
                <el-tag
                  closable
                  v-for="(item, index) in row.attr_vals"
                  :key="index"
                  @close="handleClosed(index, row)"
                >
                  {{ item }}</el-tag
                >
                <!-- 输入的文本框 -->
                <el-input
                  class="input-new-tag"
                  v-show="row.inputVisible"
                  v-model="row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                >
                </el-input>
                <el-button
                  v-show="!row.inputVisible"
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  @click="showEditDialog(row)"
                  icon="el-icon-edit"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="removeParams(row.attr_id)"
                  icon="el-icon-delete"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { paramsFormRulesMixin } from "@/common/mixins.js";
import {
  getCateList,
  getParams,
  addParam,
  editParam,
  deleteParam,
  saveAttrVals,
} from "@/api/data.js";
export default {
  name: "Params",
  mixins: [paramsFormRulesMixin],
  data() {
    return {
      cateList: [],
      // 级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择框双向绑定的数组
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: "many",
      // 动态参数数据
      manyTableData: [],
      // 静态属性数据
      onlyTableData: [],
      // 控制添加对话框的显示和隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {},
      // 控制修改对话框的显示和隐藏
      editDialogVisible: false,
      // 修改的表单对象
      editForm: {},
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取所有商品分类的数据
    getCateList() {
      getCateList().then((res) => {
        if (res) {
          this.cateList = res.data;
        }
      });
    },
    // 选中分类
    selectedCate() {
      this.getParamsData();
    },
    // tab 页签点击事件的处理函数
    handleTabClick() {
      this.getParamsData();
    },
    // 获取参数的列表数据
    getParamsData() {
      // 选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        this.manyTableData = [];
        this.onlyTableData = [];
        return;
      } else {
        // 选中的是三级分类
        getParams(this.cateId, this.activeName).then((res) => {
          if (res) {
            // 获取Tag的数据分割为数组
            res.data.forEach((item) => {
              item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
              // 控制文本框的显示和隐藏
              item.inputVisible = false;
              item.inputValue = "";
            });
            if (this.activeName === "many") {
              this.manyTableData = res.data;
            } else {
              this.onlyTableData = res.data;
            }
          }
        });
      }
    },
    // 监听对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        addParam(this.cateId, this.activeName, this.addForm.attr_name).then(
          (res) => {
            if (res) {
              this.$message.success("添加参数成功");
              this.getParamsData();
              this.addDialogVisible = false;
            }
          }
        );
      });
    },
    // 点击按钮展示修改的对话框
    showEditDialog(paramInfo) {
      this.editForm = JSON.parse(JSON.stringify(paramInfo));
      this.editDialogVisible = true;
    },
    // 重置修改的表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击按钮修改数据信息
    editParams() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        editParam(
          this.cateId,
          this.editForm.attr_id,
          this.editForm.attr_name,
          this.activeName
        ).then((res) => {
          this.$message.success("修改参数成功!");
          this.getParamsData();
          this.editDialogVisible = false;
        });
      });
    },
    removeParams(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteParam(this.cateId, id).then((res) => {
            this.$message.success("删除参数成功");
            this.getParamsData();
          });
        })
        .catch((err) => {
          this.$message.info("已取消删除操作!");
        });
    },
    // 文本框失去焦点和回车触发
    handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      // 如果没有return证明内容合法做后续处理
      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      // 需要发送请求,保存
      this.saveAttrVals(row);
    },
    // Tag标签的删除
    handleClosed(index, row) {
      row.attr_vals.splice(index, 1);
      this.saveAttrVals(row);
    },
    saveAttrVals(row) {
      saveAttrVals(this.cateId, row, this.activeName).then((res) => {
        if (res) {
          this.$message.success("修改参数项成功!");
        }
      });
    },
    // 点击按钮显示文本输入框
    showInput(row) {
      row.inputVisible = true;
      // 自动获取焦点
      // $nextTick 方法作用: 当页面上的元素被重新渲染之后,才会指定回调函数中的代码
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  },
  computed: {
    // 如果按钮需要被禁用.则返回true,否则返回fasle
    isBtnDisabled() {
      return this.selectedCateKeys.length !== 3;
    },
    // 当前选中的分类ID
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态参数";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin: 5px 10px;
}
.button-new-tag {
  margin: 5px 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin: 5px 10px;
  vertical-align: bottom;
}
</style>