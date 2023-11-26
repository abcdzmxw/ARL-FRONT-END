export const tableOption = {
    dialogDrag: false,
    dialogWidth: 540,
    labelWidth: 76,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 290,
    menu: true,
    align: 'center',
    viewBtn: false,
    excelBtn: false,
    addBtn: true,
    addBtnText: '添加任务',
    delBtn: true,
    editBtn: false,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    // labelSuffix: ' ',
    selection: true,
    size: 'mini',
    column: [
        {//0
            label: '任务名',
            prop: 'name',
            search: true,
            span: 24,
            width:130,
            rules: [{
                required: true,
                message: '请填写任务名',
                trigger: 'blur'
            }]
        },
        {
            label: '目标',
            prop: 'target',
            search: true,
            type: 'textarea',
            maxRows:2,
            minRows:2,
            span: 24,
            width:120,
            searchPlaceholder: '目标',
            placeholder: '请输入目标，支持IP、IP段、域名',
            rules: [{
                required: true,
                message: '请填写目标',
                trigger: 'blur'
            }]
        },
        {
            label: '统计',
            prop: 'statistic',
            span: 12,
            display: false,
        },
        {
            label: '配置项',
            prop: 'options',
            span: 12,
            display: false,
        },

        {
            label: '任务类型',
            prop: 'task_tag',
            search: true,
            searchType: 'select',
            dicData: [
                { label: '资产侦查任务', value: 'task' },
                { label: '资产监控任务', value: 'monitor' },
                { label: '风险巡航任务', value: 'risk_cruising' },
                { label: '资产站点更新', value: 'asset_site_update' },
            ],
            span: 12,
            hide: true,
            display: false,
        },
        {
            label: '状态',
            prop: 'status',
            search: true,
            span: 12,
            display: false,
        },
        {
            label: '开始时间',
            prop: 'start_time',
            span: 12,
            display: false,
        },
        {
            label: '结束时间',
            prop: 'end_time',
            span: 12,
            display: false,
        },
        {
            label: 'Task_Id',
            prop: '_id',
            search: true,
            span: 12,
            width:180,
            display: false,
        },
        {//9
            label: '域名爆破类型',
            prop: 'domain_brute_type',
            type: 'select',
            labelWidth:140,
            dicData: [],
            props: {
                label:'value',
                value:'key'
            },
            span: 24,
            hide: true,
            rules: [
                {
                    required: true,
                    message: '请选择',
                    trigger: 'blur'
                }
            ]
        },
        {//10
            label: '端口扫描类型',
            prop: 'port_scan_type',
            type: 'select',
            labelWidth:140,
            dicData: [],
            props: {
                label:'value',
                value:'key'
            },
            span: 24,
            hide: true,
            rules: [
                {
                    required: true,
                    message: '请选择',
                    trigger: 'blur'
                }
            ]
        },
        {
            label:'',
            labelWidth:20,
            prop:'function',
            slot:true,
            hide:true,
        }
    ]
}