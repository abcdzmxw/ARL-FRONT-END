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
            label: 'finger',
            prop: 'name',
            search: true,
            span: 24,
            slot:true,
        },
        {
            label: '数量',
            prop: 'cnt',
            span: 12,
            search: false,
            slot:true,
            align:'center',
        },
    ]
}