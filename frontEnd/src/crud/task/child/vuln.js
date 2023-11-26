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
    selection: true,
    size:'mini',
    column: [
        {
            label: '漏洞名称',
            prop: 'vul_name',
            search: true,
            span: 24,
            slot:true,
        },
        {
            label: '类别',
            prop: 'plg_type',
            span: 12,
            search: true,
            slot:true,
        },
        {
            label: '应用名',
            prop: 'app_name',
            search:true,
            span: 12,
        },
        {
            label: '目标',
            prop: 'target',
            search:true,
            span: 12,
        },
        {
            label: '凭证',
            prop: 'credit',
            span: 12,
        },
        {
            label: '发现时间',
            prop: 'date',
            span: 12,
        },

    ]
}