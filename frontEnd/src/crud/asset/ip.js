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
            label: 'IP',
            prop: 'ip',
            search: true,
            span: 24,
            rules: [{
                required: true,
                message: '请填写名称',
                trigger: 'blur'
            }]
        },
        {
            label: '操作系统',
            prop: 'os_info.name',
            search:true,
            span: 12,
            align:'center',
        },
        {
            label: '开放端口',
            prop: 'port_info.port_id',
            search: true,
            span: 24,
            align:'center',
            type: 'textarea',
            rules: [{
                required: true,
                message: '请填写规则',
                trigger: 'blur'
            }]
        },
        {
            label: '关联域名',
            prop: 'domain',
            search:true,
            searchLabelWidth:130,
            span: 12,
        },
        {
            label: 'Geo',
            prop: 'geo',
            search:true,
            span: 12,

        },
        {
            label: 'AS',
            prop: 'as',
            span: 12,
            align:'center',
        },
        {
            label:'CDN',
            prop:'cdn_name',
            span:12,
            search:true,
            hide:true,
        }
    ]
}