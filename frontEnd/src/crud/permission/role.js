export const tableOption = {
    dialogDrag: false,
    dialogWidth: '520',
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    viewBtn: true,
    excelBtn: false,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    labelSuffix: ' ',
    column: [{
            label: '角色名称',
            prop: 'roleName',
            search: true,
            span: 24,
            rules: [{
                required: true,
                message: '角色名称不能为空',
                trigger: 'blur'
            }, ]
        },
        {
            label: '角色等级',
            prop: 'roleKey',
            type: 'select',
            span: 24,
            formslot: true,
            sortable: false,
            search: true,
            rules: [{
                required: true,
                message: '请选择角色等级',
                trigger: 'blur'
            }],
            props: {
                label: 'describe',
                value: 'prefix',
            },
            dicData: []
        },
        {
            label: '排序',
            prop: 'roleSort',
            type: 'number',
            span: 24,
            rules: [{
                required: true,
                message: '排序不能为空',
                trigger: 'blur'
            }]
        },
        {
            label: '角色权限',
            prop: 'menuList',
            span: 24,
            formslot: true,
            showColumn: false,
            hide: true,
            rules: [{
                required: true,
                message: '请设置角色权限',
                trigger: 'blur'
            }]
        }
    ]
}