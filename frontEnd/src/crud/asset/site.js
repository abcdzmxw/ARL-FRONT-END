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
    size: 'mini',
    column: [
        {
            label: '站点',
            prop: 'site',
            search: true,
            span: 24,
            slot: true,
            rules: [{
                required: true,
                message: '请填写名称',
                trigger: 'blur'
            }]
        },
        {
            label: '主机名',
            prop: 'hostname',
            search: true,
            span: 12,
            hide: true,
        },
        {
            label: '标题',
            prop: 'title',
            search: true,
            span: 24,
            type: 'textarea',
            rules: [{
                required: true,
                message: '请填写规则',
                trigger: 'blur'
            }]
        },
        {
            label: 'Web Server',
            prop: 'http_server',
            search: true,
            searchLabelWidth: 130,
            span: 12,
            hide: true,
        },
        {
            label: '状态码',
            prop: 'status',
            search: true,
            span: 12,
            hide: true,
        },
        {
            label: '响应头',
            prop: 'headers1',
            span: 12,
            align:'left',
            width:320,
            slot:true,
        },
        {
            label: '标头',
            prop: 'headers',
            search: true,
            span: 12,
            hide: true,
            display: false,
        },
        {
            label: '指纹',
            prop: 'fingerName',
            search: true,
            span: 12,
            hide: true,
            display: false,
        },
        {
            label: 'favicon hash',
            prop: 'faviconHash',
            search: true,
            searchLabelWidth: 130,
            span: 12,
            hide: true,
            display: false,
        },
        {
            label: '标签',
            prop: 'tag',
            search: true,
            span: 12,
            hide: true,
            display: false,
        },
        {
            label: 'finger',
            prop: 'finger',
            align: 'left',
            headerAlign:'center',
            span: 12,
            slot: true,
        },
        {
            label: '截图',
            prop: 'screenshot',
            span: 12,
            slot: true
        },
        {
            label: '状态码',
            prop: 'status1',
            slot: true,
            span: 12,
            align: 'center',
            width: 90,
            sortable:true,
        },
    ]
}