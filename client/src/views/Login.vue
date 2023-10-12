<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const isActive = ref(false)

</script>

<template>
    <body>
        <div class="container" id="container" :class="{ active: isActive }">
            <div class="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <div class="social-icons">
                        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-x-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
                        <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <input type="text" name="username" id="username" placeholder="Email"> 
                    <input type="password" name="password" id="password" placeholder="Password">
                    <a href="#">Forgot Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div class="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <div class="social-icons">
                        <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-google"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <input type="text" name="name" id="name" placeholder="Name">
                    <input type="text" name="username" id="username" placeholder="Email">
                    <input type="password" name="password" id="password" placeholder="Password">
                    <input type="password" name="password" id="password" placeholder="Confirm Password">
                    <button>Sign Up</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>Have an Account?</h1>
                        <button class="hidden" id="login" @click="isActive=false">Sign In</button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>Don't have an Account?</h1>
                        <button class="hidden" id="register" @click="isActive=true">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
h1{
    font-size: 35px;
}
.container{
    position: relative;
    width: 900px;
    max-width: 100%;
    height: 500px;
    background-color: #dddddd;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    overflow: hidden;
    padding: 30px;
    border-radius: 30px;
}
.container p{
    font-size: 14px;
    line-height: 2px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}
.container span{
    font-size: 12px;
}
.container a{
    color: #8a8a8a;
    text-decoration: none;
    font-size: 13px;
    margin: 15px 0 10px;
}
.container button{
    background-color:#ffffff;
    color: #000000;
    font-size: 15px;
    padding: 10px 45px;
    border: 1px solid transparent;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
}
.container button.hidden{
    background-color: transparent;
    border-color: #fff;
    color: #fff;
}
.container form{
    background-color: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 40px;
    height: 100%;
}
.container input{
    background-color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 8px 0;
    width: 100%;
    font-size: 13px;
    outline: none;
}
.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}
.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}
.container.active .sign-in{
    transform: translateX(100%);
}
.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}
.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}
@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}
.social-icons{
    margin: 20px 0;
}
.social-icons a{
    border: 1px solid #ddd;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
}
.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
}
.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}
.toggle{
    background-color: #5e5e5e;
    height: 100%;
    background: linear-gradient(225deg,  #141414, #c4c4c4);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}
.container.active .toggle{
    transform: translateX(50%);
}
.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}
.toggle-left{
    transform: translateX(-200%);
}
.container.active .toggle-left{
    transform: translateX(0);
}
.toggle-right{
    right: 0;
    transform: translateX(0);
}
.container.active .toggle-right{
    transform: translateX(200%);
}
</style>