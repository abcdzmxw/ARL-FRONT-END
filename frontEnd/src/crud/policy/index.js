export const tableOption = {
    dialogDrag: false,
    dialogWidth: 1000,
    labelWidth: 120,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menu: true,
    menuWidth:240,
    align: 'center',
    viewBtn: false,
    excelBtn: false,
    addBtn: true,
    addBtnText: '新建策略',
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
    selection: false,
    column: [
        {
            label: '策略名称',
            prop: 'name',
            span: 24,
            search: true,
            rules: [{
                required: true,
                message: '请填写策略名称',
                trigger: 'blur'
            }]
        },
        {
            label: '策略描述',
            prop: 'desc',
            span: 24,
            rules: [{
                required: false,
                message: '请填写策略描述',
                trigger: 'blur'
            }]
        },
        {
            label:'更新时间',
            prop: 'update_date',
            display:false,
        }
    ],
    group: [
        {
            label: '域名和IP配置',
            prop: 'domain_config',
            column: [
                {
                    label: '域名爆破类型',
                    prop: 'domain_brute_type',
                    type: 'select',
                    dicData: [
                        {value:'大字典',key:'big'},
                        {value:'测试',key:'test'},
                    ],
                    props: {
                        label: 'value',
                        value: 'key'
                    },
                    rules: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }]
                },
                {
                    label: '端口扫描类型',
                    prop: 'port_scan_type',
                    type: 'select',
                    dicData: [],
                    props: {
                        label: 'value',
                        value: 'key'
                    },
                    rules: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }]
                },
                { //复选框插槽
                    label: '',
                    prop: 'fooDomain',
                    slot: true,
                    labelWidth: 0,
                    span: 24,
                }
            ]
        },
        {
            label: 'IP高级配置',
            prop: 'ip_config',
            column: [
                {
                    label: '主机超时时间',
                    prop: 'host_timeout_type',
                    type: 'select',
                    value: 'default',
                    dicData: [
                        { label: '默认(900s)', value: 'default' },
                        { label: '自定义', value: 'custom' },
                    ],
                    rules: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }],
                    control: (val, form) => {
                        if (val == 'default') {
                            return {
                                host_timeout: {
                                    display: false
                                }
                            }
                        } else {
                            return {
                                host_timeout: {
                                    display: true
                                }
                            }
                        }
                    }
                },
                {
                    label: '主机超时时间(s)',
                    labelWidth: 130,
                    prop: 'host_timeout',
                    value: 0,
                    type: 'number',
                    min: 0,
                    display: false,
                    rules: [{
                        required: true,
                        message: '请填写',
                        trigger: 'blur'
                    }]
                },
                {
                    label: '探测报文并行度',
                    labelWidth: 130,
                    prop: 'port_parallelism',
                    value: 0,
                    min: 0,
                    rules: [{
                        required: true,
                        message: '请填写',
                        trigger: 'blur'
                    }]
                },
                {
                    label: '最少发包速率',
                    labelWidth: 130,
                    prop: 'port_min_rate',
                    value: 0,
                    min: 0,
                    rules: [{
                        required: true,
                        message: '请填写',
                        trigger: 'blur'
                    }]
                },
            ]
        },
        {
            label: '站点和风险配置',
            prop: 'site_config',
            column: [
                { //复选框插槽
                    label: '',
                    prop: 'fooSite',
                    slot: true,
                    labelWidth: 0,
                    span: 24,
                }
            ]
        },
        {
            label: 'Poc配置',
            prop: 'poc_config',
            column: [
                { //复选框插槽
                    label: '',
                    prop: 'fooPoc',
                    slot: true,
                    labelWidth: 0,
                    span: 24,
                }
            ]
        },
        {
            label: '弱口令爆破配置',
            prop: 'brute_config',
            column: [
                { //复选框插槽
                    label: '',
                    prop: 'fooBrute',
                    slot: true,
                    labelWidth: 0,
                    span: 24,
                }
            ]
        },
        {
            label: '资产组配置',
            prop: 'scope_config',
            column: [
                {
                    label: '关联资产组',
                    prop: 'scope_id',
                    type: 'select',
                    dicData: [],
                    props:{
                        label:'scope',
                        value:'_id'
                    },
                    rules: [{
                        required: false,
                        message: '请选择资产',
                        trigger: 'blur'
                    }]
                },
            ]
        },
    ]
}