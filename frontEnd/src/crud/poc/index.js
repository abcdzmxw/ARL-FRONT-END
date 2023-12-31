export const tableOption = {
    dialogDrag: false,
    dialogHeight: 560,
    labelWidth: '130',
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 0,
    menu:false,
    align: 'center',
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
    // labelSuffix: ' ',
    size:'mini',
    column: [
        {
            label: '漏洞名称',
            prop: 'vul_name',
            search: true,
        },
        {
            label: '应用',
            prop: 'app_name',
            search: true,
        },
        {
            label: '类别',
            prop: 'category',
            search: true,
        },
        {
            label: '协议',
            prop: 'scheme',
            search: true,
        },
        {
            label: '更新时间',
            prop: 'update_date',
            span: 12,
        },
    ]
}