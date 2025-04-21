<template>
  <div class="dashboard">
    <div class="container">
      <div class="left">
        <h1>Job Application - Liu Yunchao & Liu Yunzhi</h1>
        <h1>Dear Interviewer,</h1>

        <p>My name is <strong>Liu Yunchao</strong>, and my sister's name is <strong>Liu Yunzhi</strong>.
          We both have a strong passion for software development and a deep interest in German culture.
          We came to Germany with the <strong>Opportunity Card</strong>, hoping to find a <strong>Java Developer</strong> job.</p>

        <h2>Technical Skills</h2>
        <ul>
          <li>Proficient in <strong>Spring Boot, Spring Cloud, Kubernetes (K8S), and CI/CD</strong>.</li>
          <li>Deep understanding of <strong>Java</strong>.</li>
          <li>Experience in <strong>front-end development with Vue.js</strong>.</li>
          <li>Familiar with <strong>software testing</strong>.</li>
          <li>Deployed project on <strong>Alibaba Cloud using K8S</strong>.</li>
          <li>Developed both the front-end and back-end independently.</li>
        </ul>

        <h2>Career Goals</h2>
        <p>Since arriving in Germany, we have come to appreciate the lifestyle and work environment here.
          We hope to develop our careers in Germany for the long term and contribute our professional skills.
          We love <strong>Java development</strong> and value every work opportunity.
          We aim to keep improving and work closely with the team.</p>

        <h2>Future Plans</h2>
        <p>We are currently residing in Germany with the Opportunity Card (job-seeker visa), which allows us to work without restrictions. We are actively seeking a long-term and stable Java Developer position, with the goal of developing our careers in Germany over the long term.</p>

        <p class="signature">Thank you for your time and consideration. We look forward to speaking with you!</p>
        <p class="signature">Liu Yunchao & Liu Yunzhi</p>
      </div>
      <div class="right">
        <el-calendar class="calendar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.dashboard {
  background: #f5f6f8;
  width: 100%;
  min-height: calc(100vh - 80px);
}

.container {
  display: flex;
  gap: 8px;
}

.left {
  flex: 1;
}

.right {
  width: 40%;
}

.calendar ::v-deep .el-calendar-day {
  height: 40px;
}

.calendar ::v-deep .el-calendar-table__row td,
.calendar ::v-deep .el-calendar-table tr td:first-child,
.calendar ::v-deep .el-calendar-table__row td.prev {
  border: none;
}

.calendar ::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}

.calendar ::v-deep .el-calendar__header {
  display: none;
}

h1, h2 {
  color: #333;
}

ul {
  padding-left: 20px;
}

.signature {
  font-weight: bold;
  margin-top: 20px;
}
</style>
