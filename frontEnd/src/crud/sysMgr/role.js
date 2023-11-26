export const tableOption = {
    dialogDrag: false,
    dialogWidth:390,
    dialogHeight: 560,
    labelWidth: '130',
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth:360,
    align: 'center',
    viewBtn: false,
    excelBtn: false,
    addBtn: true,
    delBtn: true,
    editBtn: true,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    // labelSuffix: ' ',
    size:'mini',
    column: [
        {
        label: '角色名称',
        prop: 'role_name',
        span: 24,
        search: true,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '角色编码',
        prop: 'role_code',
        span: 24,
        search: true,
        // editDisplay: false,
        editDisabled:true,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
        // {
        //     label: '排序',
        //     prop: 'order',
        //     span: 12,
        //     width: '150',
        //     hide:true,
        //     rules: [
        //         {
        //             required: true,
        //             message: '请填写',
        //             trigger: 'blur'
        //         }
        //     ],

        // },
    ]
}