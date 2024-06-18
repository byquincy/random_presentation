<script setup>
import { ref } from 'vue'

const questions = ref([])
let id = 0

const groupNum = ref(5)
const peopleInGroup = ref(4)

const mixedResult = ref([])
const peopleNum = ref(0)
const noLuck = ref([])
const first = ref(true)

function start() {
  let length = groupNum.value

  let mixedIndex = mix(length)
  let tempMixResult = []
  let tempNoLuck = []

  let index = 0
  let questionStr = ""

  for (let i = 0; i < length; i++) {
    index = mixedIndex[i]
    questionStr = questions.value[i].value

    if (questionStr == "") {
      tempNoLuck.push(index + 1)
    } else {
      tempMixResult.push({ id: questions.value[index].id, group: index+1, question: questionStr })
    }
  }

  mixedResult.value = tempMixResult
  noLuck.value = tempNoLuck.sort((a, b) => a - b)
  peopleNum.value = getRandomInt(1, peopleInGroup.value + 1)
  first.value = false
}

function mix(length) {
  let numberSet = []
  let randomSet = []
  let cusor = 0

  for (let i = 0; i < length; i++) {
    numberSet.push(i)
  }

  for (let i = 0; i < length; i++) {
    cusor = getRandomInt(0, numberSet.length)

    randomSet.push(numberSet[cusor])
    numberSet.splice(cusor, 1)
  }

  return randomSet
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 최댓값은 제외, 최솟값은 포함
}

function makeQuestions() {
  let additem = questions.value.length < groupNum.value

  while (questions.value.length != groupNum.value) {
    if (additem) {
      questions.value.push({ id: id++, value: "" })
    } else {
      questions.value.pop()
    }
  }
}

makeQuestions()
</script>

<style>
  @import "../assets/css/roulette.css";
</style>

<template>
  <div class="part-container">
    <h2>모둠</h2>
    <div class="params">
      <div class="input-box">
        <span class="index" style="width: 10rem;">모둠 수</span>
        <input class="number-input" v-model="groupNum" @input="makeQuestions" type="number" min="1" placeholder="모둠 수">
      </div>
      <div class="input-box">
        <span class="index" style="width: 10rem;">모둠별 인원</span>
        <input class="number-input" v-model="peopleInGroup" type="number" min="1" placeholder="모둠별 인원">
      </div>
    </div>
  </div>
  <hr>

  <div class="part-container">
    <h2>문제</h2>
    <template v-for="(question, index) in questions" :key="question.id">
      <div class="input-box">
        <span class="index">{{ index+1 }}</span>
        <input class="text-input" v-model="question.value" type="text" placeholder="꽝" value="">
      </div>
    </template >
  </div>

  <hr>

  <div class="part-container">
    <div id="result-box">
      <div v-if="first" class="center">
        <button @click="start" style="font-size: 1.5rem; padding: 0.8rem 1.6rem;">뽑기</button>
      </div>

      <template v-else>
        <div id="result-container">
          <span v-if="mixedResult.length != 0">
            <small class="index" style="color: black">모둠</small>
            <small style="color: var(--roulette-gray);">문제<br></small>
          </span>
          <span v-for="(question, index) in mixedResult" :key="index">
            <span class="index" style="color: black">{{ question.group }}</span>
            <span style="color: var(--roulette-gray);">{{ question.question }}<br></span>
          </span>

          <span v-if="noLuck.length != 0" style="color: var(--roulette-gray); margin-top: 0.4rem;">꽝: 
            <template v-for="group in noLuck" :key="group">
              {{ group }}&nbsp;
            </template>
          </span><br><br>

          모둠의
          <div class="emphasize">{{ peopleNum }}번</div>
          <br>
        </div>
        <button @click="start">다시 뽑기</button>
    </template>
    </div>
  </div>
</template>