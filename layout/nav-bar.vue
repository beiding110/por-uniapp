<template>
    <view class="layout-nav-bar">
        <view v-if="navbar" class="nav-bar">
            <u-navbar
                :title="title"
                :autoBack="!$slots.left"
                :bgColor="navBgColor"
                :fixed="false"
            >
                <template slot="left">
                    <template v-if="$slots.left">
                        <slot name="left"></slot>
                    </template>

                    <template v-else>
                        <u-icon name="arrow-left" size="20"></u-icon>
                    </template>
                </template>

                <template slot="right">
                    <slot name="right"></slot>
                </template>
            </u-navbar>
        </view>

        <view class="layout-content">
            <slot></slot>
        </view>

        <view v-if="$slots.foot" class="foot-bar">
            <slot name="foot"></slot>

            <view class="u-safe-bottom u-safe-area-inset-bottom"></view>
        </view>

        <my-msg></my-msg>

        <!-- #ifdef H5 -->
        <my-cnzz></my-cnzz>
        <!-- #endif -->
    </view>
</template>

<script>
export default {
    props: {
        navbar: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
        navBgColor: {
            type: String,
            default: '#ffffff',
        },
    },
    methods: {},
    mounted() {},
};
</script>

<style scoped lang="scss">
.layout-nav-bar {
    display: flex;
    flex-direction: column;
    height: 100%;

    .layout-content {
        flex: 1;
        overflow: auto;
    }

    .foot-bar {
        background: white;
    }
}
</style>