<template>
    <div>
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28">
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="#">Workouts</a>
                    <a class="navbar-item" href="#">Calorie Calculator</a>
                    <a class="navbar-item" href="#">Directory</a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a href="#" class="button is-light">
                                <strong>Sign up</strong>
                            </a>
                            <a href="#" class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="columns">
                <div class="column">
                    <div id="app">
                        <nav class="panel">
                            <p class="panel-heading">
                                Workouts
                            </p>
                            <div class="panel-block">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Search">
                                    <span class="icon is-left">
                                        <i class="fas fa-search" aria-hidden="true"></i>
                                    </span>
                                </p>
                            </div>
                            <p class="panel-tabs">
                                <a @click="selectCategory('All')" :class="{ 'is-active': selectedCategory === 'All' }">All</a>
                                <a @click="selectCategory('Cardio')" :class="{ 'is-active': selectedCategory === 'Cardio' }">Cardio</a>
                                <a @click="selectCategory('Weightlifting')" :class="{ 'is-active': selectedCategory === 'Weightlifting' }">Weightlifting</a>
                                <a @click="selectCategory('Yoga')" :class="{ 'is-active': selectedCategory === 'Yoga' }">Yoga</a>
                                <a @click="selectCategory('Pilates')" :class="{ 'is-active': selectedCategory === 'Pilates' }">Pilates</a>
                            </p>
                            <label class="panel-block" v-for="workout in filteredWorkouts" :key="workout.name">
                                <input type="checkbox">
                                {{ workout.name }}
                            </label>
                        </nav>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <div class="content">
                            <h1>Workout Name</h1>
                            <p>Workout Description</p>
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image">
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="column is-half">
                    <nav class="panel">
                        <p class="panel-heading">
                            Friends
                        </p>
                        <div class="panel-block">
                            <p class="control has-icons-left">
                                <input class="input is-small" type="text" placeholder="search">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-search" aria-hidden="true"></i>
                                </span>
                            </p>
                        </div>
                        <div class="panel-block">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4">John Smith</p>
                                            <p class="subtitle is-6">@johnsmith</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                        <a href="#">#css</a> <a href="#">#responsive</a>
                                        <br>
                                        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div class="hero is-black is-medium">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Secondary title
                    </h1>
                    <h2 class="subtitle">
                        Secondary subtitle
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<script lang="ts">
            new Vue({
                el: '#app',
                data: {
                    selectedCategory: 'All',
                    workouts: [
                        { name: 'Cardio Workout 0', category: 'Cardio' },
                        { name: 'Cardio Workout 1', category: 'Cardio' },
                        { name: 'Weightlifting Workout 0', category: 'Weightlifting' },
                        { name: 'Yoga Workout 0', category: 'Yoga' },
                        { name: 'Pilates Workout 0', category: 'Pilates' },
                    ],
                },
                computed: {
                    filteredWorkouts() {
                        if (this.selectedCategory === 'All') {
                            return this.workouts;
                        } else {
                            return this.workouts.filter(workout => workout.category === this.selectedCategory);
                        }
                    },
                },
                methods: {
                    selectCategory(category) {
                        this.selectedCategory = category;
                    },
                },
            });
        </script>