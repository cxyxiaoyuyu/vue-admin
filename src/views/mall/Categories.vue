<template>
  <div class="cate">
    <el-card>
      <el-row>
        <el-button type="primary" @click="showAddCateDialog"
          >添加分类</el-button
        >
      </el-row>
      <el-row>
        <!-- 表格 -->
        <tree-table
          :data="cateList"
          :expand-type="false"
          :selection-type="false"
          show-index
          class="treetable"
          index-text="#"
          stripe
          border
          :show-row-hover="true"
          :columns="columns"
        >
          <!-- 是否有效 -->
          <template v-slot:isok="{ row }">
            <i
              class="el-icon-success"
              v-if="row.cat_deleted === false"
              style="color: lightgreen"
            ></i>
            <i class="el-icon-error" style="color: red" v-else></i>
          </template>
          <!-- 排序 -->
          <template v-slot:order="{ row }">
            <el-tag size="mini" v-if="row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <!-- 操作 -->
          <template v-slot:opt="{ row }">
            <el-button
              type="primary"
              @click="showeditCateDialog(row)"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="removeCate(row.cat_id)"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
          </template>
        </tree-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加分类的对话框   -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="{
              expandTrigger: 'hover',
              ...cascaderProps,
              checkStrictly: 'true',
            }"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类信息 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisbel"
      width="50%"
    >
      <el-form
        :model="editCateForm"
        :rules="editCateRules"
        ref="editCateRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisbel = false">取 消</el-button>
        <el-button type="primary" @click="editCateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateList,
  addCate,
  getParentCateList,
  editCate,
  deleteCate,
} from "@/api/data.js";
export default {
  name: "Cate",
  data() {
    return {
      // 商品分类的数据列表,默认为空
      cateList: [],
      // 请求参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "isok",
        },
        {
          label: "排序",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "order",
        },
        {
          label: "操作",
          // 表示,将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "opt",
        },
      ],
      // 添加对话框的分类和隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加分类的名称
        cat_name: "",
        // 父级分类的ID
        cat_pid: 0,
        // 分类层级,默认要添加的是1级分类
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 选中的父级分类的id数组
      selectedKeys: [],
      // 编辑对话框的显示和隐藏
      editCateDialogVisbel: false,
      editCateForm: {},
      editCateRules: {
        cat_name: [
          { required: true, message: "请输入要修改的信息", trigger: "blur" },
        ],
      },
      editCateId: "",
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    getCateList() {
      getCateList(this.queryInfo).then((res) => {
        if (res) {
          // 把数据列表赋值给cateList
          this.cateList = res.data.result;
          // 获取商品的总数量
          this.total = res.data.total;
          console.log(this.cateList, this.total);
        }
      });
    },
    // 监听pagesize改变
    handleSizeChange(newValue) {
      this.queryInfo.pagesize = newValue;
      this.getCateList();
    },
    // 监听页码的改变
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getCateList();
    },
    // 添加分类对话框
    showAddCateDialog() {
      this.getParentCateList();
      this.addCateDialogVisible = true;
    },
    // 获取父级分类的数据列表
    getParentCateList() {
      getParentCateList().then((res) => {
        if (res) {
          this.parentCateList = res.data;
          console.log(this.parentCateList);
        }
      });
    },
    // 选中向发生变化触发
    parentCateChanged() {
      console.log(this.selectedKeys);
      // 如果 selectedKeys 数组中的length大于0证明选中父级分类
      // 反之,就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.addCateForm.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length;
        return;
      } else {
        // 父级分类的id
        this.addCateForm.cat_pid = 0;
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0;
      }
    },
    // 点击按钮添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        addCate(this.addCateForm).then((res) => {
          if (res) {
            this.$message.success("添加分类成功!");
            this.getCateList();
            this.addCateDialogVisible = false;
          }
        });
      });
    },
    // 关闭对话框事件,重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
    showeditCateDialog(cateInfo) {
      this.editCateForm = JSON.parse(JSON.stringify(cateInfo));
      this.editCateDialogVisbel = true;
    },
    // 编辑分类信息
    editCateInfo() {
      editCate(this.editCateForm.cat_id, this.editCateForm.cat_name).then(
        (res) => {
          if (res) {
            this.$message.success("更新分类数据成功!");
            this.getCateList();
            this.editCateDialogVisbel = false;
          }
        }
      );
    },
    // 删除分类
    removeCate(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "删除分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCate(id).then((res) => {
            if (res) {
              this.$message.success("该分类已经成功删除!");
              this.getCateList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.treetable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>