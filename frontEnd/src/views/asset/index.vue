<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <el-tabs v-model="tabActive">
                <el-tab-pane name="site" label="站点">
                </el-tab-pane>
                <el-tab-pane name="domain" label="子域名">
                </el-tab-pane>
                <el-tab-pane name="ip" label="IP">
                </el-tab-pane>
            </el-tabs>
            <component :is="componentTag" :key="timestamp" />
        </basic-container>
    </div>
</template>

<script>
import { getFirstLevelMenuList, addObj, updateObj, delObj, getPage } from '@/api/sysMgr/menu'
import { tableOption } from '@/crud/sysMgr/menu'
import site from './site'
import domain from './domain'
import ip from './ip'
export default {
    name: 'MenuList',
    components: { site, domain, ip },
    data() {
        return {
            tabActive: 'site',
            componentTag: 'site',
            timestamp: 0
        }
    },
    computed: {
        permissionList() {
            return {}
        }
    },
    watch: {
        tabActive(n){
            console.log(n)
            this.componentTag=n
            this.timestamp=+new Date()
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
