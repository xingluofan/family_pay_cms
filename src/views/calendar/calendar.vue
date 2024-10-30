<template>
  <div class="home-container">
    <div class="home-container-top">
      <div
        :style="{ color: '#841584' }"
        @click="readWorkbookFromRemoteFile(fileUrl)"
      >
        readWorkbookFromRemoteFile
      </div>
    </div>
    <div class="calendar-container">
      <a-calendar>
        <ul slot="dateCellRender" slot-scope="value" class="events">
          <li v-for="item in getListData(value)" :key="item.id">
            <a-tooltip>
              <template slot="title"
                >{{ item.detailType }}-{{ item.remarks }}</template
              >
              {{ item.user }} {{ item.type }} {{ item.changeMoney }}
            </a-tooltip>
          </li>
        </ul>
        <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{ getMonthData(value) }}</section>
            <span>Backlog number</span>
          </div>
        </template>
      </a-calendar>
    </div>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
export default {
  name: "Calendar",
  data() {
    return {
      calendarData: {},
      version: XLSX.version,
      fileUrl:
        "https://afanticar-test.oss-cn-hangzhou.aliyuncs.com/aftpm/video-demo/YYYY-MM.xlsx",
    };
  },
  mounted() {
    console.log(XLSX);
    this.readWorkbookFromRemoteFile(this.fileUrl, this.setCalendar);
  },
  methods: {
    getListData(value) {
      console.log("value", this.dayjs(value).format("YYYY-MM-DD"));
      let listData = [];
      if (this.calendarData[this.dayjs(value).format("YYYY-MM-DD")]) {
        listData = this.calendarData[this.dayjs(value).format("YYYY-MM-DD")];
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    readWorkbookFromRemoteFile(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function (e) {
        if (xhr.status == 200) {
          var data = new Uint8Array(xhr.response);
          var workbook = XLSX.read(data, { type: "array" });
          var json = workbook.Sheets[workbook.SheetNames[0]];
          var newData = XLSX.utils.sheet_to_json(json, { header: 1 });
          console.log("workbook", workbook);
          console.log("json", json);
          console.log("newData", newData);
          if (callback) callback(newData);
        }
      };
      xhr.send();
    },
    setCalendar(data) {
      // 初始化当月数据
      this.calendarData = {};
      if (data && data.length > 0) {
        data.forEach((item, index) => {
          if (!this.calendarData[item[0]]) {
            this.calendarData[item[0]] = [];
          }

          this.calendarData[item[0]].push({
            id: index,
            date: item[0],
            type: this.splitText(item[1]),
            detailType: this.splitText(item[2]),
            changeMoney: item[3],
            user: this.splitText(item[4]),
            remarks: item[5],
          });
        });
      } else {
        this.$message.warning("暂无当前时间段数据");
      }
      console.log(123, this.calendarData);
    },
    splitText(text) {
      if (text && text.indexOf("-") > 0) {
        return text.split("-")[1];
      } else {
        return text;
      }
    },
    get_label(r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-container {
  &-top {
  }
}
</style>
