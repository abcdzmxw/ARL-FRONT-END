<template>
  <div class="upload-container">
    <!-- {{ fileList }} -->
    <div class="img-flex">
      <!-- 拖动区begin -->
      <draggable
        v-model="fileList"
        class="img-wrap"
        :disabled="isView"
        @sort="doSort"
      >
        <div class="img-flex-item" v-for="file in fileList" :key="file.uid">
          <span class="filename" v-if="!file.isImg">{{ file.shortName }}</span>
          <img
            v-if="file.isImg"
            class="el-upload-list__item-thumbnail"
            :src="file.filename"
            alt=""
          />
          <div class="el-upload-list__item-actions">
            <span
              v-if="file.isImg"
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
          </div>
        </div>
      </draggable>
      <!-- 拖动区end -->
      <div v-if="fileList.length < limit">
        <el-upload
          onclick="(function(e){e.stopPropagation()}(event))"
          class="img-flex-item img-add sort-input"
          action="#"
          :multiple="multiple"
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
    <el-image-viewer
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="imgList"
      :initial-index="initIdx"
    ></el-image-viewer>
  </div>
</template>

<script>
import { getPolicy, ossCb } from "@/api/alioss";
import draggable from "vuedraggable";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  name: "OSSUpload",
  components: {
    draggable,
    ElImageViewer,
  },
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
    multiple: {
      // 是否多选
      type: Boolean,
      default: false,
    },
    fileType: {
      // img只支持img  multi支持多种类型
      type: String,
      default: "img",
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ossOption: {},
      fileList: [],
      initIdx: 0,
      imgList: [],
    };
  },
  computed: {
    // imgList() {
    //   return this.fileList.map((file) => {
    //     return file.url;
    //   });
    // },
  },
  created() {
    this.getPolicy();
  },
  watch: {
    initList: {
      handler(n, o) {
        if (n && n.length) {
          this.fileList = n.map((item) => {
            return {
              imageId: item.imageId,
              filename: item.url,
              shortName: item.shortName,
              url: item.url,
              sort: item.sort ? item.sort : 1,
              uid: item.imageId,
              isImg: item.isImg,
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
        // console.log("Policy,", data);
        this.ossOption = data;
      });
    },
    closeViewer() {
      this.dialogVisible = false;
    },
    handleUploadCheck(file) {
      let isImg =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImg && this.fileType == "img") {
        this.$message.error("上传图片只能是 jpg、png、gif 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }

      return (
        (isImg || this.fileType == "multi") &&
        isLt5M &&
        this.fileList.length < this.limit
      );
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
      this.imgList = this.fileList.map((item) => item.filename);
      this.initIdx = this.imgList.indexOf(file.filename);
      this.dialogVisible = true;
    },
    handleUpload(option) {
      // console.log("upload file", option);
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
        // console.log("oss cb=>", data);
        data.sort = _this.fileList.length + 1;
        data.isImg = data.mimeType.indexOf("image") > -1 ? true : false;
        data.shortName = data.filename.split("/").reverse()[0];
        _this.fileList.push(data);
        _this.imgs.files = _this.fileList;
      });
    },
    doSort(e) {
      this.fileList.map((item, index) => {
        item.sort = index + 1;
      });
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
    .filename {
      position: absolute;
      top: 10px;
      left: 10px;
    }
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
.sort-input {
  ::v-deep .el-input__inner {
    width: 60%;
    background-color: rgba(0, 0, 0, 0.4) !important;
    color: #fff !important;
    padding-left: 15px !important;
  }
}

.img-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
