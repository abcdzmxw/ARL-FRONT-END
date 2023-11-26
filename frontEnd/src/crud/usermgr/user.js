export const tableOption = {

  dialogDrag: false,
  dialogWidth: '80%',
  headerAlign: 'center',
  align: 'center',
  border: true,
  viewBtn: true,
  columnBtn: false,
  index: true,
  indexLabel: '序号',
  searchShow: true,
  searchIcon: true,
  searchMenuSpan: 6,
  labelSuffix: ' ',
  labelWidth: '140',
  size: 'mini',
  column: [
    {
      label: '用户名',
      span: 8,
      prop: 'username',
      search: true,
      display: false
    },

    {
      label: '认证类型',
      prop: 'authenticationType',
      type: 'radio',
      value: 1,
      span: 24,
      dicData: [{
        label: '个人认证',
        value: 1
      }, {
        label: '企业认证',
        value: 2
      }],
      control: (val) => {
        if (val == 1) {
          return {
            realName: { label: '真实姓名' },
            addressCodeList: { display: true, label: '居住地址' },
            idCardPictureFront: { display: true, label: '身份证正面' },
            idCardPictureBack: { display: true, label: '身份证反面' },
            idCardPictureMan: { display: true, label: '手持身份照片' },
            enterpriseName: { display: false },
            enterpriseShortName: { display: false },
            enterpriseCode: { display: false },
            enterpriseType: { display: false },
            mainBusiness: { display: false },
            businessLicense: { display: false },
            mainGrantAuthorization: { display: false },
            abroadGrantAuthorization: { display: false }
          }
        }
        if (val == 2) {
          return {
            realName: { label: '法人姓名' },
            idCardPictureFront: { display: false },
            idCardPictureBack: { display: false },
            idCardPictureMan: { display: false },
            enterpriseName: { display: true },
            enterpriseShortName: { display: true },
            addressCodeList: { display: true, label: '公司地址' },
            enterpriseCode: { display: true },
            enterpriseType: { display: true },
            mainBusiness: { display: true },
            businessLicense: { display: true },
            mainGrantAuthorization: { display: true },
            abroadGrantAuthorization: { display: true },
            idCardPictureFront: { display: false, label: '法人身份证正面' },
            idCardPictureBack: { display: false, label: '法人身份证反面' },
            idCardPictureMan: { display: false, label: '法人手持身份照片' }
          }
        }
      }
    },

    {
      label: '手机号',
      span: 8,
      prop: 'phone',
      search: true,
      display: false
    },

    {
      label: '保证金总额',
      prop: 'depositTotal',
      display: false
    },
    {
      label: '竞拍台次',
      prop: 'auctionTimes',
      display: false
    },
    {
      label: '冻结竞拍台次',
      prop: 'auctionTimesFrozen',
      display: false
    },
    {
      label: '最后登录时间',
      prop: 'lasetLoginTime',
      span: 8,
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      display: false
    },
    {
      label: '会员等级',
      prop: 'memberLevel',
      type: 'select',
      span: 8,
      search: false,
      display: false,
      dicData: [{
        label: '未认证会员',
        value: 1
      }, {
        label: '认证会员',
        value: 2
      }]
    },
    {
      label: '认证状态',
      prop: 'status',
      type: 'select',
      display: false,
      span: 8,
      search: true,
      dicData: [
        {
          label: '未提交',
          value: 1
        },
        {
          label: '待认证',
          value: 0
        }, {
          label: '认证通过',
          value: 2
        }, {
          label: '认证失败',
          value: 3
        }]
    }

  ],
  group: [{
    icon: 'el-icon-s-custom',
    label: '基本信息',
    prop: 'group1',
    column: [{
      label: '用户名',
      prop: 'username',
      align: 'left',
      span: 8,
      search: true,
      rules: [{
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      }]
    },

    {
      label: '密码',
      span: 8,
      prop: 'password',
      addDisplay: true,
      editDisplay: false,
      viewDisplay: false,
      rules: [{
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '手机号',
      prop: 'phone',
      span: 8,
      search: true,
      rules: [{
        required: true,
        message: '请输入手机号'
      }, {
        min: 11,
        max: 11,
        message: '长度在 11 个字符',
        trigger: 'blur'
      }]
    },
    {
      label: '昵称',
      prop: 'nickname',
      span: 8,
      hide: true,
      align: 'left',
      rules: [{
        required: false,
        message: '昵称不能为空',
        trigger: 'blur'
      }]
    },

    {
      label: '邮箱',
      prop: 'email',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '可用保证金',
      prop: 'depositAvailable',
      span: 8,
      hide: true,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },

    {
      label: '保证金总额',
      prop: 'depositTotal',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '竞拍台次',
      prop: 'auctionTimes',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '冻结竞拍台次',
      prop: 'auctionTimesFrozen',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '提取中保证金',
      prop: 'depositPick',
      hide: true,
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },

    {
      label: '注册时间',
      prop: 'createTime',
      span: 8,
      type: 'datetime',
      addDisplay: false,
      editDisplay: false,
      format: 'yyyy-MM-dd HH:mm:ss',
      hide: true
    },
    {
      label: '最后登录时间',
      prop: 'lasetLoginTime',
      span: 8,
      addDisplay: false,
      editDisplay: false,
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      hide: true
    }

    ]
  },
  {
    icon: 'el-icon-s-check',
    label: '认证信息',
    prop: 'group2',
    column: [{
      label: '真实姓名',
      prop: 'realName',
      span: 8
    },

    {
      label: '',
      prop: 'addressCodeList',
      type: 'cascader',
      filterable: true,
      hide: true,
      slot: true,
      span: 8,
      dicData: [],
      props: {
        label: 'name',
        value: 'code'
      },
      lazy: true,
      lazyLoad(node, resolve) {
        const stop_level = 2
        const level = node.level
        const data = node.data || {}
        const code = data.code
        let list = []
        const callback = () => {
          resolve((list || []).map(ele => {
            return Object.assign(ele, {
              leaf: level >= stop_level
            })
          }))
        }
        if (level == 0) {
          getProvince().then(res => {
            list = res.data
            callback()
          })
        } else if (level == 1) {
          getCities(code).then(res => {
            list = res.data
            callback()
          })
        } else if (level == 2) {
          getAreas(code).then(res => {
            list = res.data
            callback()
          })
        } else {
          callback()
        }
      }
    },

    {
      label: '企业名称',
      prop: 'enterpriseName',
      span: 8,
      display: false,
      rules: [{
        required: true,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '企业简称',
      prop: 'enterpriseShortName',
      span: 8,
      display: false,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },

    {
      label: '统一社会信用代码',
      prop: 'enterpriseCode',
      display: false,
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '企业类型',
      prop: 'enterpriseType',
      span: 8,
      display: false,
      type: 'select',
      props: {
        label: 'phraseName',
        value: 'phraseId'
      },
      dicData: [],
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '主营项目',
      prop: 'mainBusiness',
      span: 8,
      display: false,
      type: 'select',
      props: {
        label: 'phraseName',
        value: 'phraseId'
      },
      dicData: [],
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '开户行',
      prop: 'bankName',
      span: 8,
      type: 'select',
      props: {
        label: 'phraseName',
        value: 'phraseId'
      },
      dicData: [],
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    }, {
      label: '银行卡号',
      prop: 'bankCardNo',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '持卡人',
      prop: 'bankCardOwner',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '持卡人身份证号',
      prop: 'idCardNumber',
      span: 8,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    }
    ]
  },
  {
    icon: 'el-icon-upload',
    label: '上传证件',
    prop: 'group3',
    column: [{
      label: '头像',
      prop: 'avatar',
      span: 6,
      hide: true,
      labelPosition: 'top',
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '身份证正面',
      prop: 'idCardPictureFront',
      span: 6,
      hide: true,
      display: false,
      labelPosition: 'top',
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '身份证反面',
      prop: 'idCardPictureBack',
      span: 6,
      hide: true,
      display: false,
      labelPosition: 'top',
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '手持身份照片',
      prop: 'idCardPictureMan',
      span: 6,
      hide: true,
      display: false,
      labelPosition: 'top',
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '营业执照',
      prop: 'businessLicense',
      span: 6,
      hide: true,
      labelPosition: 'top',
      hide: true,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '主机厂授权',
      prop: 'mainGrantAuthorization',
      span: 6,
      hide: true,
      labelPosition: 'top',
      display: false,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    },
    {
      label: '境外零件授权',
      prop: 'abroadGrantAuthorization',
      span: 6,
      hide: true,
      labelPosition: 'top',
      align: 'center',
      display: false,
      rules: [{
        required: false,
        message: '请填写',
        trigger: 'blur'
      }]
    }
    ]
  }
  ]
}
