<template>
  <div class="upload-container">
    fileList:{{fileList.length}},{{fileList}}
    <el-upload
      onclick="(function(e){e.stopPropagation()}(event))"
      action="#"
      list-type="picture-card"
      :disabled="isView"
      :file-list="fileList"
      :http-request="handleUpload"
      :before-upload="handleUploadCheck"
      :before-remove="() => false"
      :class="{ 'upload-disabled': isView }"
    >
      <i slot="default" class="el-icon-plus"></i>
       <div slot="file" slot-scope="{ file }">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.filename"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!isView"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
          <div class="sort-contain" v-show="!dialogVisible" v-if="hasSort">
            <el-input-number
              v-model="file.sort"
              :min="1"
              :step="1"
              :precisionz="0"
              :controls="false"
              :disabled="isView"
              step-strictly
              placeholder="排序"
              center
              style="width: 60%; align: center"
              @change="handleSortChange"
            ></el-input-number>
          </div>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getPolicy, ossCb } from "@/api/alioss";
export default {
  name: "OSSUpload",
  props: {
    initList: {
      type: Array,
      default: [],
    },
    hasSort: {
      type: Boolean,
      default: false,
    },
    imgs: {
      type: Object,
      default: {},
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ossOption: {},
      fileList: [],
    };
  },
  computed: {},
  created() {
    this.getPolicy();
  },
  watch: {
    initList: {
      handler(n, o) {
        console.log("watch initList", n);
        if (n && n.length) {
          this.fileList = n.map((item) => {
            return {
              imageId: item.imageId,
              filename: item.url,
              url: item.url,
              sort: item.sort ? item.sort : 1,
            };
          });
          this.imgs.files = this.fileList;
        }
      },
      deep: true,
    },
  },
  methods: {
    getPolicy() {
      getPolicy().then(({ data }) => {
        data.ossaccessKeyId = data.accessKeyId;
        delete data.accessKeyId;
        console.log("Policy,", data);
        this.ossOption = data;
      });
    },
    handleUploadCheck(file) {
      const isImg =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImg) {
        this.$message.error("上传头像图片只能是 jpg、png、gif 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }

      return isImg && isLt5M;
    },
    handleRemove(file) {
      let idx;
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid == file.uid) {
          idx = i;
        }
      }
      this.fileList.splice(idx, 1);
      this.imgs.files = this.fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.filename;
      this.dialogVisible = true;
    },
    handleUpload(option) {
      console.log("upload file", option);
      let _this = this;
      option.file.sort = null;
      let formData = new FormData();
      if (this.ossOption) {
        Object.keys(this.ossOption).forEach((key) => {
          formData.append(key, this.ossOption[key]);
        });
      }
      formData.append("key", this.ossOption.dir + "/" + option.file.name);
      formData.append("file", option.file);

      ossCb(this.ossOption.host, formData).then(({ data }) => {
        console.log("oss cb=>", data);
        data.sort = null;
        _this.fileList.push(data);
        _this.fileList.sort(_this.funSort("sort"));
        _this.imgs.files = _this.fileList;
      });
    },
    handleSortChange() {
      this.fileList.sort(this.funSort("sort"));
    },
    funSort(key) {
      return function (value1, value2) {
        var val1 = value1[key];
        var val2 = value2[key];
        return val1 - val2;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  ::v-deep .el-upload {
    width: 148px;
    height: 148px;
  }
  .upload-disabled {
    ::v-deep .el-upload {
      display: none;
    }
  }
  .sort-contain {
    ::v-deep .el-input__inner {
      text-align: center;
    }
  }
  @include clearfix;
  .image-uploader {
    width: 60%;
    float: left;
  }
  ::v-deep .el-upload-list__item-actions {
    padding-top: 40px;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
