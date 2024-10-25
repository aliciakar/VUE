<template>
    <div id="burger">
        <button type="button" class="burger-button" title="Menu">
            <span class="burger-bar bar--1"></span>
            <span class="burger-bar bar--2"></span>
            <span class="burger-bar bar--3"></span>
        </button>
    </div>
    <nav class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/locations">Locations</RouterLink>
    </nav>
</template>

<style scoped>
    #burger{
        display:block;
    }
    .burger-button{
        position: relative;
        height: 30px;
        width:40px;
        display:block;
        z-index:99;
        border:0;
        border-radius:0;
        background-color:transparent;
        pointer-events:all;
    }
    .burger-bar{
        background-color: #7ab1cd;
        position:absolute;
        top:50%;
        right:6px;
        left:6px;
        height:3px;
        width:auto;
        margin-top:-1px;
    }
    .bar--1{
        -webkit-transform: translateY(-6px);
        transform:translateY(-6px);
        top:40%;
    }
    .bar--2{
        transform-origin: 100% 50%;
        transform: scaleX(1);
    }
    .bar--3{
        transform: translateY(6px);
        top:60%;
    }
    button{
        cursor:pointer;
    }
</style>