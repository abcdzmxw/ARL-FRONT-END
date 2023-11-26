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
    align: 'left',
    viewBtn: false,
    excelBtn: false,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    selection: false,
    size:'mini',
    column: [
        {
            label: '域名',
            prop: 'domain',
            search: true,
            span: 24,
            rules: [{
                required: true,
                message: '请填写名称',
                trigger: 'blur'
            }]
        },
        {
            label: '解析类型',
            prop: 'type',
            search:true,
            span: 12,
        },
        {
            label: '记录值',
            prop: 'record',
            search: true,
            span: 24,
        },
        {
            label: '关联IP',
            prop: 'ips',
            search:true,
            span: 12,
        },
        {
            label: '来源',
            prop: 'source',
            search:true,
            span: 12,
        },

    ]
}