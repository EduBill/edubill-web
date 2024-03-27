<template>
    <div id="homenav" class="homenav">
        <img src="@/assets/icons/svg/homeLogo.svg" />
        <div>
            <img src="@/assets/icons/svg/alarm.svg" />
            <img src="@/assets/icons/svg/menu.svg" />
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
#homenav {
    width: 100%;
    height: 2.75rem;
    padding: 0rem 1.25rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    img {
        width: 5.3125rem;
        height: 1.46931rem;
        flex-shrink: 0;
    }
    div {
        display: flex;
        align-items: flex-end;
        img {
            width: 2rem;
            height: 2rem;
            flex-shrink: 0;
        }
    }
}
</style>