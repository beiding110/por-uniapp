<template>
    <view class="input-holder">
        <view v-show="!value" class="placeholder">
            {{ placeholder }}
        </view>
        <view class="value">
            {{ value }}
        </view>
    </view>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {},
};
</script>

<style scoped lang="scss">
.input-holder {
    min-width: 200px;
    min-height: 24px;
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;

    .placeholder {
        width: 100%;
        color: rgb(192, 196, 204);
        font-size: 12px;
        position: absolute;
        top: auto !important;
        left: 0;
        color: grey;
        overflow: hidden;
        text-overflow: clip;
        white-space: pre;
        word-break: keep-all;
        pointer-events: none;
        line-height: inherit;
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        text-decoration: inherit;
    }

    .value {
        position: relative;
        display: block;
        height: 100%;
        background: none;
        color: inherit;
        opacity: 1;
        font: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        text-align: inherit;
        text-indent: inherit;
        text-transform: inherit;
        text-shadow: inherit;
    }
}
</style>
