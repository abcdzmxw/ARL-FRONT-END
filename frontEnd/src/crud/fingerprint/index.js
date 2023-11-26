export const tableOption = {
    dialogDrag: false,
    dialogWidth: 420,
    labelWidth: 76,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 0,
    menu: false,
    align: 'center',
    viewBtn: false,
    excelBtn: false,
    addBtn: true,
    addBtnText: '添加指纹',
    delBtn: false,
    editBtn: false,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    // labelSuffix: ' ',
    size:'mini',
    selection: true,
    column: [
        {
            label: '名称',
            prop: 'name',
            search: true,
            span: 24,
            rules: [{
                required: true,
                message: '请填写名称',
                trigger: 'blur'
            }]
        },
        {
            label: '规则',
            prop: 'human_rule',
            search: true,
            span: 24,
            type: 'textarea',
            searchPlaceholder:'规则',
            placeholder: '只支持body, title, header, icon_hash 四个字段，仅仅可以使用逻辑或， 如 body="Powered by WordPress"',
            rules: [{
                required: true,
                message: '请填写规则',
                trigger: 'blur'
            }]
        },
        {
            label: '更新时间',
            prop: 'update_date',
            span: 12,
            display: false,
        },
    ]
}