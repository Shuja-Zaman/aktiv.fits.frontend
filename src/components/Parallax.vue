<script>
</script>

<template>
    <div class="moving-text lg:py-10 py-5 overflow-hidden tracking-tighter ">
        <div class="con text-5xl lg:text-9xl font-extrabold ">
            <h1>Active</h1>
            <div class="circle "></div>

            <h1>Fitness</h1>
            <div class="circle "></div>

            <h1>Motion</h1>
            <div class="circle "></div>

        </div>

        <div class="con text-5xl lg:text-9xl font-extrabold">
            <h1>Active</h1>
            <div class="circle "></div>

            <h1>Fitness</h1>
            <div class="circle "></div>

            <h1>Motion</h1>
            <div class="circle "></div>

        </div>

        <div class="con text-5xl lg:text-9xl font-extrabold">
            <h1>Active</h1>
            <div class="circle "></div>

            <h1>Fitness</h1>
            <div class="circle "></div>

            <h1>Motion</h1>
            <div class="circle "></div>

        </div>
    </div>
</template>

<style scoped>

.moving-text{
    white-space: nowrap;
}

.con{
    display: inline-block;
    white-space: nowrap;
    animation: move;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

h1{
    display: inline-block;
}

.circle{
    display: inline-block;
    vertical-align: middle;
    margin: 1vw;
}

@keyframes move {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(-100%);
    }
}

</style>