export const tableOption = {
    dialogDrag: false,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    viewBtn: true,
    excelBtn: false,
    printBtn: false,
    columnBtn: false,
    searchMenuSpan: 6,
    labelSuffix: ' ',
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    column: [{
            fixed: true,
            label: '姓名',
            prop: 'username',
            search: true,
            span: 24,
            rules: [{
                    required: true,
                    message: '请输入账号'
                },
                {
                    min: 1,
                    max: 20,
                    message: '长度在 1 到 20 个字符',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '密码',
            prop: 'password',
            type: 'password',
            value: '',
            hide: true,
            viewDisplay: false,
            editDisplay: true,
            span: 24,
            rules: [{
                required: true,
                min: 6,
                max: 20,
                message: '长度在 6 到 20 个字符',
                trigger: 'blur'
            }]
        },
        {
            label: '所属部门',
            prop: 'deptId',
            span: 12,
            hide: true,
            sortable: false,
            rules: [{
                required: true,
                message: '请选择部门',
                trigger: 'change'
            }],
            type: 'tree',
            search: true,
            props: {
                label: 'deptName',
                value: 'deptId'
            },
            defaultExpandAll: true,
            dicData: []
        }, {
            label: '角色',
            prop: 'roleId',
            hide: true,
            span: 12,
            type: 'select',
            rules: [{
                required: true,
                message: '请选择角色',
                trigger: 'blur'
            }],
            props: {
                label: 'roleName',
                value: 'roleId'
            },
            dicData: []
        },
        {
            label: '角色',
            prop: 'roleName',
            span: 12,
            display: false,
        },
        {
            label: '昵称',
            prop: 'nickname',
            span: 12,
        },
        {
            label: '性别',
            prop: 'sex',
            type: 'radio',
            sortable: false,
            span: 12,
            rules: [{
                required: false,
                message: '请选择',
                trigger: 'blur'
            }],
            dicData: [{
                label: '女',
                value: 0
            }, {
                label: '男',
                value: 1
            }]
        },
        {
            label: '手机号',
            prop: 'phone',
            value: '',
            span: 12,
            editDisabled: false,
            rules: [{
                    required: true,
                    message: '请输入手机号'
                }, {
                    min: 11,
                    max: 11,
                    message: '长度在 11 个字符',
                    trigger: 'blur'
                },

            ]
        },
        {
            label: '邮箱',
            prop: 'email',
            span: 12,
            rules: [{
                    required: false,
                    message: '请输入邮箱'
                },

            ]
        },
        {
            label: '头像',
            prop: 'avtar',
            formslot: true,
            span: 24,
            showColumn: false,
            hide: true
        },
    ]
}