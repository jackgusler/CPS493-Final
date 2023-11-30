<script setup lang="ts">
import { getPosts, type Post } from "@/models/posts";
import { getSession } from "@/models/session";
import { getWorkouts, type Workout } from "@/models/workouts";
import { onMounted, ref } from "vue";

const postData = ref<Post[]>([]);
const workoutData = ref<Workout[]>([]);

let workoutsToday = ref(0);
let durationToday = ref(0);
let highestIntensityToday = ref("");
let highestDurationToday = ref(0);
let workoutsThisWeek = ref(0);
let durationThisWeek = ref(0);
let highestIntensityThisWeek = ref("");
let highestDurationThisWeek = ref(0);
let workoutsAllTime = ref(0);
let durationAllTime = ref(0);
let highestIntensityAllTime = ref("");
let highestDurationAllTime = ref(0);


const session = getSession();
const today = new Date();
const intensityValues: Record<string, number> = {
  None: 0,
  Easy: 1,
  Medium: 2,
  Hard: 3,
};
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay());
const endOfWeek = new Date(today);
endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

const fetchData = async () => {
  postData.value = await getPosts();
  workoutData.value = await getWorkouts();

  //----------------Today----------------//
  workoutsToday.value = postData.value.filter((post: Post) => {
    const postDate = new Date(post.date);
    return post.userId === session.user?.id && isSameDay(postDate, today);
  }).length;
  durationToday.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return post.userId === session.user?.id && isSameDay(postDate, today);
    })
    .reduce((total: number, post: Post) => {
      const postWorkoutId = post.workoutId;
      const workout = workoutData.value[postWorkoutId];
      if (workout && typeof workout.duration === "number") {
        return total + workout.duration;
      }
      return total;
    }, 0);
  highestIntensityToday.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return post.userId === session.user?.id && isSameDay(postDate, today);
    })
    .reduce((highest: string, post: Post) => {
      const intensity = workoutData.value[post.workoutId].intensity;
      const currentIntensityValue = intensityValues[intensity];
      if (currentIntensityValue > intensityValues[highest]) {
        return intensity;
      } else {
        return highest;
      }
    }, "None");
  highestDurationToday.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return post.userId === session.user?.id && isSameDay(postDate, today);
    })
    .reduce((highest: number, post: Post) => {
      const duration = workoutData.value[post.workoutId].duration;
      if (duration > highest) {
        return duration;
      } else {
        return highest;
      }
    }, 0);

  //----------------This Week----------------//
  workoutsThisWeek.value = postData.value.filter((post: Post) => {
    const postDate = new Date(post.date);
    return (
      post.userId === session.user?.id &&
      postDate >= startOfWeek &&
      postDate <= endOfWeek
    );
  }).length;
  durationThisWeek.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return (
        post.userId === session.user?.id &&
        postDate >= startOfWeek &&
        postDate <= endOfWeek
      );
    })
    .reduce((total: number, post: Post) => {
      const postWorkoutId = post.workoutId;
      const workout = workoutData.value[postWorkoutId];
      if (workout && typeof workout.duration === "number") {
        return total + workout.duration;
      }
      return total;
    }, 0);
  highestIntensityThisWeek.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return (
        post.userId === session.user?.id &&
        postDate >= startOfWeek &&
        postDate <= endOfWeek
      );
    })
    .reduce((highest: string, post: Post) => {
      const intensity = workoutData.value[post.workoutId].intensity;
      const currentIntensityValue = intensityValues[intensity];
      if (currentIntensityValue > intensityValues[highest]) {
        return intensity;
      } else {
        return highest;
      }
    }, "None");
  highestDurationThisWeek.value = postData.value
    .filter((post: Post) => {
      const postDate = new Date(post.date);
      return (
        post.userId === session.user?.id &&
        postDate >= startOfWeek &&
        postDate <= endOfWeek
      );
    })
    .reduce((highest: number, post: Post) => {
      const duration = workoutData.value[post.workoutId].duration;
      if (duration > highest) {
        return duration;
      } else {
        return highest;
      }
    }, 0);

  //----------------All Time----------------//
  workoutsAllTime.value = postData.value.filter(
    (post: Post) => post.userId === session.user?.id
  ).length;
  durationAllTime.value = postData.value
    .filter((post: Post) => post.userId === session.user?.id)
    .reduce((total: number, post: Post) => {
      const postWorkoutId = post.workoutId;
      const workout = workoutData.value[postWorkoutId];
      if (workout && typeof workout.duration === "number") {
        return total + workout.duration;
      }
      return total;
    }, 0);
  highestIntensityAllTime.value = postData.value
    .filter((post: Post) => post.userId === session.user?.id)
    .reduce((highest: string, post: Post) => {
      const intensity = workoutData.value[post.workoutId].intensity;
      const currentIntensityValue = intensityValues[intensity];
      if (currentIntensityValue > intensityValues[highest]) {
        return intensity;
      } else {
        return highest;
      }
    }, "None");
  highestDurationAllTime.value = postData.value
    .filter((post: Post) => post.userId === session.user?.id)
    .reduce((highest: number, post: Post) => {
      const duration = workoutData.value[post.workoutId].duration;
      if (duration > highest) {
        return duration;
      } else {
        return highest;
      }
    }, 0);
};

onMounted(() => {
  fetchData();
});

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <p class="panel-heading">Statistics</p>
      <div class="panel-block">
        <div class="box">
          <h2 class="title">Today</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="caption">Workouts</div>
              <h3 class="value">{{ workoutsToday }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Duration</div>
              <h3 class="value">{{ durationToday }} minutes</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Intensity</div>
              <h3 class="value">{{ highestIntensityToday }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Duration</div>
              <h3 class="value">{{ highestDurationToday }} minutes</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="box">
          <h2 class="title">This week</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="caption">Workouts</div>
              <h3 class="value">{{ workoutsThisWeek }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Duration</div>
              <h3 class="value">{{ durationThisWeek }} minutes</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Intensity</div>
              <h3 class="value">{{ highestIntensityThisWeek }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Duration</div>
              <h3 class="value">{{ highestDurationThisWeek }} minutes</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="box">
          <h2 class="title">All time</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="caption">Workouts</div>
              <h3 class="value">{{ workoutsAllTime }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Duration</div>
              <h3 class="value">{{ durationAllTime }} minutes</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Intensity</div>
              <h3 class="value">{{ highestIntensityAllTime }}</h3>
            </div>
            <div class="column is-half">
              <div class="caption">Highest Duration</div>
              <h3 class="value">{{ highestDurationAllTime }} minutes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title,
.value,
.column.is-half,
.panel {
  text-align: center;
}

.panel-block {
  border: none;
  width: 100%;
  justify-content: center;
}

.caption {
  font-size: 1rem;
  font-weight: bold;
}

.title {
  text-decoration: underline;
  text-decoration-color: #00ff00;
}
</style>
