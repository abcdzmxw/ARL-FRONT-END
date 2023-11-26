<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <div style="margin-bottom: 20px;"><strong>{{ info.targetName }}</strong>相关资产</div>
            <el-tabs v-model="info.tabIndex" type="card" @tab-click="handleClick">
                <el-tab-pane :label="'站点 - ' + info.statistic.site_cnt" name="0"></el-tab-pane>
                <el-tab-pane :label="'子域名 - ' + info.statistic.domain_cnt" name="1"></el-tab-pane>
                <el-tab-pane :label="'IP - ' + info.statistic.ip_cnt" name="2"></el-tab-pane>
                <el-tab-pane :label="'SSL证书 - ' + info.statistic.cert_cnt" name="3"></el-tab-pane>
                <el-tab-pane :label="'服务 - ' + info.statistic.service_cnt" name="4"></el-tab-pane>
                <el-tab-pane :label="'文件泄露 - ' + info.statistic.fileleak_cnt" name="5"></el-tab-pane>
                <el-tab-pane :label="'URL信息 - ' + info.statistic.url_cnt" name="6"></el-tab-pane>
                <el-tab-pane :label="'风险 - ' + info.statistic.vuln_cnt" name="7"></el-tab-pane>
                <el-tab-pane :label="'服务(python) - ' + info.statistic.npoc_service_cnt" name="8"></el-tab-pane>
                <el-tab-pane :label="'C段 - ' + info.statistic.cip_cnt" name="9"></el-tab-pane>
                <el-tab-pane :label="'nuclei - ' + info.statistic.nuclei_result_cnt" name="10"></el-tab-pane>
                <el-tab-pane :label="'指纹统计 - ' + info.statistic.stat_finger_cnt" name="11"></el-tab-pane>
            </el-tabs>
            <component :is="chindName" :key="timestamp" @c2p="handleChildAction" v-bind:info="info" />
        </basic-container>
    </div>
</template>

<script>
import Child0 from './child/site.vue'
import Child1 from './child/domain.vue'
import Child2 from './child/ip.vue'
import Child3 from './child/cert.vue'
import Child4 from './child/service.vue'
import Child5 from './child/fileleak.vue'
import Child6 from './child/url.vue'
import Child7 from './child/vuln.vue'
import Child8 from './child/npoc_service.vue'
import Child9 from './child/cip.vue'
import Child10 from './child/nuclei.vue'
import Child11 from './child/finger.vue'
export default {
    components: {
        Child0, Child1, Child2, Child3, Child4,
        Child5, Child6, Child7, Child8, Child9, Child10, Child11
    },
    data() {
        return {
            info: {
                task_id: '',
                targetName: '',
                statistic: {},
                tabIndex: 0,
            },
            timestamp: 0,
            chindName: 'Child0',
        }
    },
    created() {
        // console.log('route', this.$route.query);
        let { task_id, targetName, statistic } = this.$route.query
        this.info = { task_id, targetName }
        this.info.statistic = JSON.parse(statistic)
    },
    mounted(){
        setTimeout(() => {
            // window.location.reload()

        }, 300);
    },
    methods: {
        handleClick() {
            this.chindName = 'Child' + this.info.tabIndex
            this.timestamp = +new Date()
        },
        handleChildAction(payload) {
            console.log('child payload', payload)
            if (payload == 'ip') {
                this.chindName = 'Child2'
                this.info.tabIndex = '2'
            }
            if (payload == 'domain') {
                this.info.tabIndex = '1'
                this.chindName = 'Child1'
            }
            this.timestamp = +new Date()
        }
    }
}
</script>