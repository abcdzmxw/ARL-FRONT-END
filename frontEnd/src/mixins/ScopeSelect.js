// 资产组下拉框
import { dicAsset } from '@/api/policy/index'
export default {
    data() {
        return {
            mixScopeData: [],
        }
    },
    created() {
        this.getMixScopeData()
    },
    methods: {
        //获取资产组列表
        getMixScopeData() {
            let _this = this
            dicAsset({}).then(res => {
                console.log('asset res', res);
                _this.mixScopeData = res.items
            })
        },
    },
}