import BidRecord from "@/components/BidRecord";
export default {
    components: { BidRecord },
    data() {
        return {
            dialogVisibleBidRecord: false,
            selectedRow: {},
        }
    },
    methods: {
        // 出价记录
        handleBidRecord(row) {
            this.selectedRow = row
            this.dialogVisibleBidRecord = true;
        },
    },
}