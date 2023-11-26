// 资产组下拉框
import { getPage as mixPolicy } from '@/api/policy/index'
export default {
    data() {
        return {
            mixPolicyData: [],
        }
    },
    created() {
        this.getMixPolicyData()
    },
    methods: {
        //获取资产组列表
        getMixPolicyData() {
            let _this = this
            mixPolicy({}).then(res => {
                console.log('mixPolicyData', res);
                _this.mixPolicyData = res.items
            })
        },
    },
}