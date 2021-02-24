<template>
  <br>

  <input type="checkbox" id="Complaint" value="Complaint" >
  <label for="Complaint">Complaint</label>
  <input type="checkbox" id="Feedback" value="Feedback">
  <label for="Feedback">Feedback</label>
  <input type="checkbox" id="Feature" value="Feature" >
  <label for="Feature">Feature</label>
  <br>
  <br>
<label for="message"> Enter your message</label>
  <textarea v-model="message" id="message" placeholder="add your complaint"></textarea>
  <button class="btn" v-on:click="doSomething"> Send </button>
</template>

<script>
export default {
  name: "Feedback"
}
</script>

<style scoped>
input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.lbl {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

</style>