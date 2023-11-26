<template>
  <div class="upload-container">
    <div class="img-flex">
      <div class="img-flex-item" v-for="file in fileList" :key="file.uid">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.filename"
          alt=""
        />
        <div class="el-upload-list__item-actions">
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
             v-if="!isView"
              v-model="file.sort"
              :min="1"
              :step="1"
              :precisionz="0"
              :controls="false"
              :disabled="isView"
              step-strictly
              placeholder="排序"
              center
              class="sort-input"             
              @change="handleSortChange(file.sort)"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div v-if="fileList.length < limit">
        <el-upload
          onclick="(function(e){e.stopPropagation()}(event))"
          class="img-flex-item img-add sort-input"
          action="#"
          :disabled="isView"
          :http-request="handleUpload"
          :before-upload="handleUploadCheck"
          :before-remove="() => false"
          :class="{ 'upload-disabled': isView }"
          v-if="!isView"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <!-- 查看 -->
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
    limit: {
      type: Number,
      default: 50,
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
              uid: item.imageId,
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
        this.$message.error("上传图片只能是 jpg、png、gif 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }

      return isImg && isLt5M && this.fileList.length < this.limit;
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
}
.img-flex {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  .img-flex-item {
    position: relative;
    margin-bottom: 10px;
    width: 148px;
    height: 148px;
    margin-right: 10px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    overflow: hidden;
    .el-upload-list__item-thumbnail {
      width: 100%;
      height: auto;
    }
    .el-upload-list__item-actions {
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
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
      }
    }
    .el-upload-list__item-delete {
      display: inline-block;
      position: relative;
      margin-left: 20px;
      vertical-align: middle;
      .el-icon-delete {
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .img-add {
    ::v-deep .avatar-uploader-icon {
      font-size: 36px;
      line-height: 140px;
      color: #999;
    }
  }
}
.sort-input{
  ::v-deep .el-input__inner{
     width: 60%;
    background-color: rgba(0,0,0,.4) !important;
    color:#fff !important;
    padding-left: 15px !important;
  }
}
</style>
